from flask import Flask, request, send_from_directory

app = Flask(__name__, static_folder=".", static_url_path="")

@app.route("/")
def login():
    return send_from_directory(".", "login.html")

@app.route("/pruefen", methods=["POST"])
def pruefen():
    passwort = request.form.get("passwort")

    with open("pw.txt", "r") as f:
        pw = f.read().strip()
        if passwort == pw:
            return "true"
        else:
            return "false"
@app.route("/start")
def start():
    return send_from_directory(".", "start.html")

@app.route("/daten")
def daten():
    return send_from_directory(".", "chart_data.json", mimetype="application/json")


if __name__ == "__main__":
    app.run(port=8000)