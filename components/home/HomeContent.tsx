import React from "react";
import { View, ScrollView, Image, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import RecipeCard from "../recipe/RecipeCard";

const HomeContent = () => {
    const meals = useSelector((state: RootState) => state.meals.meals);

    return (
        <View style={{ flex: 1 }}>
            {meals && meals.length > 0 ? (
                <ScrollView contentContainerStyle={styles.cardList}>
                    {meals.map((meal) => (
                        <View key={meal.idMeal} style={styles.cardWrapper}>
                            <RecipeCard meal={meal} />
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.placeholderBlock}>
                    <Image
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png",
                        }}
                        style={styles.placeholderImage}
                    />
                    <Text style={styles.placeholderText}>
                        Enter an ingredient to get a recipe suggestion!
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    cardList: {
        paddingHorizontal: 0,
        paddingTop: 0,
        alignItems: 'stretch',
    },
    cardWrapper: {
        width: '100%',
        alignSelf: 'stretch',
    },
    placeholderBlock: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 0,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        marginBottom: 16,
        opacity: 0.5,
    },
    placeholderText: {
        color: "#BDBDBD",
        fontSize: 16,
        textAlign: "center",
    },
});

export default HomeContent;