from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

try:
    # 连接到MongoDB
    client = MongoClient('mongodb://localhost:27017/')
    print("Connected successfully to server")
except ConnectionFailure:
    print("Could not connect to MongoDB")
    exit(1)  # 无法连接时退出

# 获取数据库和集合
db = client['sspai_db']
collection = db['articles']

# 打印当前集合中的所有文档
print("当前集合中的文档:")
for article in collection.find():
    print(article)

# 开启变更流
print("\n正在监听集合中的变化...")
try:
    with collection.watch() as stream:
        for change in stream:
            if change['operationType'] == 'insert':
                print("\n检测到新文档被插入:")
                print(change['fullDocument'])
            # 可以根据需要处理其他类型的变化，例如删除、更新等
            elif change['operationType'] == 'update':
                print("\n检测到文档被更新:")
                print(change['updateDescription'])
            elif change['operationType'] == 'delete':
                print("\n检测到文档被删除:")
                print(change['documentKey'])
except Exception as e:
    print(f"Error while watching the collection: {e}")
