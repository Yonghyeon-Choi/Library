import json
import re
import urllib.request
import urllib.parse
import pandas as pd
import time

ISBN = pd.read_csv('ISBN.csv')

newISBN = []
for line in ISBN['ISBN']:
    new_line = re.sub(r"[^a-zA-Z0-9]", "", line)
    newISBN.append(new_line)

print(newISBN)

def searching(title):
    client_id = "WLXlFz1vjpU82Ta3TqX3"
    client_secret = "s1SIDD_od0"

    encText = urllib.parse.quote(title)

    url = "https://openapi.naver.com/v1/search/book?query=" + encText #+ "&display=5"

    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id", client_id)
    request.add_header("X-Naver-Client-Secret", client_secret)
    response = urllib.request.urlopen(request)

    rescode = response.getcode()
    if (rescode == 200):
        response_body = response.read()
        result = response_body.decode('utf-8')
        result = json.loads(result)
        if not result['items']:
            return {}
        else:
            return result['items'][0]
    else:
        print("Error Code:" + rescode)
        return -1


df = pd.DataFrame(columns=['isbn', 'title', 'author', 'publisher', 'pubdate',
                           'description', 'count', 'comments', 'image', 'link'])
i = 0
for isbn in newISBN:
    info = searching(isbn)
    print(isbn, info)
    df = df.append({'isbn': str(isbn), 'title': str(info['title']), 'author': str(info['author']),
                    'publisher': str(info['publisher']), 'pubdate': str(info['pubdate']),
                    'description': str(info['description']), 'count': ISBN['COUNT'][i], 'comments': [],
                    'image': info['image'], 'link': info['link']}, ignore_index=True)
    i += 1
    time.sleep(1)

print(df)
df.to_csv('book.csv', index=False, encoding='utf-8-sig')