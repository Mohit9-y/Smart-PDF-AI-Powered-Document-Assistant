from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from extractor import extract_hierarchy
from ai_engine import generate_summary, answer_question

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

global_data = {}

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    
    hierarchy = extract_hierarchy(filepath)
    global_data['hierarchy'] = hierarchy
    
    return jsonify({'message': 'File processed', 'hierarchy': hierarchy})

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    text = data.get('text', '')
    summary = generate_summary(text)
    return jsonify({'summary': summary})

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    question = data.get('question', '')
    context = data.get('context', '')
    answer = answer_question(question, context)
    return jsonify({'answer': answer})

if __name__ == '__main__':
    app.run(debug=True, port=5000)