const apiUrlPacientes = "https://voll-hcdsf0cjf9bnb9ck.canadacentral-01.azurewebsites.net/pacientes";
const apiUrlMedicos = "https://voll-hcdsf0cjf9bnb9ck.canadacentral-01.azurewebsites.net/medicos";
const apiUrlConsultas = "https://voll-hcdsf0cjf9bnb9ck.canadacentral-01.azurewebsites.net/consultas";
const token = localStorage.getItem("token");

document
  .getElementById("btnListarPacientes")
  .addEventListener("click", listarPacientes);
// Função para listar pacientes
async function listarPacientes() {
  try {
    toggleLoader(true);
    const response = await fetch(apiUrlPacientes, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const pacienteList = document.getElementById("pacienteList");
    pacienteList.innerHTML = "";
    if (response.ok) {
      data.content.forEach((paciente) => {
        const div = document.createElement("div");
        div.textContent = `ID: ${paciente.id}, ${paciente.nome}, email: ${paciente.email}, Telefone: ${paciente.telefone}`;
        pacienteList.appendChild(div);
      });
    }
  } catch (error) {
    alert("Ocorreu um erro ao tentar listar: " + error.message);
  } finally {
    toggleLoader(false);
  }
}

// Função para listar médicos
async function listarMedicos() {
  try {
    toggleLoader(true);
    const response = await fetch(apiUrlMedicos, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const medicoList = document.getElementById("medicoList");
    medicoList.innerHTML = "";
    if (response.ok) {
      data.content.forEach((medico) => {
        const div = document.createElement("div");
        div.textContent = `ID: ${medico.id}, ${medico.nome}, email: ${medico.email}, CRM: ${medico.crm}, Especialidade: ${medico.especialidade}`;
        medicoList.appendChild(div);
      });
    }
  } catch (error) {
    alert("Ocorreu um erro ao tentar listar: " + error.message);
  } finally {
    toggleLoader(false);
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
        document.getElementById("cadastroPacienteForm").reset();
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
        document.getElementById("cadastroMedicoForm").reset();
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

// Agendamento de Consultas
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
        alert(`Consulta agendada com sucesso! ID: ${data.id}`);
      } else {
        const data = await response.json();
        alert("Erro: " + data.message);
      }
    } catch (error) {
      alert("Erro ao agendar consulta.");
    }
  });

// Listar consultas
async function listarConsultas() {
  try {
    toggleLoader(true);
    const response = await fetch(`${apiUrlConsultas}/ativas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data);
    const consultaList = document.getElementById("consultaList");
    consultaList.innerHTML = "";
    if (response.ok) {
      data.content.forEach((consulta) => {
        const div = document.createElement("div");
        const dataConsulta = new Date(consulta.data); // Converte para um objeto Date
        const opcoes = {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false, // Mantenha como 'false' para 24 horas
        };
        const horaFormatada = dataConsulta.toLocaleTimeString("pt-BR", opcoes); // Formata a hora
        const dataFormatada = dataConsulta.toLocaleDateString("pt-BR"); // Formata a data
        div.textContent = `ID: ${consulta.id}, Paciente ID: ${consulta.idPaciente}, Medico ID: ${consulta.idMedico}, Data: ${dataFormatada} ${horaFormatada}, Especialidade: ${consulta.especialidade}`;
        consultaList.appendChild(div);
      });
    }
  } catch (error) {
    alert("Ocorreu um erro ao tentar listar: " + error.message);
  } finally {
    toggleLoader(false);
  }
}

document
  .getElementById("btnListarConsultas")
  .addEventListener("click", listarConsultas);

// Cancelamento de Consultas
document
  .getElementById("cancelarConsultaForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const motivoCancelar = document
      .getElementById("motivoCancelar")
      .value.toUpperCase();
    const idConsultaCancelar =
      document.getElementById("idConsultaCancelar").value;
    const id = parseInt(idConsultaCancelar, 10);
    const apiUrl = `${apiUrlConsultas}/${id}`;
    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ motivo: motivoCancelar, idConsulta: id }),
      });

      if (response.ok) {
        alert("Consulta cancelada com sucesso!");
        document.getElementById("cancelarConsultaForm").reset();
      } else {
        const errorMessage = await response.text();
        alert(`Erro ao cancelar consulta: ${errorMessage}`);
      }
    } catch (error) {
      alert("Erro ao cancelar consulta.");
      console.error(error);
    }
  });

function toggleLoader(show) {
  const elem_preloader = document.getElementById("preloader");
  const elem_loader = document.getElementById("loader");

  if (show) {
    elem_preloader.classList.remove("hidden");
    elem_loader.classList.remove("hidden");
  } else {
    elem_preloader.classList.add("hidden");
    elem_loader.classList.add("hidden");
  }
}



function setMinTime() {
  const input = document.getElementById('dataConsulta');
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  // Define o horário mínimo como 8h do dia atual
  const minDateTime = `${year}-${month}-${day}T08:00`;
  input.setAttribute('min', minDateTime);
}

// Chama a função ao carregar a página
window.onload = setMinTime;


function recarregarPagina() {
  location.reload();
}
