from word2number import w2n

def extract_entities(word_label_pairs):
    extracted_entities = []
    i = 0
    n = len(word_label_pairs)

    while i < n:
        word, label = word_label_pairs[i]

        if label == 'QUANTITY':
            # Extract QUANTITY
            quantity_word = word

            if quantity_word == 'a' or quantity_word == 'an':
                quantity = 1
            else:
                quantity = w2n.word_to_num(quantity_word)

            # Move to the next token
            i += 1

            # Check for UNIT (optional)
            unit = None
            if i < n and word_label_pairs[i][1] == 'UNIT':
                unit = word_label_pairs[i][0]
                i += 1

            # Skip 'of' if present
            if i < n and word_label_pairs[i][0].lower() == 'of':
                i += 1

            # Expecting FOOD next
            if i < n and word_label_pairs[i][1] == 'FOOD':
                # Collect adjacent FOOD labels
                food_words = []
                while i < n and word_label_pairs[i][1] == 'FOOD':
                    food_words.append(word_label_pairs[i][0])
                    i += 1
                food = ' '.join(food_words)

                # Assign default unit if UNIT is missing
                if unit is None:
                    unit = 'serving'  # Default to 'piece' if unit is missing

                # Append the extracted entity
                extracted_entities.append({
                    'QUANTITY': str(quantity),
                    'UNIT': unit,
                    'FOOD': food
                })
            else:
                # Handle case where FOOD is missing
                if i < n:
                    print(f"Expected FOOD after QUANTITY but got '{word_label_pairs[i][0]}'")
                else:
                    print("Expected FOOD after QUANTITY but reached end of input.")
                i += 1
        elif label == 'FOOD':
            # No QUANTITY before FOOD, default QUANTITY to '1', UNIT to 'serving'
            # Collect adjacent FOOD labels
            food_words = []
            while i < n and word_label_pairs[i][1] == 'FOOD':
                food_words.append(word_label_pairs[i][0])
                i += 1
            food = ' '.join(food_words)

            # Assign default QUANTITY and UNIT
            extracted_entities.append({
                'QUANTITY': '1',
                'UNIT': 'serving',
                'FOOD': food
            })
        else:
            # Move to next token
            i += 1

    return extracted_entities
