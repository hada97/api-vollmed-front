       // Toggle para os formulários
        document.getElementById('togglePacienteForm').addEventListener('click', function() {
            const formContainer = document.getElementById('cadastroPacienteFormContainer');
            formContainer.classList.toggle('hidden');
        });

        document.getElementById('toggleAtualizarPacienteForm').addEventListener('click', function() {
            const formContainer = document.getElementById('atualizarPacienteFormContainer');
            formContainer.classList.toggle('hidden');
        });

        document.getElementById('toggleMedicoForm').addEventListener('click', function() {
            const formContainer = document.getElementById('cadastroMedicoFormContainer');
            formContainer.classList.toggle('hidden');
        });

        document.getElementById('toggleAtualizarMedicoForm').addEventListener('click', function() {
            const formContainer = document.getElementById('atualizarMedicoFormContainer');
            formContainer.classList.toggle('hidden');
        });