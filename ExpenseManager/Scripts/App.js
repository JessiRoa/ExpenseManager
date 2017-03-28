'use strict';
var incomstUrl = "../_api/lists/getbytitle('IncomesList')/items";
var paymentUrl = "../_api/lists/getbytitle('PaymentsList')/items";

$(document).ready(function () {
    moment.locale('sv');
    $.ajax({
        url: incomstUrl,
        method: "GET",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function (data) {
            var results = data.d.results;
            if (results.length > 0) {
                var item = '';
                
                for (var i = 0; i < results.length; i++) {
                    item += '<tr>';
                    item += '<td>' + results[i].Title + '</td>';
                    item += '<td>' + results[i].Description + '</td>';
                    item += '<td>' + moment(results[i].Date).format('YYYY MM DD') + '</td>';
                    item += '<td>' + results[i].Category + '</td>';
                    item += '<td>' + results[i].Expense + '</td>';
                    item += '</tr>';
                };

                $('#detailList tbody').append(item);
            }
        },
        error: function (error) {
            console.log('Error: ' + error);
        }
    });
    

    $('#fileFormSubmit').click(function (e) {
        //Check for edit or new and call update or add function
        if ($('#myModalLabel').html() == 'New Income') {
            addIncome($('#name').val(), $('#amount').val(), $('#date').val(), $('#description').val());
        } else if ($('#myModalLabel').html() == 'New Payment') {
            addPayment($('#name').val(), $('#amount').val(), $('#date').val(), $('#description').val());
        }
    });
});

function addNewFile() {
    $('#modal-title').html('Add New File');
    $('#name').val('');
    $('#amount').val('');
    $('#date').val('');
    $('#description').val('');
    $('#modalForm').modal('show');
};

//Add File function
var addIncome = function (fileTitle, fileName, fileType, team) {
    var requestUri = "../_api/web/lists/getByTitle('IncomesList')/items";
    var requestHeaders = {
        "accept": "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose",
        "X-RequestDigest": $('#__REQUESTDIGEST').val()
    }
    var fileData = {
        __metadata: { "type": "SP.Data.FilesListItem" },
        Title: fileTitle,
        FileName: fileName,
        FileType: fileType,
        Team: team
    };
    var requestBody = JSON.stringify(fileData);
    return $.ajax({
        url: requestUri,
        type: "POST",
        headers: requestHeaders,
        data: requestBody
    });

};

var addPayment = function (fileTitle, fileName, fileType, team) {
    var requestUri = "../_api/web/lists/getByTitle('PaymentsList')/items";
    var requestHeaders = {
        "accept": "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose",
        "X-RequestDigest": $('#__REQUESTDIGEST').val()
    }
    var fileData = {
        __metadata: { "type": "SP.Data.FilesListItem" },
        Title: fileTitle,
        FileName: fileName,
        FileType: fileType,
        Team: team
    };
    var requestBody = JSON.stringify(fileData);
    return $.ajax({
        url: requestUri,
        type: "POST",
        headers: requestHeaders,
        data: requestBody
    });

};