"use strict"

// Интерфейс преобразования ФИО

function userFio() {
    let inputFio = document.getElementById('fio').value; // Получить нужную строку
    let inputFioTrans1 = inputFio.toLowerCase().trim(); // Понизить регистр и удалить пробелы в начале и конце строки
    let inputFioTrans = inputFioTrans1.replace(/\s+/g, ' '); // Удалить лишние пробелы между ФИО
    let arrayFio1 = inputFioTrans.split(" "); // Преобразовать строку в массив
    let stringResult = "";

    for (let i = 0; i < arrayFio1.length; i++) {
        let name = arrayFio1[i];
        let firstLetter = name.substring(0, 1).toUpperCase(); // Метод substring()-извлечь первый символ,toUpperCase()-перевод в верхний регистр
        let followingLetters = name.substring(1, name.length); // Дописать слово до конца без первой буквы
        stringResult += firstLetter + followingLetters + " "; // Объединить строки
    }

    let trimFio = stringResult.trim(); // Удалить пробелы в начале и конце строки
    let arrayFio2 = trimFio.split(" "); // Преобразовать строчку в массив

    for (let i = 0; i < arrayFio2.length; i++) { // Вывести массив в input
        console.log("2");
        if (i == 0) {
            document.getElementById('lastName').value = arrayFio2[i];
        } else if (i == 1) {
            document.getElementById('name').value = arrayFio2[i];
        } else if (i == 2) {
            document.getElementById('middleName').value = arrayFio2[i];

            break;
        }
    }

}

function clearField() {
    document.getElementById("fio").value = " ";
    document.getElementById("lastName").value = "Фамилия";
    document.getElementById("name").value = "Имя";
    document.getElementById("middleName").value = "Отчество";
}


// Проверка на спам

document.getElementById('addComment').onclick = function() {
    let comment = document.querySelector('#comment').value;
    
    if (!comment) {
        return;
    }
    
    let checkSpam = (str) => {
        let cleanedCommentVia = str.replace(/viagra/gi, "***");
        let cleanedMessages = cleanedCommentVia.replace(/xxx/gi, "***");
        return cleanedMessages;
    }

    let checkedMessage = checkSpam(comment);
    
    document.querySelector('#commentField').innerHTML += `<div class="chat__message">${checkedMessage}</div>`;
    
    document.querySelector('#comment').value = '';
}

document.getElementById('clearComment').onclick = function() {
    let comment = document.getElementById('comment').value = " ";
}