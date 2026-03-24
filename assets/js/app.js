(function () {
  "use strict";

  var ROUTES = {
    "/": "view-home",
    "/about": "view-about",
    "/experience": "view-experience",
    "/skills": "view-skills",
    "/education": "view-education",
    "/projects": "view-projects",
    "/contact": "view-contact",
  };

  var TITLE_SUFFIX = "Bijit Biswas — SDET & Test Automation";
  var VIEW_TITLES = {
    "view-home": "Home",
    "view-about": "About",
    "view-experience": "Experience",
    "view-skills": "Skills",
    "view-education": "Education",
    "view-projects": "Projects",
    "view-contact": "Contact",
  };

  function normalizeHash(hash) {
    if (!hash || hash === "#") {
      return "/";
    }
    var path = hash.replace(/^#/, "");
    if (path.charAt(0) !== "/") {
      path = "/" + path;
    }
    if (path.length > 1 && path.charAt(path.length - 1) === "/") {
      path = path.slice(0, -1);
    }
    return path;
  }

  function getRouteFromLocation() {
    return normalizeHash(window.location.hash);
  }

  function showRoute(path) {
    var viewId = ROUTES[path];
    if (!viewId) {
      path = "/";
      viewId = ROUTES[path];
    }

    var views = document.querySelectorAll(".view");
    var i;
    for (i = 0; i < views.length; i++) {
      var el = views[i];
      var isActive = el.id === viewId;
      el.classList.toggle("active", isActive);
      el.setAttribute("aria-hidden", isActive ? "false" : "true");
    }

    var links = document.querySelectorAll(".nav-list a[data-route]");
    for (i = 0; i < links.length; i++) {
      var link = links[i];
      var route = link.getAttribute("data-route");
      if (route === path) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    }

    var segment = VIEW_TITLES[viewId];
    document.title = segment === "Home" ? TITLE_SUFFIX : segment + " · " + TITLE_SUFFIX;
  }

  function openNav(open) {
    var nav = document.getElementById("site-nav");
    var toggle = document.querySelector(".nav-toggle");
    if (!nav || !toggle) {
      return;
    }
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function onHashChange() {
    var path = getRouteFromLocation();
    if (!ROUTES[path]) {
      window.location.hash = "#/";
      return;
    }
    showRoute(path);
    window.scrollTo(0, 0);
    openNav(false);
  }

  function init() {
    var yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    var toggle = document.querySelector(".nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var nav = document.getElementById("site-nav");
        var isOpen = nav && nav.classList.contains("is-open");
        openNav(!isOpen);
      });
    }

    document.querySelectorAll(".nav-list a[data-route]").forEach(function (anchor) {
      anchor.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          openNav(false);
        }
      });
    });

    window.addEventListener("hashchange", onHashChange);

    if (!window.location.hash || window.location.hash === "#") {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search + "#/"
      );
    }

    var initial = getRouteFromLocation();
    if (!ROUTES[initial]) {
      window.location.hash = "#/";
      return;
    }
    showRoute(initial);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
