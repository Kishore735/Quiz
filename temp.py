import json

# Load Python quiz JSON file
with open("python.json", "r") as file:
    python_quiz_data = json.load(file)

# Debug: Print the loaded data type
print(type(python_quiz_data))  # Should be a list of dictionaries
print(python_quiz_data[:2])  # Print first 2 elements to check structure

# Loop through each module
for module in python_quiz_data:
    print(type(module))  # Should be a dictionary
    print(module)  # Check module structure
    module_id = module["module_id"]  # This should work if JSON is correct
