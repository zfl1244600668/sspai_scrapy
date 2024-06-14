# 启动 Scrapy 项目
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`"Set-Location -Path `"$PSScriptRoot\sspai_project`"; scrapy crawl sspai`""

# 启动 Flask 项目
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`"Set-Location -Path `"$PSScriptRoot\sspai_flask`"; python app.py`""

# 等待 Flask 应用启动
Start-Sleep -Seconds 12

# 打开 Flask 应用的网址
Start-Process "http://127.0.0.1:5000"
