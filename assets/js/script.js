document.getElementById('cep-button').addEventListener('click', function () {
    const apiKey = 'dff97f836e1b47d69613432b7adf154f';
    const cep = document.getElementById('cep-input').value;

    const apiUrl = `https://www.cttcodigopostal.pt/api/v1/${apiKey}/${cep}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a solicitação. Status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Mostra os dados da API no console
            const resultsDiv = document.getElementById('cep-results');
            resultsDiv.innerHTML = '';

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(result => {
                    const address = result.morada;
                    const locality = result.localidade;
                    const postalCode = result['codigo-postal'];
                    const infoLocal = result['info-local'];
                    const resultHTML = `
                        <p><strong>Endereço:</strong> ${address}</p>
                        <p><strong>Localidade:</strong> ${locality}</p>
                        <p><strong>Código Postal:</strong> ${postalCode}</p>
                        <p><strong>Informação Adicional:</strong> ${infoLocal}</p>
                    `;

                    resultsDiv.innerHTML += resultHTML;
                });
            } else {
                resultsDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro ao processar a consulta:', error);
            // Exiba uma mensagem de erro amigável para o usuário se desejar
        });
});
