# 📄 Smart PDF: AI-Powered Document Assistant

> **An Intelligent Document Analysis System capable of extracting insights, summarizing content, and answering questions from PDF documents using deep learning.**

---

## 🚀 Overview
**Smart PDF** is a full-stack application designed to bridge the gap between unstructured PDF data and actionable insights. Built with a decoupled **Client-Server architecture**, it leverages state-of-the-art NLP models to perform abstractive summarization and extractive Question-Answering (QA) entirely on the local CPU.

This project solves the challenge of navigating long technical documents by allowing users to upload a PDF and simply "chat" with it.

## ✨ Key Features
* **📝 Abstractive Summarization:** Uses **Google's T5-small** model to generate concise, human-like summaries of long documents.
* **❓ Intelligent Q&A:** Deploys **RoBERTa (fine-tuned on SQuAD v2)** to answer specific user queries with high accuracy, capable of handling unanswerable questions.
* **🔍 Smart Parsing:** Implements a custom heuristic algorithm using **PyMuPDF** to parse raw PDF binaries into structured hierarchical JSON trees (Chapters/Sub-topics) based on font metadata.
* **⚡ Optimized Performance:** Utilized **sliding window techniques** and **input truncation** to ensure smooth inference on local CPUs without needing heavy GPUs.
* **💻 Responsive UI:** A clean, modern interface built with **React.js** and **Tailwind CSS**.

---

## 🛠️ Tech Stack

### **Frontend**
* **Framework:** React.js
* **Styling:** Tailwind CSS
* **HTTP Client:** Axios

### **Backend**
* **Server:** Flask (Python)
* **API Style:** RESTful API
* **PDF Processing:** PyMuPDF (Fitz)

### **AI / Machine Learning**
* **Framework:** PyTorch
* **Library:** Hugging Face Transformers
* **Models:**
    * `t5-small` (Summarization)
    * `deepset/roberta-base-squad2` (Question Answering)

---

## ⚙️ Installation & Setup Guide

Follow these steps to run the project locally.

### Prerequisites
* Node.js & npm installed
* Python 3.8+ installed
* Git installed

### 1. Clone the Repository
    git clone https://github.com/Mohit9-y/Smart-PDF-AI-Powered-Document-Assistant.git
    cd Smart-PDF-AI-Powered-Document-Assistant

### 2. Backend Setup (Flask)
Navigate to the backend folder and install Python dependencies.

    cd backend

    # Create a virtual environment
    python -m venv venv

    # Activate Virtual Environment
    # Windows:
    venv\Scripts\activate
    # Mac/Linux:
    source venv/bin/activate

    # Install dependencies
    pip install -r requirements.txt

    # Run the Server
    python app.py

*The backend server will start at `http://localhost:5000`*

### 3. Frontend Setup (React)
Open a new terminal, navigate to the frontend folder, and start the UI.

    cd frontend

    # Install Node modules
    npm install

    # Start the application
    npm start

*The application will open at `http://localhost:3000`*

---

## 🧠 How It Works
1.  **Upload:** The user uploads a PDF via the React frontend.
2.  **Parsing:** The Flask backend receives the file, and PyMuPDF extracts text while analyzing font sizes to structure the document.
3.  **Processing:**
    * **For Summaries:** The text is tokenized and passed through the T5 Transformer model.
    * **For QA:** The user's question and the relevant PDF context are fed into the RoBERTa model.
4.  **Response:** The result is sent back via JSON API and displayed instantly to the user.

---

## 🤝 Contributing
Contributions are welcome! If you have suggestions or improvements, please fork the repo and create a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📧 Contact
For any inquiries or feedback, feel free to reach out.

**Developer:** Mohit
**GitHub:** [Mohit9-y](https://github.com/Mohit9-y)