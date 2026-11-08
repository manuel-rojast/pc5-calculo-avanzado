/**
 * MÓDULO DE ENTRENAMIENTO AVANZADO Y RETOS 2026-2 (CM2A1 - UNI) - PC5
 * Incluye:
 * 1. Simulador Interactivo 2D en Canvas de Cambio de Variables y Jacobiano
 * 2. Conmutadores de Anatomía de Demostraciones en 2 Fases (Borrador / Heurística vs. Redacción Formal)
 * 3. Navegación fluida de Sub-pestañas en el módulo Retos
 * 4. Integración dinámica con KaTeX
 */

(function () {
  let jacobianCanvas = null;
  let jacobianCtx = null;
  let simState = {
    mode: 'polar', // 'polar' o 'shear'
    uParam: 1.5,
    vParam: 0.785, // 45 deg
    stretch: 1.2
  };

  window.initRetos2026Module = function () {
    initProofPhaseToggles();
    initRetosSubtabs();
    initJacobianCanvasSimulator();
  };

  // 1. Conmutadores de 2 fases para demostraciones
  function initProofPhaseToggles() {
    document.querySelectorAll('.proof-phase-toggle-btn').forEach(btn => {
      if (btn.dataset.bound === 'true') return;
      btn.dataset.bound = 'true';

      btn.addEventListener('click', () => {
        const parent = btn.closest('.proof-anatomy-widget');
        if (!parent) return;

        const targetPhase = btn.dataset.phase;
        parent.querySelectorAll('.proof-phase-toggle-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.phase === targetPhase);
        });
        parent.querySelectorAll('.proof-phase-pane').forEach(pane => {
          pane.classList.toggle('active', pane.dataset.phase === targetPhase);
        });

        if (window.renderMathInElement) {
          window.renderMathInElement(parent, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false },
              { left: '\\[', right: '\\]', display: true },
              { left: '\\(', right: '\\)', display: false }
            ],
            throwOnError: false
          });
        }
      });
    });
  }

  // 2. Sub-pestañas dentro de Retos 2026-2
  function initRetosSubtabs() {
    const subtabBtns = document.querySelectorAll('.retos-subtab-btn');
    const subtabPanes = document.querySelectorAll('.retos-subtab-pane');

    subtabBtns.forEach(btn => {
      if (btn.dataset.bound === 'true') return;
      btn.dataset.bound = 'true';

      btn.addEventListener('click', () => {
        const target = btn.dataset.subtab;
        subtabBtns.forEach(b => b.classList.toggle('active', b.dataset.subtab === target));
        subtabPanes.forEach(p => p.classList.toggle('active', p.id === `retos-pane-${target}`));

        if (target === 'jacobian-sim') {
          setTimeout(drawJacobianSimulation, 60);
        }

        if (window.renderMathInElement) {
          const activePane = document.getElementById(`retos-pane-${target}`);
          if (activePane) {
            window.renderMathInElement(activePane, {
              delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\[', right: '\\]', display: true },
                { left: '\\(', right: '\\)', display: false }
              ],
              throwOnError: false
            });
          }
        }
      });
    });
  }

  // 3. Simulador Visual 2D en Canvas de Deformación del Dominio y Jacobiano
  function initJacobianCanvasSimulator() {
    jacobianCanvas = document.getElementById('jacobian-2d-canvas');
    if (!jacobianCanvas) return;
    jacobianCtx = jacobianCanvas.getContext('2d');

    const uSlider = document.getElementById('sim-jac-u-slider');
    const vSlider = document.getElementById('sim-jac-v-slider');
    const modeBtns = document.querySelectorAll('.sim-jac-mode-btn');

    if (uSlider && !uSlider.dataset.bound) {
      uSlider.dataset.bound = 'true';
      uSlider.addEventListener('input', (e) => {
        simState.uParam = parseFloat(e.target.value);
        const ro = document.getElementById('sim-jac-u-readout');
        if (ro) ro.textContent = simState.uParam.toFixed(2);
        drawJacobianSimulation();
      });
    }

    if (vSlider && !vSlider.dataset.bound) {
      vSlider.dataset.bound = 'true';
      vSlider.addEventListener('input', (e) => {
        simState.vParam = parseFloat(e.target.value);
        const ro = document.getElementById('sim-jac-v-readout');
        if (ro) ro.textContent = simState.vParam.toFixed(2);
        drawJacobianSimulation();
      });
    }

    modeBtns.forEach(btn => {
      if (btn.dataset.bound === 'true') return;
      btn.dataset.bound = 'true';
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        simState.mode = btn.dataset.mode;
        drawJacobianSimulation();
      });
    });

    window.addEventListener('resize', () => {
      if (jacobianCanvas && jacobianCanvas.offsetParent !== null) {
        drawJacobianSimulation();
      }
    });

    drawJacobianSimulation();
  }

  function drawJacobianSimulation() {
    if (!jacobianCanvas || !jacobianCtx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = jacobianCanvas.getBoundingClientRect();
    const width = rect.width || 600;
    const height = rect.height || 360;

    jacobianCanvas.width = width * dpr;
    jacobianCanvas.height = height * dpr;
    jacobianCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Fondo oscuro
    jacobianCtx.fillStyle = '#0b1329';
    jacobianCtx.fillRect(0, 0, width, height);

    // Dividir la vista en 2 mitades: Izquierda = Plano (u,v), Derecha = Plano (x,y)
    const midX = width / 2;
    const panelW = midX - 20;
    const panelH = height - 50;

    // Título de los paneles
    jacobianCtx.font = 'bold 13px Inter, sans-serif';
    jacobianCtx.fillStyle = '#38bdf8';
    jacobianCtx.fillText('DOMINIO ORIGINAL (u, v)', 25, 25);
    jacobianCtx.fillStyle = '#a855f7';
    jacobianCtx.fillText('IMAGEN TRANSFORMADA (x, y) = T(u, v)', midX + 25, 25);

    // Línea divisoria central
    jacobianCtx.strokeStyle = '#1e293b';
    jacobianCtx.lineWidth = 2;
    jacobianCtx.beginPath();
    jacobianCtx.moveTo(midX, 10);
    jacobianCtx.lineTo(midX, height - 10);
    jacobianCtx.stroke();

    // Centro local de coordenadas
    const originU = 70;
    const originV = height - 50;
    const scaleU = 65;

    const originX = midX + panelW / 2;
    const originY = height / 2 + 10;
    const scaleX = 55;

    // Dibujar ejes UV (Izquierda)
    jacobianCtx.strokeStyle = '#475569';
    jacobianCtx.lineWidth = 1.5;
    jacobianCtx.beginPath();
    jacobianCtx.moveTo(originU, originV);
    jacobianCtx.lineTo(originU + panelW - 50, originV);
    jacobianCtx.moveTo(originU, originV);
    jacobianCtx.lineTo(originU, 45);
    jacobianCtx.stroke();

    jacobianCtx.fillStyle = '#94a3b8';
    jacobianCtx.font = '11px monospace';
    jacobianCtx.fillText('u (radio r)', originU + panelW - 60, originV + 18);
    jacobianCtx.fillText('v (ángulo θ)', originU - 50, 55);

    // Dibujar ejes XY (Derecha)
    jacobianCtx.beginPath();
    jacobianCtx.moveTo(originX - panelW/2 + 20, originY);
    jacobianCtx.lineTo(originX + panelW/2 - 20, originY);
    jacobianCtx.moveTo(originX, originY + panelH/2 - 10);
    jacobianCtx.lineTo(originX, originY - panelH/2 + 10);
    jacobianCtx.stroke();

    jacobianCtx.fillText('x', originX + panelW/2 - 30, originY + 18);
    jacobianCtx.fillText('y', originX + 10, originY - panelH/2 + 22);

    // Parámetros actuales
    const u0 = simState.uParam;
    const v0 = simState.vParam;
    const du = 0.5;
    const dv = 0.4;

    // Rectángulo elemental du x dv en el plano UV
    const rU0 = originU + u0 * scaleU;
    const rV0 = originV - v0 * scaleU;
    const rW = du * scaleU;
    const rH = dv * scaleU;

    jacobianCtx.fillStyle = 'rgba(56, 189, 248, 0.28)';
    jacobianCtx.fillRect(rU0, rV0 - rH, rW, rH);
    jacobianCtx.strokeStyle = '#38bdf8';
    jacobianCtx.lineWidth = 2;
    jacobianCtx.strokeRect(rU0, rV0 - rH, rW, rH);

    jacobianCtx.fillStyle = '#38bdf8';
    jacobianCtx.fillText('dA = du dv', rU0 + 4, rV0 - rH / 2 + 4);

    // Transformación a (x,y)
    let p0, p1, p2, p3, jacDetVal;

    if (simState.mode === 'polar') {
      // Coordenadas polares x = u cos(v), y = u sin(v)
      // u = r, v = theta
      const mapPolar = (r, th) => ({
        x: originX + (r * Math.cos(th)) * scaleX,
        y: originY - (r * Math.sin(th)) * scaleX
      });

      p0 = mapPolar(u0, v0);
      p1 = mapPolar(u0 + du, v0);
      p2 = mapPolar(u0 + du, v0 + dv);
      p3 = mapPolar(u0, v0 + dv);

      jacDetVal = u0; // |det J| = r
    } else {
      // Cizallamiento lineal afín: x = u + 0.6 v, y = 0.4 u + 1.2 v
      const mapShear = (u, v) => ({
        x: originX + (u + 0.6 * v - 1.5) * scaleX,
        y: originY - (0.4 * u + 1.2 * v - 1.2) * scaleX
      });

      p0 = mapShear(u0, v0);
      p1 = mapShear(u0 + du, v0);
      p2 = mapShear(u0 + du, v0 + dv);
      p3 = mapShear(u0, v0 + dv);

      jacDetVal = Math.abs(1.0 * 1.2 - 0.6 * 0.4); // 1.2 - 0.24 = 0.96
    }

    // Dibujar parche deformado en XY
    jacobianCtx.beginPath();
    jacobianCtx.moveTo(p0.x, p0.y);
    jacobianCtx.lineTo(p1.x, p1.y);
    jacobianCtx.lineTo(p2.x, p2.y);
    jacobianCtx.lineTo(p3.x, p3.y);
    jacobianCtx.closePath();

    jacobianCtx.fillStyle = 'rgba(168, 85, 247, 0.35)';
    jacobianCtx.fill();
    jacobianCtx.strokeStyle = '#c084fc';
    jacobianCtx.lineWidth = 2;
    jacobianCtx.stroke();

    // Vectores tangentes de la matriz Jacobiana Tu y Tv
    drawArrow(jacobianCtx, p0.x, p0.y, p1.x, p1.y, '#22c55e', 'Tu');
    drawArrow(jacobianCtx, p0.x, p0.y, p3.x, p3.y, '#f59e0b', 'Tv');

    // Panel de lectura numérica inferior
    const readoutArea = document.getElementById('sim-jac-area-readout');
    const readoutDet = document.getElementById('sim-jac-det-readout');
    const baseArea = (du * dv).toFixed(3);
    const transArea = (du * dv * jacDetVal).toFixed(3);

    if (readoutArea) readoutArea.textContent = `${baseArea} → ${transArea}`;
    if (readoutDet) readoutDet.textContent = jacDetVal.toFixed(3);
  }

  function drawArrow(ctx, fromX, fromY, toX, toY, color, label) {
    const headLen = 8;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(label, toX + 5, toY - 5);
  }

})();
