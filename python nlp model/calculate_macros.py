import pandas as pd

def calculate_macros(entity, csv_file='nutrients_csvfile.csv'):
    # Load the CSV file into a DataFrame
    df = pd.read_csv(csv_file)
    
    # Normalize the food names in the DataFrame
    df['Normalized_Food'] = df['Food'].str.lower().str.strip()
    
    # Extract the quantity, unit, and food from the entity
    quantity = entity['QUANTITY']
    unit = entity['UNIT']
    food = entity['FOOD']
    
    # Normalize the food name
    normalized_food = food.lower().strip()
    
    # Convert quantity to float
    try:
        quantity = float(quantity)
    except ValueError:
        print(f"Invalid quantity: {quantity}")
        return None  # Return None to indicate failure
    
    # Find matching food in the DataFrame
    food_match = df[df['Normalized_Food'] == normalized_food]
    
    if food_match.empty:
        print(f"Food item '{food}' not found in the database.")
        return None  # Return None to indicate failure
    
    # For simplicity, take the first matching row
    food_row = food_match.iloc[0]
    
    # Function to handle 't' values and convert them to 0
    def convert_value(value):
        try:
            return 0 if value == 't' else float(value)
        except ValueError:
            return 0  # Handle any unexpected values
    
    # Get the measurement and grams from the food data
    measure = food_row['Measure']
    grams_per_measure = convert_value(food_row['Grams'])
    
    # Handle unit conversion
    # Define unit conversion factors to grams
    unit_conversion = {
        'g': 1,
        'gram': 1,
        'grams': 1,
        'kg': 1000,
        'kilogram': 1000,
        'kilograms': 1000,
        'mg': 0.001,
        'milligram': 0.001,
        'milligrams': 0.001,
        'lb': 453.592,
        'lbs': 453.592,
        'pound': 453.592,
        'pounds': 453.592,
        # If the unit matches the measure in the data, use grams_per_measure
        measure.lower(): grams_per_measure,
        # Add more units as needed
    }
    
    unit_lower = unit.lower()
    if unit_lower in unit_conversion:
        if unit_lower == measure.lower():
            grams = quantity * grams_per_measure
        else:
            grams = quantity * unit_conversion[unit_lower]
    else:
        print(f"Unit '{unit}' not recognized.")
        return None  # Return None to indicate failure
    
    # Now calculate the macros based on the grams
    # Calculate the ratio of the amount consumed to the serving size
    ratio = grams / grams_per_measure if grams_per_measure != 0 else 0
    
    # Get the macros from the food_row and apply the conversion function
    calories = convert_value(food_row['Calories']) * ratio
    protein = convert_value(food_row['Protein']) * ratio
    carbs = convert_value(food_row['Carbs']) * ratio
    
    # Round macros to one decimal place
    calories = round(calories, 1)
    protein = round(protein, 1)
    carbs = round(carbs, 1)
    
    # Output the result for debugging
    print(f"{food.title()}: {quantity} {unit}:")
    print(f"Calories: {calories}")
    print(f"Protein: {protein}g")
    print(f"Carbohydrates: {carbs}g")
    
    # Return the macros as a dictionary
    return {
    'FOOD': food.title(),
    'calories': calories,
    'protein': protein,
    'carbs': carbs,
    'grams': grams  # Include grams in the returned macros
}


# Example usage
if __name__ == "__main__":
    entity = {'QUANTITY': '300', 'UNIT': 'grams', 'FOOD': 'oatmeal'}
    macros = calculate_macros(entity)
    if macros:
        print(macros)
    else:
        print("Failed to calculate macros.")
