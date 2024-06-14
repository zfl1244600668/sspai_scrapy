from flask import Flask, render_template, redirect, url_for, jsonify
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

app = Flask(__name__)

try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['sspai_db']
    collection = db['articles']
    print("Connected successfully to server")
except ConnectionFailure:
    print("Could not connect to MongoDB")
    exit(1)


@app.route('/')
def home():
    return redirect(url_for('control'))


@app.route('/control')
def control():
    return render_template('control.html')


@app.route('/table')
def table():
    articles = list(collection.find())
    return render_template('table.html', articles=articles)


@app.route('/chart')
def chart():
    articles = list(collection.find({}, {'title': 1, 'charge_count': 1, 'comment_count': 1, '_id': 0}))
    return render_template('chart.html', articles=articles)


@app.route('/api/articles')
def api_articles():
    articles = list(collection.find({}, {'title': 1, 'link': 1, 'author': 1, 'time_posted': 1, 'charge_count': 1,
                                         'comment_count': 1, '_id': 0}))
    return jsonify(articles)


if __name__ == '__main__':
    app.run(debug=True)
