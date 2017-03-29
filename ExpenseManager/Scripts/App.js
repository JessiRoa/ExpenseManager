'use strict';
var incomstUrl = "../_api/lists/getbytitle('Incomster')/items";
var paymentUrl = "../_api/lists/getbytitle('PaymentsList')/items";
var categoryUrl = "../_api/lists/getbytitle('Categories')/items";

$(document).ready(function () {
    //moment.locale('sv');

    // Get the list items and show on the page at start
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
                    item += '<td>' + results[i].Amount + '</td>';
                    item += '</tr>';
                };

                $('#detailList tbody').append(item);
            }
        },
        error: function (error) {
            console.log('Error: ' + error);
        }
    });
    
    // Get category list
    $.ajax({
        url: categoryUrl,
        method: "GET",
        headers: {
            "accept": "application/json;odata=verbose"
        },
        success: function (data) {
            var results = data.d.results;
            if (results.length > 0) {
                var item = '';
                
                for (var i = 0; i < results.length; i++) {
                    item += '<option value="' + results[i].Title + '">' + results[i].Title + '</option>';
                };

                $('#cateogries').append(item);
            }

            $('select').material_select();
        },
        error: function (error) {
            console.log('Error: ' + error);
        }
    });

    $('#submitForm').click(function (e) {
        //Check for edit or new and call update or add function
        if ($('#myModalLabel').html() == 'New Income') {
            //addIncome($('#fileTitle').val(), $('#name').val(), $('#amount').val(), $('#date').val(), $('#cateogries option:selected').val(), $('#description').val());
            addIncome($('#name').val(), $('#amount').val(), $('#description').val());
        } else if ($('#myModalLabel').html() == 'New Payment') {
            addPayment($('#name').val(), $('#amount').val(), $('#date').val(), $('#description').val());
        }
    });
});

function addNewFile() {
    $('#modal-title').html('Add New File');
    $('#name').val('');
    $('#amount').val('');
    $('#description').val('');
    $('#modalForm').modal('show');
};

//Add File function
var addIncome = function (name, amount, description) {
    var requestUri = "../_api/web/lists/getbytitle('Incomster')/items";
    
    var requestHeaders = {
        "Accept": "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": $('#__REQUESTDIGEST').val()
    }
    var fileData = {
        __metadata: { type: 'SP.Data.IncomsterListItem' },
        Title: name,
        Amount: amount,
        Description: description

    };
    var requestBody = JSON.stringify(fileData);
    
    

    return $.ajax({
        url: requestUri,
        type: "POST",
        headers: requestHeaders,
        data: requestBody
    });
};




//var addPayment = function (fileTitle, fileName, fileType, team) {
//    var requestUri = "../_api/lists/getByTitle('PaymentsList')/items";

//    console.log(requestUri);

//    var requestHeaders = {
//        "accept": "application/json;odata=verbose",
//        "content-type": "application/json;odata=verbose",
//        "X-RequestDigest": $('#__REQUESTDIGEST').val()
//    }
//    var fileData = {
//        __metadata: { "type": "SP.Data.FilesListItem" },
//        Title: fileTitle,
//        FileName: fileName,
//        FileType: fileType,
//        Team: team
//    };
//    var requestBody = JSON.stringify(fileData);
//    return $.ajax({
//        url: requestUri,
//        type: "POST",
//        headers: requestHeaders,
//        data: requestBody
//    });

//};