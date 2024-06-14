# sspai_project/sspai_project/pipelines.py

from pymongo import MongoClient
import datetime


class SspaiProjectPipeline:
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['sspai_db']
        self.collection = self.db['articles']

    def open_spider(self, spider):
        self.collection.delete_many({})

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        self.collection.insert_one(dict(item))

        return item
