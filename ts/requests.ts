interface Employees {
    last_name: string;
    first_name: string;
}


ajaxRequest("GET", "php/requests/php/api/V1/employees", (data) => {
    console.log("data");
    console.log(data);
    data.array.forEach((element: Employees) => {
        $('#table-body').append(`<tr>
        <td data-label="Nom">${element.last_name}</td>
        <td data-label="Prenom">${element.first_name}</td>
        <td data-label="En Savoir plus"><button class="button">Button Chan</button></td>
    </tr>`)
    });
})