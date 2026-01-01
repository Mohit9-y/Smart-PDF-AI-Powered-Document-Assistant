import fitz 
import os

def extract_hierarchy(file_path):
    doc = fitz.open(file_path)
    hierarchy = []
    current_chapter = None
    
    for page_num, page in enumerate(doc):
        blocks = page.get_text("dict")["blocks"]
        for b in blocks:
            if "lines" in b:
                for l in b["lines"]:
                    for s in l["spans"]:
                        text = s["text"].strip()
                        size = s["size"]
                        font = s["font"]
                        
                        if len(text) < 3 or text.isdigit():
                            continue

                        if size > 14: 
                            if current_chapter:
                                hierarchy.append(current_chapter)
                            current_chapter = {
                                "title": text,
                                "page": page_num + 1,
                                "content": "",
                                "subtopics": []
                            }
                        elif size > 11 and size <= 14 and current_chapter:
                            current_chapter["subtopics"].append({
                                "title": text,
                                "content": ""
                            })
                        elif current_chapter:
                            if current_chapter["subtopics"]:
                                current_chapter["subtopics"][-1]["content"] += text + " "
                            else:
                                current_chapter["content"] += text + " "
    
    if current_chapter:
        hierarchy.append(current_chapter)
    
    return hierarchy