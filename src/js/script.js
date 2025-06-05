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

// Quiz functionality
function openQuiz() {
  document.getElementById("quizModal").style.display = "block"
  resetQuiz()
  showQuestion()
}

function closeQuiz() {
  document.getElementById("quizModal").style.display = "none"
}

function resetQuiz() {
  currentQuestionIndex = 0
  userAnswers = []
  quizScore = 0
  document.getElementById("quizContent").style.display = "block"
  document.getElementById("quizResult").style.display = "none"
}

function showQuestion() {
  const question = quizQuestions[currentQuestionIndex]

  document.getElementById("questionText").textContent = question.question
  document.getElementById("questionCounter").textContent =
    `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`

  const optionsContainer = document.getElementById("optionsContainer")
  optionsContainer.innerHTML = ""

  question.options.forEach((option, index) => {
    const optionElement = document.createElement("div")
    optionElement.className = "option"
    optionElement.textContent = option
    optionElement.onclick = () => selectOption(index, optionElement)
    optionsContainer.appendChild(optionElement)
  })

  updateNavigationButtons()
}

function selectOption(index, element) {
  // Remove previous selection
  document.querySelectorAll(".option").forEach((opt) => {
    opt.classList.remove("selected")
  })

  // Add selection to clicked option
  element.classList.add("selected")
  userAnswers[currentQuestionIndex] = index

  // Enable next button
  document.getElementById("nextBtn").disabled = false
}

function nextQuestion() {
  if (userAnswers[currentQuestionIndex] === undefined) {
    alert("Por favor, selecione uma resposta antes de continuar.")
    return
  }

  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++
    showQuestion()
  } else {
    showResults()
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--
    showQuestion()
  }
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")

  prevBtn.disabled = currentQuestionIndex === 0
  nextBtn.disabled = userAnswers[currentQuestionIndex] === undefined

  if (currentQuestionIndex === quizQuestions.length - 1) {
    nextBtn.textContent = "Finalizar"
  } else {
    nextBtn.textContent = "Próxima"
  }
}

function showResults() {
  // Calculate score
  quizScore = 0
  userAnswers.forEach((answer, index) => {
    if (answer === quizQuestions[index].correct) {
      quizScore++
    }
  })

  const percentage = Math.round((quizScore / quizQuestions.length) * 100)

  document.getElementById("quizContent").style.display = "none"
  document.getElementById("quizResult").style.display = "block"

  document.getElementById("scoreText").textContent =
    `Você acertou ${quizScore} de ${quizQuestions.length} perguntas (${percentage}%)`

  let feedback = ""
  if (percentage >= 80) {
    feedback = "Excelente! Você tem um ótimo conhecimento sobre prevenção de enchentes."
  } else if (percentage >= 60) {
    feedback = "Bom trabalho! Você tem conhecimentos sólidos, mas pode aprender mais."
  } else if (percentage >= 40) {
    feedback = "Razoável. Recomendamos estudar mais sobre o tema."
  } else {
    feedback = "É importante aprender mais sobre prevenção de enchentes para sua segurança."
  }

  document.getElementById("feedbackText").textContent = feedback
}

function restartQuiz() {
  resetQuiz()
  showQuestion()
}

// Close modal when clicking outside
window.onclick = (event) => {
  const modal = document.getElementById("quizModal")
  if (event.target === modal) {
    closeQuiz()
  }
}

// Smooth scrolling for all internal links
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const targetId = e.target.getAttribute("href").substring(1)
    scrollToSection(targetId)
  }
})

// Variáveis globais para as novas funcionalidades
let currentUserType = null
const riverLevelData = []
const chartInstance = null

// Inicializar funcionalidades adicionais
document.addEventListener("DOMContentLoaded", () => {
  initializeRiverLevel()
  initializeChart()
  setupLoginForms()
  setupRegisterForm()
  generateMockData()
})

// Simulação do nível do rio
function initializeRiverLevel() {
  const levelFill = document.querySelector(".level-fill")
  const currentLevel = 65 // Porcentagem do nível

  if (levelFill) {
    levelFill.style.height = currentLevel + "%"

    // Atualizar a cada 30 segundos (simulação)
    setInterval(updateRiverLevel, 30000)
  }
}

function updateRiverLevel() {
  const levelFill = document.querySelector(".level-fill")
  const currentLevelSpan = document.querySelector(".current-level")
  const lastUpdateSpan = document.querySelector(".last-update")

  // Simular variação do nível
  const variation = (Math.random() - 0.5) * 10
  let newLevel = Number.parseInt(levelFill.style.height) + variation
  newLevel = Math.max(0, Math.min(100, newLevel))

  levelFill.style.height = newLevel + "%"

  // Atualizar valor numérico
  const meterValue = ((newLevel / 100) * 5).toFixed(2) // Simular metros
  currentLevelSpan.textContent = meterValue + "m"

  // Atualizar status
  updateLevelStatus(newLevel)

  // Atualizar timestamp
  lastUpdateSpan.textContent = "Última atualização: agora"

  // Adicionar ao histórico
  addToHistory(Number.parseFloat(meterValue))
}

