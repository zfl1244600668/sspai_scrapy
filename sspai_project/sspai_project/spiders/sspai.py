# sspai_project/sspai_project/spiders/sspai.py

import scrapy
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
from lxml import etree
from sspai_project.items import SspaiProjectItem


class SspaiSpider(scrapy.Spider):
    name = 'sspai'
    start_urls = ['https://sspai.com/matrix/random']

    def __init__(self, *args, **kwargs):
        super(SspaiSpider, self).__init__(*args, **kwargs)

        chrome_options = Options()
        chrome_options.add_argument("--start-maximized")

        self.driver = webdriver.Chrome(options=chrome_options)

    def parse(self, response):
        for _ in range(99):
            self.driver.get(response.url)

            page_source = self.driver.page_source

            tree = etree.HTML(page_source)

            title_xpath = "/html/body/div/div/div[1]/div[1]/div[2]/div/main/ul/li[i]/div/a/div"
            link_xpath = "/html/body/div/div/div[1]/div[1]/div[2]/div/main/ul/li[i]/div/a"
            author_xpath = "/html/body/div/div/div[1]/div[1]/div[2]/div/main/ul/li[i]/div/div/a[2]/span"
            time_xpath = "/html/body/div/div/div[1]/div[1]/div[2]/div/main/ul/li[i]/div/div/div/span[3]/span"
            charge_count_xpath = "/html/body/div/div/div[1]/div[1]/div[2]/div/main/ul/li[i]/div/div/div/span[1]/span"
            comment_count_xpath = "/html/body/div/div/div[1]/div[1]/div[2]/div/main/ul/li[i]/div/div/div/span[2]/span"

            i = 1

            while True:
                row_data = {}

                try:
                    title = tree.xpath(title_xpath.replace("[i]", f"[{i}]"))[0].text.strip()
                    link = tree.xpath(link_xpath.replace("[i]", f"[{i}]"))[0].get('href').strip()
                    row_data['title'] = title
                    row_data['link'] = link
                except IndexError:
                    break

                try:
                    author = tree.xpath(author_xpath.replace("[i]", f"[{i}]"))[0].text.strip()
                    row_data['author'] = author
                except IndexError:
                    row_data['author'] = ''

                try:
                    time_posted = tree.xpath(time_xpath.replace("[i]", f"[{i}]"))[0].text.strip()
                    row_data['time_posted'] = time_posted
                except IndexError:
                    row_data['time_posted'] = ''

                try:
                    charge_count = tree.xpath(charge_count_xpath.replace("[i]", f"[{i}]"))[0].text.strip()
                    row_data['charge_count'] = int(charge_count) if charge_count.isdigit() else 0
                except IndexError:
                    row_data['charge_count'] = 0

                try:
                    comment_count = tree.xpath(comment_count_xpath.replace("[i]", f"[{i}]"))[0].text.strip()
                    row_data['comment_count'] = int(comment_count) if comment_count.isdigit() else 0
                except IndexError:
                    row_data['comment_count'] = 0

                if all(field in row_data for field in
                       ['title', 'link', 'author', 'time_posted', 'charge_count', 'comment_count']):
                    item = SspaiProjectItem()
                    item['title'] = row_data['title']
                    item['link'] = row_data['link']
                    item['author'] = row_data['author']
                    item['time_posted'] = row_data['time_posted']
                    item['charge_count'] = row_data['charge_count']
                    item['comment_count'] = row_data['comment_count']

                    yield item
                    time.sleep(1)  # 每处理一个item后增加1秒延迟

                i += 1

            time.sleep(3)  # 为避免被封，等待2秒再进行下一次请求

        self.driver.quit()
