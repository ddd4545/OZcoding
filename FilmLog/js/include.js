/**
 * Simple script to include header and footer HTML components.
 */
function includeHTML() {
  const headerContainer = document.getElementById("header");
  const footerContainer = document.getElementById("footer");

  if (headerContainer) {
    fetch("components/header.html")
      .then((res) => res.text())
      .then((data) => {
        headerContainer.innerHTML = data;

        // Hide login button on auth pages
        const currentPage =
          window.location.pathname.split("/").pop() || "index.html";
        if (currentPage === "login.html" || currentPage === "signup.html") {
          const loginBtn = headerContainer.querySelector(".btn--black");
          if (loginBtn) loginBtn.style.display = "none";
        }

        // Highlight active link
        highlightActiveLink();
      });
  }

  if (footerContainer) {
    fetch("components/footer.html")
      .then((res) => res.text())
      .then((data) => {
        footerContainer.innerHTML = data;
      });
  }
}

function highlightActiveLink() {
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".header__nav-link");

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentPage) {
      link.classList.add("header__nav-link--active");
    } else {
      link.classList.remove("header__nav-link--active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML();

  // Index Page Hero Video Logic
  const heroVideo = document.getElementById("hero-video");
  if (heroVideo) {
    heroVideo.addEventListener("loadedmetadata", () => {
      heroVideo.currentTime = 92;
    });
  }

  // Smooth Scroll Initialization (Lenis)
  const lenisScript = document.createElement("script");
  lenisScript.src = "https://unpkg.com/@studio-freight/lenis@1.0.33/dist/lenis.min.js";
  lenisScript.onload = () => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  };
  document.head.appendChild(lenisScript);
});
