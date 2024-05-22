
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, EqualTo
from flask_wtf import FlaskForm
from wtforms import SubmitField,PasswordField,StringField
from wtforms.validators import InputRequired, EqualTo

class RegistrationForm(FlaskForm):
    user_id = StringField("Userid:",
                          validators = [InputRequired()])
    password =PasswordField("password:",
                            validators = [InputRequired()])
    password2 = PasswordField("Re-enter the password:",
                    validators=[InputRequired(),EqualTo("password")])
    submit = SubmitField("submit")

class LoginForm(FlaskForm):
    user_id = StringField("user_id",
                          validators = [InputRequired()])
    password = PasswordField("password:",
                             validators = [InputRequired()])
    submit = SubmitField("submit")