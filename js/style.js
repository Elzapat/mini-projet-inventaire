$('ul.tabs li').on("click", (event) => {
    let tab_id = $(event.currentTarget).attr('data-tab');
    if (tab_id == "tab-1") {
        employees();
    }
    else {
        equipements();
    }
    $('ul.tabs li').removeClass('current');
    $(event.currentTarget).addClass('current');
});
$("#search").on("keyup", (event) => {
    let value = $(event.currentTarget).val().toLowerCase();
    $("#table-body tr").filter((_index, element) => {
        $(element).toggle($(element).text().toLowerCase().indexOf(value) > -1);
        return false;
    });
});
