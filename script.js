// Mobile Menu Toggle
const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Animate hamburger to X
  const spans = mobileMenu.querySelectorAll("span");
  spans.forEach((span) => span.classList.toggle("active"));
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
      // Close mobile menu if open
      navLinks.classList.remove("active");
    }
  });
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    // Scrolling down
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scrolling up
    navbar.style.transform = "translateY(0)";
  }
  lastScroll = currentScroll;
});

// Form Submission Handler
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const formProps = Object.fromEntries(formData);

  // Basic form validation
  if (!validateForm(formProps)) {
    return;
  }

  // Show sending state
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  try {
    // Simulate form submission (replace with actual API endpoint)
    await simulateFormSubmission(formProps);

    // Show success message
    showNotification("Message sent successfully!", "success");
    contactForm.reset();
  } catch (error) {
    // Show error message
    showNotification("Failed to send message. Please try again.", "error");
  } finally {
    // Reset button state
    submitButton.textContent = originalButtonText;
    submitButton.disabled = false;
  }
});

// Form validation function
function validateForm(formData) {
  const { name, email, message } = formData;
  let isValid = true;

  // Name validation
  if (name.trim().length < 2) {
    showFieldError("name", "Name must be at least 2 characters long");
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFieldError("email", "Please enter a valid email address");
    isValid = false;
  }

  // Message validation
  if (message.trim().length < 10) {
    showFieldError("message", "Message must be at least 10 characters long");
    isValid = false;
  }

  return isValid;
}

// Show field error message
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "0.8rem";
  errorDiv.style.marginTop = "0.25rem";

  // Remove any existing error message
  const existingError = field.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  field.parentElement.appendChild(errorDiv);

  // Remove error message when user starts typing
  field.addEventListener(
    "input",
    () => {
      errorDiv.remove();
    },
    { once: true }
  );
}

// Show notification toast
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "1rem 2rem",
    borderRadius: "5px",
    backgroundColor: type === "success" ? "#4CAF50" : "#f44336",
    color: "white",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    zIndex: "1000",
    opacity: "0",
    transition: "opacity 0.3s ease",
  });

  document.body.appendChild(notification);

  // Fade in
  setTimeout(() => {
    notification.style.opacity = "1";
  }, 10);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Simulate form submission (replace with actual API call)
function simulateFormSubmission(formData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Form submitted:", formData);
      resolve();
    }, 1000);
  });
}

// Add scroll reveal animations
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll("section");

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px",
  };

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((element) => {
    // Set initial styles
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    revealOnScroll.observe(element);
  });
});

// Initialize skills animation
document.addEventListener("DOMContentLoaded", () => {
  const skillItems = document.querySelectorAll(".skill-category li");

  skillItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    // Stagger the animation
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, index * 100);
  });
});
