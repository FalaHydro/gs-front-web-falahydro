// variaveis globais
let currentSlideIndex = 0
let currentQuestionIndex = 0
let userAnswers = []
let quizScore = 0

// Quiz questions
const quizQuestions = [
  {
    question: "Quantas inundações o Brasil registrou entre 1991 e 2022?",
    options: ["Mais de 15 mil", "Mais de 21 mil", "Mais de 30 mil", "Mais de 10 mil"],
    correct: 1,
  },
  {
    question: "Qual o percentual de perdas econômicas que as enchentes representam dos desastres naturais no Brasil?",
    options: ["40%", "50%", "60%", "70%"],
    correct: 2,
  },
  {
    question: "Quantos brasileiros vivem em áreas de risco segundo o IBGE?",
    options: ["Mais de 5 milhões", "Mais de 8 milhões", "Mais de 12 milhões", "Mais de 15 milhões"],
    correct: 1,
  },
  {
    question: "Com quantas horas de antecedência sistemas de IA podem prever enchentes?",
    options: ["24 horas", "36 horas", "48 horas", "72 horas"],
    correct: 2,
  },
  {
    question: "Qual tecnologia permite monitoramento mesmo durante tempestades e à noite?",
    options: ["Satélites ópticos", "Satélites SAR", "Drones", "Câmeras térmicas"],
    correct: 1,
  },
  {
    question: "Quantos municípios brasileiros não possuem mapeamento atualizado de áreas de risco?",
    options: ["Mais de 1.200", "Mais de 1.600", "Mais de 2.000", "Mais de 800"],
    correct: 1,
  },
  {
    question: "Qual a redução no tempo de evacuação com sistemas de monitoramento por satélite?",
    options: ["50%", "60%", "70%", "80%"],
    correct: 2,
  },
  {
    question: "Quantos brasileiros nunca receberam alertas sobre riscos em sua região?",
    options: ["4 em cada 10", "5 em cada 10", "6 em cada 10", "7 em cada 10"],
    correct: 2,
  },
  {
    question: "Qual o nível crítico do rio que gera alertas automáticos no FalaHydro?",
    options: ["3.20 metros", "3.40 metros", "3.60 metros", "3.80 metros"],
    correct: 2,
  },
  {
    question: "Por quantos dias os dados dos sensores são armazenados para análise preditiva?",
    options: ["15 dias", "20 dias", "30 dias", "45 dias"],
    correct: 2,
  },
]

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

// Initialize application
function initializeApp() {
  setupEventListeners()
  startSlideshow()
  setupScrollAnimations()
  setupFormValidation()
  loadTheme()
}

// Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
      updateActiveNavLink(this.getAttribute("href"))
    })
  })

  // Theme switcher
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const theme = this.getAttribute("data-theme")
      setTheme(theme)
    })
  })

  // Scroll to update active nav link
  window.addEventListener("scroll", updateActiveNavOnScroll)
}

// Slideshow functionality
function startSlideshow() {
  setInterval(nextSlide, 5000) // Auto advance every 5 seconds
}

function nextSlide() {
  const slides = document.querySelectorAll(".slide")
  const buttons = document.querySelectorAll(".slide-btn")

  slides[currentSlideIndex].classList.remove("active")
  buttons[currentSlideIndex].classList.remove("active")

  currentSlideIndex = (currentSlideIndex + 1) % slides.length

  slides[currentSlideIndex].classList.add("active")
  buttons[currentSlideIndex].classList.add("active")
}

function currentSlide(index) {
  const slides = document.querySelectorAll(".slide")
  const buttons = document.querySelectorAll(".slide-btn")

  slides[currentSlideIndex].classList.remove("active")
  buttons[currentSlideIndex].classList.remove("active")

  currentSlideIndex = index - 1

  slides[currentSlideIndex].classList.add("active")
  buttons[currentSlideIndex].classList.add("active")
}

// Scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section)
  })
}

// Navigation
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

function updateActiveNavLink(href) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
  })

  const activeLink = document.querySelector(`a[href="${href}"]`)
  if (activeLink) {
    activeLink.classList.add("active")
  }
}

function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll(".section[id]")
  const scrollPos = window.scrollY + 100

  sections.forEach((section) => {
    const top = section.offsetTop
    const bottom = top + section.offsetHeight
    const id = section.getAttribute("id")

    if (scrollPos >= top && scrollPos <= bottom) {
      updateActiveNavLink(`#${id}`)
    }
  })
}

// Theme management
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("theme", theme)

  // Update logo based on theme
  updateLogo(theme)
}

function updateLogo(theme) {
  const logoLight = document.getElementById("logoLight")
  const logoDark = document.getElementById("logoDark")

  if (theme === "dark") {
    logoLight.style.display = "none"
    logoDark.style.display = "block"
  } else {
    logoLight.style.display = "block"
    logoDark.style.display = "none"
  }
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light"
  setTheme(savedTheme)
}

// Form validation
function setupFormValidation() {
  const form = document.getElementById("contactForm")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Simulate form submission
      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
      form.reset()
      clearErrors()
    }
  })

  // Real-time validation
  const inputs = form.querySelectorAll("input, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })
  })
}

function validateForm() {
  const name = document.getElementById("name")
  const email = document.getElementById("email")
  const phone = document.getElementById("phone")
  const message = document.getElementById("message")

  let isValid = true

  clearErrors()

  if (!name.value.trim()) {
    showError("nameError", "Nome é obrigatório")
    isValid = false
  }

  if (!email.value.trim()) {
    showError("emailError", "E-mail é obrigatório")
    isValid = false
  } else if (!isValidEmail(email.value)) {
    showError("emailError", "E-mail inválido")
    isValid = false
  }

  if (!phone.value.trim()) {
    showError("phoneError", "Telefone é obrigatório")
    isValid = false
  }

  if (!message.value.trim()) {
    showError("messageError", "Mensagem é obrigatória")
    isValid = false
  }

  return isValid
}

function validateField(field) {
  const fieldName = field.name
  const value = field.value.trim()

  clearError(fieldName + "Error")

  switch (fieldName) {
    case "name":
      if (!value) showError("nameError", "Nome é obrigatório")
      break
    case "email":
      if (!value) {
        showError("emailError", "E-mail é obrigatório")
      } else if (!isValidEmail(value)) {
        showError("emailError", "E-mail inválido")
      }
      break
    case "phone":
      if (!value) showError("phoneError", "Telefone é obrigatório")
      break
    case "message":
      if (!value) showError("messageError", "Mensagem é obrigatória")
      break
  }
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
  }
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = ""
  }
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = ""
  })
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}