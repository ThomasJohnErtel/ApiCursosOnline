document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Aqui você pode adicionar lógica para enviar os dados para um servidor
    // Para este exemplo, apenas exibiremos uma mensagem

    const messageElement = document.getElementById('message');
    messageElement.textContent = `Usuário ${username} cadastrado com sucesso!`;

    // Limpa os campos do formulário
    document.getElementById('registrationForm').reset();
});
