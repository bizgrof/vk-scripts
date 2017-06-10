// ==UserScript==
// @name        deleteAllMsg
// @namespace    http://bizgrof.ru/
// @version      0.1
// @description  Скрипт удаляет все сообщения
// @author       Andrey Artamonov
// @include      *://vk.com/*
// ==/UserScript==

// Добавляем в сайдбар
if (location.pathname === "/im") {
    document.getElementsByClassName('im-right-menu')[0].insertAdjacentHTML('beforeend', '<div class="ui_rmenu_sep"><a class="ui_rmenu_item" onclick="init()">Удалить все сообщения</a></div>');
}

unsafeWindow.init = function() {
    var con = confirm('Удалить сообщения?');
    if(con === true) {
        deleteAllMsg();
    }
};

function deleteAllMsg(){
    var dialogs = document.getElementsByClassName('nim-dialog');

    for ( var i = 0; i < dialogs.length; i++) {
        // Кликаем на крестики, если прочитаны
        if(!dialogs[i].classList.contains('nim-dialog_unread')){
            dialogs[i].querySelector('.nim-dialog--close').click();
        }
    }

    // Ставим таймер на срабатывание скрипта
    setTimeout(reloadPage, 500);
   // Закрывалка модалок и перезагрузка
    function reloadPage() {
        var modal = document.querySelectorAll('.box_layout');
        for(i = 0; i < modal.length; i++) {
            modal[i].querySelectorAll('.flat_button')[1].click();
        }

        // Перезагружаем страницу
        location.reload();
    }
}

