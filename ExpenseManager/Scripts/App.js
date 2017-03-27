'use strict';


$(document).ready(function () {
    $('#showIncome').on('click', function (e) {
        e.preventDefault();
        addIncome(e.attr("id"));
    });

    $('#showPayment').on('click', function (e) {
        e.preventDefault();
        addPayment();
    });
});


function addIncome(id) {
    BootstrapDialog.show();
}

function addPayment(id) {
    BootstrapDialog.show();

}
