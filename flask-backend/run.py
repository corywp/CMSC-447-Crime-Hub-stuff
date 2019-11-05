import flask

app = flask.Flask("__main__")

@app.route('/')

def hello_world():
    return flask.render_template("index.html", token= "React and Flask!")

app.run(host='0.0.0.0', port='3000')
