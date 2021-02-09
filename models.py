from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
from flask_login import  UserMixin
import uuid
import datetime

db = SQLAlchemy()





class Branch(db.Model):
    __tablename__ = 'branches'
    ifsc = db.Column(db.String(), primary_key=True)
    branch = db.Column(db.String())
    address = db.Column(db.String())
    city = db.Column(db.String())
    district = db.Column(db.String())
    state = db.Column(db.String())