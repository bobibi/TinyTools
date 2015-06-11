''' Database '''
from sqlalchemy import MetaData, Integer, Table, Column, text
from sqlalchemy.dialects.mysql import TIMESTAMP
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, exc
from sqlalchemy import and_

engine = create_engine("mysql://VisualThreats:@localhost/VisualThreats?charset=utf8&use_unicode=1", echo=False)
Base = declarative_base()
metadata = MetaData(bind=engine)
session = sessionmaker()
session.configure(bind=engine)
s = session()
    
class AmazonReview(Base):
    __table__=Table('AmazonReview', metadata, autoload=True)
    
class AmazonReviewer(Base):
    __table__=Table('AmazonReviewer', metadata, autoload=True)
