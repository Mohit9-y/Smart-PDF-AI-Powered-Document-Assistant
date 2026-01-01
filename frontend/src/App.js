import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [hierarchy, setHierarchy] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [summary, setSummary] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      // FORCE PORT 5000 TO MATCH YOUR TERMINAL
      const res = await axios.post('http://127.0.0.1:5000/upload', formData);
      setHierarchy(res.data.hierarchy);
    } catch (err) {
      console.error("Full Error:", err);
      // DETAILED ERROR POPUP
      if (err.response) {
        alert(`Server Error (${err.response.status}): ${err.response.data.error || err.message}`);
      } else if (err.request) {
        alert("Network Error: Could not reach backend at 127.0.0.1:5000. Is python running?");
      } else {
        alert(`Error: ${err.message}`);
      }
    }
    setLoading(false);
  };

  const handleTopicClick = async (topic) => {
    setSelectedTopic(topic);
    setAnswer('');
    setSummary('Generating summary...');
    
    try {
      const res = await axios.post('http://127.0.0.1:5000/summarize', { text: topic.content });
      setSummary(res.data.summary);
    } catch (err) {
      setSummary("Error generating summary");
    }
  };

  const askQuestion = async () => {
    if (!selectedTopic || !question) return;
    try {
      const res = await axios.post('http://127.0.0.1:5000/ask', {
        question: question,
        context: selectedTopic.content
      });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Error getting answer");
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h3>Document Tree</h3>
        <div className="upload-section">
          <input type="file" accept=".pdf" onChange={handleFileUpload} />
        </div>
        {loading && <p>Processing PDF...</p>}
        {hierarchy.map((chapter, i) => (
          <div key={i}>
            <div className="topic-item" onClick={() => handleTopicClick(chapter)}>
              <strong>{chapter.title}</strong>
            </div>
            {chapter.subtopics.map((sub, j) => (
              <div key={j} className="topic-item subtopic" onClick={() => handleTopicClick(sub)}>
                {sub.title}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="main-content">
        {!selectedTopic ? (
          <h2>Select a topic to start learning</h2>
        ) : (
          <>
            <h2>{selectedTopic.title}</h2>
            <div className="summary-box">
              <h4>AI Summary (T5 Model)</h4>
              <p>{summary}</p>
            </div>
            
            <div className="content-preview">
              <h4>Full Content</h4>
              <p>{selectedTopic.content.substring(0, 500)}...</p>
            </div>

            <div className="chat-box">
              <h4>Ask a Question</h4>
              <div className="input-group">
                <input 
                  type="text" 
                  value={question} 
                  onChange={(e) => setQuestion(e.target.value)} 
                  placeholder="Ask about this topic..."
                />
                <button onClick={askQuestion}>Ask</button>
              </div>
              {answer && (
                <div style={{marginTop: '15px', padding: '10px', background: '#f9f9f9'}}>
                  <strong>Answer: </strong> {answer}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;