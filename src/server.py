from flask import Flask, jsonify, request, send_from_directory
import sqlite3

app = Flask(__name__, static_folder=".", static_url_path="")

with sqlite3.connect('daten.db') as con:
    con.execute('''
        CREATE TABLE IF NOT EXISTS nutzer (passwort TEXT)
    ''')
    con.execute('''
        CREATE TABLE IF NOT EXISTS monat (monat TEXT, betrag REAL)
    ''')

@app.route("/")
def login():
    return send_from_directory(".", "login.html")

@app.route("/login", methods=["POST"])
def pruefen():
    passwort = request.form.get("passwort")

    with sqlite3.connect('daten.db') as con:
        cursor = con.cursor()
        cursor.execute("SELECT passwort FROM nutzer")
        correct_password = cursor.fetchone()

        if correct_password and passwort == correct_password[0]:
            return "true"
        if not correct_password:
            cursor.execute("INSERT INTO nutzer (passwort) VALUES (?)", (passwort,))
            return "true"
        return "false"

@app.route("/start")
def start():
    return send_from_directory(".", "start.html")

@app.route("/monate")
def monate():
    with sqlite3.connect('daten.db') as con:
        cursor = con.cursor()
        cursor.execute("SELECT monat, betrag FROM monat ORDER BY monat")
        daten = cursor.fetchall()
        return jsonify({
            "labels": [monat for monat, _ in daten],
            "values": [betrag for _, betrag in daten]
        })

@app.route("/eintrag", methods=["POST"])
def eintrag():
    monat = request.form.get("monat")
    try:
        betrag = float(request.form.get("betrag"))
    except (TypeError, ValueError):
        return "Ungültiger Betrag", 400

    if not monat:
        return "Monat fehlt", 400

    with sqlite3.connect('daten.db') as con:
        cursor = con.cursor()
        cursor.execute(
            "SELECT rowid, COALESCE(SUM(betrag), 0) FROM monat WHERE monat = ?",
            (monat,)
        )
        vorhandener_eintrag = cursor.fetchone()

        if vorhandener_eintrag[0] is None:
            cursor.execute(
                "INSERT INTO monat (monat, betrag) VALUES (?, ?)",
                (monat, betrag)
            )
        else:
            cursor.execute(
                "UPDATE monat SET betrag = ? WHERE rowid = ?",
                (vorhandener_eintrag[1] + betrag, vorhandener_eintrag[0])
            )
            cursor.execute(
                "DELETE FROM monat WHERE monat = ? AND rowid != ?",
                (monat, vorhandener_eintrag[0])
            )
    return "true"

if __name__ == "__main__":
    app.run(port=8000)