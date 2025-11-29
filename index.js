import { findPerguntas, updatePergunta, addPergunta, removerPergunta } from './service.js';

mostrarMain();

function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading").style.display = "none";
}

function hiddeMain() {
    document.querySelector(".main").style.display = "none";
    document.querySelector(".loading").style.display = "flex";
}

window.reiniciarJogo = async function () {
    hiddeMain();
    var perguntas = await findPerguntas();

    for (const p of perguntas) {
        if (p.respondida) {
            const pergunta = {
                pergunta: p.pergunta,
                resposta: p.resposta,
                alternativas: p.alternativas,
                respondida: false
            };

            await updatePergunta(p.id, pergunta);
        }
    }
    window.location.href = "jogo.html";
}

window.resetarPerguntas = async function () {
    console.log("Entrou aqui")
    var perguntas = await findPerguntas();

    for (const p of perguntas) {
        await removerPergunta(p.id);
    }

    try {
        const response = await fetch('./perguntas.json');
        const dados = await response.json();

        for (const p of dados) {
            const pergunta = {
                pergunta: p.pergunta,
                resposta: p.resposta,
                alternativas: p.alternativas,
                respondida: false
            };

            await addPergunta(pergunta);
        }

        window.location.href = "inicial.html";

    } catch (err) {
        console.error('Erro ao carregar o JSON', err);
    }

}