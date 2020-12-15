$(document).ready(function () {
    $("#cards-box").html("");
    let category = $('#category').text()
    // alert(category)
    sideMenuCnt();
    showArticles(category);
});

let today = getToday()

function getToday() {
    let date = new Date()
    return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
}


function sideMenuCnt() {
    $.ajax({
        type: "GET",
        url: "/stack",
        data: {},
        success: function (response) {
            if (response["result"] === "success") {
                let articles = response["articles"]
                // console.log(articles)
                let cnt_computer_architecture = articles.filter(function (element) {
                    return element.category == "computer_architecture";
                }).length;
                let cnt_operating_system = articles.filter(function (element) {
                    return element.category == "operating_system";
                }).length;
                let cnt_data_structure_algorithm = articles.filter(function (element) {
                    return element.category == "data_structure_algorithm";
                }).length;
                let cnt_programming = articles.filter(function (element) {
                    return element.category == "programming";
                }).length;
                let cnt_network = articles.filter(function (element) {
                    return element.category == "network";
                }).length;
                let cnt_multimedia = articles.filter(function (element) {
                    return element.category == "multimedia";
                }).length;
                let cnt_information_security = articles.filter(function (element) {
                    return element.category == "information_security";
                }).length;
                let cnt_software_engineering = articles.filter(function (element) {
                    return element.category == "software_engineering";
                }).length;
                $('#computer_architecture').append(cnt_computer_architecture)
                $('#operating_system').append(cnt_operating_system)
                $('#data_structure_algorithm').append(cnt_data_structure_algorithm)
                $('#programming').append(cnt_programming)
                $('#network').append(cnt_network)
                $('#multimedia').append(cnt_multimedia)
                $('#information_security').append(cnt_information_security)
                $('#software_engineering').append(cnt_software_engineering)
            }
        }
    })
}

function removeArticle(){

}

function showArticles(category) {
    let url = "/" + category + "/stack"
    $.ajax({
        type: "GET",
        url: url,
        data: {},
        success: function (response) {
            if (response["result"] === "success") {
                let articles = response["articles"]
                console.log(articles)
                for (let i = 0; i < articles.length; i++) {
                    let article = articles[i]
                    let date = article['date']
                    let author = article['author']
                    let bookmark = article['bookmark']
                    let img = article['img']
                    let title = article['title']
                    let link = article['link']
                    let category = article['category']
                    let tmp =
                        `<div class="card mb-3">
                                  <div class="card-body">
                                        <img class="img-in-card" src="${img}" alt="Card image cap">
                                      <div class="body-text">
                                            <a href="${link}" class="card-title">${title}</a>
                                            <p class="card-text">by. ${author}</p>
                                            <p class="card-text"><small class="text-muted">${date}</small></p>
                                      </div>
                                       <div type="button" class="click-bookmark" onclick="removeArticle()" data-toggle="modal" data-target="#post-box" data-whatever="@mdo">
                                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path fill-rule="evenodd" d="M6.69 2a1.75 1.75 0 00-1.75 1.756L5 21.253a.75.75 0 001.219.583L12 17.21l5.782 4.625A.75.75 0 0019 21.25V3.75A1.75 1.75 0 0017.25 2H6.69z"></path>
                                           </svg>
                                       </div>
                                   
                                  </div>
                                </div>`
                    $('#cards-box').append(tmp)
                }
            }
        }
    })
}