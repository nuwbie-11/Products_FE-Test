from flask import Flask, request, jsonify,session,make_response
from flask_restful import Api, Resource, reqparse
from flask_sqlalchemy import SQLAlchemy
from src.model import db, User,Profile,Product
import jwt
from datetime import datetime, timedelta

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://kire:apples@localhost/staffku'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "my_secretKey"

api = Api(app)

db.init_app(app)

@app.route('/getProfile',methods=['POST'])
def getProfile():
    body = request.json
    userId = body['userId'] 
    
    return jsonify(response=Profile.query.filter_by(idProfile=userId).first().toJson()),200

@app.route('/getProducts',methods=['GET'])
def getProducts():
    products = [x.toJson() for x in Product.query.all()]
    # print(products)
    
    return jsonify(response=products),200

@app.route('/createNewProducts',methods=['POST'])
def createNewProducts():
    body = request.json()
    newSku = ""
    new_products = Product(
        namaBarang=body['namaBarang'],
        sku=newSku,
        deskripsi=body['deskripsi'],
        brand= body['brand']
    )



@app.route('/getDistinctBrand',methods=['GET'])
def getDistinctBrand():
    brands = [x.toJson()["brand"] for x in Product.query.distinct(Product.brand).all()]
    print(brands)
    return jsonify(response=brands),200

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    uname = data.get('uname')
    passwd = data.get('passwd')
    # Replace with your authentication logic
    user = User.query.filter_by(username=uname).first().toJson()
    # print(user)
    if user["username"] == uname and user["passwd"] == passwd:
        session['uname'] = uname  # Set a session variable
        token = jwt.encode({
            'activeUserId':user["id"],
            'exp':datetime.utcnow() + timedelta(days = 1)
        },app.config["SECRET_KEY"])
        response = make_response(jsonify(message='Login successful'))
        response.set_cookie('token',token,httponly=True)
        return response
    else:
        return jsonify(message='Login failed'), 401
    
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('uname', None)  # Clear the session variable
    return jsonify(message='Logged out'), 200

@app.route('/protected', methods=['GET'])
def protected():
    token = request.cookies.get('token')
    # print(token)
    if 'uname' in session and token:
        return jsonify(message='Protected data',uid = jwt.decode(token,app.config["SECRET_KEY"],algorithms=['HS256'])["activeUserId"]), 200
    else:
        return jsonify(message='Unauthorized access'), 401

if __name__ == '__main__':
    app.run(debug=True)