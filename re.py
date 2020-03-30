import re

text = """First line.
Second line.
Third line."""

pattern = "^(.*?)$"  # Match anything from the start to end. 非贪婪匹配

# 让^、$只匹配字符串的开头、结尾, .不匹配换行符
ret1 = re.search(pattern, text)  
print(ret1)

# 让.匹配换行符
ret2 = re.search(pattern, text, re.S)  
print(ret2)

# 让^、$匹配每行的开头、结尾, 同时让.匹配换行符, 且pattern是非贪婪匹配
ret3 = re.search(pattern, text, re.M | re.S)  
print(ret3)

# 让^、$匹配每行的开头、结尾, 同时让.匹配换行符, 且pattern是贪婪匹配
ret4 = re.search("^(.*)$", text, re.M | re.S)  
print(ret4)

# 让^、$匹配每行的开头、结尾, 非贪婪
ret5 = re.findall