/*
 * Простой скрипт который удаляет все диалоги
 * В том числе и не прочитанные (в будущем нужно будет улучшить)
 * Чтобы запустить скрипт, выполните функцию deleteAllMsg()
 */
'use strict'

function deleteAllMsg() {
	// Чистим куки
	setCookie('scrDelete', '', {expires: -1});


	var dialogs = document.getElementsByClassName('nim-dialog--cw');
	var counter = 0;

	for ( var i = 0; i < dialogs.length; i++) {
		// Кликаем на все крестики
		dialogs[i].querySelector('.nim-dialog--close').click()

		// Внешний счетчик
		counter++
	}

	// Устанавливаем куки удаленных сообщений
	document.cookie = "scrDelete=" + counter

	// Ставим таймер на срабатывание скрипта
	setTimeout(reloadPage, 500)
}

function reloadPage() {
	// Жмем на все модалки
	var modal = document.querySelectorAll('.box_layout')
	
	for(i = 0; i < modal.length; i++) {
		modal[i].querySelectorAll('.flat_button')[1].click()
	}

	// Перезагружаем страницу
	location.reload()
}

// Получаем значение удаленных сообщений из куков
var counterDelete = document.cookie.replace(/(?:(?:^|.*;\s*)scrDelete\s*\=\s*([^;]*).*$)|^.*$/, "$1")
console.log("Удалено диалогов с последнего запуска: " + counterDelete)