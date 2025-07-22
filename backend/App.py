from flask import Flask, render_template, request, redirect
from dotenv import load_dotenv
import os
from supabase import create_client
from auth import signup, login
from problems import post_problem
import json
from datetime import datetime
import jwt
from flask_cors import CORS
load_dotenv()

url = os.environ.get('SUPABASE_URL')
key = os.environ.get("SUPABASE_KEY")
supabase = create_client(url, key)

app=Flask(__name__)
CORS(app)


def decode_jwt(token):
    encoded_jwt = token
    secret = os.environ.get('SUPABASE_SECRET')
    algorithm = "HS256"  # Example algorithm, use the correct one

    try:
        decoded_payload = jwt.decode(encoded_jwt, secret,
                                     algorithms=[algorithm])
        return True
    except (jwt.ExpiredSignatureError, jwt.InvalidSignatureError,
            jwt.DecodeError):
        return False
    except jwt.InvalidAudienceError:
        return True

@app.errorhandler(404)
def not_found(error):
    return render_template("404.html")

@app.route('/', methods=['GET', ''])
def homepage():
    return render_template("homepage.html")

@app.route("/health")
def health_check():
    return {"data": "Healthy!"}, 200

@app.route('/auth/signup', methods=['GET', "POST"])
def signup_route():
    if request.method=='GET':
        return "SIGNUP"
    elif request.method=="POST":
        info={"username":'', 'email':'', 'password':''}
        for val in info:
            if request.form.get(val) is None:
                return ('Unauthorized', 401)
            info.update({val: request.form.get(val)})
        return signup(supabase, info)

@ app.route('/auth/login', methods=['POST'])
def login_route():
    if request.method=="POST":
        info = {'email': '', 'password': ''}
        for val in info:
            if request.json.get(val) is None:
                return ('Unauthorized', 401)
            info.update({val: request.json.get(val)})
        loggedIn = login(supabase, info)[0]
        # print(loggedIn)
        # return render_template("loggedin.html", access_token=loggedIn.get(
        #     'token'),
                               # user_id=loggedIn.get('id'))
        return loggedIn, 200

@app.route("/login")
def login_page():
    return render_template("login.html")

@app.route("/resources", methods=['GET', 'POST'])
def resource_page():
    if request.method == 'GET':
        data=supabase.table('Resources').select().execute()
        data = data.data
        return data, 200
        # return render_template("resources.html", data=data)
    elif request.method=='POST':
        token = request.json.get("access-token")
        print(token)
        link=request.json.get('Link')
        level=request.json.get('Level')
        topic=request.json.get('Topic')
        print(topic)
        tableresponse=supabase.table('Resources').insert({'link':link,
                                                          'topic': topic,
                                                          'level':level}).execute()
        return tableresponse.data, 201
        # return redirect("/resources")

@app.route('/problems/post', methods=['GET', 'POST'])
def problems_page():
    if request.method == "GET":
        return render_template('problemspost.html')
    elif request.method=='POST':
        token = request.json.get("access-token") # header values
        print(token)
        if not decode_jwt(token):
            return

        problem=request.json.get('Problem') # form body
        answer=request.json.get('Answer')
        level=request.json.get('Level')
        topic=request.json.get('Topic')
        tableresponse=post_problem(supabase, token, problem, answer, level,
                                  topic)
        return tableresponse



@app.route('/signout')
def signout():
    return render_template('signout.html')

@app.route('/account')
def account():
    # if request.method == "GET":
    user_id=request.headers.get('x-user-id')
    token = request.headers.get("x-access-token")
    print(token, user_id)# header values
    if not decode_jwt(token):
        return "Unauthorized", 401
    # redirect('/signout')
    user_name=supabase.table('Users').select('user_name').eq(
        "id", user_id).execute().data[0].get("user_name")
    # return render_template
    return user_name, 200
        # return "", 200


@app.route('/problems/browse')
def browse():
    response=supabase.table('Problems').select().order('level',
                                                       desc=False).execute()
    problems= response.data
    for problem in problems:

        problem['created_at'] = datetime(int(problem['created_at'][0:4]),
                                         int(problem['created_at'][5:7]),
                                         int(problem['created_at'][
                                             8:10])).strftime('%a %m/%d/%Y')



    """
    
    1. keep track of user id through allproblems
    2. know which ones they have solved/gotten wrong
    3. everytime they access all problems change the look of each problem    
    """
    # return render_template('allproblems.html', problems=problems)
    return problems, 200

@app.route('/answer', methods=['GET', 'POST'])
def get_answer():
    if request.method=='POST':
        """
        change page ex. change color of problem for the user. Then, take the 
        user back to the page.
        """
        print(request.form)
        return 'answer'
    else:
        return 'answer'

if __name__ == "__main__":
    app.run(debug=True)