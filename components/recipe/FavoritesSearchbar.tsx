import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { CARD, PRIMARY, SHADOW } from "../../GlobalStyles";

interface FavoritesSearchbarProps {
  onSearch: (term: string) => void;
}

const FavoritesSearchbar: React.FC<FavoritesSearchbarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleChange = (text: string) => {
    setSearch(text);
    onSearch(text);
  };

  const handleClear = () => {
    setSearch("");
    onSearch("");
  };

  return (
    <View style={styles.searchSection}>
      <TextInput
        style={styles.input}
        placeholder="Search favorites..."
        value={search}
        onChangeText={handleChange}
        placeholderTextColor="#BDBDBD"
      />
      <TouchableOpacity style={styles.button} onPress={handleClear}>
        <MaterialIcons name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    marginLeft: 4,
    marginRight: 4,
  },
  button: {
    backgroundColor: PRIMARY,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  clearButton: {
    backgroundColor: "#FFD3C2",
    borderRadius: 24,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  input: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 8,
    shadowColor: SHADOW,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 0,
  },
});

export default FavoritesSearchbar; 