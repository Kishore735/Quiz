import firebase_admin
from firebase_admin import credentials, firestore
import json
import os

# Load Firebase credentials
cred = credentials.Certificate(r"D:\code\Workspace\Intel\Intel_Unnati\intel-de8f5-firebase-adminsdk-fbsvc-886d69c708.json")  # Replace with your Firebase service account file
firebase_admin.initialize_app(cred)

# Firestore DB reference
db = firestore.client()

# List of quiz JSON files (Update paths if needed)
quiz_files = {
    "python": "D:\code\Workspace\Intel\Intel_Unnati\database\python.json",
    "c": "D:\code\Workspace\Intel\Intel_Unnati\database\c.json",
    "cpp": "D:\code\Workspace\Intel\Intel_Unnati\database\cpp.json",
    "java": "D:\code\Workspace\Intel\Intel_Unnati\database\java.json"
}

# Programming language descriptions
language_descriptions = {
    "python": "A beginner-friendly programming language used for various applications.",
    "c": "A powerful low-level programming language used in system programming.",
    "cpp": "An extension of C with object-oriented programming features.",
    "java": "A versatile, platform-independent language widely used in software development."
}

# Firestore Collection Reference
programming_languages_ref = db.collection("programming_languages")

# Upload each quiz file
for lang, filename in quiz_files.items():
    if os.path.exists(filename):
        with open(filename, "r") as file:
            data = json.load(file)

        # Extract modules list safely
        modules = data.get("modules", [])

        # Create or update the main language document
        lang_doc_ref = programming_languages_ref.document(lang)
        lang_doc_ref.set({
            "name": lang.capitalize(),
            "description": language_descriptions.get(lang, "A programming language.")
        })

        # Add modules as a sub-collection
        modules_ref = lang_doc_ref.collection("modules")

        # Upload each module
        for module in modules:
            module_id = module["module_id"]
            module_name = module["module_name"]
            questions = module["questions"]

            # Create module document in Firestore
            module_doc = modules_ref.document(module_id)
            module_doc.set({
                "module_name": module_name,
                "questions": questions  # Store all questions inside the module
            })

        print(f"✅ {lang.capitalize()} Quiz Uploaded Successfully!")

    else:
        print(f"⚠️ File {filename} not found! Skipping {lang.capitalize()}.")

print("🎯 All Quizzes Uploaded Successfully!")
