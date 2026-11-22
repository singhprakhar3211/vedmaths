(function () {
  var WHATSAPP = "917289075357";

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // In-page links: scroll to the section without putting "#section" in the URL
  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest('a[href^="#"]');
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var id = link.getAttribute("href").slice(1);
    var target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (!target.hasAttribute("tabindex") && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) {
      target.setAttribute("tabindex", "-1");
    }
    target.focus({ preventScroll: true });
  });

  // If someone opens an old link like /#courses, keep the scroll but clean the URL
  if (location.hash && window.history && history.replaceState) {
    history.replaceState(null, "", location.pathname + location.search);
  }

  // "Enquire" links on courses pre-select the course in the form
  var form = document.getElementById("enquiry");
  document.querySelectorAll("[data-course]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (form) form.elements["course"].value =link.getAttribute("data-course");
    });
  });

  // Problem of the week
  var potwBtn = document.getElementById("potw-btn");
  var potwSol = document.getElementById("potw-sol");
  if (potwBtn && potwSol) {
    potwBtn.addEventListener("click", function () {
      var show = potwSol.hidden;
      potwSol.hidden = !show;
      potwBtn.setAttribute("aria-expanded", show ? "true" : "false");
      potwBtn.textContent = show ? "Hide solution" : "Show solution";
    });
  }

  // Enquiry form -> opens WhatsApp with a ready message
  if (form) {
    var err = document.getElementById("form-err");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      var name = f["name"].value.trim();
      var cls = f["cls"].value;
      var course = f["course"].value;
      var school = f["school"].value.trim();

      if (!name || !cls || !course) {
        err.textContent = "Please fill name, class and course.";
        return;
      }
      if (!f["consent"].checked) {
        err.textContent = "Please tick the box so Ved Sir can contact you.";
        return;
      }
      err.textContent = "";

      var msg =
        "Namaste Ved Sir,\n" +
        "Mujhe free demo class chahiye.\n\n" +
        "Student: " + name + "\n" +
        "Class: " + cls + "\n" +
        "Course: " + course +
        (school ? "\nSchool: " + school : "");

      window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
