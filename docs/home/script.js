const apiUrlPacientes = "http://localhost:8080/pacientes";
const apiUrlMedicos = "http://localhost:8080/medicos";
const apiUrlConsultas = "http://localhost:8080/consultas";
const token = localStorage.getItem("token");

// Função para listar pacientes
async function listarPacientes() {
  try {
    const response = await fetch(apiUrlPacientes, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const pacienteList = document.getElementById("pacienteList");
    pacienteList.innerHTML = "";
    if (response.ok) {
      data.content.forEach((paciente) => {
        const div = document.createElement("div");
        div.textContent = `ID: ${paciente.id}, Nome: ${paciente.nome}, Email: ${paciente.email}, Telefone: ${paciente.telefone}`;
        pacienteList.appendChild(div);
      });
    }
  } catch (error) {
    alert("Ocorreu um erro ao tentar listar: " + error.message);
  }
}

document
  .getElementById("btnListarPacientes")
  .addEventListener("click", listarPacientes);

// Função para listar médicos
async function listarMedicos() {
  try {
    const response = await fetch(apiUrlMedicos, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const medicoList = document.getElementById("medicoList");
    medicoList.innerHTML = "";
    if (response.ok) {
      data.content.forEach((medico) => {
        const div = document.createElement("div");
        div.textContent = `ID: ${medico.id}, Nome: ${medico.nome}, Email: ${medico.email}, CRM: ${medico.crm}, Especialidade: ${medico.especialidade}`;
        medicoList.appendChild(div);
      });
    }
  } catch (error) {
    alert("Ocorreu um erro ao tentar listar: " + error.message);
  }
}

document
  .getElementById("btnListarMedicos")
  .addEventListener("click", listarMedicos);

// Cadastro de Pacientes
document
  .getElementById("cadastroPacienteForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const nome = document.getElementById("nomePacienteCadastro").value;
    const email = document.getElementById("emailPacienteCadastro").value;
    const telefone = document.getElementById("telefonePacienteCadastro").value;
    const cpf = document.getElementById("cpfPacienteCadastro").value;
    const logradouro = document.getElementById("logradouroPaciente").value;
    const bairro = document.getElementById("bairroPaciente").value;
    const cep = document.getElementById("cepPaciente").value;
    const cidade = document.getElementById("cidadePaciente").value;
    const uf = document.getElementById("ufPaciente").value;
    const complemento = document.getElementById("complementoPaciente").value;
    const numero = document.getElementById("numeroPaciente").value;

    if (
      !nome ||
      !email ||
      !telefone ||
      !cpf ||
      !logradouro ||
      !bairro ||
      !cep ||
      !cidade ||
      !uf ||
      !numero
    ) {
      return;
    }

    try {
      const response = await fetch(apiUrlPacientes, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
            numero,
          },
        }),
      });

      if (response.ok) {
        listarPacientes();
        alert("Paciente cadastrado com sucesso!");
      } else {
        const data = await response.json();
        alert("Erro: " + data.message);
      }
    } catch (error) {
      alert("Ocorreu um erro ao tentar cadastrar: " + error.message);
    }
  });

// Cadastro de Médicos
document
  .getElementById("cadastroMedicoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const nome = document.getElementById("nomeMedico").value;
    const email = document.getElementById("emailMedico").value;
    const telefone = document.getElementById("telefoneMedico").value;
    const crm = document.getElementById("crmMedico").value;
    const especialidade = document.getElementById("especialidadeMedico").value;
    const logradouro = document.getElementById("logradouroMedico").value;
    const bairro = document.getElementById("bairroMedico").value;
    const cep = document.getElementById("cepMedico").value;
    const cidade = document.getElementById("cidadeMedico").value;
    const uf = document.getElementById("ufMedico").value;
    const complemento = document.getElementById("complementoMedico").value;
    const numero = document.getElementById("numeroMedico").value;

    if (
      !nome ||
      !email ||
      !telefone ||
      !crm ||
      !especialidade ||
      !logradouro ||
      !bairro ||
      !cep ||
      !cidade ||
      !uf ||
      !numero
    ) {
      return;
    }

    try {
      const response = await fetch(apiUrlMedicos, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
            numero,
          },
        }),
      });

      if (response.ok) {
        listarMedicos();
        alert("Médico cadastrado com sucesso!");
      } else {
        const data = await response.json();
        alert("Erro: " + data.message);
      }
    } catch (error) {
      alert("Ocorreu um erro ao tentar cadastrar: " + error.message);
    }
  });

