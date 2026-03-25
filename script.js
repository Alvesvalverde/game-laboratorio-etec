// CLIQUE NOS CARDS

document.querySelector(".ranking").addEventListener("click", () => {
    alert("Abrir tela de ranking completo");
});

document.querySelector(".alunos").addEventListener("click", () => {
    alert("Abrir lista completa de alunos");
});

// BOTÕES

document.getElementById("modo1").addEventListener("click", () => {
    alert("Modo 1 (Fácil)");
});

document.getElementById("modo2").addEventListener("click", () => {
    alert("Modo 2 (Médio)");
});
document.getElementById("formPergunta").addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Pergunta salva com sucesso!");

    // Aqui depois você vai conectar com backend (PHP/Node)
});