function updateLevelStatus(level) {
  const statusSpan = document.querySelector(".level-status")

  statusSpan.className = "level-status "

  if (level < 30) {
    statusSpan.classList.add("status-normal")
    statusSpan.textContent = "Normal"
  } else if (level < 60) {
    statusSpan.classList.add("status-attention")
    statusSpan.textContent = "Atenção"
  } else if (level < 80) {
    statusSpan.classList.add("status-alert")
    statusSpan.textContent = "Alerta"
  } else {
    statusSpan.classList.add("status-emergency")
    statusSpan.textContent = "Emergência"
  }
}

// Gráfico de histórico
function initializeChart() {
  const canvas = document.getElementById("levelChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Dados simulados dos últimos 10 dias
  const labels = []
  const data = []

  for (let i = 9; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    labels.push(date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }))
    data.push((Math.random() * 3 + 1).toFixed(2))
  }

  drawChart(ctx, labels, data)
}

function drawChart(ctx, labels, data) {
  const canvas = ctx.canvas
  const width = canvas.width
  const height = canvas.height

  // Limpar canvas
  ctx.clearRect(0, 0, width, height)

  // Configurações
  const padding = 40
  const chartWidth = width - 2 * padding
  const chartHeight = height - 2 * padding

  // Encontrar min/max
  const maxValue = Math.max(...data.map((d) => Number.parseFloat(d)))
  const minValue = Math.min(...data.map((d) => Number.parseFloat(d)))
  const range = maxValue - minValue || 1

  // Desenhar eixos
  ctx.strokeStyle = "#e5e7eb"
  ctx.lineWidth = 1

  // Eixo Y
  ctx.beginPath()
  ctx.moveTo(padding, padding)
  ctx.lineTo(padding, height - padding)
  ctx.stroke()

  // Eixo X
  ctx.beginPath()
  ctx.moveTo(padding, height - padding)
  ctx.lineTo(width - padding, height - padding)
  ctx.stroke()

  // Desenhar linha do gráfico
  ctx.strokeStyle = "#3b82f6"
  ctx.lineWidth = 2
  ctx.beginPath()

  data.forEach((value, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth
    const y = height - padding - ((Number.parseFloat(value) - minValue) / range) * chartHeight

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.stroke()

  // Desenhar pontos
  ctx.fillStyle = "#3b82f6"
  data.forEach((value, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth
    const y = height - padding - ((Number.parseFloat(value) - minValue) / range) * chartHeight

    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fill()
  })

  // Labels do eixo X
  ctx.fillStyle = "#6b7280"
  ctx.font = "12px Inter"
  ctx.textAlign = "center"

  labels.forEach((label, index) => {
    const x = padding + (index / (labels.length - 1)) * chartWidth
    ctx.fillText(label, x, height - 10)
  })
}

function addToHistory(value) {
  riverLevelData.push(value)
  if (riverLevelData.length > 10) {
    riverLevelData.shift()
  }

  // Atualizar gráfico se necessário
  if (chartInstance) {
    initializeChart()
  }
}

// Modais de Login/Cadastro
function openLoginModal(userType) {
  currentUserType = userType
  const modal = document.getElementById("loginModal")
  const title = document.getElementById("loginTitle")

  title.textContent = userType === "manager" ? "Login - Gestor Público" : "Login - Cidadão"
  modal.style.display = "block"
}

function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none"
  clearLoginForm()
}

function openRegisterModal() {
  closeLoginModal()
  document.getElementById("registerModal").style.display = "block"
}

function closeRegisterModal() {
  document.getElementById("registerModal").style.display = "none"
  clearRegisterForm()
}

// Validação de CPF
function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, "")

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false
  }

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (10 - i)
  }

  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== Number.parseInt(cpf.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (11 - i)
  }

  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0

  return remainder === Number.parseInt(cpf.charAt(10))
}

// Configurar formulários
function setupLoginForms() {
  const loginForm = document.getElementById("loginForm")

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const cpf = document.getElementById("loginCPF").value
    const password = document.getElementById("loginPassword").value

    if (validateLoginForm(cpf, password)) {
      // Simular login bem-sucedido
      alert(
        `Login realizado com sucesso! Redirecionando para o dashboard ${currentUserType === "manager" ? "de gestor" : "do cidadão"}...`,
      )
      closeLoginModal()

      // Aqui seria o redirecionamento para o dashboard
      if (currentUserType === "manager") {
        // window.location.href = 'dashboard-manager.html'
      } else {
        // window.location.href = 'dashboard-citizen.html'
      }
    }
  })
}

