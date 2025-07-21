import React, { useState, useMemo } from "react";
import { Text, SafeAreaView, StyleSheet, FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import RecipeCard from "../components/recipe/RecipeCard";
import { BG } from "../GlobalStyles";
import ModalFactory from "../factory/ModalFactory";
import RecipesHeader from "../components/recipe/RecipesHeader";
import FavoritesSearchbar from "../components/recipe/FavoritesSearchbar";
import { MaterialIcons } from '@expo/vector-icons';

const RecipesScreen = () => {
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const modal = useSelector((state: RootState) => state.app.modal);
    const [search, setSearch] = useState("");

    const filteredFavorites = useMemo(() => {
        if (!search) return favorites;
        return favorites.filter(meal =>
            meal.strMeal.toLowerCase().includes(search.toLowerCase())
        );
    }, [favorites, search]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <RecipesHeader />
            <FavoritesSearchbar onSearch={setSearch} />
            <View style={styles.contentWrapper}>
                {favorites.length === 0 ? (
                    <View style={styles.placeholderBlock}>
                        <MaterialIcons name="star-border" size={64} color="#FFD700" style={{ marginBottom: 12 }} />
                        <Text style={styles.placeholderTitle}>No favorites yet</Text>
                        <Text style={styles.placeholderText}>Tap the star on a recipe to add it to your favorites!</Text>
                    </View>
                ) : filteredFavorites.length === 0 ? (
                    <View style={styles.placeholderBlock}>
                        <MaterialIcons name="search-off" size={54} color="#FFD700" style={{ marginBottom: 10 }} />
                        <Text style={styles.placeholderTitle}>No results</Text>
                        <Text style={styles.placeholderText}>No favorite recipes match your search.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredFavorites}
                        keyExtractor={item => item.idMeal}
                        renderItem={({ item }) => <RecipeCard meal={item} />}
                        contentContainerStyle={styles.cardList}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
            {ModalFactory(modal)}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: BG,
    },
    contentWrapper: {
        flex: 1,
        paddingHorizontal: 8,
        paddingTop: 10,
    },
    cardList: {
        paddingBottom: 24,
    },
    placeholderBlock: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 32,
        paddingHorizontal: 24,
    },
    placeholderTitle: {
        color: '#FF7043',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 6,
        textAlign: "center",
    },
    placeholderText: {
        color: "#BDBDBD",
        fontSize: 16,
        textAlign: "center",
        marginBottom: 8,
    },
});

export default RecipesScreen;