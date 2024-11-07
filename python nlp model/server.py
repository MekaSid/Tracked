from flask import Flask, request, jsonify
from food_ner import test_model
from arrayprocess import extract_entities
from calculate_macros import calculate_macros

app = Flask(__name__)

@app.route("/process", methods=['POST'])
def process_sentence():
    data = request.get_json()
    sentence = data.get('sentence', '')

    if not sentence:
        return jsonify({'error': 'No sentence provided.'}), 400

    # Get the word-to-label mapping from the model
    result = test_model(sentence)

    # Use extract_entities to extract food items and quantities from the result
    entities = extract_entities(result)
    print("Extracted Entities:", entities)

    if not entities:
        return jsonify({'error': 'No food items found in the sentence.'}), 400

    # Prepare the response data
    for entity in entities:
        print(entity)
        # For each extracted entity, calculate the macros
        calculate_macros(entity)
    items = []
    labels = []

    for idx, entity in enumerate(entities):
        food_name = entity.get('FOOD')
        if not food_name:
            print(f"'food_name' not found in entity: {entity}")
            continue  # Skip this entity

        # For each extracted entity, calculate the macros
        macros = calculate_macros(entity)
        if macros is None:
            print(f"Could not calculate macros for entity: {entity}")
            continue  # Skip if macros couldn't be calculated

        # Build the item structure
        item = {
            'key': str(idx + 1),
            'label': macros['FOOD'].upper(),
            'isExpanded': False,
            'nutrition': {
                'calories': macros['calories'],
                'protein': macros['protein'],
                'carbs': macros['carbs'],
                'grams': macros['grams']
            }
        }
        items.append(item)
        labels.append(macros['FOOD'].upper())

    if not items:
        return jsonify({'error': 'No valid food items processed.'}), 400

    # Combine labels if multiple foods
    combined_label = ' | '.join(labels)

    # Prepare the final response
    response = {
        'items': items,
        'label': combined_label
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
