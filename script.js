(function () {
  var EMAIL = "advancedvisualwork@gmail.com";
  var SUBJECT = "Orçamento de site";
  var BODY = "Olá, AVW! Tenho um negócio no segmento ____ e gostaria de um orçamento. Se possível, podemos marcar uma reunião.\n\nMeu nome: ____\nTelefone: ____";
  var q = encodeURIComponent;
  var mailto = "mailto:" + EMAIL + "?subject=" + q(SUBJECT) + "&body=" + q(BODY);
  var gmail = "https://mail.google.com/mail/?view=cm&fs=1&to=" + EMAIL + "&su=" + q(SUBJECT) + "&body=" + q(BODY);
  var isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

  // CTA de e-mail: mailto no celular, compose do Gmail no desktop
  document.querySelectorAll("[data-mail-cta]").forEach(function (a) {
    a.href = mailto;
    a.addEventListener("click", function (e) {
      if (isMobile) return;
      e.preventDefault();
      window.open(gmail, "_blank", "noopener");
    });
  });

  // Copiar e-mail
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    var original = b.textContent;
    b.addEventListener("click", function () {
      (navigator.clipboard ? navigator.clipboard.writeText(EMAIL) : Promise.reject())
        .then(function () { b.textContent = "E-mail copiado"; setTimeout(function () { b.textContent = original; }, 2000); })
        .catch(function () { window.prompt("Copie o e-mail:", EMAIL); });
    });
  });

  // Menu mobile
  var btn = document.getElementById("menuBtn"), menu = document.getElementById("menu");
  function setMenu(open) { menu.hidden = !open; btn.setAttribute("aria-expanded", open); btn.textContent = open ? "Fechar" : "Menu"; }
  btn.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  document.getElementById("year").textContent = new Date().getFullYear();
})();
