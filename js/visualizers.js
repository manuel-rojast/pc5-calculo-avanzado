/**
 * VISUALIZADORES 3D INTERACTIVOS CON THREE.JS (MOTOR OPTIMIZADO BAJO DEMANDA)
 * Cálculo Diferencial e Integral Avanzado (CM2A1 - UNI) - PC5
 *
 * Optimizaciones contra lag y webglcontextlost:
 * 1. 0 FPS en reposo: solo redibuja ante interacción (OrbitControls, sliders, resize).
 * 2. Máximo 1 contexto WebGL activo: liberación total de memoria al cambiar de pestaña.
 * 3. Controles de ciclo de vida: Iniciar, Pausar, Cerrar.
 * 4. Limpieza recursiva de geometrías, materiales y shaders.
 */

(function () {
  const REGISTRY = {};

  function disposeObject3D(obj) {
    if (!obj) return;
    if (obj.children && obj.children.length > 0) {
      for (let i = obj.children.length - 1; i >= 0; i--) {
        disposeObject3D(obj.children[i]);
      }
    }
    if (obj.geometry) {
      obj.geometry.dispose();
    }
    if (obj.material) {
      if (Array.isArray(obj.material)) {
        obj.material.forEach(m => m && m.dispose && m.dispose());
      } else if (obj.material.dispose) {
        obj.material.dispose();
      }
    }
  }

  function ensureControlToolbar(container, canvasId) {
    const card = container.closest('.visualizer-card');
    if (!card) return null;

    let toolbar = card.querySelector('.sim-lifecycle-bar');
    if (!toolbar) {
      toolbar = document.createElement('div');
      toolbar.className = 'sim-lifecycle-bar';
      toolbar.innerHTML = `
        <div class="sim-lifecycle-status">
          <span class="sim-status-dot active" id="dot-${canvasId}"></span>
          <span class="sim-status-label" id="status-${canvasId}">Modo Ahorro GPU (0 FPS en reposo)</span>
        </div>
        <div class="sim-lifecycle-actions">
          <button type="button" class="sim-ctrl-btn btn-sim-start" data-action="start" style="display:none;">
            ▶️ Iniciar Gráfica 3D
          </button>
          <button type="button" class="sim-ctrl-btn btn-sim-pause" data-action="pause">
            ⏸️ Pausar
          </button>
          <button type="button" class="sim-ctrl-btn btn-sim-close" data-action="close">
            ⏹️ Cerrar Simulación
          </button>
        </div>
      `;
      const header = card.querySelector('.visualizer-header');
      if (header && header.nextSibling) {
        card.insertBefore(toolbar, header.nextSibling);
      } else {
        card.prepend(toolbar);
      }

      const btnStart = toolbar.querySelector('[data-action="start"]');
      const btnPause = toolbar.querySelector('[data-action="pause"]');
      const btnClose = toolbar.querySelector('[data-action="close"]');

      btnStart.addEventListener('click', () => startVisualizer(canvasId));
      btnPause.addEventListener('click', () => togglePauseVisualizer(canvasId));
      btnClose.addEventListener('click', () => stopVisualizer(canvasId, false));
    }
    return toolbar;
  }

  function updateToolbarUI(canvasId, statusMode) {
    const container = document.getElementById(canvasId);
    if (!container) return;
    const card = container.closest('.visualizer-card');
    if (!card) return;

    const dot = card.querySelector(`#dot-${canvasId}`);
    const label = card.querySelector(`#status-${canvasId}`);
    const btnStart = card.querySelector('[data-action="start"]');
    const btnPause = card.querySelector('[data-action="pause"]');
    const btnClose = card.querySelector('[data-action="close"]');

    if (!dot || !label || !btnStart || !btnPause || !btnClose) return;

    dot.className = 'sim-status-dot';
    if (statusMode === 'running') {
      dot.classList.add('active');
      label.textContent = 'Simulación Activa (Bajo demanda • 0% GPU en reposo)';
      btnStart.style.display = 'none';
      btnPause.style.display = 'inline-flex';
      btnPause.innerHTML = '⏸️ Pausar';
      btnClose.style.display = 'inline-flex';
    } else if (statusMode === 'paused') {
      dot.classList.add('paused');
      label.textContent = 'Simulación Pausada (Imagen congelada • 0% CPU/GPU)';
      btnStart.style.display = 'none';
      btnPause.style.display = 'inline-flex';
      btnPause.innerHTML = '▶️ Reanudar';
      btnClose.style.display = 'inline-flex';
    } else {
      dot.classList.add('stopped');
      label.textContent = 'Simulación Cerrada (Memoria gráfica liberada)';
      btnStart.style.display = 'inline-flex';
      btnPause.style.display = 'none';
      btnClose.style.display = 'none';
    }
  }

  function renderStandbyOverlay(container, canvasId, reasonText) {
    const descriptions = {
      't1-canvas-container': 'Explora regiones de integración Tipo 1 y Tipo 2, curvas frontera y cortes transversales en 3D.',
      't2-canvas-container': 'Visualiza la deformación de mallas cartesianas a coordenadas polares/elípticas y el factor Jacobiano |det J|.',
      't3-canvas-container': 'Analiza sólidos en R³ con proyecciones sobre los planos coordenados XY, XZ, YZ y rebanadas móviles.',
      't4-canvas-container': 'Manipula una cuña tridimensional en coordenadas esféricas y cilíndricas y la intersección cono-esfera.',
      't5-canvas-container': 'Observa sólidos con gradiente de densidad heterogénea, centro de masa flotante y momento de inercia Iz.'
    };
    const desc = descriptions[canvasId] || 'Gráfico interactivo 3D con Three.js bajo demanda.';

    container.innerHTML = `
      <div class="sim-standby-placeholder">
        <div class="sim-standby-icon">🧊</div>
        <h4 class="sim-standby-title">${reasonText || 'Simulación 3D Lista para Iniciar'}</h4>
        <p class="sim-standby-desc">${desc}</p>
        <button type="button" class="sim-standby-launch-btn" id="launch-${canvasId}">
          ▶️ Iniciar Gráfica Interactiva 3D
        </button>
        <span class="sim-standby-hint">⚡ Optimizado: no consume memoria gráfica mientras está cerrada</span>
      </div>
    `;
    const launchBtn = container.querySelector(`#launch-${canvasId}`);
    if (launchBtn) {
      launchBtn.addEventListener('click', () => startVisualizer(canvasId));
    }
  }

  function stopVisualizer(canvasId, isAutoSwitch) {
    const entry = REGISTRY[canvasId];
    const container = document.getElementById(canvasId);

    if (entry && entry.instance) {
      const inst = entry.instance;
      inst.disposed = true;
      if (inst.rafId) {
        cancelAnimationFrame(inst.rafId);
        inst.rafId = null;
      }
      if (inst.resizeHandler) {
        window.removeEventListener('resize', inst.resizeHandler);
      }
      if (inst.observer) {
        inst.observer.disconnect();
      }
      if (inst.controls && inst.controls.dispose) {
        inst.controls.dispose();
      }
      if (inst.scene) {
        disposeObject3D(inst.scene);
      }
      if (inst.renderer) {
        try {
          inst.renderer.dispose();
          if (inst.renderer.forceContextLoss) {
            inst.renderer.forceContextLoss();
          }
        } catch (e) {}
      }
      entry.instance = null;
    }

    if (container) {
      ensureControlToolbar(container, canvasId);
      renderStandbyOverlay(
        container,
        canvasId,
        isAutoSwitch
          ? 'Simulación en Pausa Automática (Ahorro de Memoria)'
          : 'Simulación 3D Cerrada (Memoria GPU Liberada)'
      );
      updateToolbarUI(canvasId, 'stopped');
    }
  }

  function togglePauseVisualizer(canvasId) {
    const entry = REGISTRY[canvasId];
    if (!entry || !entry.instance) {
      startVisualizer(canvasId);
      return;
    }
    const inst = entry.instance;
    inst.paused = !inst.paused;
    if (inst.controls) {
      inst.controls.enabled = !inst.paused;
    }
    if (inst.paused) {
      if (inst.rafId) {
        cancelAnimationFrame(inst.rafId);
        inst.rafId = null;
      }
      updateToolbarUI(canvasId, 'paused');
    } else {
      updateToolbarUI(canvasId, 'running');
      inst.requestRender();
    }
  }

  function startVisualizer(canvasId) {
    Object.keys(REGISTRY).forEach(otherId => {
      if (otherId !== canvasId && REGISTRY[otherId].instance) {
        stopVisualizer(otherId, true);
      }
    });

    const entry = REGISTRY[canvasId];
    if (!entry) return;

    if (entry.instance) {
      if (entry.instance.paused) {
        togglePauseVisualizer(canvasId);
      }
      return;
    }

    mountThreeInstance(canvasId, entry.setupCallback);
  }

  function mountThreeInstance(canvasId, initSceneCallback) {
    const container = document.getElementById(canvasId);
    if (!container) return null;

    ensureControlToolbar(container, canvasId);

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1329);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(5, 5, 5);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'default'
      });
    } catch (err) {
      renderStandbyOverlay(container, canvasId, 'No se pudo iniciar WebGL. Haz clic para reintentar.');
      updateToolbarUI(canvasId, 'stopped');
      return null;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1.15;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.72);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 0.9);
    dirLight1.position.set(8, 12, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 0.5);
    dirLight2.position.set(-8, -6, -8);
    scene.add(dirLight2);

    const inst = {
      scene,
      camera,
      renderer,
      controls,
      container,
      paused: false,
      disposed: false,
      rafId: null,
      needsRender: true,
      requestRender: function () {
        if (this.disposed || this.paused) return;
        this.needsRender = true;
        if (!this.rafId) {
          this.rafId = requestAnimationFrame(() => {
            this.rafId = null;
            if (this.disposed || this.paused) return;
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            this.needsRender = false;
          });
        }
      }
    };

    controls.addEventListener('change', () => inst.requestRender());

    inst.resizeHandler = () => {
      if (inst.disposed) return;
      const nw = container.clientWidth || width;
      const nh = container.clientHeight || height;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
      inst.requestRender();
    };
    window.addEventListener('resize', inst.resizeHandler);

    if (window.ResizeObserver) {
      inst.observer = new ResizeObserver(() => inst.resizeHandler());
      inst.observer.observe(container);
    }

    REGISTRY[canvasId].instance = inst;
    updateToolbarUI(canvasId, 'running');

    initSceneCallback({
      scene,
      camera,
      renderer,
      controls,
      requestRender: () => inst.requestRender(),
      disposeObject3D
    });

    inst.requestRender();
    return inst;
  }

  function registerAndStart(canvasId, setupCallback) {
    REGISTRY[canvasId] = {
      setupCallback,
      instance: REGISTRY[canvasId] ? REGISTRY[canvasId].instance : null
    };
    startVisualizer(canvasId);
  }

  window.VisualizerManager = {
    start: startVisualizer,
    stop: stopVisualizer,
    togglePause: togglePauseVisualizer,
    onTopicSwitch: function (topicId) {
      const mapTopicToCanvas = {
        't1': 't1-canvas-container',
        't2': 't2-canvas-container',
        't3': 't3-canvas-container',
        't4': 't4-canvas-container',
        't5': 't5-canvas-container'
      };
      const targetCanvas = mapTopicToCanvas[topicId];

      Object.keys(REGISTRY).forEach(cid => {
        if (cid !== targetCanvas && REGISTRY[cid].instance) {
          stopVisualizer(cid, true);
        }
      });

      if (targetCanvas && REGISTRY[targetCanvas] && !REGISTRY[targetCanvas].instance) {
        startVisualizer(targetCanvas);
      }
    }
  };

  // -------------------------------------------------------------
  // VISUALIZADOR T1: REGIONES GENERALES (TIPO 1 Y TIPO 2)
  // -------------------------------------------------------------
  window.initTopic1Visualizer = function () {
    registerAndStart('t1-canvas-container', ({ scene, camera, controls, requestRender, disposeObject3D }) => {
      camera.position.set(4, 3.8, 4.5);
      controls.target.set(0, 0.8, 0);

      const grid = new THREE.GridHelper(5, 10, 0x38bdf8, 0x1e293b);
      grid.position.y = 0;
      scene.add(grid);

      const dynamicGroup = new THREE.Group();
      scene.add(dynamicGroup);

      // Superficie z = f(x,y) = 2.4 - 0.4(x^2 + y^2)
      const surfGeo = new THREE.ParametricGeometry((u, v, target) => {
        const x = -1.5 + u * 3;
        const y = -1.5 + v * 3;
        const z = Math.max(0, 2.4 - 0.35 * (x * x + y * y));
        target.set(x, z, y);
      }, 26, 26);
      const surfMat = new THREE.MeshPhongMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
      });
      scene.add(new THREE.Mesh(surfGeo, surfMat));

      let currentMode = 'type1';
      let scanPos = 0.0;

      function updateScene() {
        disposeObject3D(dynamicGroup);
        dynamicGroup.clear();

        const sliceMat = new THREE.MeshPhongMaterial({
          color: currentMode === 'type1' ? 0x22c55e : 0xf59e0b,
          transparent: true,
          opacity: 0.75,
          side: THREE.DoubleSide
        });

        if (currentMode === 'type1') {
          const x0 = scanPos;
          const yBottom = x0 * x0 - 0.9;
          const yTop = 1.1 - 0.6 * x0 * x0;
          if (yTop > yBottom) {
            const zTop1 = Math.max(0, 2.4 - 0.35 * (x0 * x0 + yBottom * yBottom));
            const zTop2 = Math.max(0, 2.4 - 0.35 * (x0 * x0 + yTop * yTop));
            
            const sliceGeo = new THREE.BufferGeometry();
            const verts = new Float32Array([
              x0, 0, yBottom,
              x0, zTop1, yBottom,
              x0, zTop2, yTop,
              x0, 0, yBottom,
              x0, zTop2, yTop,
              x0, 0, yTop
            ]);
            sliceGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
            sliceGeo.computeVertexNormals();
            dynamicGroup.add(new THREE.Mesh(sliceGeo, sliceMat));
          }
        } else {
          const y0 = scanPos;
          const xLeft = -Math.sqrt(Math.max(0, 1.2 - 0.5 * y0 * y0));
          const xRight = Math.sqrt(Math.max(0, 1.2 - 0.5 * y0 * y0));
          if (xRight > xLeft) {
            const zTop1 = Math.max(0, 2.4 - 0.35 * (xLeft * xLeft + y0 * y0));
            const zTop2 = Math.max(0, 2.4 - 0.35 * (xRight * xRight + y0 * y0));
            const sliceGeo = new THREE.BufferGeometry();
            const verts = new Float32Array([
              xLeft, 0, y0,
              xLeft, zTop1, y0,
              xRight, zTop2, y0,
              xLeft, 0, y0,
              xRight, zTop2, y0,
              xRight, 0, y0
            ]);
            sliceGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
            sliceGeo.computeVertexNormals();
            dynamicGroup.add(new THREE.Mesh(sliceGeo, sliceMat));
          }
        }

        const curvePoints1 = [];
        const curvePoints2 = [];
        for (let t = -1.2; t <= 1.2; t += 0.05) {
          if (currentMode === 'type1') {
            curvePoints1.push(new THREE.Vector3(t, 0.01, t * t - 0.9));
            curvePoints2.push(new THREE.Vector3(t, 0.01, 1.1 - 0.6 * t * t));
          } else {
            const xVal = Math.sqrt(Math.max(0, 1.2 - 0.5 * t * t));
            curvePoints1.push(new THREE.Vector3(-xVal, 0.01, t));
            curvePoints2.push(new THREE.Vector3(xVal, 0.01, t));
          }
        }
        const lineMat1 = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
        const lineMat2 = new THREE.LineBasicMaterial({ color: 0xa855f7, linewidth: 2 });
        dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePoints1), lineMat1));
        dynamicGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curvePoints2), lineMat2));

        requestRender();
      }

      const scanSlider = document.getElementById('t1-scan-slider');
      if (scanSlider) {
        scanSlider.addEventListener('input', (e) => {
          scanPos = parseFloat(e.target.value);
          const readout = document.getElementById('t1-scan-readout');
          if (readout) readout.textContent = scanPos.toFixed(2);
          updateScene();
        });
      }

      const modeBtns = document.querySelectorAll('.t1-mode-btn');
      modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          modeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentMode = btn.dataset.mode;
          updateScene();
        });
      });

      updateScene();
    });
  };

  // -------------------------------------------------------------
  // VISUALIZADOR T2: CAMBIO DE VARIABLE EN R² Y POLARES
  // -------------------------------------------------------------
  window.initTopic2Visualizer = function () {
    registerAndStart('t2-canvas-container', ({ scene, camera, controls, requestRender, disposeObject3D }) => {
      camera.position.set(0, 5, 5);
      controls.target.set(0, 0, 0);

      const gridHelper = new THREE.GridHelper(6, 12, 0x475569, 0x1e293b);
      scene.add(gridHelper);

      const gridGroup = new THREE.Group();
      scene.add(gridGroup);

      let morphFactor = 0.0;

      function drawGrid() {
        disposeObject3D(gridGroup);
        gridGroup.clear();

        const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 });
        const uSteps = 12;
        const vSteps = 16;
        const uMax = 2.0;
        const vMax = Math.PI;

        for (let i = 0; i <= uSteps; i++) {
          const u = (i / uSteps) * uMax;
          const pts = [];
          for (let j = 0; j <= vSteps; j++) {
            const v = (j / vSteps) * vMax;
            const cx = (u - 1) * 1.5;
            const cy = (v - Math.PI/2) * 1.0;
            const px = u * Math.cos(v);
            const py = u * Math.sin(v);
            const x = (1 - morphFactor) * cx + morphFactor * px;
            const z = (1 - morphFactor) * cy + morphFactor * py;
            pts.push(new THREE.Vector3(x, 0.02, z));
          }
          gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
        }

        const lineMat2 = new THREE.LineBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.65 });
        for (let j = 0; j <= vSteps; j++) {
          const v = (j / vSteps) * vMax;
          const pts = [];
          for (let i = 0; i <= uSteps; i++) {
            const u = (i / uSteps) * uMax;
            const cx = (u - 1) * 1.5;
            const cy = (v - Math.PI/2) * 1.0;
            const px = u * Math.cos(v);
            const py = u * Math.sin(v);
            const x = (1 - morphFactor) * cx + morphFactor * px;
            const z = (1 - morphFactor) * cy + morphFactor * py;
            pts.push(new THREE.Vector3(x, 0.02, z));
          }
          gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat2));
        }

        const u0 = 1.3;
        const v0 = Math.PI / 4;
        const du = 0.35;
        const dv = 0.25;
        const corners = [
          [u0, v0],
          [u0 + du, v0],
          [u0 + du, v0 + dv],
          [u0, v0 + dv]
        ];
        const transformedCorners = corners.map(([u, v]) => {
          const cx = (u - 1) * 1.5;
          const cy = (v - Math.PI/2) * 1.0;
          const px = u * Math.cos(v);
          const py = u * Math.sin(v);
          return new THREE.Vector3((1 - morphFactor) * cx + morphFactor * px, 0.05, (1 - morphFactor) * cy + morphFactor * py);
        });

        const patchGeo = new THREE.BufferGeometry();
        const patchVerts = new Float32Array([
          transformedCorners[0].x, transformedCorners[0].y, transformedCorners[0].z,
          transformedCorners[1].x, transformedCorners[1].y, transformedCorners[1].z,
          transformedCorners[2].x, transformedCorners[2].y, transformedCorners[2].z,
          transformedCorners[0].x, transformedCorners[0].y, transformedCorners[0].z,
          transformedCorners[2].x, transformedCorners[2].y, transformedCorners[2].z,
          transformedCorners[3].x, transformedCorners[3].y, transformedCorners[3].z
        ]);
        patchGeo.setAttribute('position', new THREE.BufferAttribute(patchVerts, 3));
        const patchMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
        gridGroup.add(new THREE.Mesh(patchGeo, patchMat));

        requestRender();
      }

      const morphSlider = document.getElementById('t2-morph-slider');
      if (morphSlider) {
        morphSlider.addEventListener('input', (e) => {
          morphFactor = parseFloat(e.target.value);
          const readout = document.getElementById('t2-morph-readout');
          if (readout) readout.textContent = `${Math.round(morphFactor * 100)}%`;
          drawGrid();
        });
      }

      drawGrid();
    });
  };

  // -------------------------------------------------------------
  // VISUALIZADOR T3: SÓLIDOS TIPOS 1, 2 Y 3 EN R³
  // -------------------------------------------------------------
  window.initTopic3Visualizer = function () {
    registerAndStart('t3-canvas-container', ({ scene, camera, controls, requestRender, disposeObject3D }) => {
      camera.position.set(4.5, 4.2, 5.0);
      controls.target.set(0, 1.2, 0);

      const axes = new THREE.AxesHelper(3.5);
      scene.add(axes);

      const solidGroup = new THREE.Group();
      scene.add(solidGroup);

      let currentProj = 'xy';
      let sliceZ = 1.8;

      function buildSolid() {
        disposeObject3D(solidGroup);
        solidGroup.clear();

        const geom = new THREE.CylinderGeometry(0.01, 1.73, 3.0, 32, 16, true);
        const mat = new THREE.MeshPhongMaterial({
          color: 0x38bdf8,
          transparent: true,
          opacity: 0.55,
          side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.y = 1.5;
        solidGroup.add(mesh);

        const projMat = new THREE.MeshBasicMaterial({
          color: currentProj === 'xy' ? 0x22c55e : (currentProj === 'xz' ? 0xf59e0b : 0xa855f7),
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide
        });
        let projGeo;
        if (currentProj === 'xy') {
          projGeo = new THREE.CircleGeometry(1.73, 32);
          const projMesh = new THREE.Mesh(projGeo, projMat);
          projMesh.rotation.x = -Math.PI / 2;
          projMesh.position.y = 0.01;
          solidGroup.add(projMesh);
        } else if (currentProj === 'xz') {
          projGeo = new THREE.PlaneGeometry(3.5, 3.0);
          const projMesh = new THREE.Mesh(projGeo, projMat);
          projMesh.position.set(0, 1.5, -2.0);
          solidGroup.add(projMesh);
        } else {
          projGeo = new THREE.PlaneGeometry(3.5, 3.0);
          const projMesh = new THREE.Mesh(projGeo, projMat);
          projMesh.rotation.y = Math.PI / 2;
          projMesh.position.set(-2.0, 1.5, 0);
          solidGroup.add(projMesh);
        }

        if (sliceZ > 0 && sliceZ < 3.0) {
          const rSlice = Math.sqrt(Math.max(0, 3.0 - sliceZ));
          const sliceGeo = new THREE.CircleGeometry(rSlice, 32);
          const sliceMat = new THREE.MeshPhongMaterial({
            color: 0xe11d48,
            transparent: true,
            opacity: 0.75,
            side: THREE.DoubleSide
          });
          const sliceMesh = new THREE.Mesh(sliceGeo, sliceMat);
          sliceMesh.rotation.x = -Math.PI / 2;
          sliceMesh.position.y = sliceZ;
          solidGroup.add(sliceMesh);
        }

        requestRender();
      }

      const sliceSlider = document.getElementById('t3-slice-slider');
      if (sliceSlider) {
        sliceSlider.addEventListener('input', (e) => {
          sliceZ = parseFloat(e.target.value);
          const readout = document.getElementById('t3-slice-readout');
          if (readout) readout.textContent = sliceZ.toFixed(2);
          buildSolid();
        });
      }

      const projBtns = document.querySelectorAll('.t3-proj-btn');
      projBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          projBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentProj = btn.dataset.proj;
          buildSolid();
        });
      });

      buildSolid();
    });
  };

  // -------------------------------------------------------------
  // VISUALIZADOR T4: COORDENADAS ESFÉRICAS Y CILÍNDRICAS
  // -------------------------------------------------------------
  window.initTopic4Visualizer = function () {
    registerAndStart('t4-canvas-container', ({ scene, camera, controls, requestRender, disposeObject3D }) => {
      camera.position.set(4.2, 3.5, 4.2);
      controls.target.set(0, 0.8, 0);

      const axes = new THREE.AxesHelper(3.0);
      scene.add(axes);

      const wedgeGroup = new THREE.Group();
      scene.add(wedgeGroup);

      let rhoMax = 2.2;
      let phiMax = Math.PI / 3;
      let thetaMax = Math.PI * 1.2;
      let mode = 'wedge';

      function drawWedge() {
        disposeObject3D(wedgeGroup);
        wedgeGroup.clear();

        if (mode === 'wedge') {
          const sphereGeo = new THREE.SphereGeometry(rhoMax, 24, 24, 0, thetaMax, 0, phiMax);
          const sphereMat = new THREE.MeshPhongMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.65,
            side: THREE.DoubleSide
          });
          wedgeGroup.add(new THREE.Mesh(sphereGeo, sphereMat));

          const coneSideMat = new THREE.MeshPhongMaterial({
            color: 0xa855f7,
            transparent: true,
            opacity: 0.55,
            side: THREE.DoubleSide
          });
          const coneGeo = new THREE.ConeGeometry(rhoMax * Math.sin(phiMax), rhoMax * Math.cos(phiMax), 32, 1, true);
          const coneMesh = new THREE.Mesh(coneGeo, coneSideMat);
          coneMesh.rotation.x = Math.PI;
          coneMesh.position.y = (rhoMax * Math.cos(phiMax)) / 2;
          wedgeGroup.add(coneMesh);
        } else {
          const R = 2.0;
          const phiCone = Math.PI / 4;
          const capGeo = new THREE.SphereGeometry(R, 32, 16, 0, Math.PI * 2, 0, phiCone);
          const capMat = new THREE.MeshPhongMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
          wedgeGroup.add(new THREE.Mesh(capGeo, capMat));

          const coneH = R * Math.cos(phiCone);
          const coneR = R * Math.sin(phiCone);
          const coneGeo = new THREE.ConeGeometry(coneR, coneH, 32, 1, true);
          const coneMat = new THREE.MeshPhongMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
          const coneMesh = new THREE.Mesh(coneGeo, coneMat);
          coneMesh.position.y = coneH / 2;
          wedgeGroup.add(coneMesh);
        }

        requestRender();
      }

      const phiSlider = document.getElementById('t4-phi-slider');
      if (phiSlider) {
        phiSlider.addEventListener('input', (e) => {
          phiMax = (parseFloat(e.target.value) * Math.PI) / 180;
          const readout = document.getElementById('t4-phi-readout');
          if (readout) readout.textContent = `${e.target.value}°`;
          drawWedge();
        });
      }

      const thetaSlider = document.getElementById('t4-theta-slider');
      if (thetaSlider) {
        thetaSlider.addEventListener('input', (e) => {
          thetaMax = (parseFloat(e.target.value) * Math.PI) / 180;
          const readout = document.getElementById('t4-theta-readout');
          if (readout) readout.textContent = `${e.target.value}°`;
          drawWedge();
        });
      }

      const modeBtns = document.querySelectorAll('.t4-mode-btn');
      modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          modeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          mode = btn.dataset.mode;
          drawWedge();
        });
      });

      drawWedge();
    });
  };

  // -------------------------------------------------------------
  // VISUALIZADOR T5: APLICACIONES FÍSICAS (CENTRO DE MASA E INERCIA)
  // -------------------------------------------------------------
  window.initTopic5Visualizer = function () {
    registerAndStart('t5-canvas-container', ({ scene, camera, controls, requestRender, disposeObject3D }) => {
      camera.position.set(3.8, 3.2, 4.0);
      controls.target.set(0, 1.0, 0);

      const axes = new THREE.AxesHelper(3.0);
      scene.add(axes);

      const physGroup = new THREE.Group();
      scene.add(physGroup);

      let gradAlpha = 1.0;

      function updatePhysics() {
        disposeObject3D(physGroup);
        physGroup.clear();

        const H = 2.5;
        const R = 1.6;
        const nSlices = 18;
        let totalMass = 0;
        let weightedZ = 0;

        for (let i = 0; i < nSlices; i++) {
          const z0 = (i / nSlices) * H;
          const z1 = ((i + 1) / nSlices) * H;
          const zMid = (z0 + z1) / 2;
          const rMid = R * (1 - zMid / H);
          const dz = H / nSlices;
          const density = Math.pow(zMid / H + 0.1, gradAlpha);
          const dM = Math.PI * rMid * rMid * dz * density;
          totalMass += dM;
          weightedZ += zMid * dM;

          const discGeo = new THREE.CylinderGeometry(rMid * 0.98, rMid, dz * 0.95, 24);
          const tColor = Math.min(1.0, density / 1.5);
          const col = new THREE.Color().lerpColors(new THREE.Color(0x38bdf8), new THREE.Color(0xef4444), tColor);
          const discMat = new THREE.MeshPhongMaterial({
            color: col,
            transparent: true,
            opacity: 0.65
          });
          const disc = new THREE.Mesh(discGeo, discMat);
          disc.position.y = zMid;
          physGroup.add(disc);
        }

        const zCenterOfMass = weightedZ / totalMass;

        const cmGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const cmMat = new THREE.MeshStandardMaterial({
          color: 0xfbbf24,
          emissive: 0xd97706,
          roughness: 0.2,
          metalness: 0.8
        });
        const cmMesh = new THREE.Mesh(cmGeo, cmMat);
        cmMesh.position.set(0, zCenterOfMass, 0);
        physGroup.add(cmMesh);

        const ringGeo = new THREE.TorusGeometry(1.2, 0.02, 8, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        ring.position.y = zCenterOfMass;
        physGroup.add(ring);

        const readoutZ = document.getElementById('t5-cm-readout');
        if (readoutZ) readoutZ.textContent = zCenterOfMass.toFixed(3);

        requestRender();
      }

      const densitySlider = document.getElementById('t5-density-slider');
      if (densitySlider) {
        densitySlider.addEventListener('input', (e) => {
          gradAlpha = parseFloat(e.target.value);
          const readout = document.getElementById('t5-density-readout');
          if (readout) readout.textContent = gradAlpha.toFixed(2);
          updatePhysics();
        });
      }

      updatePhysics();
    });
  };

})();
