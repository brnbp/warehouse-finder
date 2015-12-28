var url_api_base = 'api.warehouse.io/logs';
var auth_api = 'auth_here';

$(document).ready(function() {
    $("#form-finder").attr('hidden', true);
    $.ajax(url_api_base + 'tables', {
        dataType: 'json',
        success: function(json) {
            $(".stores-select").select2({
                data: json
            });

            $("#form-finder").fadeIn()
        }
    });
});

var url_api_resource = url_api_base + '/site/';

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

/**
 * Envia requisicao para buscar logs atraves da api Warehouse
 * retorna uma table criada via jquery
 */
function sendFormAction() {
    if (!validateRequiredFields(stores, level)) {
        return;
    }

    if (stores.val() && level.val() && !msgErrorButton.attr('hidden', true)) {
        msgErrorButton.attr('hidden')
    }

    url = url_api_resource + stores.val()
    url += '?level=' + level.val()

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
        headers: {
            'auth': auth_api
        },
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

/**
 * verifica se o campo esta selecionado e
 * estava marcado como nao selecionado antes
 * remove estilo de erro caso esteja selecionado agora
 */
level.click(function(){
    if (level.val() && level.hasClass('has-error')) {
        level.removeClass('has-error')
    }
})

/**
 * Verifica se o campo esta selecionado e estava marcado como nao selecionado antes
 * remove estilo de erro caso esteja selecionado agora
 */
stores.click(function(){
    if (stores.val() && stores.hasClass('has-error')) {
        stores.removeClass('has-error')
    }
})

/**
 * Valida os campos de site e level
 * @param fieldOne campo de site ou de level
 * @param fieldTwo campo de site ou de level
 * @returns {boolean} retorna falso caso algum dos campos
 * nao possua informacao, e true caso ambos campos tenham valor
 */
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

/**
 * Valida se o valor informado em limit
 * é numerico
 */
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

/**
 * Ao clicar remove table existente com a ultima
 * requisição feita pelo usuario, após isso,
 * desabilita o botao até que a prox requisicao seja feita
 */
$("#clear-request").click(function(){
    $('.table-row > tr').remove()
    $("#logs").attr('hidden', true)
    $("#clear-request").attr('disabled', true)
})

/**
 *Ao clicar em pesquisar, remove tabelas existentes
 * e esconde todo conteudo da tabela padrao
 * para poder gerar uma nova com a nova requisicao que sera feita
 */
$("#search").click(function(){
    $('.table-row > tr').remove()
    $("#logs").attr('hidden', true)
})
