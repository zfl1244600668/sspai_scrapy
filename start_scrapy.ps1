# 获取当前脚本路径
$script_path =$PSScriptRoot

# 切换到 Scrapy 项目目录
Set-Location -Path "$script_path\sspai_project"

# 启动 Scrapy
scrapy crawl sspai
