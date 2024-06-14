# sspai_project/sspai_project/items.py

import scrapy

class SspaiProjectItem(scrapy.Item):
    title = scrapy.Field()
    link = scrapy.Field()
    author = scrapy.Field()
    time_posted = scrapy.Field()
    charge_count = scrapy.Field()
    comment_count = scrapy.Field()
