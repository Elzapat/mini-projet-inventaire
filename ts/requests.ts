employees();

interface Employee {
    last_name: string;
    first_name: string;
}

function employees() {
    ajaxRequest("GET", "php/requests.php/api/V1/employees", (data: Employee[]) => {
        $('#table-head').html(`<tr>
        <th scope="col">Nom</th>
        <th scope="col">Prenom</th>
        <th scope="col">En Savoir plus</th>
        </tr>`);
        $('#table-body').html("");
        data.forEach((element: Employee) => {
            $('#table-body').append(`<tr>
            <td data-label="Nom">${element.last_name}</td>
            <td data-label="Prenom">${element.first_name}</td>
            <td data-label="En Savoir plus"><button class="button">Button Chan</button></td>
        </tr>`)
        });
    })
}

interface Equipments {
    name: string;
}

function equipement() {
    ajaxRequest("GET", "php/requests.php/api/V1/equipments", (data: Equipments[]) => {
        $('#table-head').html(`<tr>
        <th scope="col">Nom</th>
        <th scope="col">En Savoir plus</th>
        </tr>`);
        $('#table-body').html("");
        data.forEach((element: Equipments) => {
            $('#table-body').append(`<tr>
            <td data-label="Nom">${element.name}</td>
            <td data-label="En Savoir plus"><button class="button">Button Chan</button></td>
        </tr>`)
        });
    })
}

