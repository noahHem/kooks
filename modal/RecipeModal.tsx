import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { Modal, View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { setMeal } from "../slices/mealSlice";
import { FontAwesome } from '@expo/vector-icons';
import { Linking } from 'react-native';
import { addFavorite, removeFavorite } from '../slices/favoritesSlice';
import { setModal } from "../slices/appSlice";

const RecipeModal = () => {
    const dispatch = useDispatch();

    const meal = useSelector((state: RootState) => state.meals.meal);
    const modal = useSelector((state: RootState) => state.app.modal);
    const favorites = useSelector((state: RootState) => state.favorites.favorites);

    const visible = modal !== null;

    if (!meal) return null;

    const isFavorite = meal && favorites.some(fav => fav.idMeal === meal.idMeal);

    const handleFavorite = () => {
        if (!meal) return;
        if (isFavorite) {
            dispatch(removeFavorite(meal.idMeal));
            dispatch(setModal(null));
        } else {
            dispatch(addFavorite(meal));
        }
    };

    // Gather ingredients and measures
    const ingredients: { ingredient: string; measure: string }[] = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = (meal as Record<string, any>)[`strIngredient${i}`];
        const measure = (meal as Record<string, any>)[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({ ingredient, measure });
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => dispatch(setMeal(null))}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: meal?.strMealThumb }} style={styles.image} />
                            {meal?.strYoutube ? (
                                <TouchableOpacity
                                    style={styles.youtubeLogo}
                                    onPress={() => Linking.openURL(meal.strYoutube)}
                                >
                                    <FontAwesome name="youtube-play" size={40} color="#FF0000" />
                                </TouchableOpacity>
                            ) : null}
                            <TouchableOpacity
                                style={styles.favoriteStar}
                                onPress={handleFavorite}
                            >
                                <FontAwesome name={isFavorite ? "star" : "star-o"} size={36} color="#FFD700" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>{meal?.strMeal}</Text>
                        <View style={styles.chipsRow}>
                            <Text style={styles.chip}>{meal?.strCategory}</Text>
                            <Text style={styles.chip}>{meal?.strArea}</Text>
                        </View>
                        <Text style={styles.sectionTitle}>Ingredients</Text>
                        <View style={styles.ingredientList}>
                            {ingredients.map((item, idx) => (
                                <View key={idx} style={styles.ingredientRow}>
                                    <View style={styles.ingredientBullet} />
                                    <Text style={styles.ingredientItem}>
                                        {item.measure} {item.ingredient}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        <Text style={styles.sectionTitle}>Instructions</Text>
                        <Text style={styles.instructions}>{meal?.strInstructions}</Text>
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={() => dispatch(setMeal(null))}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        width: '100%',
        maxHeight: '90%',
        paddingBottom: 12,
        overflow: 'hidden',
        elevation: 10,
        marginTop: 48, // leaves space at the top
    },
    scrollContent: {
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FF7043',
        marginBottom: 8,
        textAlign: 'center',
    },
    chipsRow: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
    },
    chip: {
        borderWidth: 1,
        borderColor: '#FF7043',
        color: '#FF7043',
        fontSize: 14,
        fontWeight: '600',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 3,
        marginRight: 8,
        backgroundColor: '#FFF8F3',
        overflow: 'hidden',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginTop: 18,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    ingredientList: {
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    ingredientItem: {
        fontSize: 15,
        color: '#444',
        marginBottom: 2,
    },
    instructions: {
        fontSize: 15,
        color: '#444',
        textAlign: 'left',
        lineHeight: 21,
        marginBottom: 16,
    },
    link: {
        color: '#1976D2',
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 12,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#FF7043',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginHorizontal: 24,
        marginBottom: 16
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
        letterSpacing: 0.5,
    },
    imageContainer: {
        position: 'relative',
        width: 180,
        height: 180,
        marginBottom: 16,
    },
    youtubeLogo: {
        position: 'absolute',
        left: 8,
        bottom: 8,
    },
    favoriteStar: {
        position: 'absolute',
        right: 8,
        bottom: 8,
    },
    ingredientRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    ingredientBullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF7043',
        marginRight: 8,
    },
});

export default RecipeModal;