import time
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbsparta
today = time.strftime('%Y-%m-%d', time.localtime(time.time()))


# def add_data():
#     headers = {
#         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
#     data = requests.get('http://daily-devblog.com/archive/20201207', headers=headers)
#     soup = BeautifulSoup(data.text, 'html.parser')
#     scraps = soup.select('body > div:nth-child(3) > ul >li')
#     today = time.strftime('%Y-%m-%d', time.localtime(time.time()))
#     for scrap in scraps:
#         scrap_link = scrap.select_one('a')['href']
#         scrap_img = scrap.select_one('a > div:nth-child(1) > img')['src']
#         scrap_author = scrap.select_one('a > div:nth-child(2) > em > b').text[1:]
#         scrap_title = scrap.select_one('a > div:nth-child(2) > span > strong').text
#         doc = {
#             'date': today,
#             'title': scrap_title,
#             'author': scrap_author,
#             'link': scrap_link,
#             'img': scrap_img,
#             'bookmark': 0,
#             'category': 'default',
#         }
#         db.devblog.insert_one(doc)
#         print('완료!', scrap_title)
#     return 0
#
#
# def remove_data():
#     db.devblog.delete({'bookmark': '0'})
#     return 0
#
#
# add_data()

def get_urls():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get('http://daily-devblog.com/archive/', headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    lists = soup.select('body > div:nth-child(3) > ul > li')
    urls = []
    for list in lists:
        element = list.select_one('a')
        url = element['href']
        image = element.select_one('div:nth-child(1) > img')['src']
        title = element.select_one('div:nth-child(2) > span > strong').text
        author = element.select_one('div:nth-child(2) > em > b').text[1:]
        print(today, url, image, title, author, sep='\n')
        doc = {
            'date': today,
            'title': title,
            'author': author,
            'link': url,
            'img': image,
            'category': 'default',
            'comment': ''
        }
        db.devblog.insert_one(doc)
        print('완료!', title)
    return


def insert_blog(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get(url, headers=headers)

    soup = BeautifulSoup(data.text, 'html.parser')

    image = soup.select_one('meta[property="og:image"]')['content']  # CSS SElECTER
    title = soup.select_one('meta[property="og:title"]')['content']
    author = soup.select_one('meta[name="by"]')['content']

    doc = {
        'date': today,
        'title': title,
        'author': author,
        'link': url,
        'img': image,
        'bookmark': 0,
        'category': 'default',
    }

    db.devblog.insert_one(doc)
    print('완료!', title)


def insert_all():
    # db.devblog.drop()
    get_urls()
    # urls = get_urls()
    # for url in urls:
    #     insert_blog(url)


### 실행하기
insert_all()
# schedule.every().days.at("00:04").do(remove_data)
# schedule.every().days.at("00:05").do(add_data)
#
# while True:
#     schedule.run_pending()
#     time.sleep(1)
