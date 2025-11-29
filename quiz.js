import { findPerguntaById, updatePergunta } from './service.js';

var pergunta;
var perguntaId;
var clicked = false;
var alternativas;
var nmrPergunta;

async function init() {
    var params = new URLSearchParams(window.location.search);
    perguntaId = params.get('pergunta');
    nmrPergunta = params.get('nmr');
    pergunta = await findPerguntaById(perguntaId);
    alternativas = pergunta.alternativas;

    adicionarAppBar();

    criarAlternativas();
    showAlternativas();
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
    var alternatives = document.querySelector(".alternative-list");
    var resposta = document.querySelector(".resposta");

    wordTitle.innerHTML = pergunta.pergunta;
    resposta.innerHTML = pergunta.resposta;
    alternatives.innerHTML = "";

    if (alternativas.length > 0) {
        alternativas.forEach(a => {
            alternatives.innerHTML += criarAlternativaItem(a);
        });
    }
}

function criarAlternativaItem(item) {
    var id = gerarId(item);
    return `<div id=${id} onclick="verificar(id)" class="alternative-item">${item}</div>`;
}

window.mostrarResposta = function () {
    document.querySelector(".content-3").style.display = "block";
    document.querySelector(".btn-show").style.display = "none";
    document.querySelector(".btn-next").style.display = "block";
}

window.verificar = function (item) {
    if (!clicked) {
        var idResposta = gerarId(pergunta.resposta);
        document.getElementById(item).style.backgroundColor = "#ff4b4b";
        document.getElementById(item).style.color = "white";
        document.getElementById(idResposta).style.backgroundColor = "#43c000";
        document.getElementById(idResposta).style.color = "white";
        clicked = true;
        document.querySelector(".btn-next").style.display = "block";
    }
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
    window.location.href = "jogo.html";
}

function showBtnMostrar() {
    if (alternativas.length == 0) {
        document.querySelector(".btn-show").style.display = "block";
    }
}

function showAlternativas() {
    if (alternativas.length == 0) {
        document.querySelector(".alternative-list").style.display = "block";
    }
}

function gerarId(texto) {
    return btoa(texto);
}

init();