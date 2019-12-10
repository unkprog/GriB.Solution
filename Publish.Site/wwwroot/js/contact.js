(function () {

    function validate(model) {
        let result = true;

        if (model.name === null || model.name === undefined || model.name === '') {
            M.toast({ html: 'Не указано имя' });
            result = false;
        }

        if (model.email === null || model.email === undefined || model.email === '') {
            M.toast({ html: 'Неверно указан адрес электронной почты' });
            result = false;
        }

        if (model.message === null || model.message === undefined || model.message === '') {
            M.toast({ html: 'Не указано сообщение для отправки' });
            result = false;
        }

        return result;
    }

    function createEventListener(elem, eventName, clickFunc) {
        for (let i = 0, iCount = elem ? elem.length : 0; i < iCount; i++)
            elem[i].addEventListener(eventName, clickFunc, false);
    }

    function createEvents() {
        createEventListener($('#sender_send'), ("ontouchstart" in window ? "touchend" : "click"), function () {
            let model = { name: $('#sender_name').val(), email: $('#sender_email').val(), message: $('#sender_message').val() };
            if (validate(model) === true) {
                $.ajax({
                    url: "/Contact/ContactSend",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(model),
                    success: function (responseData, textStatus, jqXHR) {
                        if (responseData && responseData.result && responseData.result === "Ok") {
                            M.toast({ html: "Сообщение отправлено" });
                            $('#sender_message').val("");
                        }
                        else {
                            M.toast({ html: JSON.stringify(responseData) });
                        }
                    },
                    error: function (e, textStatus, errorThrown) {
                        M.toast({ html: textStatus });
                    }
                });
            }
        });
    }

    createEvents();
})(); // end of jQuery name space
