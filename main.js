const olList = document.querySelector('ol');
const URL = "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
let storiesPublished = []






function newHackerWebsite (title, URL, url, score, by, descendants, time) {
    const listItem = document.createElement('li')
    const parent = document.createElement('div');
    parent.className = 'parent';
    const top = document.createElement('div');
    top.className = 'top';
    const bottom = document.createElement('div');
    bottom.className = 'bottom';
    parent.appendChild(top);
    parent.appendChild(bottom);
    const imageDiv = document.createElement('div');
    imageDiv.id = "arrowImageDiv"
    imageDiv.className = "align-middle"
    imageDiv.innerText = '^'
    const titleDiv = document.createElement('div');
    const anchorTitle = document.createElement('a');
    anchorTitle.href = URL
    anchorTitle.text = title
    anchorTitle.id = "titleDiv"
    titleDiv.appendChild(anchorTitle)
    const websiteDiv = document.createElement('div');
    websiteDiv.className = "greyFont"
    websiteDiv.innerText = url
    top.appendChild(imageDiv)
    top.appendChild(titleDiv)
    top.appendChild(websiteDiv)
    const emptySpace = document.createElement('div');
    emptySpace.id = "emptySpace"
    const detailDiv = document.createElement('div');
    detailDiv.className = "greyFont"
    detailDiv.innerText = score + " points by " + by + " " + time + " " + "| " + "hide " + "| " + + descendants + " comments "
    bottom.appendChild(emptySpace);
    bottom.appendChild(detailDiv);
    listItem.appendChild(parent);
    olList.appendChild(listItem);
}

function hora (date) {
    let fecha = new Date(date);
    let datePublished = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear();
    let hours = (fecha.getHours() < 10) ? "0" + fecha.getHours() : fecha.getHours();
    let minutes = (fecha.getMinutes() < 10) ? "0" + fecha.getMinutes() : fecha.getMinutes();
    let time = hours + ":" + minutes;
    return datePublished = datePublished;
}



fetch(URL)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(res);
        }
    }).then(function (info) {
        for (const each of info) {
            fetch("https://hacker-news.firebaseio.com/v0/item/" + each + ".json?print=pretty")
                .then(function (res) {
                    if (res.ok) {
                        return res.json();
                    } else {
                        return Promise.reject(res);
                    }
                }).then(function (infoUser) {
                    let str= infoUser.url.split(".")[1];
                    newHackerWebsite(infoUser.title, infoUser.url,"(" + str + ".com)", infoUser.score, infoUser.by, infoUser.descendants, hora(infoUser.time))
                }).catch(function (error) {
                    console.warn(error);
                });
        };
    })



