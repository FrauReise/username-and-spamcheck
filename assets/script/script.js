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

const addBtn = document.getElementById("addComment");
const commentField = document.getElementById("comment");
let arrayComment = []; //Массив комментариев

//Вставка аватарки, слушание изменение в поле <input type="file" class="form-control-file" id="file" value="">
document.getElementById("file").addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
        localStorage.setItem('wallpaper', base64String);
        document.getElementById("img_avatar").src = "data:image/png;base64," + base64String;
    };
    reader.readAsDataURL(file);
});

//Создание комментария (аватарка и комментарий)
function createComment(wallpaper, comment) {
    let div = document.createElement('div');
    div.innerHTML = `<div class="alert alert-dark alert-dismissible fade show" role="alert"  id="comment">
                    <img><img class="card-img-top imgStyle1" id="img_avatar" src=${wallpaper} alt="Avatar">
                     </label> ${comment}</div>`;
    document.body.before(div);
}

//Проверка документа на наличие в нем информации в localStorage
document.addEventListener("DOMContentLoaded", function (event) {

    let avatar = localStorage.getItem('wallpaper');
    if (avatar != null) {
        let avatarImg = document.getElementById("img_avatar");
        avatarImg.src = "data:image/png;base64," + avatar;
    }

    if (localStorage.getItem('comment') != null) {
        arrayComment = JSON.parse(localStorage.getItem('comment'));
        for(let i = 0; i < arrayComment.length; i++){
            createComment(document.getElementById("img_avatar").src, arrayComment[i]);
        }
    }
});

//Функция срабатывает при нажатии на кнопку очистить, чистит страницу и localStorage от всего
btn_clear_comment.addEventListener("click", () => {
    const commentContainer = document.querySelectorAll(".alert");
    for (let i = commentContainer.length; i--;) {
        commentContainer[i].remove();
    }
    commentField.value = "";
    localStorage.clear();
    document.getElementById("img_avatar").src = "https://i.liveberries.com/01a/3d8/052/a4658162/4132161_portrait_th_70779c811857052cb03b5116473225dd.jpg";
    document.getElementById("file").value = "";
    arrayComment = [];
});

