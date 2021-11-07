window.addEventListener("online", function (event) {
    let allNews = readNewsFromLocalStorage();
    sendNewsToServer(allNews);
    showAllNews(allNews);
    localStorage.removeItem("news");
});

const allNews = readNewsFromLocalStorage();
if (isOnline()) {
    sendNewsToServer(allNews);
    showAllNews(allNews);
    localStorage.removeItem("news");
}

function addNews(imgSrc, title, body) {
    const newsContainer = document.createElement("div");
    newsContainer.className = "card col-sm-12 col-md-6 col-lg-4 col-xl-4";
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.innerHTML = "<img src=\"" + imgSrc + "\" alt=\"Card image cap\" class=\"card-img-top\">"
        + "<a href='#'><h5>" + title + "</h5></a><h6<i>"
        + body + "</i></h6>";
    newsContainer.appendChild(cardBody);

    document.getElementById("news").appendChild(newsContainer);
}

function showAllNews(allNews) {
    allNews.forEach(function (news) {
        addNews(news.imgSrc, news.title, news.body)
    });
}

function sendNewsToServer(allNews) {
    if (allNews.length) {
        alert("Successfully sent to server!")
    }
}

function readNewsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("news")) != null
        ? JSON.parse(localStorage.getItem("news")) : [];
}

function isOnline() {
    return window.navigator.onLine;
}