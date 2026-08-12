// ===========================================================
// Docinho da Tia Lúcia — script.js
// Menu mobile + animação de revelar seções ao rolar a página
// ===========================================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Menu mobile (hambúrguer) ----
  var botaoMenu = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-principal');

  if (botaoMenu && nav) {
    botaoMenu.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberto');
      botaoMenu.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    // Fecha o menu ao clicar em um link (útil em telas pequenas)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('aberto');
        botaoMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Revelar elementos suavemente ao rolar a página ----
  var elementosParaRevelar = document.querySelectorAll('.revelar');

  if ('IntersectionObserver' in window && elementosParaRevelar.length) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15 });

    elementosParaRevelar.forEach(function (el) {
      observador.observe(el);
    });
  } else {
    // Navegadores sem suporte: apenas mostra tudo
    elementosParaRevelar.forEach(function (el) {
      el.classList.add('visivel');
    });
  }

  // ---- Filtro de categorias no catálogo (produtos.html) ----
  var botoesFiltro = document.querySelectorAll('.filtro-categorias button');
  var categorias = document.querySelectorAll('.categoria-produtos');

  if (botoesFiltro.length && categorias.length) {
    botoesFiltro.forEach(function (botao) {
      botao.addEventListener('click', function () {
        var alvo = botao.getAttribute('data-categoria');

        botoesFiltro.forEach(function (b) { b.classList.remove('ativo'); });
        botao.classList.add('ativo');

        categorias.forEach(function (secao) {
          if (alvo === 'todos' || secao.getAttribute('data-categoria') === alvo) {
            secao.style.display = '';
          } else {
            secao.style.display = 'none';
          }
        });

        // Rola suavemente até o início da lista ao filtrar
        var listaProdutos = document.querySelector('.lista-produtos');
        if (listaProdutos) {
          listaProdutos.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

});
