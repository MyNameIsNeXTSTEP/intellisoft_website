// IntelliSoft Landing Page JavaScript

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme() {
  return localStorage.getItem("theme");
}

function setStoredTheme(theme) {
  localStorage.setItem("theme", theme);
}

function getPreferredTheme() {
  const storedTheme = getStoredTheme();
  return storedTheme || getSystemTheme();
}

function setTheme(theme) {
  if (theme === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
  updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
  const actualTheme = theme === "auto" ? getSystemTheme() : theme;
  
  // Desktop icons
  const lightIcon = document.getElementById("theme-icon-light");
  const darkIcon = document.getElementById("theme-icon-dark");
  
  // Mobile icons
  const lightIconMobile = document.getElementById("theme-icon-light-mobile");
  const darkIconMobile = document.getElementById("theme-icon-dark-mobile");
  
  if (actualTheme === "dark") {
    lightIcon?.classList.add("hidden");
    darkIcon?.classList.remove("hidden");
    lightIconMobile?.classList.add("hidden");
    darkIconMobile?.classList.remove("hidden");
  } else {
    lightIcon?.classList.remove("hidden");
    darkIcon?.classList.add("hidden");
    lightIconMobile?.classList.remove("hidden");
    darkIconMobile?.classList.add("hidden");
  }
}

function toggleTheme() {
  const currentTheme = getStoredTheme() || getSystemTheme();
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  setTheme(newTheme);
  setStoredTheme(newTheme);
  
  // Track theme change
  console.log("Theme changed to:", newTheme);
}

// Initialize theme on page load
function initializeTheme() {
  const preferredTheme = getPreferredTheme();
  setTheme(preferredTheme);
  
  // Listen for system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!getStoredTheme()) {
      setTheme(e.matches ? "dark" : "light");
    }
  });
}

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme first
  initializeTheme();

  // Theme switcher functionality
  const themeSwitcher = document.getElementById("theme-switcher");
  const themeSwitcherMobile = document.getElementById("theme-switcher-mobile");

  if (themeSwitcher) {
    themeSwitcher.addEventListener("click", toggleTheme);
  }

  if (themeSwitcherMobile) {
    themeSwitcherMobile.addEventListener("click", toggleTheme);
  }

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");

      // Add animation classes
      if (mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hide");
        mobileMenu.classList.remove("show");
      } else {
        mobileMenu.classList.add("show");
        mobileMenu.classList.remove("hide");
      }
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Check if it's an anchor link
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });

          // Close mobile menu if open
          if (!mobileMenu.classList.contains("hidden")) {
            mobileMenu.classList.add("hidden");
          }
        }
      }
    });
  });

  // CTA Button functionality
  const ctaButton = document.getElementById("cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      // Scroll to contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const offsetTop = contactSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }

      // Add some visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  }

  // Contact form functionality
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !message) {
        showNotification("Please fill in all fields.", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      // Show loading state
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.classList.add("loading");
      submitButton.disabled = true;

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Reset form
        this.reset();

        // Reset button
        submitButton.classList.remove("loading");
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        // Show success message
        showNotification(
          "Thank you for your message! We'll get back to you soon.",
          "success"
        );

        // Log form data (in real app, send to server)
        console.log("Form submitted:", { name, email, message });
      }, 2000);
    });
  }

  // Scroll-based animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
      }
    });
  }, observerOptions);

  // Observe sections for animation
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Navbar background change on scroll
  const navbar = document.querySelector("nav");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("bg-white", "shadow-lg");
        navbar.classList.remove("bg-transparent");
      } else {
        navbar.classList.remove("bg-white", "shadow-lg");
        navbar.classList.add("bg-transparent");
      }
    });
  }

  // Add interactive hover effects to service cards
  const serviceCards = document.querySelectorAll("#services .bg-white");
  serviceCards.forEach((card) => {
    card.classList.add("hover-card");

    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Hero animation sequence: zoom title first, then typewriter on subtitle
  const heroTitle = document.querySelector("#home h2");
  const heroSubtitle1 = document.getElementById("hero-subtitle-1");
  const heroSubtitle2 = document.getElementById("hero-subtitle-2");
  
  if (heroTitle && heroSubtitle1) {
    // Store original subtitle text and clear it for typewriter effect
    const subtitleText = heroSubtitle1.textContent;
    heroSubtitle1.textContent = "";
    // Hide subtitles initially  
    if (heroSubtitle1) heroSubtitle1.style.opacity = "0";
    if (heroSubtitle2) heroSubtitle2.style.opacity = "0";
    if (ctaButton) ctaButton.style.opacity = "0";
    // Start with zoom effect on hero title
    setTimeout(() => {
      heroTitle.classList.add("animate-hero-zoom");
      // After zoom completes, start typewriter on first subtitle
      setTimeout(() => {
        heroTitle.classList.remove("animate-hero-zoom");
        // Show first subtitle and start typewriter effect
        heroSubtitle1.style.opacity = "1";
        let i = 0;
        const typeWriter = () => {
          if (i < subtitleText.length) {
            heroSubtitle1.textContent += subtitleText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
          } else {
            // Typewriter complete, fade in second subtitle
            setTimeout(() => {
              if (heroSubtitle2) {
                heroSubtitle2.classList.add("animate-fade-in");
                heroSubtitle2.style.opacity = "1";
              }
            }, 300);
            // Fade in CTA button after a delay
            setTimeout(() => {
              if (ctaButton) {
                ctaButton.classList.add("animate-fade-in");
                ctaButton.style.opacity = "1";
              }
            }, 600);
          }
        };
        // Start typewriter effect on subtitle
        setTimeout(typeWriter, 100);
        
      }, 600); // Wait for zoom animation to complete
    }, 1000); // Start zoom effect immediately
  }
  // Simple analytics tracking (replace with real analytics)
  trackPageView();
  trackButtonClicks();
});

// Utility function to show notifications
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg text-white max-w-sm transform transition-all duration-300 translate-x-full`;

  // Set background color based on type
  switch (type) {
    case "success":
      notification.classList.add("bg-green-500");
      break;
    case "error":
      notification.classList.add("bg-red-500");
      break;
    case "warning":
      notification.classList.add("bg-yellow-500");
      break;
    default:
      notification.classList.add("bg-blue-500");
  }

  notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Simple analytics functions
function trackPageView() {
  console.log("Page view tracked:", {
    url: window.location.href,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
  });
}

function trackButtonClicks() {
  const buttons = document.querySelectorAll("button, .nav-link");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      console.log("Button clicked:", {
        element: this.tagName,
        text: this.textContent.trim(),
        timestamp: new Date().toISOString(),
      });
    });
  });
}

// Utility function to get current viewport size
function getViewportSize() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight,
  };
}

// Utility function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Performance monitoring
window.addEventListener("load", function () {
  // Log performance metrics
  setTimeout(() => {
    const perfData = performance.timing;
    const loadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log("Page load time:", loadTime + "ms");
  }, 0);
});

// Handle offline/online status
window.addEventListener("online", function () {
  showNotification("Connection restored!", "success");
});

window.addEventListener("offline", function () {
  showNotification(
    "You are now offline. Some features may not work.",
    "warning"
  );
});

// Export functions for potential external use
window.IntelliSoft = {
  showNotification,
  trackPageView,
  getViewportSize,
  isInViewport,
  // Theme functions
  getSystemTheme,
  getStoredTheme,
  setStoredTheme,
  getPreferredTheme,
  setTheme,
  toggleTheme,
  updateThemeIcons,
};
