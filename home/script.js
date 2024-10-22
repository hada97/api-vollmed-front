const apiUrlPacientes = 'http://localhost:8080/pacientes';
const apiUrlMedicos = 'http://localhost:8080/medicos';
const apiUrlConsultas = 'http://localhost:8080/consultas';
const token = localStorage.getItem('token');

// Função para listar pacientes
async function listarPacientes() {
    try {
        const response = await fetch(apiUrlPacientes, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        const pacienteList = document.getElementById('pacienteList');
        pacienteList.innerHTML = '';

        if (response.ok) {
            data.content.forEach(paciente => {
                const div = document.createElement('div');
                div.textContent = `ID: ${paciente.id}, Nome: ${paciente.nome}, Email: ${paciente.email}, Telefone: ${paciente.telefone}`;
                pacienteList.appendChild(div);
            });
        } else {
            pacienteList.textContent = 'Erro ao listar pacientes.';
        }
    } catch (error) {
        document.getElementById('message').textContent = 'Erro ao listar pacientes.';
    }
}

// Adicionando o evento de clique ao botão
document.getElementById('btnListarPacientes').addEventListener('click', listarPacientes);

// Função para listar médicos
async function listarMedicos() {
    try {
        const response = await fetch(apiUrlMedicos, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        const medicoList = document.getElementById('medicoList');
        medicoList.innerHTML = '';

        if (response.ok) {
            data.content.forEach(medico => {
                const div = document.createElement('div');
                div.textContent = `ID: ${medico.id}, Nome: ${medico.nome}, Email: ${medico.email}, CRM: ${medico.crm}, Especialidade: ${medico.especialidade}`;
                medicoList.appendChild(div);
            });
        } else {
            medicoList.textContent = 'Erro ao listar médicos.';
        }
    } catch (error) {
        document.getElementById('messageMedicos').textContent = 'Erro ao listar médicos.';
    }
}

// Adicionando o evento de clique ao botão
document.getElementById('btnListarMedicos').addEventListener('click', listarMedicos);


// Cadastro de Pacientes
document.getElementById('cadastroPacienteForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const nome = document.getElementById('nomePaciente').value;
    const email = document.getElementById('emailPaciente').value;
    const telefone = document.getElementById('telefonePaciente').value;
    const cpf = document.getElementById('cpfPaciente').value;
    const logradouro = document.getElementById('logradouro').value;
    const bairro = document.getElementById('bairro').value;
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const uf = document.getElementById('uf').value;
    const complemento = document.getElementById('complemento').value;
    const numero = document.getElementById('numero').value;

    // Validação dos campos obrigatórios
    if (!nome || !email || !telefone || !cpf || !logradouro || !bairro || !cep || !cidade || !uf || !numero) {
        document.getElementById('message').textContent = 'Por favor, preencha todos os campos obrigatórios.';
        return;
    }

    try {
        const response = await fetch(apiUrlPacientes, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome,
                email,
                telefone,
                cpf,
                endereco: {
                    logradouro,
                    bairro,
                    cep,
                    cidade,
                    uf,
                    complemento,
                    numero
                }
            })
        });

        if (response.ok) {
            listarPacientes();
            document.getElementById('message').textContent = 'Paciente cadastrado com sucesso!';
        } else {
            const data = await response.json();
            document.getElementById('message').textContent = 'Erro: ' + data.message;
        }
    } catch (error) {
        document.getElementById('message').textContent = 'Erro ao cadastrar paciente.';
    }
});


// Cadastro de Médicos
document.getElementById('cadastroMedicoForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const nome = document.getElementById('nomeMedico').value;
    const email = document.getElementById('emailMedico').value;
    const telefone = document.getElementById('telefoneMedico').value;
    const crm = document.getElementById('crmMedico').value;
    const especialidade = document.getElementById('especialidadeMedico').value;
    const logradouro = document.getElementById('logradouro').value;
    const bairro = document.getElementById('bairro').value;
    const cep = document.getElementById('cep').value;
    const cidade = document.getElementById('cidade').value;
    const uf = document.getElementById('uf').value;
    const complemento = document.getElementById('complemento').value;
    const numero = document.getElementById('numero').value;

    // Validação dos campos obrigatórios
    if (!nome || !email || !telefone || !crm || !especialidade ||
        !logradouro || !bairro || !cep || !cidade || !uf || !numero) {
        document.getElementById('message').textContent = 'Por favor, preencha todos os campos obrigatórios.';
        return;
    }

    try {
        const response = await fetch(apiUrlMedicos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                nome,
                email,
                telefone,
                crm,
                especialidade,
                endereco: {
                    logradouro,
                    bairro,
                    cep,
                    cidade,
                    uf,
                    complemento,
                    numero
                }
            })
        });

        if (response.ok) {
            listarMedicos();
            document.getElementById('message').textContent = 'Médico cadastrado com sucesso!';
        } else {
            const data = await response.json();
            document.getElementById('message').textContent = 'Erro: ' + data.message;
        }
    } catch (error) {
        document.getElementById('message').textContent = 'Erro ao cadastrar médico.';
    }
});

