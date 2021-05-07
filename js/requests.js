employees();
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
            <td data-label="En Savoir plus"><button class="button">plus d'information</button></td>
        </tr>`);
        });
    });
}
function equipements() {
    ajaxRequest("GET", "php/requests.php/api/V1/equipments", (data) => {
        $('#table-head').html(`<tr>
        <th scope="col">Nom</th>
        <th scope="col">En Savoir plus</th>
        </tr>`);
        $('#table-body').html("");
        data.forEach((element) => {
            $('#table-body').append(`<tr>
            <td data-label="Nom">${element.name}</td>
            <td data-label="En Savoir plus"><button class="button">plus d'information</button></td>
        </tr>`);
        });
    });
}
