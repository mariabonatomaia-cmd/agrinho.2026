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

// ========== JOGO EDUCATIVO - PERGUNTAS SOBRE BIODIVERSIDADE ==========

// Banco de perguntas sobre biodiversidade e sustentabilidade
const perguntas = [
    {
        pergunta: "O que é biodiversidade?",
        alternativas: [
            "A variedade de espécies de seres vivos e ecossistemas",
            "Apenas a quantidade de árvores em uma floresta",
            "Somente os animais de uma região",
            "O estudo do clima"
        ],
        correta: 0
    },
    {
        pergunta: "Qual destes é um impacto NEGATIVO do desmatamento?",
        alternativas: [
            "Aumento da biodiversidade",
            "Perda do habitat de animais e plantas",
            "Melhora da qualidade do solo",
            "Aumento das chuvas"
        ],
        correta: 1
    },
    {
        pergunta: "Qual prática agrícola ajuda a preservar a biodiversidade?",
        alternativas: [
            "Uso intensivo de agrotóxicos",
            "Queimadas para limpeza do solo",
            "Agrofloresta (plantio com árvores nativas)",
            "Desmatamento total da área"
        ],
        correta: 2
    },
    {
        pergunta: "O Brasil possui a maior biodiversidade do mundo. Qual bioma brasileiro é o mais rico em espécies?",
        alternativas: [
            "Cerrado",
            "Pantanal",
            "Caatinga",
            "Amazônia"
        ],
        correta: 3
    },
    {
        pergunta: "Qual a relação entre agricultura sustentável e meio ambiente?",
        alternativas: [
            "Eles não se relacionam",
            "A agricultura sustentável protege o solo, a água e a biodiversidade",
            "Só prejudica o meio ambiente",
            "Usa apenas máquinas pesadas"
        ],
        correta: 1
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let jogoEmAndamento = true;

// Elementos do DOM do jogo
const perguntaArea = document.getElementById('pergunta-area');
const resultadoArea = document.getElementById('resultado-area');
const controleJogo = document.getElementById('controle-jogo');
const perguntaTexto = document.getElementById('pergunta-texto');
const alternativasArea = document.getElementById('alternativas-area');
const proximaBtn = document.getElementById('proxima-pergunta');
const reiniciarBtn = document.getElementById('reiniciar-jogo');

// Carregar primeira pergunta ao iniciar
carregarPergunta();

function carregarPergunta() {
    if (!jogoEmAndamento) return;
    
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
    controleJogo.style.display = 'none';
    resultadoArea.style.display = 'none';
    perguntaArea.style.display = 'block';
}

function verificarResposta(index, botaoClicado) {
    if (!jogoEmAndamento) return;
    
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
    controleJogo.style.display = 'block';
}

proximaBtn.addEventListener('click', () => {
    perguntaAtual++;
    
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        finalizarJogo();
    }
});

function finalizarJogo() {
    jogoEmAndamento = false;
    perguntaArea.style.display = 'none';
    controleJogo.style.display = 'none';
    resultadoArea.style.display = 'block';
    
    const pontuacaoTexto = document.getElementById('pontuacao-texto');
    const feedbackTexto = document.getElementById('feedback-texto');
    
    pontuacaoTexto.textContent = `🏆 Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;
    
    if (pontuacao === perguntas.length) {
        feedbackTexto.textContent = "🌟 Parabéns! Você é um verdadeiro defensor da biodiversidade! Continue espalhando conscientização sobre a importância de preservar nosso meio ambiente!";
    } else if (pontuacao >= 3) {
        feedbackTexto.textContent = "🌱 Bom trabalho! Você já sabe bastante sobre biodiversidade, mas ainda pode aprender mais. Reveja as informações do site e tente novamente!";
    } else {
        feedbackTexto.textContent = "📚 Continue estudando! A biodiversidade é essencial para o futuro do nosso planeta. Explore nosso site e aprenda mais sobre como proteger a natureza!";
    }
}

reiniciarBtn.addEventListener('click', () => {
    // Reiniciar variáveis
    perguntaAtual = 0;
    pontuacao = 0;
    jogoEmAndamento = true;
    
    // Resetar UI
    resultadoArea.style.display = 'none';
    perguntaArea.style.display = 'block';
    
    carregarPergunta();
});

// ========== TEXTO ALTERNATIVO PARA IMAGENS ==========
// Todas as imagens já possuem atributo 'alt' descritivo no HTML
console.log("Site Sustentabilidade Salva! - Projeto Agrinho 2026 - Funcionalidades de acessibilidade e jogo educativo ativos");
