/* Al-Quran Research — Dynamic Typography & Visual Presentation Engine v1
 * Isolated presentation layer. Never mutates Quran/data/research logic.
 */
(function () {
  'use strict';

  const DEFAULTS = Object.freeze({
    enabled: true,
    animation: true,
    reducedMotion: false,
    size: 'medium',
    weight: 'normal',
    lineHeight: 1.7,
    letterSpacing: 0,
    theme: 'default'
  });

  const state = { ...DEFAULTS };

  const sizeMap = Object.freeze({
    small: '0.9rem',
    medium: '1rem',
    large: '1.2rem',
    xlarge: '1.45rem'
  });

  const animationMap = Object.freeze({
    none: 'none',
    'fade-in': 'aqr-fade-in',
    'slide-in': 'aqr-slide-in',
    'typewriter': 'aqr-typewriter',
    'word-reveal': 'aqr-word-reveal',
    highlight: 'aqr-highlight',
    pulse: 'aqr-pulse',
    'soft-glow': 'aqr-soft-glow',
    'scale-in': 'aqr-scale-in'
  });

  function set(partial) {
    Object.assign(state, partial || {});
    document.documentElement.dataset.aqrTypography =
      state.enabled ? 'on' : 'off';
    document.documentElement.dataset.aqrMotion =
      state.animation && !state.reducedMotion ? 'on' : 'off';
    document.documentElement.style.setProperty('--aqr-text-size', sizeMap[state.size] || sizeMap.medium);
    document.documentElement.style.setProperty('--aqr-text-weight', String(state.weight));
    document.documentElement.style.setProperty('--aqr-text-line-height', String(state.lineHeight));
    document.documentElement.style.setProperty('--aqr-text-letter-spacing', String(state.letterSpacing) + 'px');
    return get();
  }

  function get() {
    return { ...state };
  }

  function animate(element, type, options) {
    if (!element || !state.enabled || !state.animation || state.reducedMotion) return;
    const className = animationMap[type] || animationMap['fade-in'];
    element.classList.remove(...Object.values(animationMap));
    void element.offsetWidth;
    element.classList.add(className);
    if (options && options.duration) {
      element.style.setProperty('--aqr-animation-duration', String(options.duration));
    }
  }

  function applyContentMeta(element, meta) {
    if (!element) return;
    const m = meta || {};
    if (m.language) element.dataset.aqrLanguage = m.language;
    if (m.contentType) element.dataset.aqrContentType = m.contentType;
    if (m.importance) element.dataset.aqrImportance = m.importance;
    if (m.animation) animate(element, m.animation, m);
  }

  window.AQRTypography = Object.freeze({ set, get, animate, applyContentMeta });
  set({});
})();