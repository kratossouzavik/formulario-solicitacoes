function processarFormulario(dados) {
    try {
        const planilha = SpreadsheetApp.getActiveSpreadsheet(1G-hO_j5CLWTMi_9WX__vL8gxiSFvaD_uQ9X7T1-aV6A);
        const sheet = planilha.getSheetByName("Solicitacoes");
        if (!sheet) {
            throw new Error("A aba 'Solicitacoes' não foi encontrada.");
        }

        const proximaLinha = sheet.getLastRow() + 1;

        const dadosParaInserir = [
            dados.processo_sisgep, 
            dados.data_solicitacao,
            dados.selecione_cras,
            dados.responsavel_solicitacao,
            dados.motorista,
            dados.tipo_carro,
            dados.municipe,
            dados.contato,
            dados.cep,
            dados.endereco,
            dados.numero,
            dados.status
        ];

        sheet.getRange(proximaLinha, 1, 1, dadosParaInserir.length).setValues([dadosParaInserir]);

        return "Dados inseridos com sucesso na linha " + proximaLinha;
    } catch (erro) {
        throw new Error(erro.message);
    }
}

function exibirFormulario() {
    const html = HtmlService.createHtmlOutputFromFile('index')
        .setWidth(600)
        .setHeight(800);
    SpreadsheetApp.getUi().showModalDialog(html, 'Formulário de Solicitação');
}

function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Formulário')
        .addItem('Abrir Formulário', 'exibirFormulario')
        .addToUi();
}
