$(function(){

    var url_api = 'http://sandbox.moovinplataforma.com.br/logs/logs/notification/site';
    var auth_api = 'auth_here';

    var msgErrorButton = $('.msg-error');
    msgErrorButton.attr('hidden', true);
    msgErrorButton.click(function(){
        $('.msg-error').attr('hidden', true)
    })

    var level = $('#level');
    var stores = $('#stores');
    var logName = $("#logname").val();
    var identifier = $("#identifier").val();
    var limit = $("#limit");

    var sendButton = $("#search");

    sendButton.click(sendFormAction);

    function sendFormAction() {
        if (!validateRequiredFields(stores, level)) {
            return;
        }

        if (stores.val() && level.val() && !msgErrorButton.attr('hidden', true)) {
            msgErrorButton.attr('hidden')
        }

        url = url_api + '/' + stores.val() + '?warehouse=true';
        url += '&level=' + level.val()

        if (logName) {
            url += '&log_name=' + logName
        }

        if (identifier) {
            url += '&identifier=' + identifier
        }

        if (limit.val()) {
            url += '&limit=' + limit.val()
        }

        $.ajax(url, {
            success: function(json) {
                var trHTML = '';
                var count = 1;
                $("#logs").attr('hidden', false);
                $.each(json, function(index, value){
                    trHTML += '<tr>';
                    trHTML += '<td>' + count++ + '</td>';
                    trHTML += '<td>' + value.data_created + '</td>';
                    trHTML += '<td>' + value.updated_in + '</td>';
                    trHTML += '<td>' + value.incidents + '</td>';
                    trHTML += '<td>' + value.identifier + '</td>';
                    trHTML += '<td>' + value.log_name + '</td>';
                    trHTML += '<td>' + value.messages + '</td>'
                    trHTML += '</tr>';
                });

                $('.table-row').append(trHTML);
                $('#clear-request').attr('disabled', false);
            }
        });



    }

    // verifica se o campo esta selecionado e estava marcado como nao selecionado antes
    // remove estilo de erro caso esteja selecionado agora
    level.click(function(){
        if (level.val() && level.hasClass('has-error')) {
            level.removeClass('has-error')
        }
    })

    // verifica se o campo esta selecionado e estava marcado como nao selecionado antes
    // remove estilo de erro caso esteja selecionado agora
    stores.click(function(){
        if (stores.val() && stores.hasClass('has-error')) {
            stores.removeClass('has-error')
        }
    })

    function validateRequiredFields(fieldOne, fieldTwo)
    {
        if (fieldOne.val() && fieldTwo.val()) {
            return true;
        }

        msgErrorButton.attr('hidden', false)
        $('.msg-error-text').text("Fields 'Store' and 'Level' are both required")

        if (!fieldOne.val()) {
            fieldOne.addClass('has-error')
        }

        if (!fieldTwo.val()) {
            fieldTwo.addClass('has-error')
        }

        return false;
    }


    limit.keyup(function(){
        if (isNaN(parseFloat(limit.val()))) {
            msgErrorButton.attr('hidden', false)
            $('.msg-error-text').text("Limit must be a valid number")
            limit.addClass('has-error')
            $('#search').attr('disabled', true);
        } else {
            msgErrorButton.attr('hidden', true)
            limit.removeClass('has-error')
            $('#search').attr('disabled', false);
        }
    })


    $("#clear-request").click(function(){
        $('.table-row > tr').remove()
        $("#logs").attr('hidden', true)
    })

    $("#search").click(function(){
        $('.table-row > tr').remove()
        $("#logs").attr('hidden', true)
    })

});

