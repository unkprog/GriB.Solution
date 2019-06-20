(function () {

    function validatePhone(phone) {
        if (!phone) return false;
        var pattern = new RegExp(/^\+?1?\s*?\(?\d{3}(?:\)|[-|\s])?\s*?\d{3}[-|\s]?\d{4}$/);
        return pattern.test(phone);
    }

    function validate(model) {
        let result = true;

        if (model.name === null || model.name === undefined || model.name === '') {
            M.toast({ html: 'Не указано имя' });
            result = false;
        }
        if (!validatePhone(model.phone)) {
            M.toast({ html: 'Неверно указан номер телефона' });
            result = false;
        }
        if (model.email === null || model.email === undefined || model.email === '') {
            M.toast({ html: 'Неверно указан адрес электронной почты' });
            result = false;
        }

        return result;
    }

    function createEventListener(elem, eventName, clickFunc) {
        for (let i = 0, iCount = elem ? elem.length : 0; i < iCount; i++)
            elem[i].addEventListener(eventName, clickFunc, false);
    }

    function createEvents() {
        createEventListener($('#register_send'), ("ontouchstart" in window ? "touchend" : "click"), function () {
            let model = { name: $('#register_name').val(), phone: $('#register_phone').val(), email: $('#register_email').val() };
            if (validate(model) === true) {
                $.ajax({
                    url: "/Home/RegisterSend",
                    type: "post",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(model),
                    success: function (responseData, textStatus, jqXHR) {
                        if (responseData && responseData.result && responseData.result === "Ok") {
                            window.location.href = 'https://app.poscloudgb.ru';
                        }
                        else {
                            M.toast({ html: JSON.stringify(responseData) });
                        }
                    },
                    error: function (e, textStatus, errorThrown) {
                        M.toast({ html: e });
                    }
                });
            }
        });
    }

    createEvents();
})(); // end of jQuery name space
