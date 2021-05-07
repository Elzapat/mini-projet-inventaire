function ajaxRequest(type: string, url: string,
    callback: (data: Object) => void, data: string = null): void {

    // Create XML HTTP request.
    let xhr = new XMLHttpRequest();
    if (type == 'GET' && data != null)
        url += '?' + data;
    xhr.open(type, url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Add the onload function.
    xhr.onload = () => {
        switch (xhr.status) {
            case 200:
            case 201:
                console.log(xhr.responseText);
                callback(JSON.parse(xhr.responseText));
                break;
            default:
                console.log(xhr.responseText);
                httpErrors(xhr.status);
        }
    };

    // Send XML HTTP request.
    xhr.send(data);
}

function httpErrors(errorCode: number) {
    let messages = {
        400: 'Requête incorrecte',
        401: 'Authentifiez vous',
        403: 'Accès refusé',
        404: 'Page non trouvée',
        500: 'Erreur interne du serveur',
        503: 'Service indisponible'
    };

    // Display error.
    if (errorCode in messages) {
        let errors = document.getElementById("errors");
        errors.innerHTML = "'<strong>'" + errorCode.toString()  + messages[errorCode] + "'</strong>'";
        errors.innerHTML = `<strong> ${errorCode.toString()}: ${messages[errorCode]}`;
        errors.style.display = "block";
        setTimeout(() => {
            errors.style.display = "none";
        }, 5000);
    }
}
