//Initialistaion du tableau
employees();
//affiche tous les employés sur la page principale
function employees() {
    ajaxRequest("GET", "api/v1/utilisateurs", (data) => {
        $('#table-head').html(`<tr>
        <th scope="col">Nom</th>
        <th scope="col">Prenom</th>
        <th scope="col">En Savoir plus</th>
        </tr>`);
        $('#table-body').html("");
        data.forEach((element) => {
            $('#table-body').append(`<tr>
            <td data-label="Nom">${element.nom}</td>
            <td data-label="Prenom">${element.prenom}</td>
            <td data-label="En Savoir plus">
                <button data-ref="email:${element.mail}" class="button">
                    plus d'information
                </button>
            </td>
            </tr>`);
        });
    });
}
//affiche tout les equipement sur la page principale
function equipements() {
    ajaxRequest("GET", "api/v1/materiels", (data) => {
        $('#table-head').html(`<tr>
        <th scope="col">Nom</th>
        <th scope="col">En savoir plus</th>
        </tr>`);
        $('#table-body').html("");
        data.forEach((element) => {
            $('#table-body').append(`<tr>
            <td data-label="Nom">${element.nom}</td>
            <td data-label="En Savoir plus">
                <button data-ref="serial:${element.nom}" class="button">
                    plus d'information
                </button>
            </td>
        </tr>`);
        });
    });
}
//Permet d'afficher un employé dans la popup
function popupEmployee(link) {
    ajaxRequest("GET", link, (data) => {
        $('#popup-title').html(`${data.prenom} ${data.nom}`);
        $('#popup-content').html(`<div class="popup-element" data-label="Nom">${data.nom}</div>
            <div class="popup-element" data-label="Prenom">${data.prenom}</div>
            <div class="popup-element" data-label="Email">${data.mail}</div>
            <div class="popup-element" data-label="Date d'embauche">${data.date_embauche}</div>
            <div class="popup-element" data-label="Matériels associés">
                <button data-ref="inventory:${data.mail}" class="button">
                    voir
                </button>
            </div>`);
    });
}
//Permet d'afficher un équiment dans la popup
function popupEquipement(link) {
    ajaxRequest("GET", link, (data) => {
        $('#popup-title').html(`${data.nom}`);
        $('#popup-content').html(`<div class="popup-element" data-label="Nom">${data.nom}</div>
            <div class="popup-element" data-label="Caracteristique">${data.caracteristique}</div>
            <div class="popup-element" data-label="Date de fabrication">${data.date_fabrication}</div>
            `);
    });
}
//permet d'afficher les équipement associés à un employé dans la popup
function popupLinkedEquipement(link, email) {
    $("#popup-back").css('visibility', 'visible');
    $("#popup-back").data("ref", `email:${email}`);
    ajaxRequest("GET", link, (data) => {
        $('#popup-title').html(`${email}`);
        $('#popup-content').html("");
        data.forEach((element) => {
            $('#popup-content').append(`<div class="popup-element" data-label="Nom">${element.nom}</div>`);
        });
    });
}
