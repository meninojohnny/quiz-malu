import { addPergunta, findPerguntas, updatePergunta } from './service.js';

var perguntas = [];
var count = 1;

async function init() {
    perguntas = await findPerguntas();

    adicionarAppBar();
    criarOpcoes();
    mostrarMain();
}

function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading").style.display = "none";
}

function adicionarAppBar() {
    const textAppBar = document.querySelector(".app-bar");
    textAppBar.innerHTML = `<a class="btn-back-app-bar" href="inicial.html"><i class="fa-solid fa-arrow-left"></i></a>
                            <span class="text-app-bar">Perguntas</span>
                            <a class="btn-app-bar" href="inicial.html"><i class="fa-solid fa-house"></i></a>`;
}

function criarOpcoes() {
    var opcoesList = document.querySelector(".option-list");
    opcoesList.innerHTML = "";

    perguntas.forEach(p => {
        opcoesList.innerHTML += criarOpacaoItem(p, count);
        count++;
    })
}

function criarOpacaoItem(item, count) {
    if (!item.respondida) {
        return `<a class="option-item" href="quiz.html?pergunta=${item.id}&nmr=${count}"><div class="circle-option">${count}</div></a>`;
    } else {
        return `<a class="option-item-respondido"><div class="circle-option-respondido">${count}</div></a>`;
    }
}

async function adicionarPergunta() {
    var pergunta = {
        pergunta: "Pergunta 1",
        resposta: "Valor 1",
        respondida: true,
        alternativas: [
            "Alternativa 1",
            "Alternativa 2",
            "Alternativa 3"
        ]
    };

    await addPergunta(pergunta);
}



init();