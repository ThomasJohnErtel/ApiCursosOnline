fetch('http://localhost:3000/carrinho')  
    .then(response => response.json())
    .then(data => {
        const carrinhoList = document.getElementById('carrinho-list');  
        data.forEach(carrinho => {
            const carrinhoDiv = document.createElement('div');
            carrinhoDiv.innerHTML = `
                <h2>${carrinho.title}</h2>
                <img src="${carrinho.image_url}" alt="${carrinho.title}">
                <p><strong>Descrição:</strong> ${carrinho.description}</p>
                <p><strong>Preço:</strong> ${carrinho.price}</p>
                <button onclick="deleteCarrinho(${carrinho.id})">Excluir</button>
            `;
            carrinhoList.appendChild(carrinhoDiv); 
        });
    })
    .catch(error => console.error('Erro ao carregar os itens do carrinho:', error));
