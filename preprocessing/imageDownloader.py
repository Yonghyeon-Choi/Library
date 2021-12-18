import urllib.request
import pandas as pd
import time
import os


data = pd.read_csv('images.csv')

idx = 0
errList = []
for url in data['image']:
    print(idx, url)
    start = time.time()
    filename = str(data['isbn'][idx])
    try:
        urllib.request.urlretrieve(url, os.path.join('images', filename)+".png")
        print("save ", filename + ".png")
    except:
        errList.append(url)
        print("err ", url, filename)
    print(time.time() - start)
    idx += 1
    time.sleep(0.5)

print()
print(errList)


