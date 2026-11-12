const personalidades = [
  {
    nome: "Zumbi dos Palmares",
    periodo: "1655 – 1695",
    categoria: "resistencia",
    area: "Resistência",
    descricao:
      "Principal líder do Quilombo dos Palmares, símbolo histórico da luta pela liberdade e resistência contra a escravidão no Brasil."
  },
  {
    nome: "Dandara dos Palmares",
    periodo: "Século XVII",
    categoria: "resistencia",
    area: "Resistência",
    descricao:
      "Guerreira e estrategista fundamental na defesa do Quilombo dos Palmares, lutou contra a escravização e pela autonomia do povo negro."
  },
  {
    nome: "Carolina Maria de Jesus",
    periodo: "1914 – 1977",
    categoria: "literatura",
    area: "Literatura & Arte",
    descricao:
      "Escritora mineira autora de 'Quarto de Despejo', obra traduzida para mais de 13 idiomas que retrata com sensibilidade e força a realidade das favelas."
  },
  {
    nome: "Machado de Assis",
    periodo: "1839 – 1908",
    categoria: "literatura",
    area: "Literatura & Arte",
    descricao:
      "Um dos maiores escritores da literatura mundial e fundador da Academia Brasileira de Letras, autor de clássicos como 'Dom Casmurro'."
  },
  {
    nome: "Luís Gama",
    periodo: "1830 – 1882",
    categoria: "ciencia",
    area: "Ciência & Direito",
    descricao:
      "Advogado autodidata, jornalista e poeta abolicionista que conquistou nos tribunais a liberdade de mais de 500 pessoas escravizadas."
  },
  {
    nome: "Enedina Alves Marques",
    periodo: "1913 – 1981",
    categoria: "ciencia",
    area: "Ciência & Direito",
    descricao:
      "Primeira mulher negra a se formar em Engenharia no Brasil (1945), com atuação marcante em grandes obras de infraestrutura no Paraná."
  }
];