function setupRegisterForm() {
  const registerForm = document.getElementById("registerForm")

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if (validateRegisterForm()) {
      // Simular cadastro bem-sucedido
      alert("Cadastro realizado com sucesso! Você pode fazer login agora.")
      closeRegisterModal()
      openLoginModal("citizen")
    }
  })

  // Máscara para CPF
  const cpfInput = document.getElementById("registerCPF")
  cpfInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d)/, "$1.$2")
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    e.target.value = value
  })
}

function validateLoginForm(cpf, password) {
  clearLoginErrors()
  let isValid = true

  if (!cpf) {
    showLoginError("loginCPFError", "CPF é obrigatório")
    isValid = false
  } else if (!validateCPF(cpf)) {
    showLoginError("loginCPFError", "CPF inválido")
    isValid = false
  }

  if (!password) {
    showLoginError("loginPasswordError", "Senha é obrigatória")
    isValid = false
  }

  return isValid
}

function validateRegisterForm() {
  clearRegisterErrors()
  let isValid = true

  const name = document.getElementById("registerName").value
  const cpf = document.getElementById("registerCPF").value
  const email = document.getElementById("registerEmail").value
  const phone = document.getElementById("registerPhone").value
  const address = document.getElementById("registerAddress").value
  const password = document.getElementById("registerPassword").value
  const confirmPassword = document.getElementById("registerConfirmPassword").value
  const terms = document.getElementById("registerTerms").checked

  if (!name.trim()) {
    showRegisterError("registerNameError", "Nome é obrigatório")
    isValid = false
  }

  if (!cpf) {
    showRegisterError("registerCPFError", "CPF é obrigatório")
    isValid = false
  } else if (!validateCPF(cpf)) {
    showRegisterError("registerCPFError", "CPF inválido")
    isValid = false
  }

  if (!email) {
    showRegisterError("registerEmailError", "E-mail é obrigatório")
    isValid = false
  } else if (!isValidEmail(email)) {
    showRegisterError("registerEmailError", "E-mail inválido")
    isValid = false
  }

  if (!phone) {
    showRegisterError("registerPhoneError", "Telefone é obrigatório")
    isValid = false
  }

  if (!address.trim()) {
    showRegisterError("registerAddressError", "Endereço é obrigatório")
    isValid = false
  }

  if (!password) {
    showRegisterError("registerPasswordError", "Senha é obrigatória")
    isValid = false
  } else if (password.length < 6) {
    showRegisterError("registerPasswordError", "Senha deve ter pelo menos 6 caracteres")
    isValid = false
  }

  if (password !== confirmPassword) {
    showRegisterError("registerConfirmPasswordError", "Senhas não coincidem")
    isValid = false
  }

  if (!terms) {
    alert("Você deve aceitar os termos de uso e política de privacidade")
    isValid = false
  }

  return isValid
}

function showLoginError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
  }
}

function showRegisterError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
  }
}

function clearLoginErrors() {
  document.querySelectorAll("#loginModal .error-message").forEach((error) => {
    error.textContent = ""
  })
}

function clearRegisterErrors() {
  document.querySelectorAll("#registerModal .error-message").forEach((error) => {
    error.textContent = ""
  })
}

function clearLoginForm() {
  document.getElementById("loginForm").reset()
  clearLoginErrors()
}

function clearRegisterForm() {
  document.getElementById("registerForm").reset()
  clearRegisterErrors()
}

// Funcionalidades SOS
function openSOSModal() {
  document.getElementById("sosModal").style.display = "block"
}

function closeSOSModal() {
  document.getElementById("sosModal").style.display = "none"
}

function callDefesaCivil() {
  // Simular ligação
  alert(
    "Conectando com a Defesa Civil...\nTelefone: 199\n\nEm uma situação real, esta função iniciaria uma ligação direta.",
  )

  // Em um app real, isso abriria o discador
  // window.location.href = 'tel:199'
}

function openEmergencyChat() {
  alert(
    "Abrindo chat de emergência...\n\nEm uma situação real, isso abriria um chat direto com a equipe de emergência.",
  )

  // Aqui seria implementado um chat em tempo real
}

function shareLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        alert(
          `Localização compartilhada com sucesso!\n\nLatitude: ${lat.toFixed(6)}\nLongitude: ${lng.toFixed(6)}\n\nAs equipes de emergência foram notificadas.`,
        )
      },
      (error) => {
        alert("Não foi possível obter sua localização. Verifique as permissões do navegador.")
      },
    )
  } else {
    alert("Geolocalização não é suportada neste navegador.")
  }
}

// Dados simulados
function generateMockData() {
  // Simular dados de sensores
  setInterval(() => {
    // Atualizar dados em tempo real (simulação)
    const timestamp = new Date().toLocaleTimeString("pt-BR")
    console.log(`[${timestamp}] Dados atualizados dos sensores`)
  }, 60000) // A cada minuto
}