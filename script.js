document.addEventListener('DOMContentLoaded', () => {

    const formCli = document.getElementById('formClient');
    const buttom = document.getElementById('btn-cad');
    

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
        responsavel: document.getElementById('responsavel'),
        novamentday: document.getElementById('novamente'),
        indicacao: document.getElementById('indicacao'),
    }
    
    const addloading = ()=>{
       buttom.innerHTML = "Carregando....";
    }

    const removeloading = ()=>{
       buttom.innerHTML = "Cadastrar";
    }

    const mostrarCheck = (event) => {
        const escolha = event.target.value;
        mensagemError.innerHTML = ''; 
        
        yesResponse.style.display = 'none';
        NoResponse.style.display = 'none';

        switch (escolha) {
            case "sim":
                yesResponse.style.display = 'flex';
                break;
            case "nao":
                NoResponse.style.display = 'flex';
                break;
            default:
                break;
        }
    }

    checkSim.addEventListener('click', mostrarCheck);
    checkNao.addEventListener('click', mostrarCheck);



    const envForm = async (event) => { 
        event.preventDefault();
        
        mensagemError.innerHTML = ''; 
        mensagemsucess.innerHTML = '';
        
        
        const escolha = checkSim.checked ? "sim" : checkNao.checked ? "nao" : null;
        
        if (!escolha) {
            mensagemError.innerHTML = "Por favor, marque 'Sim' ou 'Não'.";
            mensagemError.style.color = "red";
            return;
        }
        
        let validador = {};
        let payload = {};
        
        
        
        if (escolha === "sim") {
            
            validador = {
                nome: { elemento: inputs.nome, mensagem: "Preencha o Nome Completo!" },
                tel: { elemento: inputs.tel, mensagem: "Preencha o Telefone!" },
                indicacao: { elemento: inputs.indicacao, mensagem: "Preencha a indicação!" },
                cpf: { elemento: inputs.cpf, mensagem: "Preencha o CPF!" },
                enderecoYes: { elemento: inputs.enderecoYes, mensagem: "Preencha o Endereço!" },
                dayconvert: { elemento: inputs.dayconvert, mensagem: "Preencha a Data!" },
                beneficio: { elemento: inputs.beneficio, mensagem: "Preencha o Tipo de Beneficio!" },
                responsavel: { elemento: inputs.responsavel, mensagem: "Preencha Quem é o Responsável!" },
            };
            
            
            payload = {
                Nome: inputs.nome.value,
                Telefone: inputs.tel.value,
                Indicação: inputs.indicacao.value,
                Cpf: inputs.cpf.value.replace(/\D/g, ''),
                Endereco: inputs.enderecoYes.value,
                DiaConvertido: inputs.dayconvert.value,
                Beneficio: inputs.beneficio.value,
                Responsavel: inputs.responsavel.value,
            };
            
        } else { 
            
            validador = {
                nome: { elemento: inputs.nome, mensagem: "Preencha o Nome Completo!" },
                tel: { elemento: inputs.tel, mensagem: "Preencha o Telefone!" },
                indicacao: { elemento: inputs.indicacao, mensagem: "Preencha a indicação!" },
                enderecoNo: { elemento: inputs.enderecoNo, mensagem: "Preencha o Endereço!" },
                diaNovo: { elemento: inputs.novamentday, mensagem: "Preencha o dia para Entrar em Contato!" }
            };
            
            
            payload = {
                Nome: inputs.nome.value,
                Telefone: inputs.tel.value,
                Indicação: inputs.indicacao.value,
                EnderecoNC: inputs.enderecoNo.value,
                Dia_Contato: inputs.novamentday.value,
            };
        }
        addloading();

    
        let valido = true;

        for (const chave in validador) {
            const campos = validador[chave];
            const elemento = campos.elemento;

            if (elemento && elemento.value.trim() === "") {
                mensagemError.innerHTML = campos.mensagem;
                mensagemError.style.color = "#D93025";
                elemento.style.border = '2px solid red';
                elemento.focus();
                valido = false;
                break;
            } else if (elemento) {
                elemento.style.border = '';
            }
        }
        
        if (!valido) {
            return;
        }

        
        try {
            const response = await fetch("https://api.sheetmonkey.io/form/4vCwapwkA6uq1ARtdgFu3v", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                
                mensagemsucess.innerHTML = "✅ Envio realizado com sucesso!";
                mensagemsucess.style.color = "green";
                
                const sucessModal = document.getElementById('sucess');
                if (sucessModal) {sucessModal.style.display = 'flex'};
                
                formCli.reset(); 
                yesResponse.style.display = 'none';
                NoResponse.style.display = 'none';
                
                const okButton = document.getElementById('ok');
                if (okButton) {
                     okButton.addEventListener('click', () => {
                         if (sucessModal) {sucessModal.style.display = 'none'};
                         mensagemsucess.innerHTML = '';
                         removeloading()
                     }, { once: true }); 
                }

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
    };
    
    if (formCli) {
        formCli.addEventListener('submit', envForm);
    } 
});