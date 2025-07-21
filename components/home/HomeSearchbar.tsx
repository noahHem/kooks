import { TextInput, TouchableOpacity, View, StyleSheet, Keyboard, Text, ScrollView } from "react-native"
import { useEffect, useState } from "react";
import { CARD, PRIMARY, SHADOW } from "../../GlobalStyles";
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useLazyGetMealsByIngredientQuery } from "../../api/recipeApi";

const HomeSearchbar = () => {

    const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);

    const [ingredient, setIngredient] = useState("");
    const [suggestedRecipe, setSuggestedRecipe] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredIngredients, setFilteredIngredients] = useState<string[]>([]);

    const [getMealByIngredient, {data, error, isLoading}] = useLazyGetMealsByIngredientQuery();

    // Autocomplete logic
    const handleInputChange = (text: string) => {
        setIngredient(text);
        if (text.length > 0) {
            const filtered = ingredients
                .filter((ing) =>
                    ing.strIngredient.toLowerCase().includes(text.toLowerCase())
                )
                .map((ing) => ing.strIngredient);
            setFilteredIngredients(filtered);
            setShowSuggestions(filtered.length > 0);
        } else {
            setShowSuggestions(false);
            setFilteredIngredients([]);
        }
    };

    const handleSuggestionPress = (suggestion: string) => {
        setIngredient(suggestion);
        setShowSuggestions(false);
    };

    const handleGetMealByIngredient = () => {
        getMealByIngredient(ingredient);
    }

    return (
        <View style={styles.searchSection}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.input}
              placeholder="e.g. chicken, tomato, rice..."
              value={ingredient}
              onChangeText={handleInputChange}
              placeholderTextColor="#BDBDBD"
              onFocus={() => {
                if (ingredient && filteredIngredients.length > 0) setShowSuggestions(true);
              }}
            />
            {showSuggestions && (
              <ScrollView style={styles.suggestionsContainer}>
                {filteredIngredients.map((suggestion) => (
                  <TouchableOpacity
                    key={suggestion}
                    style={styles.suggestionItem}
                    onPress={() => handleSuggestionPress(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              (!ingredient || isLoading) && { backgroundColor: "#FFD3C2" },
            ]}
            onPress={handleGetMealByIngredient}
            disabled={!ingredient || isLoading}
          >
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
    searchSection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        marginLeft: 4,
        marginRight: 4
    },
    button: {
        backgroundColor: PRIMARY,
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center",
      },
      buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
      },
    input: {
        flex: 1,
        backgroundColor: CARD,
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
        marginRight: 12,
        shadowColor: SHADOW,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 0,
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: CARD,
        borderRadius: 8,
        shadowColor: SHADOW,
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
        zIndex: 10,
        maxHeight: 200, // 5 items * 40px each, adjust as needed
    },
    suggestionItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    suggestionText: {
        fontSize: 16,
        color: '#333',
    },
})
export default HomeSearchbar;