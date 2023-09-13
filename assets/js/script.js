document.getElementById('cep-button').addEventListener('click', function () {
    const cp = document.getElementById('cep-input').value;

    const apiUrl = `https://json.geoapi.pt/codigo_postal/${cp}?json=1`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
           throw new Error('Erro ao fazer a solicitação. Status: ' + response.status);
        }
        return response.json();
    })
        
        .then(data => {
        const resultsDiv = document.getElementById('cep-results');
        resultsDiv.innerHTML = '';
          
        if (data.ruas || data.Concelho ||data.Distrito||data.centro !== undefined) {
            const address = data.ruas
            const Municipality = data.Concelho
            const District = data.Distrito
            const coordinated = data.centro[0] + ', ' + data.centro[1]

            const resultHTML = `
                <p><strong>Endereço:</strong> ${address}</p>
                <p><strong>Concelho:</strong> ${Municipality}</p>
                <p><strong>Distrito:</strong> ${District}</p>
                <p><strong>Coordenadas:</strong> ${coordinated}</p>
            `;

            resultsDiv.innerHTML = resultHTML;
        } else {
            resultsDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        }
    })
    .catch(error => {
        console.error('Ocorreu um erro ao processar a consulta:', error);
        window.alert('Verifique o código postal informado.', error);
        //limpar o campo
        document.getElementById('cep-input').value = '';
        document.getElementById('cep-results').innerHTML = '';
    });
});