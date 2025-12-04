const checkSim = document.getElementById('sim');
const checkNao = document.getElementById('nao');
let nome = document.getElementById('nomeCompleto');
let tel = document.getElementById('telefone');
let indicacao = document.getElementById('indicacao');
const formCli = document.getElementById('formClient');



const mostrarCheck = (event) => {
    const escolha = event.target.value;

    let yesResponse = document.getElementById('responseYes');
    let NoResponse = document.getElementById('responseNo');

    yesResponse.style.display = 'none';
    NoResponse.style.display = 'none';

    switch (escolha) {
        case "sim":
            yesResponse.style.display = 'flex';
            NoResponse.style.display = 'none';
            break;
        case "nao":
            yesResponse.style.display = 'none';
            NoResponse.style.display = 'flex';
        default:
            break;
    }
}
checkSim.addEventListener('click', mostrarCheck);
checkNao.addEventListener('click', mostrarCheck);


const sendForm = (event) => {
    event.preventDefault()

    fetch('https://api.sheetmonkey.io/form/4vCwapwkA6uq1ARtdgFu3v', {

        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'alicia', email: 'alyadksahdkhaf@gmail.com'
        })
    }).then(response => {
        console.log("Resposta do SheetMonkey:", response.status);
        alert("Dados enviados com sucesso!");
    })
        .catch(error => {
            console.error("Erro ao enviar dados:", error);
            alert("Erro ao enviar dados.");
        });

}
formCli.addEventListener('submit', sendForm);
