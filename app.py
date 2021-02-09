from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin  
from models import db, Branch
from sqlalchemy.sql import func
from sqlalchemy import create_engine, engine, MetaData
import pandas as pd
import time


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:SudoAdmin123@localhost/bank"
app.config['SECRET_KEY'] = '0817PDNTSPA'

# cors = CORS(app, resources={r"/api/branches": {"origins": "http://localhost:3000"}})

db.app = app
db.init_app(app)
# db.create_all()


@app.route('/', methods=['GET'])
def homepage():
    return jsonify({
        "Success": "Homepage"
    }), 200

@app.route('/api/branches/autocomplete', methods=['GET'])
def autocomplete():
    query_prams = request.args
    if query_prams:
        if (('offset' in query_prams) and ('limit' in query_prams) and ('q' in query_prams)):
            branch_name = query_prams.get('q')
            search_param = "%"+ str(branch_name) + "%"
            limit = query_prams.get('limit')
            offset = query_prams.get('offset')
            matches = Branch.query.filter(Branch.branch.like(search_param)).offset(offset).limit(limit).all()
            matches = {"branches": [{"ifsc": x.ifsc, "branch": x.branch, "address": x.address, "city" :x.city, "district": x.district, "state":x.state } for x in matches]}
            if matches["branches"]:
                return jsonify(matches)
            else:
                return jsonify({"Oops" : "No relevant matches found"})
        else:
            return jsonify({
                "error" : "Query parameter not properly defined."
            })
    
    return jsonify({
        "error": "No query parameters found"
    }), 200


@app.route('/api/branches', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def possible_matches():
    query_prams = request.args
    if query_prams:
        if (('offset' in query_prams) and ('limit' in query_prams) and ('q' in query_prams)):
            query_name = query_prams.get('q')
            query_param = str(query_name)
            limit = query_prams.get('limit')
            offset = query_prams.get('offset')

            # columns = [
            # "branch",
            # "address",
            # "ifsc",
            # "city",
            # "district",
            # "state"
            # ]
            # d = {column: query_param for column in columns}
            # time1 = time.time()
            # raw = [
            #     Branch.query.filter(getattr(Branch, col).ilike(query_param)).all()
            #     for col in columns
            # ]
            # time2 = time.time()
            # time3 = time.time()
            # deletion = [set(x) for x in raw if len(x) != 0]
            # deletion =  deletion[0].intersection(*deletion)
            # raw = [j for i in raw for j in i]
            # print(len(raw))
            # raw = set(raw)
            # raw = raw - deletion
            # time4 = time.time()
            # print(time2-time1)
            # print(time4-time3)
            raw = set(Branch.query.filter(db.or_(Branch.branch.ilike(query_param),Branch.district.ilike(query_param),Branch.city.ilike(query_param),
            Branch.address.ilike(query_param),Branch.state.ilike(query_param),Branch.ifsc.ilike(query_param))).offset(offset).limit(limit).all())
            print(len(raw))
            results = {"branches": [{"ifsc": x.ifsc, "branch": x.branch, "address": x.address, "city" :x.city, "district": x.district, "state":x.state } for x in raw]}
            if results["branches"]:
                return jsonify(results)
            return jsonify({"Oops" : "No relevant matches found"})
        else:
            return jsonify({
                "error" : "Query parameter not properly defined."
            })
    
    return jsonify({
        "error": "No query parameters found"
    }), 200

@app.route('/etl', methods=['GET'])
def etl():
    with open("indian_banks/bank_branches.csv", 'r', encoding="utf-8") as csvfile:
        csv_database = create_engine('postgresql://postgres:SudoAdmin123@localhost/bank')
        metadata = MetaData(csv_database)
        for frame in pd.read_csv(csvfile, chunksize= 1000, iterator=True):
            print(frame)
            try:
                frame.to_sql("branches", csv_database, if_exists='append')
            except Exception as e:
                return jsonify({
                    "Error": str(e)
                })
    return jsonify({
        "success": "Done"
    })



if __name__ == "__main__":
    app.run(debug=True)

            # d = {column: query_param for column in columns}
            # time1 = time.time()
            # raw = Branch.query.filter(db.or_(Branch.district.ilike(query_param),Branch.state.ilike(query_param),Branch.city.ilike(query_param),
            #     Branch.ifsc.ilike(query_param),Branch.address.ilike(query_param),Branch.branch.ilike(query_param))).all()
            # print(raw)
            # time2 = time.time()
            # time3 = time.time()
            # deletion = [set(x) for x in raw if len(x) != 0]
            # deletion =  deletion[0].intersection(*deletion)
            # raw = [j for i in raw for j in i]
            # raw = set(raw)
            # raw = raw - deletion
            # time4 = time.time()
            # print(time2-time1)
            # print(time4-time3)
            # print(raw)