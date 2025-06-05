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