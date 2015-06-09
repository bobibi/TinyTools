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
    sys.exit('no result file provided')
fid = open(sys.argv[1], 'rb')
if not fid:
    sys.exit('invalid result file')

reader = csv.reader(fid)
rows = [i for i in reader]

for i in range(1,len(rows)-1):
    for j in range(i+1, len(rows)):
        simi = similarity(rows[i], rows[j])
        print '(%d, %d): %d'%(i,j,simi)
        failed = True
        try:
            s.query(AppCompare).filter(AppCompare.md5A==rows[i][0] and AppCompare.md5B==rows[j][0]).update({
                "NumOfBothDetected": simi})
            s.commit()
            print 'OK'
            failed = False
        except exc.NoResultFound:
            s.rollback()
        if failed:
            try:
                s.query(AppCompare).filter(AppCompare.md5A==rows[j][0] and AppCompare.md5B==rows[i][0]).update({
                    "NumOfBothDetected": simi})
                s.commit()
                print 'OK'
                failed = False
            except exc.NoResultFound:
                s.rollback()
        if failed:
            print 'FAILED'

