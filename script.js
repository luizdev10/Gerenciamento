document.addEventListener('DOMContentLoaded', () => {
    const formCli = document.getElementById('btn-cad');
    const checkSim = document.getElementById('sim');
    const checkNao = document.getElementById('nao');
    const yesResponse = document.getElementById('responseYes');
    const NoResponse = document.getElementById('responseNo');
    const mensagemError = document.getElementById('text-error');
    const mensagemsucess = document.getElementById('text-sucess');


    const inputs = {
        nome: document.getElementById('nomeCompleto'),
        tel: document.getElementById('telefone'),
        cpf: document.getElementById('CPFyes'),
        enderecoYes: document.getElementById('enderecoyes'),
        dayconvert: document.getElementById('dayyes'),
        beneficio: document.getElementById('beneficioyes'),
        enderecoNo: document.getElementById('enderecono'),
        responsavel: document.getElementById('responsavelyes'),
        novamentday: document.getElementById('novamente'),
        indicacao: document.getElementById('indicacao'),
    }

    const mostrarCheck = (event) => {
        const escolha = event.target.value;


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




    const envForm = async (event) => {
        event.preventDefault();
        const escolha = checkSim.checked ? "sim " : checkNao.checked ? "nao" : null;

        if (!escolha) {
            mensagemError.innerHTML = "Por favor marque 'Sim' ou 'Não'.";
            mensagemError.style.color = "red";
            return;
        }

        if (escolha == "sim") {
            const validador = {
                nome: {
                    elemento: inputs.nome, mensagem: "Preencha o Nome Completo!"
                },
                tel: {
                    elemento: inputs.tel, mensagem: "Preencha o Telefone!"
                },
                cpf: {
                    elemento: inputs.cpf, mensagem: "Preencha o CPF!"
                },
                indicacao: {
                    elemento: inputs.indicacao, mensagem: "Preencha a indicação!"
                },
                enderecoYes: {
                    elemento: inputs.enderecoYes, mensagem: "Preencha o Endereço!"
                },
                convertido: {
                    elemento: inputs.dayconvert, mensagem: "Preencha a Data!"
                },
                beneficio: {
                    elemento: inputs.beneficio, mensagem: "Preencha o Tipo de Beneficio!"
                },
                responsavel: {
                    elemento: inputs.responsavel, mensagem: "Preencha Quem é o Responsavel!"
                },

            }

            let evalid = true;

            for (const chave in validador) {
                const campos = validador[chave];
                const elemento = campos.elemento;



                if (!campos.condicao || campos.condicao === 'sim') {
                    if (elemento && elemento.value.trim() === "") {
                        mensagemError.innerHTML = campos.mensagem;
                        mensagemError.style.color = "red";
                        elemento.focus();
                        elemento.style.border = '2px solid red';
                        evalid = false;
                        break;
                    } else if (elemento) {
                        elemento.style.border = '';
                    }
                }
            }
            if (!evalid) {
                return;
            }
            try {
                const response = await fetch("https://api.sheetmonkey.io/form/4vCwapwkA6uq1ARtdgFu3v", {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Nome: inputs.nome.value,
                        Telefone: inputs.tel.value,
                        indicação: inputs.indicacao.value,
                        Cpf: inputs.cpf.value,
                        Endereco: inputs.enderecoYes.value,
                        DiaConvertido: inputs.dayconvert.value,
                        Beneficio: inputs.beneficio.value,
                    })
                })


                if (response.ok) {
                    mensagemsucess.innerHTML = "✅ Envio realizado com sucesso!";
                    mensagemsucess.style.color = "green";
                    const sucess = document.getElementById('sucess');
                    sucess.style.display = 'flex';
                    const ok = document.getElementById('ok').addEventListener('click', () => {
                        sucess.style.display = 'none';
                        inputs.value = "";
                    })

                } else {
                    console.error("Erro ao enviar dados. Status:", response.status);
                    mensagemError.innerHTML = `Falha no envio (Status: ${response.status}).`;
                    mensagemError.style.color = "red";
                }

            } catch (error) {
                console.error("Erro de rede/fetch:", error);
                mensagemsucess.innerHTML = "Ocorreu um erro!!!";
                mensagemsucess.style.color = "red";
                const sucess = document.getElementById('sucess');
                sucess.style.display = 'flex';
                const ok = document.getElementById('ok').addEventListener('click', () => {
                    sucess.style.display = 'none';
                })
            }
        } else {
            const validador = {
                nome: {
                    elemento: inputs.nome, mensagem: "Preencha o Nome Completo!"
                },
                tel: {
                    elemento: inputs.tel, mensagem: "Preencha o Telefone!"
                },
                indicacao: {
                    elemento: inputs.indicacao, mensagem: "Preencha a indicação!"
                },
                enderecoNo: {
                    elemento: inputs.enderecoNo, mensagem: "Preencha o Endereco!"
                },
                diaNovo: {
                    elemento: inputs.novamentday, mensagem: "Preencha o de Entrar em Contato!"
                }

            }

            let evalid = true;

            for (const chave in validador) {
                const campos = validador[chave];
                const elemento = campos.elemento;



                if (!campos.condicao || campos.condicao === 'sim') {
                    if (elemento && elemento.value.trim() === "") {
                        mensagemError.innerHTML = campos.mensagem;
                        mensagemError.style.color = "red";
                        elemento.focus();
                        elemento.style.border = '2px solid red';
                        evalid = false;
                        break;
                    } else if (elemento) {
                        elemento.style.border = '';
                    }
                }
            }
            if (!evalid) {
                return;
            }
            try {
                const response = await fetch("https://api.sheetmonkey.io/form/4vCwapwkA6uq1ARtdgFu3v", {
                    method: "post",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        Nome: inputs.nome.value,
                        Telefone: inputs.tel.value,
                        indicação: inputs.indicacao.value,
                        diaNovo: document.getElementById('novamente').value,
                        enderecoNo: document.getElementById('enderecono').value,

                    })
                })


                if (response.ok) {
                    mensagemsucess.innerHTML = "✅ Envio realizado com sucesso!";
                    mensagemsucess.style.color = "green";
                    const sucess = document.getElementById('sucess');
                    sucess.style.display = 'flex';
                    const ok = document.getElementById('ok').addEventListener('click', () => {
                        sucess.style.display = 'none';
                    })

                } else {
                    console.error("Erro ao enviar dados. Status:", response.status);
                    mensagemError.innerHTML = `Falha no envio (Status: ${response.status}).`;
                    mensagemError.style.color = "red";
                }

            } catch (error) {
                console.error("Erro de rede/fetch:", error);
                mensagemError.innerHTML = "Erro de conexão. Tente novamente.";
                mensagemError.style.color = "red";
            }
        }
    };
    formCli.addEventListener('click', envForm);
});