// Agendamento de Consultas
document.getElementById('agendarConsultaForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const idPaciente = document.getElementById('idPaciente').value;
    const idMedico = document.getElementById('idMedico').value;
    const dataConsulta = document.getElementById('dataConsulta').value;

    try {
        const response = await fetch(apiUrlConsultas, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ idPaciente, idMedico, dataConsulta })
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('message').textContent = `Consulta agendada com sucesso! Detalhes: ${JSON.stringify(data)}`;
        } else {
            const data = await response.json();
            document.getElementById('message').textContent = 'Erro: ' + data.message;
        }
    } catch (error) {
        document.getElementById('message').textContent = 'Erro ao agendar consulta.';
    }
});



// Função para excluir um paciente
async function excluirPaciente(event) {
    event.preventDefault();
    const inputId = document.getElementById('idExcluirPaciente').value;
    const id = parseInt(inputId, 10);
    const apiUrl = `http://localhost:8080/pacientes/${id}`;

    if (isNaN(id)) {
        alert('Por favor, insira um ID válido.');
        return;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Cabeçalho com o token
            }
        });
        
        if (response.ok) {
            alert('Paciente excluído com sucesso!');
            listarPacientes() 
        } else {
            const errorData = await response.text();
            console.error('Erro ao excluir paciente:', response.statusText, errorData);
            alert('Erro ao excluir paciente: ' + response.statusText);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar excluir o paciente: ' + error.message);
    }
}
// Adiciona um evento de submit ao formulário para excluir o paciente
document.getElementById('excluirPacienteForm').addEventListener('submit', excluirPaciente);



// Função para excluir um médico
async function excluirMedico(event) {
    event.preventDefault();
    const inputId = document.getElementById('idExcluirMedico').value;
    const id = parseInt(inputId, 10);
    const apiUrl = `http://localhost:8080/medicos/${id}`; // URL para a requisição

    if (isNaN(id)) {
        alert('Por favor, insira um ID válido.');
        return;
    }
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}` // Cabeçalho com o token
            }
        });
        if (response.ok) {
            alert('Médico excluído com sucesso!');
            listarMedicos() 
        } else {
            const errorData = await response.text();
            console.error('Erro ao excluir médico:', response.statusText, errorData);
            alert('Erro ao excluir médico: ' + response.statusText);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar excluir o médico: ' + error.message);
    }
}

// Adicione o listener de evento aqui
document.getElementById('excluirMedicoForm').addEventListener('submit', excluirMedico);



// Função para atualizar paciente
document.getElementById('atualizarPacienteForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    const idPaciente = document.getElementById('idPaciente').value;
    const nome = document.getElementById('nomePaciente').value;
    const telefone = document.getElementById('telefonePaciente').value;
    const logradouro = document.getElementById('logradouroPaciente').value;
    const bairro = document.getElementById('bairroPaciente').value;
    const cep = document.getElementById('cepPaciente').value;
    const cidade = document.getElementById('cidadePaciente').value;
    const uf = document.getElementById('ufPaciente').value;
    const complemento = document.getElementById('complementoPaciente').value;
    const numero = document.getElementById('numeroPaciente').value;

    const id = parseInt(idPaciente, 10);
    const apiUrl = `http://localhost:8080/pacientes/${id}`; // URL para a requisição

    if (isNaN(id)) {
        alert('Por favor, insira um ID válido.');
        return;
    }
    
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT', // Usar PUT para atualizar
            headers: {
                'Content-Type': 'application/json', // Define o tipo de conteúdo
                'Authorization': `Bearer ${token}` // Cabeçalho com o token
            },
            body: JSON.stringify({
                id: id,
                nome,
                telefone,
                endereco: {
                    logradouro,
                    bairro,
                    cep,
                    cidade,
                    uf,
                    complemento,
                    numero
                }
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar paciente');
        }

        const data = await response.json();
        alert('Paciente atualizado com sucesso!');
        document.getElementById('message').innerText = `Paciente ${data.nome} atualizado com sucesso!`;
    } catch (error) {
        document.getElementById('message').innerText = `Erro: ${error.message}`;
    }
});




// Função para atualizar médico
document.getElementById('atualizarMedicoForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    const idMedico = document.getElementById('idMedico').value;
    const nome = document.getElementById('nomeMedico').value;
    const telefone = document.getElementById('telefoneMedico').value;
    const logradouro = document.getElementById('logradouroMedico').value;
    const bairro = document.getElementById('bairroMedico').value;
    const cep = document.getElementById('cepMedico').value;
    const cidade = document.getElementById('cidadeMedico').value;
    const uf = document.getElementById('ufMedico').value;
    const complemento = document.getElementById('complementoMedico').value;
    const numero = document.getElementById('numeroMedico').value;
    const id = parseInt(idMedico, 10);
    const apiUrl = `http://localhost:8080/medicos/${id}`; // URL para a requisição

    if (isNaN(id)) {
        alert('Por favor, insira um ID válido.');
        return;
    }
    try {
        const response = await fetch(apiUrl, {
            method: 'PUT', // Usar PUT ou PATCH para atualizar
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Cabeçalho com o token
            },
            body: JSON.stringify({
                id: id,
                nome,
                telefone,
                endereco: {
                    logradouro,
                    bairro,
                    cep,
                    cidade,
                    uf,
                    complemento,
                    numero
                }
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar médico');
        }
        const data = await response.json();
        alert(`Médico ${data.nome} atualizado com sucesso!`); // Adicionado o alert
        document.getElementById('message').innerText = `Médico ${data.nome} atualizado com sucesso!`;
    } catch (error) {
        document.getElementById('message').innerText = `Erro: ${error.message}`;
    }
});
