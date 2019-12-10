class Request {
    /**
     * Realiza uma requisição GET, retornando uma Promise com a resposta.
     *
     * @param {string} url - A URL de onde se quer fazer a requisição
     * @param {string} [responseType=json] - O tipo de resposta que se deseja
     * obter. Por padrão, o tipo será JSON
     * @returns {Promise} Uma Promise que retorna a resposta do servidor
     */
    static async post(url, responseType = 'json') {

        return await new Promise(function (resolve, reject) {

            let request = new XMLHttpRequest();
            request.responseType = responseType;
            request.open('POST', url, true);
            request.onreadystatechange = function() {
                if (request.readyState === 4 && request.status === 200)
                    resolve(request.response);
            };
            request.onerror = reject;
            request.send();

        });

    }
};
