from flask import Flask, render_template, jsonify, request
import requests
import time
from bs4 import BeautifulSoup
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('mongodb://test:test@localhost', 27017)
db = client.dbsparta
today = time.strftime('%Y-%m-%d', time.localtime(time.time()))


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/stack', methods=['GET'])
def read_articles():
    stack_list = list(db.devblog.find({}, {'_id': False}).sort('_id', 1))
    return jsonify({'result': 'success', 'articles': stack_list})


@app.route('/<category>')
def move_to_category(category):
    return render_template('article.html', category=category)


@app.route('/<category>/stack', methods=['GET'])
def read_category_article(category):
    category_stack_list = list(db.devblog.find({'category': category}, {'_id': False}).sort('_id', 1))
    return jsonify({'result': 'success', 'articles': category_stack_list, 'category': category})


@app.route('/stack', methods=['POST'])
def post_article():
    category_receive = request.form['category_give']
    print(category_receive)
    comment_receive = request.form['comment_give']
    print(comment_receive)
    link_receive = request.form['link_give']
    print(link_receive)
    db.devblog.update_one({'link': link_receive},
                          {'$set': {'category': category_receive, 'comment': comment_receive}})
    return jsonify({'result': 'success', 'msg': '카테고리 등록 완료!'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
