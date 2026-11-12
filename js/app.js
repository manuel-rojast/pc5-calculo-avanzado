/**
 * APLICACIÓN PRINCIPAL - CÁLCULO AVANZADO PC5 (CM2A1 - UNI)
 * Control de navegación, gestión de memoria WebGL, renderizado dinámico y KaTeX por sección
 */

document.addEventListener('DOMContentLoaded', () => {
  // Estado global de la interfaz
  const state = {
    currentTopic: 't1',
    currentLevels: {
      't1': '0',
      't2': '0',
      't3': '0',
      't4': '0',
      't5': '0'
    },
    initializedVisualizers: new Set(),
    renderedMathSections: new Set()
  };

  // Inicializar pestañas de temas principales
  const topicTabButtons = document.querySelectorAll('.topic-tab-btn');
  const topicSections = document.querySelectorAll('.topic-section');

  function switchTopic(topicId) {
    state.currentTopic = topicId;

    // Actualizar botones de navegación
    topicTabButtons.forEach(btn => {
      if (btn.dataset.topic === topicId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Mostrar sección correspondiente
    let activeSectionEl = null;
    topicSections.forEach(sec => {
      if (sec.id === `section-${topicId}`) {
        sec.classList.add('active');
        activeSectionEl = sec;
      } else {
        sec.classList.remove('active');
      }
    });

    // Liberar contextos WebGL de pestañas inactivas y gestionar el visor del tema actual
    if (window.VisualizerManager) {
      window.VisualizerManager.onTopicSwitch(topicId);
    }

    // Inicializar visualizador 3D si no ha sido registrado aún
    initVisualizerForTopic(topicId);

    // Renderizar ejercicios del tema
    if (topicId !== 'tr' && topicId !== 'glosario') {
      renderExercises(topicId);
    }

    // Renderizar KaTeX únicamente en la sección activa si aún no fue procesada
    if (activeSectionEl && !state.renderedMathSections.has(topicId)) {
      renderMath(activeSectionEl);
      state.renderedMathSections.add(topicId);
    }
  }

  topicTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTopic(btn.dataset.topic);
    });
  });

  // Inicialización bajo demanda de los visores 3D
  function initVisualizerForTopic(topicId) {
    if (state.initializedVisualizers.has(topicId) || topicId === 'glosario') return;

    setTimeout(() => {
      try {
        if (topicId === 't1' && window.initTopic1Visualizer) {
          window.initTopic1Visualizer();
          state.initializedVisualizers.add('t1');
        } else if (topicId === 't2' && window.initTopic2Visualizer) {
          window.initTopic2Visualizer();
          state.initializedVisualizers.add('t2');
        } else if (topicId === 't3' && window.initTopic3Visualizer) {
          window.initTopic3Visualizer();
          state.initializedVisualizers.add('t3');
        } else if (topicId === 't4' && window.initTopic4Visualizer) {
          window.initTopic4Visualizer();
          state.initializedVisualizers.add('t4');
        } else if (topicId === 't5' && window.initTopic5Visualizer) {
          window.initTopic5Visualizer();
          state.initializedVisualizers.add('t5');
        } else if (topicId === 'tr' && window.initRetos2026Module) {
          window.initRetos2026Module();
          state.initializedVisualizers.add('tr');
        }
      } catch (e) {
        console.warn(`Error inicializando visor 3D para ${topicId}:`, e);
      }
    }, 80);
  }

  // Renderizado dinámico de tarjetas de ejercicios
  function renderExercises(topicId) {
    const container = document.getElementById(`exercises-container-${topicId}`);
    if (!container) return;

    const currentLevel = state.currentLevels[topicId] || '1';
    const exercises = window.EXERCISES_DATA ? window.EXERCISES_DATA.filter(ex => ex.topic === topicId) : [];
    
    const filtered = currentLevel === 'all' 
      ? exercises 
      : exercises.filter(ex => String(ex.level) === String(currentLevel));

    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `<div class="exercise-card"><p>No hay ejercicios disponibles para este filtro.</p></div>`;
      return;
    }

    filtered.forEach(ex => {
      const card = document.createElement('div');
      card.className = 'exercise-card';
      card.id = `exercise-${ex.id}`;

      // Etiqueta de examen UNI si corresponde
      let examBadge = '';
      if (ex.title.includes('2026') || ex.title.includes('2025') || ex.title.includes('2024')) {
        examBadge = `<span class="exam-tag">🏛️ Examen UNI</span>`;
      }

      card.innerHTML = `
        <div class="exercise-card-header">
          <div class="exercise-badges">
            <span class="level-badge badge-l${ex.level}">Nivel ${ex.level}</span>
            ${examBadge}
            <span style="font-size:0.8rem; color:#94a3b8; font-weight:600;">#${ex.id}</span>
          </div>
          <h3 class="exercise-title">${ex.title}</h3>
        </div>

        <div class="exercise-statement">
          ${formatMathText(ex.statement)}
        </div>

        <div class="exercise-actions">
          <button class="btn-action btn-hint" data-ex-id="${ex.id}">
            💡 Pista Conceptual
          </button>
          <button class="btn-action btn-solution" data-ex-id="${ex.id}">
            📝 Ver Solución Paso a Paso
          </button>
        </div>

        <div class="hint-box" id="hint-${ex.id}">
          <strong>Pista:</strong> ${formatMathText(ex.hint)}
        </div>

        <div class="solution-box" id="solution-${ex.id}">
          <h4 style="color:#38bdf8; margin-bottom:0.75rem; font-size:1rem;">Desarrollo Riguroso:</h4>
          <div>${formatMathText(ex.solution)}</div>
          
          <div class="traps-box">
            <div class="traps-title">⚠️ Errores Frecuentes y Trampas UNI:</div>
            <div>${formatMathText(ex.commonMistakes)}</div>
          </div>
        </div>
      `;

      // Event listeners para botones de pista y solución
      const hintBtn = card.querySelector('.btn-hint');
      const hintBox = card.querySelector('.hint-box');
      hintBtn.addEventListener('click', () => {
        hintBox.classList.toggle('active');
        hintBtn.classList.toggle('active');
      });

      const solBtn = card.querySelector('.btn-solution');
      const solBox = card.querySelector('.solution-box');
      solBtn.addEventListener('click', () => {
        solBox.classList.toggle('active');
        solBtn.classList.toggle('active');
        if (solBox.classList.contains('active')) {
          renderMath(solBox);
        }
      });

      container.appendChild(card);
    });

    renderMath(container);
  }

  // Formatear saltos de línea y texto plano a HTML
  function formatMathText(str) {
    if (!str) return '';
    return str
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  }

  // Renderizar fórmulas KaTeX de forma segura y acotada al contenedor
  function renderMath(targetElement) {
    const el = targetElement || document.body;
    if (window.renderMathInElement) {
      window.renderMathInElement(el, {
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

  // Configurar selectores de nivel (Pestañas de Nivel 0 a 5)
  document.querySelectorAll('.level-tabs').forEach(tabGroup => {
    const topicId = tabGroup.dataset.topic;
    tabGroup.querySelectorAll('.level-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        tabGroup.querySelectorAll('.level-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentLevels[topicId] = btn.dataset.level;
        renderExercises(topicId);
      });
    });
  });

  // Inicializar módulo de retos 2026-2 y primer tema
  if (window.initRetos2026Module) {
    window.initRetos2026Module();
  }
  const navRetosLink = document.getElementById('nav-link-retos');
  if (navRetosLink) {
    navRetosLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchTopic('tr');
      const temarioEl = document.getElementById('temario');
      if (temarioEl) temarioEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ============================================================================
  // INTEGRACIÓN DEL GLOSARIO DE SÍMBOLOS Y DICCIONARIO MATEMÁTICO PC5
  // ============================================================================

  // Crear nodo DOM de una tarjeta de glosario
  function createGlossaryCard(item, isSubtopic) {
    const card = document.createElement('article');
    card.className = 'glossary-card';
    card.dataset.id = item.id;
    card.dataset.topic = item.topic;

    const topicShorts = {
      t1: 'Subtema 1: Regiones & Fubini',
      t2: 'Subtema 2: Variables & Polares',
      t3: 'Subtema 3: Triples en R³',
      t4: 'Subtema 4: Cilíndricas & Esféricas',
      t5: 'Subtema 5: Rⁿ & Aplicaciones'
    };
    const topicLabel = topicShorts[item.topic] || item.topic.toUpperCase();

    // Texto normalizado para el buscador en tiempo real
    const searchText = [
      item.symbol,
      item.name,
      item.reading,
      item.simple,
      item.action,
      item.trap,
      item.topic,
      topicLabel
    ].join(' ').toLowerCase();
    card.dataset.searchText = searchText;

    card.innerHTML = `
      <div class="glossary-card-top">
        <span class="glossary-topic-pill pill-${item.topic}">${topicLabel}</span>
        <span class="glossary-card-id">#${item.id}</span>
      </div>
      <div class="glossary-symbol-banner">
        <div class="glossary-symbol-math">${item.symbol}</div>
      </div>
      <h4 class="glossary-card-title">${item.name}</h4>

      <div class="glossary-detail-section reading-section">
        <div class="glossary-detail-label">🗣️ Cómo se lee en clase / examen:</div>
        <div class="glossary-detail-text">«${item.reading}»</div>
      </div>

      <div class="glossary-detail-section simple-section">
        <div class="glossary-detail-label">💡 Significado intuitivo:</div>
        <div class="glossary-detail-text">${item.simple}</div>
      </div>

      <div class="glossary-detail-section action-section">
        <div class="glossary-detail-label">✍️ Qué escribir en tu hoja de examen UNI:</div>
        <div class="glossary-detail-text">${item.action}</div>
      </div>

      <div class="glossary-detail-section trap-section">
        <div class="glossary-detail-label">⚠️ Trampa frecuente / Error clásico UNI:</div>
        <div class="glossary-detail-text">${item.trap}</div>
      </div>
    `;

    return card;
  }

  // Inicializar Glosario Maestro Universal
  function initMasterGlossary() {
    const container = document.getElementById('glossary-cards-container');
    if (!container || !window.PC5_GLOSSARY_DATA) return;

    const data = window.PC5_GLOSSARY_DATA;
    const searchInput = document.getElementById('glossary-search-input');
    const clearBtn = document.getElementById('glossary-search-clear');
    const filterBtns = document.querySelectorAll('#glossary-topic-filters .glossary-pill-btn');
    const visibleCountEl = document.getElementById('glossary-visible-count');
    const totalCountEl = document.getElementById('glossary-total-count');
    const emptyStateEl = document.getElementById('glossary-empty-state');
    const resetBtn = document.getElementById('btn-reset-glossary-search');

    if (totalCountEl) totalCountEl.textContent = data.length;

    // Actualizar badges numéricos de cada subtema
    if (window.PC5_GLOSSARY_BY_TOPIC) {
      ['t1', 't2', 't3', 't4', 't5'].forEach(t => {
        const cEl = document.getElementById(`count-${t}`);
        if (cEl && window.PC5_GLOSSARY_BY_TOPIC[t]) {
          cEl.textContent = window.PC5_GLOSSARY_BY_TOPIC[t].length;
        }
      });
      const cAll = document.getElementById('count-all');
      if (cAll) cAll.textContent = data.length;
    }

    container.innerHTML = '';
    const cardNodes = [];
    data.forEach(item => {
      const card = createGlossaryCard(item, false);
      container.appendChild(card);
      cardNodes.push({
        element: card,
        topic: item.topic,
        text: card.dataset.searchText
      });
    });

    // Renderizar KaTeX acotado a la grilla
    renderMath(container);

    let activeTopicFilter = 'all';

    function filterMasterCards() {
      const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
      let visibleCount = 0;

      cardNodes.forEach(itemObj => {
        const matchesTopic = (activeTopicFilter === 'all' || itemObj.topic === activeTopicFilter);
        const matchesQuery = !query || itemObj.text.includes(query);

        if (matchesTopic && matchesQuery) {
          itemObj.element.style.display = '';
          visibleCount++;
        } else {
          itemObj.element.style.display = 'none';
        }
      });

      if (visibleCountEl) visibleCountEl.textContent = visibleCount;
      if (emptyStateEl) emptyStateEl.style.display = visibleCount === 0 ? 'block' : 'none';
      if (clearBtn) clearBtn.style.display = query.length > 0 ? 'flex' : 'none';
    }

    if (searchInput) {
      searchInput.addEventListener('input', filterMasterCards);
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        filterMasterCards();
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTopicFilter = btn.dataset.filter || 'all';
        filterMasterCards();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        activeTopicFilter = 'all';
        filterBtns.forEach(b => {
          if (b.dataset.filter === 'all') b.classList.add('active');
          else b.classList.remove('active');
        });
        filterMasterCards();
      });
    }

    filterMasterCards();
  }

  // Inicializar Glosarios Interactivos por Subtema (t1 - t5)
  function initSubtopicGlossaries() {
    if (!window.PC5_GLOSSARY_DATA) return;

    ['t1', 't2', 't3', 't4', 't5'].forEach(topicId => {
      const container = document.getElementById(`subtopic-glossary-cards-${topicId}`);
      if (!container) return;

      const subtopicData = window.PC5_GLOSSARY_DATA.filter(item => item.topic === topicId);
      container.innerHTML = '';

      const cardNodes = [];
      subtopicData.forEach(item => {
        const card = createGlossaryCard(item, true);
        container.appendChild(card);
        cardNodes.push({
          element: card,
          text: card.dataset.searchText
        });
      });

      renderMath(container);

      // Buscador específico del subtema
      const searchInput = document.querySelector(`.subtopic-search-input[data-topic="${topicId}"]`);
      const clearBtn = document.querySelector(`.subtopic-search-clear[data-topic="${topicId}"]`);
      const counterEl = document.querySelector(`#subtopic-counter-${topicId} .subtopic-count-val`);

      function filterSubtopic() {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        let visibleCount = 0;

        cardNodes.forEach(itemObj => {
          const match = !query || itemObj.text.includes(query);
          itemObj.element.style.display = match ? '' : 'none';
          if (match) visibleCount++;
        });

        if (counterEl) counterEl.textContent = visibleCount;
        if (clearBtn) clearBtn.style.display = query.length > 0 ? 'inline-block' : 'none';
      }

      if (searchInput) {
        searchInput.addEventListener('input', filterSubtopic);
      }
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
          }
          filterSubtopic();
        });
      }

      // Botón para alternar modo compacto o detallado en el subtema
      const toggleViewBtn = document.querySelector(`.btn-toggle-subtopic-view[data-topic="${topicId}"]`);
      if (toggleViewBtn) {
        toggleViewBtn.addEventListener('click', () => {
          container.classList.toggle('compact-mode');
          const isCompact = container.classList.contains('compact-mode');
          const label = toggleViewBtn.querySelector('.view-mode-label');
          if (label) {
            label.textContent = isCompact ? 'Vista Detallada' : 'Vista Compacta';
          }
        });
      }
    });
  }

  // Inicializar glosarios
  initMasterGlossary();
  initSubtopicGlossaries();

  // Enlace directo desde el navbar superior al glosario
  const navGlossaryLink = document.getElementById('nav-link-glosario');
  if (navGlossaryLink) {
    navGlossaryLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchTopic('glosario');
      const temarioEl = document.getElementById('temario');
      if (temarioEl) temarioEl.scrollIntoView({ behavior: 'smooth' });
    });
  }
  switchTopic('t1');
});
