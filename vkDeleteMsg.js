// ==UserScript==
// @name        deleteAllMsg
// @namespace    http://bizgrof.ru/
// @version      0.1
// @description  Скрипт удаляет все сообщения
// @author       Andrey Artamonov
// @include      *://vk.com/*
// ==/UserScript==

// Добавляем ссылку в сайдбар и проверяем условие
if (location.pathname === "/im") {
    document.getElementsByClassName('im-right-menu')[0].insertAdjacentHTML('beforeend', '<div class="ui_rmenu_sep"><a class="ui_rmenu_item" onclick="init()">Удалить все сообщения</a></div>');
}

// Эта функция доступна извне tampermonkey
// Проверка, нужно ли удалять
unsafeWindow.init = function() {
    var con = confirm('Удалить сообщения?');
    if(con === true) {
        deleteAllMsg();
    }
};

// Функция удаления
function deleteAllMsg(){
    
	var dialogs = document.getElementsByClassName('nim-dialog--cw'); // Ищем все диалоги
	
	for ( var i = 0; i < dialogs.length; i++) {
		dialogs[i].querySelector('.nim-dialog--close').click(); // Кликаем на все крестики
	}


	setTimeout(reloadPage, 500); // Таймер специально необходим, чтобы модалки успели вылезти
   
   // Закрывалка модалок и перезагрузка
    function reloadPage() {
        var modal = document.querySelectorAll('.box_layout'); // Ищем модалку
        
        for(i = 0; i < modal.length; i++) {
            modal[i].querySelectorAll('.flat_button')[1].click(); // Соглашаемся на все
        }

        location.reload(); // Перезагружаем страницу
    }
}