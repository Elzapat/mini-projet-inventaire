employees();
//affiche tous les employés sur la page principale
function employees() {
    ajaxRequest("GET", "php/requests.php/api/V1/employees", (data) => {
        $('#table-head').html(`<tr>
        <th scope="col">Nom</th>
        <th scope="col">Prenom</th>
        <th scope="col">En Savoir plus</th>
        </tr>`);
        $('#table-body').html("");
        data.forEach((element) => {
            $('#table-body').append(`<tr>
            <td data-label="Nom">${element.last_name}</td>
            <td data-label="Prenom">${element.first_name}</td>
            <td data-label="En Savoir plus">
                <button data-ref="email:${element.email}" class="button">
                    plus d'information
                </button>
            </td>
            </tr>`);
        });
    });
}
//affiche tout les equipement sur la page principale
function equipements() {
    ajaxRequest("GET", "php/requests.php/api/V1/equipments", (data) => {
        $('#table-head').html(`<tr>
        <th scope="col">Numéro de série</th>
        <th scope="col">Nom</th>
        <th scope="col">En savoir plus</th>
        </tr>`);
        $('#table-body').html("");
        data.forEach((element) => {
            $('#table-body').append(`<tr>
            <td data-label="Numéro de série">${element.serial_number}</td>
            <td data-label="Nom">${element.name}</td>
            <td data-label="En Savoir plus">
                <button data-ref="serial:${element.serial_number}" class="button">
                    plus d'information
                </button>
            </td>
        </tr>`);
        });
    });
}
function popupEmployee(link) {
    ajaxRequest("GET", link, (data) => {
        $('#popup-title').html(`${data.first_name} ${data.last_name}`);
        $('#popup-content').html(`<div class="popup-element" data-label="Nom">${data.last_name}</div>
            <div class="popup-element" data-label="Prenom">${data.first_name}</div>
            <div class="popup-element" data-label="Email">${data.email}</div>
            <div class="popup-element" data-label="Date d'embauche">${data.hiring_date}</div>
            <div class="popup-element" data-label="matériel associé">
                <button data-ref="serial:${data.email}" class="button">
                    voir
                </button>
            </div>`);
    });
}
function popupEquipement(link) {
    ajaxRequest("GET", link, (data) => {
        $('#popup-title').html(`${data.name}`);
        $('#popup-content').html(`<div class="popup-element" data-label="Nom">${data.name}</div>
            <div class="popup-element" data-label="Caracteristique">${data.feature}</div>
            <div class="popup-element" data-label="Numéro de Série">${data.serial_number}</div>
            <div class="popup-element" data-label="Date d'assignement">${data.assignment_date}</div>
            <div class="popup-element" data-label="Date de sortie d'usine">${data.manufacturing_date}</div>
            `);
    });
}
