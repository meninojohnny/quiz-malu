import { findPerguntaById } from './service.js';

var perguntas;
var pergunta;
var clicked = false;
var nmrPergunta;

async function init() {
    var params = new URLSearchParams(window.location.search);
    nmrPergunta = parseInt(params.get('nmr'));

    perguntas = await lerJsonEMapear();

    // pergunta = await findPerguntaById(perguntaId);

    pergunta = perguntas[nmrPergunta - 1];

    adicionarAppBar();

    criarAlternativas();
    showBtnMostrar();

    mostrarMain();
}

function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading").style.display = "none";
}

function hiddeMain() {
    document.querySelector(".main").style.display = "none";
    document.querySelector(".loading").style.display = "flex";
}

function adicionarAppBar() {
    const textAppBar = document.querySelector(".app-bar");
    textAppBar.innerHTML = `<a class="btn-back-app-bar" href="jogo.html"><i class="fa-solid fa-arrow-left"></i></a>
                            <span class="text-app-bar">Pergunta ${nmrPergunta}</span>
                            <a class="btn-app-bar" href="inicial.html"><i class="fa-solid fa-house"></i></a>`;
}

async function criarAlternativas() {
    var wordTitle = document.querySelector(".pergunta");
    var resposta = document.querySelector(".resposta");

    wordTitle.innerHTML = pergunta.pergunta;
    resposta.innerHTML = pergunta.resposta;
}

window.mostrarResposta = function () {
    document.querySelector(".content-3").style.display = "block";
    document.querySelector(".btn-show").style.display = "none";
    document.querySelector(".btn-next").style.display = "block";
}

window.next = async function () {
    // hiddeMain();
    // const newPergunta = {
    //     pergunta: pergunta.pergunta,
    //     resposta: pergunta.resposta,
    //     alternativas: pergunta.alternativas,
    //     respondida: true
    // };

    // await updatePergunta(perguntaId ,newPergunta);
    window.location.href = `quiz.html?nmr=${nmrPergunta + 1}`;
}

function showBtnMostrar() {
    document.querySelector(".btn-show").style.display = "block";
}

async function lerJsonEMapear() {
    try {
        const response = await fetch("perguntas.json");
        const jsonData = await response.json();
        const listaDicionarios = jsonData.map(item => ({
            pergunta: item.pergunta,
            resposta: item.resposta
        }));
        return listaDicionarios;
    } catch (error) {
        console.error("Erro ao ler JSON:", error);
        return [];
    }
}

init();