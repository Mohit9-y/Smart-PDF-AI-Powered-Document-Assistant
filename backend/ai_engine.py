from transformers import pipeline

summarizer = pipeline("summarization", model="t5-small", device=-1) 
qa_pipeline = pipeline("question-answering", model="deepset/roberta-base-squad2", device=-1)

def generate_summary(text):
    if len(text) < 50:
        return "Text too short to summarize."
    
    chunk = text[:1000] 
    try:
        summary = summarizer(chunk, max_length=150, min_length=30, do_sample=False)
        return summary[0]['summary_text']
    except Exception as e:
        return str(e)

def answer_question(question, context):
    if not context:
        return "Please select a topic with content first."
    
    result = qa_pipeline(question=question, context=context[:2000])
    return result['answer']