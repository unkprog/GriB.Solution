﻿///
// Ресурсы по умолчанию
///
define({
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Ошибки, предупреждения и другие системные сообщения                        //
    /////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Наименования кнопок                                                        //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "button$label$ok": "OK",
    "button$label$add": "Добавить",
    "button$label$save": "Сохранить",
    "button$label$addValue": "Добавить значение",
    "button$label$edit": "Редактировать",
    "button$label$cancel": "Отмена",
    "button$label$delete": "Удалить",
    "button$label$find": "Поиск",

    "button$label$demo": "Демо",
    "button$label$register": "Регистрация",
    "button$label$forgot": "Забыли пароль?",
    "button$label$enter": "Вход",

    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Надписи                                                                    //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$error": "Ошибка",
    "label$no": "Нет",
    "label$yes": "Да",
    "label$autorization": "Авторизация",
    "label$unspecified": "Не указан",
    "label$contacts": "Контакты",
    "label$name": "Наименование",
    "label$default": "По умолчанию",
    "label$code": "Код",
    "label$nameshort": "Обозначение",
    "label$description": "Описание",
    "label$group": "Группа",
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Авторизация                                                                //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$phone": "Телефон",
    "label$email": "E-mail",
    "label$password": "Пароль",
    "label$recover": "Восстановить",
    "label$confirmPassword": "Подтверждение пароля",
    "label$passwordRecovery": "Восстановление пароля",

    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Меню                                                                       //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$POSterminal": "POS терминал",
    "label$settings": "Настройки",
    "label$documents": "Документы",
    "label$reports": "Отчеты",
    "label$about": "О программе",
    "label$exit": "Выход",

    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Настройки                                                                  //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$organizationalstructure": "Организационная структура",
    "label$organization": "Компания",
    "label$salesPoints": "Точки продаж",
    "label$employees": "Сотрудники",
    "label$currenciesandunits": "Валюты и единицы измерения",
    "label$currencies": "Валюты",
    "label$units": "Единицы измерения",
    "label$categoriesproducts": "Категории, товары",
    "label$categories": "Категории",
    "label$products": "Товары",
    "label$discounts": "Скидки",
    "label$clients": "Клиенты",
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Сообщения об ошибках                                                       //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "msg$error$phoneNumberIncorrect": "Неверно указан номер телефона",
    "msg$error$invalidEmailAddress": "Неверно указан адрес электронной почты",
    "msg$error$invalidPassword": "Не указан пароль",

    "msg$error$invalidCompanyName": "Не указано наименование компании",
    "msg$error$invalidSalePointName": "Не указано наименование точки продаж",
    "msg$error$invalidCity": "Не указан город",

    "msg$error$invalidname": "Не указано имя",
    "msg$error$fieldexceedscharacters": "Поле {0} превышает {1} символов",
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Информационные сообщения                                                   //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "msg$success$Register": "Вы успешно зарегистрированы! <br/>Пароль для входа отправлен в виде СМС на Ваш номер телефона",
    "msg$success$Recovery": "Новый пароль отправлен в виде СМС на Ваш номер телефона",
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Редактор компании                                                          //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$companyName": "Наименование компании",
    "label$website": "Веб-сайт",
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Редактор точки продаж                                                      //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$salePoint": "Точка продаж",
    "label$salePointName": "Наименование точки продаж",
    "label$city": "Город",
    "label$address": "Адрес",
    "label$schedule": "Расписание",
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Редактор сотрудников                                                       //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$employee": "Сотрудник",
    "label$access": "Доступ",
    "label$accessright": "Права доступа",
    "label$logintosystem": "Вход в систему",
    "label$accesstosystem": "Доступ в систему",
    "label$openonlogin": "Открывать при входе",
    "label$employeeinformation":"Информация о сотруднике",
    "label$sex": "Пол",
    "label$datebirth": "Дата рождения",
    "label$surname": "Фамилия",
    "label$fname": "Имя",
    "label$patronymic": "Отчество",
    "label$male": "Мужской",
    "label$female": "Женский",

    "msg$error$pointsalenotnotavailabledefault": "Точка продаж по умолчанию не доступна",
    "msg$error$noaccessspecified": "Не указан доступ",
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Редактор клиентов                                                           //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$clientinformation": "Информация о клиенте",
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Редактор валют                                                             //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$currency": "Валюта",
    "msg$error$invalidcode": "Не указан код",
    "label$currencynotspecified": "Валюта не указана",
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Редактор единиц измерения                                                  //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$unit": "Единица измерения",
    "label$unitnotspecified": "Единица измерения не указана",
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Редактор категорий                                                         //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$category": "Категория",
    "label$includedincategory": "Входит в категорию",
    "label$addphoto": "Добавить фото",
    "label$categorynotspecified": "Категория не указана",

    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Редактор товаров, услуг                                                    //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$composition": "Состав",
    "label$type": "Тип",
    "label$product": "Товар",
    "label$production": "Продукция",
    "label$service": "Услуга",
    "label$specifications": "Характеристики",
    "label$vendorcode": "Артикул",
    "label$barcode": "Штрихкод",
    "label$putonsale": "Выставить на продажу",
    "label$accounting": "Учет",
    "label$accountingparameters": "Параметры учета",
    "label$costprice": "Себестоимость",
    "label$sellingprice": "Цена продажи",
    "label$price": "Цена",
    "label$sum": "Сумма",
    "label$quantity": "Количество",
    "label$quantityshort": "Колич.",
    "label$unitshort": "Ед.изм.",

    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Редактор контрагентов                                                      //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$contractors": "Контрагенты",
    "label$contractor": "Контрагент",

    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Редактор причин                                                            //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$reasons": "Причины",
    "label$reason": "Причина",

    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Редактор скидок                                                            //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$discount": "Скидка",
    "label$value": "Значение",
    "label$valuepercent": "Значение в %",
    "label$discountinformation": "Информация о скидке",

    "msg$error$discountrange": "Скидка должна быть в диапазоне от 0 до 100", //Discount should be in the range of 0 to 100
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Документы                                                                  //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$movementgoods": "Движение товара",
    "label$movementfunds": "Движение денег",
    "label$arrival": "Приход",
    "label$writeoff": "Списание",
    "label$movement": "Перемещение",
    "label$return": "Возврат",
    "label$sale": "Продажа",
    "label$consumption": "Расход",
    "label$productionmake": "Производство",
    "label$payment": "Оплата",
    "label$encashment": "Инкассация",
    "label$depositmoney": "Внесение",
    "label$withdrawingmoney": "Снятие",

    "label$conduct": "Учитывать",
    "label$date": "Дата",
    "label$date$from": "Дата с",
    "label$date$to": "Дата по",
    "label$find": "Поиск",
    "label$stock": "Склад",
    "label$stock$from": "Со склада",
    "label$stock$to": "На склад",
    "label$provider": "Поставщик",

    "msg$error$nowarehousespecified": "Не указан склад",
    "msg$error$nocontractorspecified": "Не указан поставщик",
    "msg$error$nowarehouse$fromspecified": "Не заполнено поле со склада",
    "msg$error$nowarehouse$tospecified": "Не заполнено поле на склад",
    "msg$error$warehousedifferentspecified": "Укажите разные склады",
    "msg$error$documentpositionsnotfilled": "Не заполнены позиции документа",
    "msg$error$noreasonspecified": "Не указана причина",
    "msg$error$commentnotfilled": "Не заполнен комментарий",
    /////////////////////////////////////////////////////////////////////////////////////////////
    //              Терминал                                                                   //
    /////////////////////////////////////////////////////////////////////////////////////////////
    "label$time": "Время",
    "label$client": "Клиент",

    "label$methodpayment": "Способ оплаты",
    "label$cash": "Наличный расчет",
    "label$noncash": "Безналичный расчет",
    "label$withoutpayment": "Без оплаты",
    "label$withoutdiscount": "Без скидки",
    "label$cancelorder": "Отменить заказ",
    "label$splitcheck": "Разделить чек",
    "label$printprecheck": "Печать пречека",

    "label$topay": "К оплате",
    "label$received": "Получено",
    "label$surrender": "Сдача",
    "label$comment": "Комментарий",
    "label$commenttoorder": "Комментарий к заказу",
    "label$specifyreasoncancel": "Укажите причину отмены",

    "error$terminal$ammountnotset": "Сумма заказа не задана",
    "error$comment$specifycomment": "Не заполнен комментарий",

    "error$numpad$amountinsufficient": "Полученная сумма недостаточна для закрытия чека",
    "error$without$reasonnotspecified": "Не указана прична неоплаты",
    "error$without$clientnotspecified": "Не указан клиент"


});