from food_ner import test_model
from arrayprocess import extract_entities
from calculate_macros import calculate_macros  # Import the calculate_macros function

def main():
    while True:
        # Prompt the user for a sentence
        input_text = input("Enter a sentence (or 'exit' to quit): ")
        if input_text.lower() == 'exit':
            break

        # Get the word-to-label mapping from the model
        result = test_model(input_text)

        # Print the result as word-to-label mapping
        print("\nModel's Predictions:")
        for word, label in result:
            print(f"('{word}', '{label}')")

        # Use extract_entities to extract food items and quantities from the result
        entities = extract_entities(result)
        print("\nExtracted Entities:")
        for entity in entities:
            print(entity)
            # For each extracted entity, calculate the macros
            calculate_macros(entity)

if __name__ == "__main__":
    main()
