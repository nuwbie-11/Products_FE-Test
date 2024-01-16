from flask import Flask, request, jsonify,session,make_response
from flask_restful import Api   
from flask_cors import CORS
from src.model import db, User,Profile,Product
import jwt
from datetime import datetime, timedelta
from flask_session import Session


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://kire:apples@localhost/staffku'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = "my_secretKey"
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
Session(app)

CORS(app,supports_credentials=True)
api = Api(app)
db.init_app(app)



# Profile Routes ENDPOINT
@app.route('/getProfile/<profileId>',methods=['GET'])
def getProfile(profileId):
    profile = Profile.query.filter_by(idProfile=profileId).first()
    if profile is not None:
        return jsonify(response=profile.toJson()),200
    else:
        print("not found")
        return jsonify(response="Not Found"),400

# END OF Profile Routes ENDPOINT

# ===============

# PRODUCT ROUTES ENDPOINT
@app.route('/getProducts',methods=['GET'])
def getProducts():
    products = Product.query.all()
    if products is not None:
        products = [x.toJson() for x in products]
        return jsonify(response=products),200
    else:
        print("not found")
        return jsonify(response="Not Found"),400

@app.route('/products/<id>',methods=['GET'])
def getProductsById(id):
    if 'uname' in session:
        detail = Product.query.filter_by(id=id).first()
        if detail is not None:
            return jsonify(response=detail.toJson()),200
        else:
            print("not found")
            return jsonify(response="Not Found"),400
    else:
        return jsonify(response="Unauthorized"),401

@app.route('/createProductRecord',methods=['POST'])
def createNewProducts():
    body = request.json
    varSku = ""
    brandSku = ""
    for i,substring in enumerate(body["brand"].split(" ")):
        brandSku += substring[::2].upper()
        if i != len(body["brand"].split(" "))-1:
            brandSku += "-"
    for i,substring in enumerate(body["namaVariasi"].split(" ")):
        varSku += substring[::2].upper()
        if i != len(body["namaVariasi"].split(" "))-1:
            varSku += "-"
    new_sku = f"{varSku}-{brandSku}"
    # print(new_sku)
    try:    
        new_products = Product(
            namaBarang=body['namaBarang'],
            sku=new_sku,
            brand= body['brand'],
            deskripsi=body['deskripsi'],
            namaVariasi=body['namaVariasi'],
            skuVariasi=varSku,
            hargaVariasi=int(body['hargaVariasi']),
        )
        db.session.add(new_products)
        db.session.commit()
        return jsonify(response="Success"),200
    except Exception as e:
        print(e)
        return jsonify(response=e),200

@app.route('/updateProduct/<id>',methods=['POST'])
def updateProduct(id):
    product = Product.query.get(id)
    # print(product.toJson())
    body = request.json
    # print(body)
    varSku = ""
    brandSku = ""
    
    for i,substring in enumerate(body["brand"].split(" ")):
        brandSku += substring[::2].upper()
        if i != len(body["brand"].split(" "))-1:
            brandSku += "-"
    for i,substring in enumerate(body["namaVariasi"].split(" ")):
        varSku += substring[::2].upper()
        if i != len(body["namaVariasi"].split(" "))-1:
            varSku += "-"
    new_sku = f"{varSku}-{brandSku}"
    
    product.namaBarang=body['namaBarang'],
    product.sku=new_sku,
    product.brand= body['brand'],
    product.deskripsi=body['deskripsi'],
    product.namaVariasi=body['namaVariasi'],
    product.skuVariasi=varSku,
    product.hargaVariasi=int(body['hargaVariasi'])
    
    db.session.commit()
    
    
    return jsonify(response="brands"),200

@app.route('/deleteProduct/<id>',methods=['GET'])
def deleteProduct(id):
    product = Product.query.get(id)
    
    db.session.delete(product)
    db.session.commit()
    
    return jsonify({'message': 'Product deleted successfully'}),200

@app.route('/getDistinctBrand',methods=['GET'])
def getDistinctBrand():
    if 'uname' in session :
        brands = Product.query.distinct(Product.brand).all()
        if brands is not None:
            brands = [x.toJson()["brand"] for x in brands]
            # print(brands)
            return jsonify(response=brands),200
        else:
            print("not found")
            return jsonify(response="Not Found"),400
    else:
        return jsonify(response="Unauthorized"),401

# END OF PRODUCT ROUTES ENDPOINT

# ===============

# LOGIN & AUTHENTICATION

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    uname = data.get('uname')
    passwd = data.get('passwd')
    try: 
        user = User.query.filter_by(username=uname).first()
        print(user)
        if user is None:
            return jsonify(message='User Not Found'), 400
        elif user.username == uname and user.passwd == passwd:
            session['uname'] = uname  # Set a session variable
            token = jwt.encode({
                'activeUserId':user.id,
                'exp':datetime.utcnow() + timedelta(days = 1)
            },app.config["SECRET_KEY"])
            response = make_response(jsonify(message='Login successful',token=token))
            response.set_cookie('activeUser',token,httponly=True)
            response.headers['Access-Control-Allow-Origin'] = '*'
            return response
        else:
            return jsonify(message='Login failed'), 401
    except Exception as e:
            return jsonify(message=e),500
    
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('uname', None)  # Clear the session variable
    return jsonify(message='Logged out'), 200

@app.route('/protected', methods=['GET'])
def protected():
    token = request.cookies.get('activeUser')

    if 'uname' in session and token:
        return jsonify(message='Protected data',uid = jwt.decode(token,app.config["SECRET_KEY"],algorithms=['HS256'])["activeUserId"]), 200
    else:
        return jsonify(message='Unauthorized access'), 401


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response



if __name__ == '__main__':
    app.run(debug=True)