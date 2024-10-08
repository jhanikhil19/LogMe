import os
import json
import xml.etree.ElementTree as ET

def save_to_json(data, filepath):
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)

def save_to_xml(data, filepath):
    root = ET.Element("items")
    for item in data:
        entry = ET.SubElement(root, "item")
        entry.text = item
    tree = ET.ElementTree(root)
    tree.write(filepath)

def main():
    directory = input("Enter the directory where you want to save your items: ")
    if not os.path.exists(directory):
        os.makedirs(directory)
        
    items = []
    print("Enter your items one by one. Type 'exit' to quit and save the items.")
    
    while True:
        item = input("Enter item: ")
        if item.lower() == 'exit':
            break
        items.append(item)
    
    # Save as JSON
    filepath = os.path.join(directory, "items.json")
    save_to_json(items, filepath)
    print(f"Items have been saved to {filepath}")

    # Save as XML
    # filepath = os.path.join(directory, "items.xml")
    # save_to_xml(items, filepath)
    # print(f"Items have been saved to {filepath}")

if __name__ == "__main__":
    main()