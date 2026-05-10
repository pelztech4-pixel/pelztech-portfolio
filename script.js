const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

const reveals = document.querySelectorAll(".reveal");

function revealSections() {
  reveals.forEach((section) => {
    const windowHeight = window.innerHeight;
    const revealTop = section.getBoundingClientRect().top;

    if (revealTop < windowHeight - 100) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealSections);
revealSections();

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn?.querySelector(".btn-text");

    submitBtn?.classList.add("loading");
    if (btnText) btnText.textContent = "Sending...";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        contactForm.reset();
        window.location.href = "thanks.html";
      } else {
        alert("Message failed to send. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your internet and try again.");
    } finally {
      submitBtn?.classList.remove("loading");
      if (btnText) btnText.textContent = "Send Message";
    }
  });
}

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function setActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
setActiveNav();


const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {
  if (!scrollProgress) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;

  scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);
updateScrollProgress();