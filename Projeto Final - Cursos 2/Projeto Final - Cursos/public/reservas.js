fetch('http://localhost:3000/reservas')
    .then(response => response.json())
    .then(data => {
        const reservaList = document.getElementById('reserva-list');
        data.forEach(reserva => {
            const reservaDiv = document.createElement('div');
            reservaDiv.innerHTML = `
                <h2>${reserva.nome}</h2>
                <p><strong>Descrição:</strong> ${reserva.descricao}</p>
                <p><strong>Data:</strong> ${reserva.data}</p>
                <p><strong>Local:</strong> ${reserva.local}</p>
            `;
            reservaList.appendChild(reservaDiv);
        });
    });
