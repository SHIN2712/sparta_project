$(document).ready(function () {
    $("#cards-box").html("");
    // console.log("main page");
    sideMenuCnt();
    showArticles();
});

let today = getToday()

function getToday() {
    let date = new Date()
    return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
}

function postOpen(link) {
    console.log("open")
    let tmp = `<div id="post-link" style="display: none">${link}</div>`
    $('#post-box').append(tmp)
    $('#post-box').show().on('shown', function () {
        $('#post-box').modal('hide')
    });
    console.log("done")
}

function postClose() {
    console.log("hello")
    $('body').removeClass('modal-open');
    $('body').css('padding-right', '');
    $(".modal-backdrop").remove();
    $('#post-box').hide();
    console.log("close")
}

function postArticle() {
    let link = $('#post-link').text()
    let category = $('#post-category').val()
    let comment = $('#comment').val()
    if (category === '카테고리를 선택해주세요.') {
        alert('카테고리 선택이 필요합니다')
        return
    }
    if (comment === '') {
        alert('코멘트 입력이 필요합니다')
        return
    }
    $.ajax({
        type: "POST",
        url: "/stack",
        data: {
            'link_give': link,
            'category_give': category,
            'comment_give': comment
        },
        success: function (response) {
            if (response["result"] === "success") {
                alert(response["msg"]);
                window.location.reload();
            }
        }
    })
}

function sideMenuCnt() {
    $.ajax({
        type: "GET",
        url: "/stack",
        data: {},
        success: function (response) {
            if (response["result"] === "success") {
                let articles = response["articles"]
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

function showArticles() {
    $.ajax({
        type: "GET",
        url: "/stack",
        data: {},
        success: function (response) {
            if (response["result"] === "success") {
                let articles = response["articles"]

                let todayArticles = articles.filter(function (element) {
                    return element.date == today;
                });

                let state = {
                    'querySet': todayArticles,
                    'page': 1,
                    'rows': 4,
                    'window': 5,
                }

                showPage()

                function pagination(querySet, page, rows) {
                    let trimStart = (page - 1) * rows
                    let trimEnd = trimStart + rows
                    let trimmedData = querySet.slice(trimStart, trimEnd)
                    let pages = Math.ceil(querySet.length / rows)
                    return {
                        'querySet': trimmedData,
                        'pages': pages
                    }
                }

                function pageButtons(pages) {
                    let wrapper = document.getElementById('pagination-wrapper')
                    wrapper.innerHTML = ''

                    let maxLeft = (state.page - Math.floor(state.window / 2))
                    let maxRight = (state.page + Math.floor(state.window / 2))

                    if (maxLeft < 1) {
                        maxLeft = 1
                        maxRight = state.window
                    }

                    if (maxRight > pages) {
                        maxLeft = pages - (state.window - 1)
                        maxRight = pages
                        if (maxLeft < 1) {
                            maxLeft = 1
                        }
                    }

                    for (let page = maxLeft; page <= maxRight; page++) {
                        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
                    }

                    if (state.page != 1) {
                        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
                    }

                    if (state.page != pages) {
                        wrapper.innerHTML = wrapper.innerHTML + `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
                    }

                    $('.page').on('click', function () {
                        $('#cards-box').empty()
                        state.page = Number($(this).val())
                        console.log(state.page)
                        showPage()
                    })
                }

                function showPage() {
                    let data = pagination(state.querySet, state.page, state.rows)
                    console.log('Data: ', data)
                    let nowPage = data.querySet
                    for (let i = 0; i < nowPage.length; i++) {
                        let article = nowPage[i]
                        let date = article['date']
                        let author = article['author']
                        let img = article['img']
                        let title = article['title']
                        let link = article['link']
                        let tmp
                        if(article['category']==="default"){
                            tmp =
                            `<div class="card mb-3">
                              <div class="card-body">
                                    <img class="img-in-card" src="${img}" alt="Card image cap">
                                  <div class="body-text">
                                        <a href="${link}" class="card-title">${title}</a>
                                        <p class="card-text">by. ${author}</p>
                                        <p class="card-text"><small class="text-muted">${date}</small></p>
                                   </div>
                                   <div  type="button" class="click-bookmark" onclick="postOpen('${link}')" data-toggle="modal" data-target="#post-box" data-whatever="@mdo">
                                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                            <path fill-rule="evenodd" d="M5 3.75C5 2.784 5.784 2 6.75 2h10.5c.966 0 1.75.784 1.75 1.75v17.5a.75.75 0 01-1.218.586L12 17.21l-5.781 4.625A.75.75 0 015 21.25V3.75zm1.75-.25a.25.25 0 00-.25.25v15.94l5.031-4.026a.75.75 0 01.938 0L17.5 19.69V3.75a.25.25 0 00-.25-.25H6.75z"></path>
                                       </svg>
                                   </div>
                              </div>
                        </div>`
                        }
                        else {
                            tmp =
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
                        }
                        $('#cards-box').append(tmp)
                    }
                    pageButtons(data.pages)
                }
            }
        }
    })
}

function goToCategory(id) {

}

function makeCard(url, title, desc, category, image) {

}