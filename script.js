// Linhas laranja da seção "Está perdido?" scroll
(function () {
  var perdido = document.querySelector('.perdido');
  if (!perdido) return;
  var maxTop = 300, maxBottom = 450; // avanço máximo (px) para dentro do conteúdo
  function update() {
    var rect = perdido.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    // 0 quando a seção começa a entrar pela base; 1 quando seu topo chega ao topo da tela
    var progress = (vh - rect.top) / (vh * 0.85);
    progress = Math.max(0, Math.min(1, progress));
    perdido.style.setProperty('--ext-top', (maxTop * progress) + 'px');
    perdido.style.setProperty('--ext-bottom', (maxBottom * progress) + 'px');
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// Entregaveis scroll
(function () {
  var itens = document.querySelectorAll('.entrega-sec .entregavel');
  if (!itens.length) return;
  // sem suporte a IntersectionObserver: mostra tudo
  if (!('IntersectionObserver' in window)) {
    itens.forEach(function (el) { el.classList.add('reveal'); });
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  itens.forEach(function (el) { obs.observe(el); });
})();

// Carrossel de jornais — rolagem automática lenta e contínua
(function () {
  var track = document.querySelector('.jornais-track');
  if (!track) return;
  // respeita quem prefere menos movimento: deixa estático (vira grade via CSS)
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var originais = Array.prototype.slice.call(track.children);
  if (!originais.length) return;

  // duplica os itens para o loop ser perfeito (translateX -50%)
  originais.forEach(function (el) {
    var clone = el.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  // velocidade constante: ~14s por jornal (quanto mais jornais, mais tempo de volta)
  var segundosPorItem = 14;
  track.style.animationDuration = (originais.length * segundosPorItem) + 's';
})();

// Revelação ao trocar de section (fade + subir)
(function () {
  var secs = document.querySelectorAll('section');
  if (!secs.length) return;
  // sem suporte a IntersectionObserver: deixa tudo visível
  if (!('IntersectionObserver' in window)) return;
  secs.forEach(function (s) { s.classList.add('reveal-init'); });
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  secs.forEach(function (s) { obs.observe(s); });
})();

// Autoridade cascata
(function () {
  var autor = document.querySelector('.autor');
  if (!autor) return;
  if (!('IntersectionObserver' in window)) {
    autor.classList.add('reveal');
    return;
  }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  obs.observe(autor);
})();
