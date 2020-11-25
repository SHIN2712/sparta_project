$(document).ready(function () {
    $("#cards-box").html("");
    showArticles();
});

function openClose() {
    $("#post-box").modal('show');
}

function postClose() {
    // $("#post-box").hide();
    $("#post-box").modal('hide');
}

function postArticle() {
    let category = $('#post-category').val()

    if (category === '카테고리를 선택해주세요.') {
        alert('category를 입력하세요!')
        return
    }

    $.ajax({
        type: "POST",
        url: "/stack",
        data: {
            'category_give': category
        },
        success: function (response) { // 성공하면
            if (response["result"] === "success") {
                alert(response["msg"]);
                window.location.reload();
            }
        }
    })
}

function showArticles() {
    $.ajax({
        type: "GET",
        url: "/stack",
        data: {},
        success: function (response) {
            if (response["result"] === "success") {
                let articles = response["articles"]
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
                                       <div  type="button" class="click-bookmark" onclick="openClose()" data-toggle="modal" data-target="#post-box" data-whatever="@mdo">
                                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path fill-rule="evenodd" d="M5 3.75C5 2.784 5.784 2 6.75 2h10.5c.966 0 1.75.784 1.75 1.75v17.5a.75.75 0 01-1.218.586L12 17.21l-5.781 4.625A.75.75 0 015 21.25V3.75zm1.75-.25a.25.25 0 00-.25.25v15.94l5.031-4.026a.75.75 0 01.938 0L17.5 19.69V3.75a.25.25 0 00-.25-.25H6.75z"></path>
                                           </svg>
<!--                                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">-->
<!--                                                <path fill-rule="evenodd" d="M6.69 2a1.75 1.75 0 00-1.75 1.756L5 21.253a.75.75 0 001.219.583L12 17.21l5.782 4.625A.75.75 0 0019 21.25V3.75A1.75 1.75 0 0017.25 2H6.69z"></path>-->
<!--                                           </svg> -->

                                       </div>
                                  </div>
                                </div>`


                    $('#cards-box').append(tmp)
                }
            }
        }
    })
}

function goToCategory(id) {

}

function makeCard(url, title, desc, category, image) {

}