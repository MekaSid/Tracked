# food_ner.py

import spacy
from spacy.training.example import Example
from spacy.training import offsets_to_biluo_tags
import random
import json
import re
import os

# Step 1: Load and adjust training data from JSON file
def load_training_data(filename="training.json"):
    with open(filename, "r") as f:
        data = json.load(f)
    
    nlp = spacy.blank("en")

    formatted_data = []
    for item in data:
        text = item["text"]
        entities = item["entities"]

        # Adjust entities to match spaCy's tokenization
        doc = nlp(text)
        adjusted_entities = []

        for start, end, label in entities:
            span = doc.char_span(start, end, label=label, alignment_mode='expand')

            if span is None:
                print(f"Skipping misaligned entity '{text[start:end]}' in text: '{text}'")
                continue
            adjusted_entities.append((span.start_char, span.end_char, label))

        # Create the annotations dictionary
        annotations = {"entities": adjusted_entities}

        formatted_data.append((text, annotations))
    
    return formatted_data

# Step 2: Train the model
def train_model(num_iterations=30, training_data_file="training.json"):
    # Check if the model already exists
    model_path = "food_ner_model"
    if os.path.exists(model_path):
        # Load the existing model for incremental training
        nlp = spacy.load(model_path)
        print("Loaded existing model for incremental training.")
    else:
        # Create a new blank model
        nlp = spacy.blank("en")
        print("Created a new blank model.")

    # Add or get the 'ner' component
    if "ner" not in nlp.pipe_names:
        ner = nlp.add_pipe("ner")
    else:
        ner = nlp.get_pipe("ner")

    # Add the labels for QUANTITY, UNIT, FOOD, and SEP
    labels = ["QUANTITY", "UNIT", "FOOD"]
    for label in labels:
        ner.add_label(label)

    # Load the training data from file
    TRAIN_DATA = load_training_data(training_data_file)

    # Disable other components of the pipeline during training
    pipe_exceptions = ["ner"]
    unaffected_pipes = [pipe for pipe in nlp.pipe_names if pipe not in pipe_exceptions]

    # Begin training
    with nlp.disable_pipes(*unaffected_pipes):
        if os.path.exists(model_path):
            optimizer = nlp.resume_training()
        else:
            optimizer = nlp.begin_training()

        # Training loop
        for iteration in range(num_iterations):
            random.shuffle(TRAIN_DATA)
            losses = {}
            batches = spacy.util.minibatch(TRAIN_DATA, size=2)
            for batch in batches:
                texts, annotations = zip(*batch)
                examples = []
                for i in range(len(texts)):
                    doc = nlp.make_doc(texts[i])
                    example = Example.from_dict(doc, annotations[i])
                    examples.append(example)
                nlp.update(examples, sgd=optimizer, drop=0.5, losses=losses)
            print(f"Losses at iteration {iteration}: {losses}")

    # Save the updated model
    nlp.to_disk(model_path)
    print("Model trained and saved to 'food_ner_model' directory.")


# Step 3: Load and test the trained model
def test_model(input_text):
    # Load the saved model
    if not os.path.exists("food_ner_model"):
        print("Model not found. Training model first.")
        train_model()

    nlp = spacy.load("food_ner_model")

    # Process the input sentence
    doc = nlp(input_text)

    # Initialize the result array with "X" for each word in the sentence
    words = [word for word in re.split(r'(\W+)', input_text) if word.strip()]
    result = ["X" for _ in words]

    # Mark entities in the result array
    for ent in doc.ents:
        for i, word in enumerate(words):
            if ent.text == word:
                result[i] = ent.label_

    return list(zip(words, result))

def check_for_overlaps(data):
    for item in data:
        text = item["text"]
        entities = item["entities"]
        sorted_entities = sorted(entities, key=lambda x: x[0])
        for i in range(len(sorted_entities) - 1):
            start1, end1, label1 = sorted_entities[i]
            start2, end2, label2 = sorted_entities[i + 1]
            if start2 < end1:
                print(f"Overlap detected in text: '{text}'")
                print(f"Entities: {sorted_entities[i]} and {sorted_entities[i + 1]}")

def add_to_training_data(input_text, word_label_pairs, training_data_file="training.json"):
    # Convert word-label pairs to entities with character offsets
    entities = []
    start = 0
    for word, label in word_label_pairs:
        # Find the start index of the word in the text
        start_index = input_text.find(word, start)
        if start_index == -1:
            # Word not found, skip
            continue
        end_index = start_index + len(word)
        if label != "X":
            entities.append([start_index, end_index, label])
        start = end_index  # Update the start position for next search

    # Create a new training example
    new_example = {
        "text": input_text,
        "entities": entities
    }

    # Load existing training data
    try:
        with open(training_data_file, "r") as f:
            training_data = json.load(f)
    except FileNotFoundError:
        training_data = []

    if any(example["text"] == input_text for example in training_data):
        print("This example already exists in the training data.")
        return

    # Append the new example
    training_data.append(new_example)

    # Save the updated training data
    with open(training_data_file, "w") as f:
        json.dump(training_data, f, indent=4)

    return True
    

# Step 4: Main function to run training (optional)
if __name__ == "__main__":
    # Train the model if this script is run directly
    training_data = load_training_data("training.json")
    check_for_overlaps([{"text": text, "entities": entities["entities"]} for text, entities in training_data])

    train_model(num_iterations=30, training_data_file="training.json")
    print("Training completed.")
