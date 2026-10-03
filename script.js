/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuBtn.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuBtn.textContent = isOpen ? "×" : "☰";

  });


  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

      menuBtn.textContent = "☰";

    });

  });

}


/* =====================================================
   REVEAL ON SCROLL
===================================================== */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =====================================================
   DASHBOARD LIGHTBOX
===================================================== */

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxClose =
  document.getElementById("lightboxClose");


const dashboardImages =
  document.querySelectorAll(".dashboard-image");


dashboardImages.forEach(card => {

  card.addEventListener("click", () => {

    const image =
      card.getAttribute("data-image");

    if (!image) return;

    lightboxImage.src = image;

    lightbox.classList.add("active");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "no-scroll"
    );

  });

});


function closeLightbox() {

  lightbox.classList.remove("active");

  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );

  lightboxImage.src = "";

  document.body.classList.remove(
    "no-scroll"
  );

}


if (lightboxClose) {

  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );

}


if (lightbox) {

  lightbox.addEventListener(
    "click",
    event => {

      if (event.target === lightbox) {

        closeLightbox();

      }

    }
  );

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      if (
        lightbox &&
        lightbox.classList.contains("active")
      ) {

        closeLightbox();

      }

      if (
        navLinks &&
        navLinks.classList.contains("open")
      ) {

        navLinks.classList.remove("open");

        menuBtn.setAttribute(
          "aria-expanded",
          "false"
        );

        menuBtn.textContent = "☰";

      }

    }

  }
);


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
  document.querySelectorAll("main section[id]");

const navItems =
  document.querySelectorAll(".nav-links a");


const activeSectionObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          navItems.forEach(link => {

            link.classList.remove("active");

          });


          const activeLink =
            document.querySelector(
              `.nav-links a[href="#${entry.target.id}"]`
            );


          if (activeLink) {

            activeLink.classList.add("active");

          }

        }

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );


sections.forEach(section => {

  activeSectionObserver.observe(section);

});
