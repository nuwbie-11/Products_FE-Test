from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    passwd = db.Column(db.String(120), nullable=False)
    isUser = db.Column(db.Boolean, default=False)
    userId = db.relationship('Profile', backref='user')
    
    def toJson(this):
        return {
            'id' : this.id,
            'username' : this.username,
            'passwd' : this.passwd,
            'isUser':this.isUser,
            'userId':this.userId,
        }
    

class Profile(db.Model):
    idProfile = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80),nullable=False)
    addres = db.Column(db.String(80), nullable=False)
    Position = db.Column(db.String(12), nullable=False)
    idUser = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    def toJson(this):
        return {
            'idProfile' : this.idProfile,
            'name' : this.name,
            'addres' : this.addres,
            'Position':this.Position,
            'idUser':this.idUser,
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    namaBarang = db.Column(db.String(191),nullable=False)
    sku = db.Column(db.String(45),nullable=False)
    deskripsi = db.Column(db.String(250),nullable=False)
    brand = db.Column(db.String(45),nullable=False)
    namaVariasi = db.Column(db.String(45),nullable=False)
    skuVariasi = db.Column(db.String(45),nullable=False)
    hargaVariasi = db.Column(db.Integer, nullable=False)
     
    def toJson(this):
        return {
            'id' : this.id,
            'namaBarang' : this.namaBarang,
            'sku' : this.sku,
            'brand':this.brand,
            'namaVariasi':this.namaVariasi,
            'skuVariasi':this.skuVariasi,
            'hargaVariasi':this.hargaVariasi,
        }
        