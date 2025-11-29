import { findPerguntas, addPergunta, removerPergunta } from './service.js';

var perguntas = await findPerguntas();
adicionarAppBar();
mostrarMain();

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
    textAppBar.innerHTML = `<a class="btn-back-app-bar" href="inicial.html"></a>
                            <span class="text-app-bar">Resetar Manual</span>
                            <a class="btn-app-bar" href="inicial.html"><i class="fa-solid fa-house"></i></a>`;
}

window.resetarPerguntas = async function () {

    hiddeMain();

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
        mostrarMain();
        console.error('Erro ao carregar o JSON', err);
    }

}
