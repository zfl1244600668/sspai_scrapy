# sspai_project/sspai_project/settings.py

BOT_NAME = 'sspai_project'

SPIDER_MODULES = ['sspai_project.spiders']
NEWSPIDER_MODULE = 'sspai_project.spiders'

# Obey robots.txt rules
ROBOTSTXT_OBEY = False

# Configure item pipelines
ITEM_PIPELINES = {
    'sspai_project.pipelines.SspaiProjectPipeline': 300,
}

CONCURRENT_REQUESTS = 1
DOWNLOAD_DELAY = 1
5