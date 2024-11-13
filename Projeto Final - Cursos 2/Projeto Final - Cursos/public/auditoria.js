fetch('http://localhost:3000/auditoria')
    .then(response => response.json())
    .then(data => {
        const auditoriaList = document.getElementById('auditoria-list');
        data.forEach(auditoria => {
            const auditoriaDiv = document.createElement('div');
            auditoriaDiv.innerHTML = `
                <h2>${auditoria.nome}</h2>
                <img src="${auditoria.foto}" alt="${auditoria.nome}">
                <p><strong>Descrição:</strong> ${auditoria.descricao}</p>
                <p><strong>Elenco:</strong> ${auditoria.elenco}</p>
            `;
            auditoriaList.appendChild(auditoriaDiv);
        });
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
