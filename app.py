from flask import Flask, render_template, session, redirect, url_for, g, request 
from database import get_db, close_db 
from flask_session import Session 
from werkzeug.security import generate_password_hash, check_password_hash 
from forms import RegistrationForm, LoginForm 
from functools import wraps  
app = Flask (__name__)
app.teardown_appcontext (close_db) 
app.config ["SECRET_KEY"] = "mo-the-bro" 
app.config ["SESSION_PERMANENT"] = False 
app.config ["SESSION_TYPE"] = "filesystem" 
Session(app) 
 
@app.before_request 
def logged_in_user(): 
    g.user = session.get("user_id", None) 

def login_required(view): 
    @wraps (view) 
    def wrapped_view(*args, **kwargs): 
        if g.user is None:  
            return redirect(url_for("login", next=request.url)) 
        return view(*args, **kwargs) 
    return wrapped_view 


@app.route("/play")
@login_required
def play():
    user_id = session["user_id"]
    return render_template("play.html")


@app.route("/")
def index(): 
    return render_template("index.html")  


@app.route("/login", methods=["GET", "POST"])
def login(): 
    form = LoginForm() 
    if form.validate_on_submit(): 
        user_id=form.user_id.data 
        password = form.password.data 
        db = get_db() 
        possible_clashing_user= db.execute("""SELECT * FROM users WHERE user_id = ?;""", (user_id,)).fetchone() 
        if possible_clashing_user is None: 
            form.user_id.errors.append("No such user!") 
        elif not check_password_hash (possible_clashing_user["password"],password):
            form.password.errors.append("incorrectpassword!")
        else:  
            session.clear() 
            session ["user_id"] = user_id 
            
            admin_user = db.execute("""SELECT * 
                                    FROM users
                                    WHERE user_id = ? ;""",(user_id,)).fetchone()
            session["admin_user"] = admin_user["admin_user"]
            next_page= request.args.get("next") 
            if not next_page: 
                next_page = url_for("index") 
            return redirect (next_page) 
    return render_template("login.html", form=form) 




@app.route("/register", methods=["GET", "POST"]) 
def register(): 
    form = RegistrationForm()
    if form.validate_on_submit():
        user_id= form.user_id.data 
        password = form.password.data 
        db = get_db() 
        print("suiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        possible_clashing_user = db.execute("""SELECT * FROM users 
                                            WHERE user_id = ?;""", (user_id,)).fetchone()
        if possible_clashing_user is not None: 

            form.user_id.errors.append("User id already taken!") 
            db.execute("""INSERT INTO users (user_id, password) 
                        VALUES (?, ?);""",(user_id,generate_password_hash(password)))
            db.commit()
            return redirect(url_for("login")) 
        else: 
            db.execute("""INSERT INTO users (user_id, password) 
                        VALUES (?, ?);""" ,(user_id, generate_password_hash(password)))
            db.commit() 
            return redirect(url_for("login")) 
    return render_template("register.html", form=form) 



@app.route("/Logout") 
def logout(): 
    session.clear() 
    return redirect( url_for("index") ) 
 
@app.route("/lb", methods=["GET", "POST"])
def lb():
    db = get_db()
    users_scores = db.execute("""SELECT * FROM users_scoreboard
                                ORDER BY level DESC""").fetchall()

    return render_template("lb.html", users_scores = users_scores)

@app.route("/store_scores", methods = ["POST"])
@login_required

def store_scores():
    user_id = session["user_id"]
    number_goblins_killed = request.json["number_goblins_killed"]
    level = request.json["level"]
    db = get_db()
    if db.execute("""SELECT * FROM users_scoreboard WHERE user_id = ?""",(user_id,)).fetchone() is not None:
        db.execute("""UPDATE users_scoreboard 
                        SET number_goblins_killed = ?, level = ? 
                        WHERE user_id = ?""", (number_goblins_killed,level,user_id,))

    else:
        db.execute("""INSERT INTO users_scoreboard(user_id,number_goblins_killed, level)
                    VALUES (?,?,?,?)""",(user_id,number_goblins_killed, level))
    db.commit()
    return "success"

@app.route("/sb", methods=["GET", "POST"])
def sb():
    db = get_db()
    users_scores = db.execute("""SELECT * FROM users_scoreboard
                                ORDER BY level DESC""").fetchall()

    return render_template("records.html", users_scores = users_scores)