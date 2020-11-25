from flask import Flask, render_template, jsonify, request
import requests
import time
from bs4 import BeautifulSoup
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbsparta
today = time.strftime('%Y-%m-%d', time.localtime(time.time()))


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/article/<category>')
def article(category):
    return render_template('article.html', category=category)


@app.route('/stack', methods=['POST'])
def post_article():
    category_receive = request.form['category_give']

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
    data = requests.get("", headers=headers)

    doc = {
        'url': "",
        'category': category_receive,
    }
    db.devblog.update_one({'link': 'url'}, {'$set': {'category': 'category'}})

    return jsonify({'result': 'success', 'msg': '포스팅 완료!'})


@app.route('/stack', methods=['GET'])
def read_articles():
    stack_list = list(db.devblog.find({'date': today}, {'_id': False}).sort('_id', 1))
    return jsonify({'result': 'success', 'articles': stack_list})


@app.route('/articles/<category>', methods=['GET'])
def articles(category):
    # category = request.args.get("category_recieve")
    stack_list = list(db.devblog.find({'category': category}, {'_id': False}).sort('_id', 1))
    return jsonify({'result': 'success', 'articles': stack_list})


# @app.route('/operating_system', methods=['GET'])
# def read_articles():
#     stack_list = list(db.devblog.find({'category': "operating_system"}, {'_id': False}).sort('_id', 1))
#     return jsonify({'result': 'success', 'articles': stack_list})
#
#
# @app.route('/data_structure_algorithm', methods=['GET'])
# def read_articles():
#     stack_list = list(db.devblog.find({'category': "data_structure_algorithm"}, {'_id': False}).sort('_id', 1))
#     return jsonify({'result': 'success', 'articles': stack_list})
#
#
# @app.route('/programming', methods=['GET'])
# def read_articles():
#     stack_list = list(db.devblog.find({'category': "programming"}, {'_id': False}).sort('_id', 1))
#     return jsonify({'result': 'success', 'articles': stack_list})
#
#
# @app.route('/network', methods=['GET'])
# def read_articles():
#     stack_list = list(db.devblog.find({'category': "network"}, {'_id': False}).sort('_id', 1))
#     return jsonify({'result': 'success', 'articles': stack_list})
#
#
# @app.route('/multimedia', methods=['GET'])
# def read_articles():
#     stack_list = list(db.devblog.find({'category': "multimedia"}, {'_id': False}).sort('_id', 1))
#     return jsonify({'result': 'success', 'articles': stack_list})
#
#
# @app.route('/information_security', methods=['GET'])
# def read_articles():
#     stack_list = list(db.devblog.find({'category': "information_security"}, {'_id': False}).sort('_id', 1))
#     return jsonify({'result': 'success', 'articles': stack_list})
#
#
# @app.route('/software_engineering', methods=['GET'])
# def read_articles():
#     stack_list = list(db.devblog.find({'category': "software_engineering"}, {'_id': False}).sort('_id', 1))
#     return jsonify({'result': 'success', 'articles': stack_list})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
