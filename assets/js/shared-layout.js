document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".site-navigation")) {
    document.body.classList.add("has-sticky-site-nav");
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const detailPageParents = {
    "artikel-detail.html": "artikel.html",
    "tutorial-detail.html": "tutorial.html"
  };
  const activePage = detailPageParents[currentPage] || currentPage;

  document.querySelectorAll(".site-nav-link, .navigation .nav-link").forEach((link) => {
    const linkPage = new URL(link.href, window.location.href).pathname.split("/").pop();
    const isActive = linkPage === activePage;
    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const menuToggle = document.querySelector(".site-menu-toggle");
  const menu = document.querySelector(".site-nav-menu");

  if (!menuToggle || !menu) {
    return;
  }

  // function closeMenu() {
  //   menu.classList.remove("show");
  //   menuToggle.setAttribute("aria-expanded", "false");
  //   const icon = menuToggle.querySelector("i");
  //   if (icon) {
  //     icon.classList.add("fa-bars");
  //     icon.classList.remove("fa-xmark");
  //   }
  // }

  // menuToggle.addEventListener("click", () => {
  //   const isOpen = menu.classList.toggle("show");
  //   menuToggle.setAttribute("aria-expanded", String(isOpen));
  //   const icon = menuToggle.querySelector("i");
  //   if (icon) {
  //     icon.classList.toggle("fa-bars", !isOpen);
  //     icon.classList.toggle("fa-xmark", isOpen);
  //   }
  // });

  // menu.querySelectorAll("a").forEach((link) => {
  //   link.addEventListener("click", closeMenu);
  // });
});

document.addEventListener("DOMContentLoaded", () => {
  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  // di simpan didalam const dibawah ini 
  // .gallery-card, 
  const revealTargets = document.querySelectorAll(
    ".article-page-heading, .article-card, .profile-about, " +
    ".profile-vision, .profile-teachers, .profile-programs, .contact-information, " +
    ".form-section, .map-section, .sidebar-card, .footer-column"
  );

  if (!revealTargets.length) {
    return;
  }

  // const observer = new IntersectionObserver((entries, currentObserver) => {
  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       entry.target.classList.add("is-visible");
  //       currentObserver.unobserve(entry.target);
  //     }
  //   });
  // }, {
  //   threshold: 0.08,
  //   rootMargin: "0px 0px -24px 0px"
  // });

  // revealTargets.forEach((target) => {
  //   target.classList.add("scroll-reveal");
  //   observer.observe(target);
  // });
});
