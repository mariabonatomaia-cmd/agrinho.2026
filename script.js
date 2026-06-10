// ========== CONFIGURAÇÕES DE ACESSIBILIDADE ==========

// Controle do menu de acessibilidade
const btnAcessibilidade = document.getElementById('btn-acessibilidade');
const menuAcessibilidade = document.getElementById('menu-acessibilidade');

btnAcessibilidade.addEventListener('click', () => {
    if (menuAcessibilidade.style.display === 'none') {
        menuAcessibilidade.style.display = 'flex';
    } else {
        menuAcessibilidade.style.display = 'none';
    }
});

// Aumentar fonte (até 24px)
let tamanhoFonteAtual = 16;
const body = document.body;

function aumentarFonte() {
    if (tamanhoFonteAtual < 24) {
        tamanhoFonteAtual += 2;
        body.style.fontSize = tamanhoFonteAtual + 'px';
    }
}

function diminuirFonte() {
    if (tamanhoFonteAtual > 12) {
        tamanhoFonteAtual -= 2;
        body.style.fontSize = tamanhoFonteAtual + 'px';
    }
}

document.getElementById('aumentar-fonte').addEventListener('click', aumentarFonte);
document.getElementById('diminuir-fonte').addEventListener('click', diminuirFonte);

// Alto contraste
let altoContrasteAtivo = false;
const btnAltoContraste = document.getElementById('alto-contraste');

btnAltoContraste.addEventListener('click', () => {
    if (altoContrasteAtivo) {
        body.classList.remove('alto-contraste');
        altoContrasteAtivo = false;
        btnAltoContraste.textContent = '🎨 Alto contraste';
    } else {
        body.classList.add('alto-contraste');
        altoContrasteAtivo = true;
        btnAltoContraste.textContent = '🎨 Modo normal';
    }
});

// ========== SISTEMA DE PERGUNTAS E RESPOSTAS ==========

// Banco de perguntas sobre desmatamento e sustentabilidade
const perguntas = [
    {
        pergunta: "O que é desmatamento?",
        alternativas: [
            "Plantio de novas árvores",
            "Remoção total ou parcial da vegetação nativa de uma área",
            "Proteção de florestas",
            "Criação de áreas de preservação"
        ],
        correta: 1
    },
    {
        pergunta: "Qual das alternativas é uma CONSEQUÊNCIA do desmatamento?",
        alternativas: [
            "Aumento da biodiversidade",
            "Melhora da qualidade do ar",
            "Perda de habitat de animais e extinção de espécies",
            "Aumento das chuvas"
        ],
        correta: 2
    },
    {
        pergunta: "Qual prática ajuda a combater o desmatamento?",
        alternativas: [
            "Queimadas para limpeza do solo",
            "Reflorestamento e agricultura sustentável",
            "Extração ilegal de madeira",
            "Expansão da pecuária sem planejamento"
        ],
        correta: 1
    },
    {
        pergunta: "O Brasil é um dos países que mais desmata no mundo. Qual bioma brasileiro é o mais afetado?",
        alternativas: [
            "Pampa",
            "Pantanal",
            "Caatinga",
            "Amazônia"
        ],
        correta: 3
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let quizEmAndamento = true;

// Elementos do DOM
const perguntaArea = document.getElementById('pergunta-area');
const resultadoArea = document.getElementById('resultado-area');
const controleQuiz = document.getElementById('controle-quiz');
const perguntaTexto = document.getElementById('pergunta-texto');
const alternativasArea = document.getElementById('alternativas-area');
const proximaBtn = document.getElementById('proxima-pergunta');
const reiniciarBtn = document.getElementById('reiniciar-perguntas');

// Carregar primeira pergunta ao iniciar
carregarPergunta();

function carregarPergunta() {
    if (!quizEmAndamento) return;
    
    const pergunta = perguntas[perguntaAtual];
    perguntaTexto.textContent = pergunta.pergunta;
    
    // Limpar alternativas anteriores
    alternativasArea.innerHTML = '';
    
    // Criar botões para cada alternativa
    pergunta.alternativas.forEach((alt, index) => {
        const btn = document.createElement('button');
        btn.textContent = alt;
        btn.classList.add('alternativa-btn');
        btn.addEventListener('click', () => verificarResposta(index, btn));
        alternativasArea.appendChild(btn);
    });
    
    // Esconder botão próximo até responder
    controleQuiz.style.display = 'none';
    resultadoArea.style.display = 'none';
    perguntaArea.style.display = 'block';
}

function verificarResposta(index, botaoClicado) {
    if (!quizEmAndamento) return;
    
    const pergunta = perguntas[perguntaAtual];
    const estaCorreta = (index === pergunta.correta);
    
    // Desabilitar novos cliques
    const botoes = document.querySelectorAll('.alternativa-btn');
    botoes.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });
    
    if (estaCorreta) {
        pontuacao++;
        botaoClicado.style.backgroundColor = '#4CAF50';
        botaoClicado.style.color = 'white';
    } else {
        botaoClicado.style.backgroundColor = '#f44336';
        botaoClicado.style.color = 'white';
        // Marcar a correta em verde
        botoes[pergunta.correta].style.backgroundColor = '#4CAF50';
        botoes[pergunta.correta].style.color = 'white';
    }
    
    // Mostrar botão próximo
    controleQuiz.style.display = 'block';
}

proximaBtn.addEventListener('click', () => {
    perguntaAtual++;
    
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        finalizarQuiz();
    }
});

function finalizarQuiz() {
    quizEmAndamento = false;
    perguntaArea.style.display = 'none';
    controleQuiz.style.display = 'none';
    resultadoArea.style.display = 'block';
    
    const pontuacaoTexto = document.getElementById('pontuacao-texto');
    const feedbackTexto = document.getElementById('feedback-texto');
    
    pontuacaoTexto.textContent = `📊 Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
    
    if (pontuacao === perguntas.length) {
        feedbackTexto.textContent = "🌟 Parabéns! Você é muito consciente sobre o desmatamento! Continue espalhando essa informação importante para ajudar a preservar o meio ambiente!";
    } else if (pontuacao >= 2) {
        feedbackTexto.textContent = "🌱 Bom trabalho! Você já sabe bastante, mas ainda pode aprender mais sobre como combater o desmatamento. Reveja as informações do site!";
    } else {
        feedbackTexto.textContent = "📚 Continue estudando! O desmatamento é um problema sério que afeta a todos nós. Reveja as informações do site e tente novamente!";
    }
}

reiniciarBtn.addEventListener('click', () => {
    perguntaAtual = 0;
    pontuacao = 0;
    quizEmAndamento = true;
    
    resultadoArea.style.display = 'none';
    perguntaArea.style.display = 'block';
    
    carregarPergunta();
});

// ========== BOTÃO PARA VÍDEO INFORMATIVO ==========
const btnVideo = document.getElementById('btn-video');
const areaVideo = document.getElementById('area-video');

btnVideo.addEventListener('click', () => {
    if (areaVideo.style.display === 'none') {
        areaVideo.style.display = 'block';
        btnVideo.textContent = '🎬 Fechar vídeo';
    } else {
        areaVideo.style.display = 'none';
        btnVideo.textContent = '🎬 Assistir vídeo informativo';
    }
});

// ========== TEXTO ALTERNATIVO PARA IMAGENS ==========
// Todas as imagens já possuem atributo 'alt' descritivo no HTML
console.log("Site Futuro Verde - Projeto Agrinho 2026 ativo!");
