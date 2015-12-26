$(function(){

    var msgErrorButton = $('.msg-error');
    msgErrorButton.attr('hidden', true);
    msgErrorButton.click(function(){
        $('.msg-error').attr('hidden', true)
    })

    var level = $('#level');
    var stores = $('#stores');

    var sendButton = $("#search");
    sendButton.click(function(){

        if (!validateRequiredFields(stores, level)) {
            return;
        }

        if (stores.val() && level.val() && !msgErrorButton.attr('hidden', true)) {
            msgErrorButton.attr('hidden')
        }

        alert('oi');

    });

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

});

