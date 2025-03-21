// Função para buscar endereço pelo CEP
function buscarEndereco() {
    const cep = document.getElementById("cep").value.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cep.length !== 8) {
        alert("CEP inválido! Digite um CEP com 8 dígitos.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado.");
                return;
            }

            // Preenche o campo de endereço
            document.getElementById("endereco").value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        })
        .catch(error => {
            console.error("Erro ao buscar o CEP:", error);
            alert("Erro ao buscar o endereço. Tente novamente.");
        });
}

document.getElementById("solicitacaoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch("https://script.google.com/macros/s/AKfycbyRgGposUsm36ReVM7viUgyRr3L119TJmFbbrzimOqDjcUZttNMgbii0WqrGlaUnmQLnA/exec", {
        method: "POST",
        body: formData,
        mode: "no-cors" // Adiciona suporte ao CORS
    })
    .then(() => {
        alert("Solicitação enviada com sucesso!");
        document.getElementById("solicitacaoForm").reset();
    })
    .catch(error => {
        alert("Erro ao enviar os dados: " + error.message);
    });
});
