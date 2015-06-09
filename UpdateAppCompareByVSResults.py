'''
Visual Threats analysis provides detection for individual app
In this script, I will compare those detection results between each pair of apps
and update the database table
'''

''' Database '''
from sqlalchemy import MetaData, Integer, Table, Column, text
from sqlalchemy.dialects.mysql import TIMESTAMP
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, exc

engine = create_engine("mysql://VisualThreats:@localhost/VisualThreats?charset=utf8&use_unicode=1", echo=False)
Base = declarative_base()
metadata = MetaData(bind=engine)
session = sessionmaker()
session.configure(bind=engine)
s = session()
    
class AppCompare(Base):
  __table__=Table('AppCompare', metadata, autoload=True)
  
def similarity(a, b):
  simi = 0
  for i in range(4,28):
    if a[i]=='Y' and b[i]=='Y':
      simi+=1
  for i in range(28,37):
    if int(a[i])>0 and int(b[i])>0:
      simi+=1
  return simi

''' Running '''
import csv
import sys
if not sys.argv[1]:
  exit('no result file provided')
fid = open(sys.argv[1], 'rb')
if not fid:
  exit('invalid result file')

reader = csv.reader(fid)
rows = [i for i in reader]

for i in range(1,len(rows)-1):
  for j in range(i+1, len(rows)):
    simi = similarity(rows[i], rows[j])
    try:
        s.query(AppCompare).filter(AppCompare.md5A==rows[i][0] and AppCompare.md5B==rows[j][0]).update({"NumberOfReviews": prod.NumberOfReviews})
        s.commit()
    except:
        s.rollback()
        raise

''''''
from numpy import linalg as LA
import sys

apppool = s.query(AppMeta).filter(AppMeta.rank<101).all()
N = len(apppool)
print N

for i in range(0, N-1):
    print i
    A = apppool[i]
    for j in range(i+1, N):
        B = apppool[j]
        try:
            s.add(AppCompare(md5A=A.md5,
                             md5B=B.md5,
                             author=A.author==B.author,
                             name=A.name==B.name,
                             category=A.category_id==B.category_id,
                             install=A.installs_left-B.installs_left,
                             score=A.score-B.score,
                             rank=A.rank-B.rank,
                             size=A.size-B.size,
                             review=A.review-B.review,
                             rating=LA.norm((A.rating_1-B.rating_1, A.rating_2-B.rating_2, A.rating_3-B.rating_3, A.rating_4-B.rating_4, A.rating_5-B.rating_5))))
            s.commit()
        except Exception, e:
            s.rollback()
            print 'ERROR: %s' % str(e)
            sys.exit('error')
