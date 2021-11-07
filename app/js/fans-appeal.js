document.getElementById("send-comment").addEventListener("click", addComment);
window.addEventListener("online", function (event) {
    const allAppeals = readAppealsFromLocalStorage();
    sendAppealsToServer(allAppeals);
    showAllAppeals(allAppeals);
    localStorage.removeItem("appeals");
});

const allAppeals = readAppealsFromLocalStorage();
if (isOnline()) {
    sendAppealsToServer(allAppeals);
    showAllAppeals(allAppeals);
    localStorage.removeItem("appeals");
}

function addComment () {
    let commentText = document.getElementById('fan-appeal-input').value;
    let nickname = currentAuthor();
    const time = new Date();
    let userText = document.getElementById("fan-appeal-input").value;
    let text = userText.replace(/ /g, '');
    if (text === '') {
        alert('This one is empty..');
        clean();
        return false;
    }
    if (isOnline()) {
        showAppeal(nickname, time, commentText);
        alert("Successfully sent to server");
    } else {
        allAppeals.push({name: nickname, time: time, text: commentText});
        saveAppealsToLocalStorage(allAppeals);
        alert("Saved to local storage");
    }
    clean();
}

function showAppeal(name, time, text) {
    let divRowFanAppeal = document.createElement("div");
    divRowFanAppeal.className = 'row';
    divRowFanAppeal.style.cssText = 'border: #8f8f8f solid 1px;';
    let userInfo = document.createElement("div");
    userInfo.className = 'fan-appeal fan-appeal-author card col-sm-4 col-md-4 col-lg-2 col-xl-2';
    let comment = document.createElement("div");
    comment.className = 'fan-appeal card col-sm-8 col-md-8 col-lg-10 col-xl-10';
    userInfo.innerHTML = "<p>" + name + "</p>" + "<p>" + time.getHours() + ":"
        + (time.getMinutes() < 10 ? "0" : "") + time.getMinutes()
        + "</p>" + "<p>" + time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear() + "</p>";
    comment.innerHTML = "<p>" + text + "</p>";
    divRowFanAppeal.appendChild(userInfo);
    divRowFanAppeal.appendChild(comment);
    let commentsBlock = document.getElementById("comments");
    commentsBlock.appendChild(divRowFanAppeal)
}

function clean() {
    document.getElementById("fan-appeal-input").placeholder = "Write an appeal c:";
    document.getElementById("fan-appeal-input").value = '';
}

function currentAuthor() {
    let name = prompt("Please enter your name", "Ari's fan");
    let text = name.replace(/ /g, '');
    if (text === '') {
        return "No name"
    } else {
        return name
    }
}

function showAllAppeals(allAppeals) {
    allAppeals.forEach(function (appeal) {
        showAppeal(appeal.name, new Date(appeal.time), appeal.text)
    });
}

function sendAppealsToServer(allAppeals) {
    if (allAppeals.length) {
        alert("Successfully sent to server!")
    }
}

function saveAppealsToLocalStorage(allAppeals) {
    localStorage.setItem("appeals", JSON.stringify(allAppeals));
}

function readAppealsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("appeals")) != null
        ? JSON.parse(localStorage.getItem("appeals")) : [];
}

function isOnline() {
    return window.navigator.onLine;
}