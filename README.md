# Buchhaltung

## Installation

Die folgenden Befehle werden im Projektordner `Buchhaltung` ausgeführt.

### Virtuelle Umgebung erstellen

```powershell
python -m venv .venv
```

### Virtuelle Umgebung aktivieren

PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Windows-Eingabeaufforderung (CMD):

```bat
.venv\Scripts\activate.bat
```

Linux/macOS:

```bash
source .venv/bin/activate
```

### Abhängigkeiten installieren

```powershell
python -m pip install -r requirements.txt
```

## Anwendung starten

Da der Server Dateien aus `src` lädt, wird er aus diesem Ordner gestartet:

```powershell
cd src
python server.py
```

Die Anwendung ist anschließend unter <http://127.0.0.1:8000> erreichbar.

## Einrichtung

Für die Anmeldung muss die Datei `src/pw.txt` vorhanden sein. Sie enthält das
Passwort als eine einzelne Zeile.