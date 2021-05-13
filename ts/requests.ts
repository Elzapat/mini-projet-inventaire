//Initialistaion du tableau
employees();

//type de employee dans le tableau
interface Employee {
    nom: string;
    prenom: string;
    mail: string;
}

//affiche tous les employés sur la page principale
function employees() {
    ajaxRequest("GET", "api/v1/utilisateurs", (data: Employee[]) => {
        $('#table-head').html(`<tr>
        <th scope="col">Nom</th>
        <th scope="col">Prenom</th>
        <th scope="col">En Savoir plus</th>
        </tr>`);
        $('#table-body').html("");
        data.forEach((element: Employee) => {
            $('#table-body').append(`<tr>
            <td data-label="Nom">${element.nom}</td>
            <td data-label="Prenom">${element.prenom}</td>
            <td data-label="En Savoir plus">
                <button data-ref="email:${element.mail}" class="button">
                    plus d'information
                </button>
            </td>
            </tr>`)
        });
    })
}

//type d'un equipement dans le tableau
interface Equipment {
    nom: string;
    num_serie: string;
}

//affiche tout les equipement sur la page principale
function equipements() {
    ajaxRequest("GET", "api/v1/materiels", (data: Equipment[]) => {
        $('#table-head').html(`<tr>
        <th scope="col">Numéro de série</th>
        <th scope="col">Nom</th>
        <th scope="col">En savoir plus</th>
        </tr>`);
        $('#table-body').html("");
        data.forEach((element: Equipment) => {
            $('#table-body').append(`<tr>
            <td data-label="Numéro de série">${element.num_serie}</td>
            <td data-label="Nom">${element.nom}</td>
            <td data-label="En Savoir plus">
                <button data-ref="serial:${element.num_serie}" class="button">
                    plus d'information
                </button>
            </td>
        </tr>`)
        });
    })
}

//type d'un employé dans la popup
interface FullEmployee {
    mail: string;
    nom: string;
    prenom: string;
    date_embauche: string;
}

//Permet d'afficher un employé dans la popup
function popupEmployee(link: string) {
    ajaxRequest("GET", link, (data: FullEmployee) => {
        $('#popup-title').html(`${data.prenom} ${data.nom}`);
        $('#popup-content').html(
            `<div class="popup-element" data-label="Nom">${data.nom}</div>
            <div class="popup-element" data-label="Prenom">${data.prenom}</div>
            <div class="popup-element" data-label="Email">${data.mail}</div>
            <div class="popup-element" data-label="Date d'embauche">${data.date_embauche}</div>
            <div class="popup-element" data-label="Matériels associés">
                <button data-ref="inventory:${data.mail}" class="button">
                    voir
                </button>
            </div>`);

    })
}

//type d'un équiment dans la popup
interface FullEquipment {
    serial_number: string;
    assignment_date: string;
    name: string;
    feature: string;
    manufacturing_date: string;
}

//Permet d'afficher un équiment dans la popup
function popupEquipement(link: string) {
    ajaxRequest("GET", link, (data: FullEquipment) => {
        $('#popup-title').html(`${data.name}`);
        $('#popup-content').html(
            `<div class="popup-element" data-label="Nom">${data.name}</div>
            <div class="popup-element" data-label="Caracteristique">${data.feature}</div>
            <div class="popup-element" data-label="Numéro de Série">${data.serial_number}</div>
            <div class="popup-element" data-label="Date d'affectation">${data.assignment_date}</div>
            <div class="popup-element" data-label="Date de fabrication">${data.manufacturing_date}</div>
            `);
    })
}

//permet d'afficher les équipement associés à un employé dans la popup
function popupLinkedEquipement(link: string, email: string) {
    $("#popup-back").css('visibility', 'visible');
    $("#popup-back").data("ref", `email:${email}`);
    ajaxRequest("GET", link, (data: FullEquipment[]) => {
        $('#popup-title').html(`${email}`);
        $('#popup-content').html("");
        data.forEach((element: FullEquipment) => {
            $('#popup-content').append(`<div class="popup-element" data-label="Nom">${element.name}</div>`);
        });
    })
}