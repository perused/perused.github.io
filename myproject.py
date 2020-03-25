from modules import *
from flask import *
import sys

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("/html/index.html")

@app.route("/about")
def about():
    return render_template("/html/about.html")

@app.route("/projects")
def projects():
    return render_template("/html/projects.html")

@app.route("/train_game", methods=['POST', 'GET'])
def train_game():

    results = []

    if request.method == "GET":
        return render_template("/html/traingame.html", results=results)

    elif request.method == "POST":

        results = generate (
            request.form["num1"],
            request.form["num2"],
            request.form["num3"],
            request.form["num4"]
        )

        if results == None:
            results = []
            return render_template("/html/traingame.html", results=results)

        return render_template("/html/traingame.html", results=results)

@app.route("/centaurgenerator")
def centaur_generator():
    return render_template("/html/centaurgenerator.html")

@app.route("/inprogress")
def in_progress():
    return render_template("/html/inprogress.html")


if __name__=="__main__":
    app.run(host='0.0.0.0')

