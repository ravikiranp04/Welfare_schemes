# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

# Load BERT-based NER pipeline
ner_pipeline = pipeline("ner", model="dslim/bert-base-NER", grouped_entities=True)

@app.route("/extract-keywords", methods=["POST"])
def extract_keywords():
    data = request.get_json()
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    entities = ner_pipeline(text)
    keywords = [ent["word"] for ent in entities]

    return jsonify({"keywords": keywords})

if __name__ == "__main__":
    app.run(port=5000)
