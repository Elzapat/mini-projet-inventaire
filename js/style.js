$('ul.tabs li').click(function () {
    var tab_id = $(this).attr('data-tab');
    if (tab_id == "tab-1") {
        employees();
    }
    else {
        equipement();
    }
    $('ul.tabs li').removeClass('current');
    $(this).addClass('current');
});
$("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#table-body tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
});