const cardsContainer = document.getElementById("cards-personalidades");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderPersonalidades(filtro = "todos") {
  cardsContainer.innerHTML = "";
  const filtradas =
    filtro === "todos"
      ? personalidades
      : personalidades.filter((p) => p.categoria === filtro);

  filtradas.forEach((pessoa) => {
    const card = document.createElement("article");
    card.className = "person-card";
    card.innerHTML = `
      <div>
        <span class="person-tag">${pessoa.area}</span>
        <h3>${pessoa.nome}</h3>
        <div class="person-period">${pessoa.periodo}</div>
        <p>${pessoa.descricao}</p>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderPersonalidades(btn.dataset.filter);
  });
});

renderPersonalidades();

/* Quiz Interativo */
const perguntas = [
  {
    pergunta: "Por que o Dia da Consciência Negra é celebrado em 20 de novembro?",
    opcoes: [
      "Data da assinatura da Lei Áurea",
      "Data da morte de Zumbi dos Palmares em 1695",
      "Fundação da primeira escola do Brasil"
    ],
    correta: 1,
    explicacao:
      "Correto! O 20 de novembro marca o falecimento de Zumbi dos Palmares, símbolo maior da resistência negra."
  },
  {
    pergunta: "Qual lei tornou obrigatório o ensino de História e Cultura Afro-Brasileira nas escolas?",
    opcoes: ["Lei 10.639 de 2003", "Lei Eusébio de Queirós", "Lei do Ventre Livre"],
    correta: 0,
    explicacao:
      "Isso mesmo! A Lei 10.639/2003 incluiu no currículo oficial a obrigatoriedade da temática afro-brasileira."
  },
  {
    pergunta: "Quem foi a escritora negra brasileira autora do livro 'Quarto de Despejo'?",
    opcoes: ["Conceição Evaristo", "Carolina Maria de Jesus", "Ruth de Souza"],
    correta: 1,
    explicacao:
      "Exato! Carolina Maria de Jesus publicou 'Quarto de Despejo' em 1960, tornando-se referência mundial."
  },
  {
    pergunta: "Qual advogado abolicionista libertou mais de 500 pessoas nos tribunais do século XIX?",
    opcoes: ["André Rebouças", "Luís Gama", "Cruz e Sousa"],
    correta: 1,
    explicacao:
      "Acertou! Luís Gama atuou incansavelmente nos tribunais defendendo a liberdade de pessoas escravizadas ilegalmente."
  },
  {
    pergunta: "Quem foi a primeira mulher negra a se formar em Engenharia no Brasil?",
    opcoes: ["Enedina Alves Marques", "Sônia Guimarães", "Jaqueline Goes"],
    correta: 0,
    explicacao:
      "Muito bem! Enedina Alves Marques formou-se em Engenharia Civil em 1945 pela Universidade do Paraná."
  }
];

let indiceAtual = 0;
let acertos = 0;

const elProgresso = document.getElementById("quiz-progresso");
const elPlacar = document.getElementById("quiz-placar");
const elPergunta = document.getElementById("quiz-pergunta");
const elOpcoes = document.getElementById("quiz-opcoes");
const elFeedback = document.getElementById("quiz-feedback");
const btnProxima = document.getElementById("btn-proxima");
const btnReiniciar = document.getElementById("btn-reiniciar");

function carregarPergunta() {
  const atual = perguntas[indiceAtual];
  elProgresso.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  elPlacar.textContent = `Acertos: ${acertos}`;
  elPergunta.textContent = atual.pergunta;
  elFeedback.textContent = "";
  btnProxima.hidden = true;
  btnReiniciar.hidden = true;
  elOpcoes.innerHTML = "";

  atual.opcoes.forEach((texto, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = texto;
    btn.addEventListener("click", () => verificarResposta(idx, btn));
    elOpcoes.appendChild(btn);
  });
}

function verificarResposta(indiceEscolhido, botaoClicado) {
  const atual = perguntas[indiceAtual];
  const todosBotoes = elOpcoes.querySelectorAll(".option-btn");
  todosBotoes.forEach((b) => (b.disabled = true));

  if (indiceEscolhido === atual.correta) {
    botaoClicado.classList.add("correct");
    acertos++;
    elPlacar.textContent = `Acertos: ${acertos}`;
    elFeedback.textContent = atual.explicacao;
  } else {
    botaoClicado.classList.add("wrong");
    todosBotoes[atual.correta].classList.add("correct");
    elFeedback.textContent = `Não foi dessa vez. ${atual.explicacao}`;
  }

  if (indiceAtual < perguntas.length - 1) {
    btnProxima.hidden = false;
  } else {
    elFeedback.textContent += ` Fim do quiz! Você acertou ${acertos} de ${perguntas.length}.`;
    btnReiniciar.hidden = false;
  }
}

btnProxima.addEventListener("click", () => {
  indiceAtual++;
  carregarPergunta();
});

btnReiniciar.addEventListener("click", () => {
  indiceAtual = 0;
  acertos = 0;
  carregarPergunta();
});

carregarPergunta();

/* Mural de Compromisso Antirracista */
const STORAGE_KEY = "mural_consciencia_negra_v1";
const mensagensIniciais = [
  {
    autor: "Equipe Pedagógica",
    mensagem:
      "Educar para as relações étnico-raciais é construir uma escola mais justa, acolhedora e plural todos os dias."
  },
  {
    autor: "Turma do Ensino Médio",
    mensagem:
      "Valorizar a história e a cultura afro-brasileira é reconhecer nossas próprias raízes."
  }
];

function obterMensagens() {
  const salvas = localStorage.getItem(STORAGE_KEY);
  return salvas ? JSON.parse(salvas) : mensagensIniciais;
}

function renderMural() {
  const lista = document.getElementById("lista-mural");
  const mensagens = obterMensagens();
  lista.innerHTML = "";

  mensagens.forEach((item) => {
    const card = document.createElement("article");
    card.className = "mural-note";
    card.innerHTML = `
      <p>"${item.mensagem}"</p>
      <span>— ${item.autor}</span>
    `;
    lista.appendChild(card);
  });
}

document.getElementById("form-mural").addEventListener("submit", (e) => {
  e.preventDefault();
  const inputAutor = document.getElementById("autor");
  const inputMensagem = document.getElementById("mensagem");

  const nova = {
    autor: inputAutor.value.trim(),
    mensagem: inputMensagem.value.trim()
  };

  if (!nova.autor || !nova.mensagem) return;

  const atuais = obterMensagens();
  atuais.unshift(nova);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(atuais));

  inputAutor.value = "";
  inputMensagem.value = "";
  renderMural();
});

renderMural();
