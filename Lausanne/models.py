from flakApp import db

class raw(db.Model):
    __tablename__ = 'olympics_raw'
    
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.Integer, primary_key=True)
    City = db.Column(db.String(64))
    Edition =  db.Column(db.String(64))
    Event= db.Column(db.String(64))
    Event_Gender= db.Column(db.String(64))
    Medal = db.Column(db.String(64))
    country_id =db.Column(db.Integer, db.ForeignKey('country_ref.id'))
    NOC = db.Column(db.String(64))
    Gender = db.Column(db.String(64))
    Discipline = db.Column(db.String(64))
    Athlete = db.Column(db.String(64))
    Sport = db.Column(db.String(64))
    def __repr__(self):
        return '<raw %r>' % (self.id)
    
class country_ref(db.Model):
    __tablename__ = 'country_ref' 
    __table_args__ = {'extend_existing': True} 
    id = db.Column(db.Integer, primary_key=True)
    country_name = db.Column(db.String(64))
    code =db.Column(db.String(64))
    flag_source = db.Column(db.String(64))
    flag_image = db.Column(db.String(64))
    def __repr__(self):
        return '<country_ref %r>' % (self.id)
