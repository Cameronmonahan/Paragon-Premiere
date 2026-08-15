// Paragon Premiere — shared interactions

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
      var expanded = document.body.classList.contains('nav-open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    document.querySelectorAll('nav.main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('open');
      });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Footer year
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Membership tier pre-select on contact page (via query string)
  var params = new URLSearchParams(window.location.search);
  var tierParam = params.get('tier');
  if (tierParam) {
    var select = document.querySelector('#interest');
    if (select) {
      Array.from(select.options).forEach(function (opt) {
        if (opt.value.toLowerCase() === tierParam.toLowerCase()) {
          select.value = opt.value;
        }
      });
    }
  }

  // Simple client-side form handling (no backend wired up yet)
  var form = document.querySelector('.js-contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var confirmation = document.querySelector('.js-form-confirm');
      form.style.display = 'none';
      if (confirmation) confirmation.style.display = 'block';
    });
  }
});