// Excluir Paciente
async function excluirPaciente(event) {
  event.preventDefault();
  const inputId = document.getElementById("idExcluirPaciente").value;
  const id = parseInt(inputId, 10);
  const apiUrl = `${apiUrlPacientes}/${id}`;

  if (isNaN(id)) {
    alert("Por favor, insira um ID válido.");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Paciente excluído com sucesso!");
      listarPacientes();
    } else {
      const errorData = await response.text();
      alert("Erro ao excluir paciente: " + response.statusText);
    }
  } catch (error) {
    alert("Ocorreu um erro ao tentar excluir o paciente: " + error.message);
  }
}
document
  .getElementById("excluirPacienteForm")
  .addEventListener("submit", excluirPaciente);

// Excluir Médico
async function excluirMedico(event) {
  event.preventDefault();
  const inputId = document.getElementById("idExcluirMedico").value;
  const id = parseInt(inputId, 10);
  const apiUrl = `${apiUrlMedicos}/${id}`;

  if (isNaN(id)) {
    alert("Por favor, insira um ID válido.");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Médico excluído com sucesso!");
      listarMedicos();
    } else {
      const errorData = await response.text();
      alert("Erro ao excluir médico: " + response.statusText);
    }
  } catch (error) {
    alert("Ocorreu um erro ao tentar excluir o médico: " + error.message);
  }
}
document
  .getElementById("excluirMedicoForm")
  .addEventListener("submit", excluirMedico);

// Atualizar Paciente
document
  .getElementById("atualizarPacienteForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const idPaciente = document.getElementById("idPacienteAtualizar").value;
    const nome = document.getElementById("nomePacienteAtualizar").value;
    const telefone = document.getElementById("telefonePacienteAtualizar").value;
    const logradouro = document.getElementById(
      "logradouroPacienteAtualizar"
    ).value;
    const bairro = document.getElementById("bairroPacienteAtualizar").value;
    const cep = document.getElementById("cepPacienteAtualizar").value;
    const cidade = document.getElementById("cidadePacienteAtualizar").value;
    const uf = document.getElementById("ufPacienteAtualizar").value;
    const complemento = document.getElementById(
      "complementoPacienteAtualizar"
    ).value;
    const numero = document.getElementById("numeroPacienteAtualizar").value;
    const id = parseInt(idPaciente, 10);
    const apiUrl = `${apiUrlPacientes}/${id}`;

    if (isNaN(id)) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          nome,
          telefone,
          endereco: {
            logradouro,
            bairro,
            cep,
            cidade,
            uf,
            complemento,
            numero,
          },
        }),
      });

      if (response.ok) {
        alert("Paciente atualizado com sucesso!");
      } else {
        const data = await response.json();
        alert("Erro: " + data.message);
      }
    } catch (error) {
      alert("Erro ao atualizar paciente.");
    }
  });

// Atualizar Médico
document
  .getElementById("atualizarMedicoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const idMedico = document.getElementById("idMedicoAtualizar").value;
    const nome = document.getElementById("nomeMedicoAtualizar").value;
    const telefone = document.getElementById("telefoneMedicoAtualizar").value;
    const logradouro = document.getElementById(
      "logradouroMedicoAtualizar"
    ).value;
    const bairro = document.getElementById("bairroMedicoAtualizar").value;
    const cep = document.getElementById("cepMedicoAtualizar").value;
    const cidade = document.getElementById("cidadeMedicoAtualizar").value;
    const uf = document.getElementById("ufMedicoAtualizar").value;
    const complemento = document.getElementById(
      "complementoMedicoAtualizar"
    ).value;
    const numero = document.getElementById("numeroMedicoAtualizar").value;
    const id = parseInt(idMedico, 10);
    const apiUrl = `${apiUrlMedicos}/${id}`;

    if (isNaN(id)) {
      alert("Por favor, insira um ID válido.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          nome,
          telefone,
          endereco: {
            logradouro,
            bairro,
            cep,
            cidade,
            uf,
            complemento,
            numero,
          },
        }),
      });

      if (response.ok) {
        alert("Médico atualizado com sucesso!");
      } else {
        const data = await response.json();
        alert("Erro: " + data.message);
      }
    } catch (error) {
      alert("Erro ao atualizar médico.");
    }
  });

// Agendamento de Consultas // POST
document
  .getElementById("agendarConsultaForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const idPaciente = document.getElementById("idPacienteConsulta").value;
    const idMedico = document.getElementById("idMedicoConsulta").value;
    const dataConsulta = document.getElementById("dataConsulta").value;

    try {
      const response = await fetch(apiUrlConsultas, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idPaciente, idMedico, data: dataConsulta }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(
          `Consulta agendada com sucesso! Detalhes: ${JSON.stringify(data)}`
        );
      } else {
        const data = await response.json();
        alert("Erro: " + data.message);
      }
    } catch (error) {
      alert("Erro ao agendar consulta.");
    }
  });
