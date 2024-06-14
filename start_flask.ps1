# 获取当前脚本路径
$script_path =$PSScriptRoot

# 切换到 Flask 项目目录
Set-Location -Path "$script_path\sspai_flask"

# 启动 Flask
python app.py


