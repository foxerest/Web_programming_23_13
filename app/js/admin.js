document.getElementById("send").addEventListener("click", sendNews);
document.getElementById("send-image").addEventListener("click", addImage);
window.addEventListener("online", function (event) {
    const allNews = readNewsFromLocalStorage();
    sendNewsToServer(allNews);
    showAllNews(allNews);
    localStorage.removeItem("news");
});


let allNews = readNewsFromLocalStorage();

function sendNews() {
    let newsTitle = document.getElementById("news-title").value;
    let newsTitleText = newsTitle.replace(/ /g, '');
    let newsBody = document.getElementById("news-body").value;
    let newsBodyText = newsBody.replace(/ /g, '');
    let newsImage = document.getElementById("uploaded-image").getAttribute("src");
    addImage();
    if (newsBodyText !== '' && newsTitleText !== '') {
        if (isOnline()) {
            alert("Successfully sent to server");
        } else {
            allNews.push({imgSrc: newsImage, title: newsTitle, body: newsBody});
            saveNewsToLocalStorage(allNews);
            alert("Saved to local storage");
        }
    } else {
        alert('Invalid input');
    }
    clean()
}

function addImage() {
    let input = document.getElementById("input-image");
    let uploadedImage = document.getElementById("uploaded-image");
    if (input != null) {
        uploadedImage.setAttribute("src", window.URL.createObjectURL(input.files[0]));
    }
    document.getElementById("send-image").blur();

}

function clean() {
    document.getElementById("news-title").placeholder = "News title";
    document.getElementById("news-title").value = '';
    document.getElementById("news-body").placeholder = "News body";
    document.getElementById("news-body").value = '';
    document.getElementById("uploaded-image").setAttribute("src", "images/Antu_insert-image.svg_-846x846.png");
    // TO DO
    // document.getElementById("send-image").files = null;
}

function isOnline() {
    return window.navigator.onLine;
}

function saveNewsToLocalStorage(allNews) {
    localStorage.setItem("news", JSON.stringify(allNews));
}

function readNewsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("news")) != null
        ? JSON.parse(localStorage.getItem("news")) : [];
}

function sendNewsToServer(allNews) {
    if (allNews.length) {
        alert("Successfully sent to server!")
    }
}