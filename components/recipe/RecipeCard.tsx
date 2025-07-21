import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Meal } from '../../types/Meal';
import { CARD, SHADOW } from '../../GlobalStyles';
import { useDispatch } from 'react-redux';
import { setMeal } from '../../slices/mealSlice';
import { setModal } from '../../slices/appSlice';
import { RECIPE_MODAL } from '../../factory/ModalFactory';
import { useLazyGetMealByIdQuery } from '../../api/recipeApi';

interface RecipeCardProps {
    meal: Meal;
}

const RecipeCard = ({ meal }: RecipeCardProps) => {

    const dispatch = useDispatch();

    const [getMealById] = useLazyGetMealByIdQuery();

    const handleClickRecipe = () => {
        getMealById(meal.idMeal);
        dispatch(setModal(RECIPE_MODAL));
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handleClickRecipe}>
            <View style={styles.imageWrapper}>
                <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{meal.strMeal}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 18,
        marginVertical: 14,
        marginHorizontal: 12,
        shadowColor: '#FF704320',
        shadowOpacity: 0.13,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 6 },
        elevation: 7,
        borderLeftWidth: 6,
        borderLeftColor: '#FF7043',
    },
    imageWrapper: {
        width: 72,
        height: 72,
        borderRadius: 36,
        overflow: 'hidden',
        backgroundColor: '#FFF3ED',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 18,
        borderWidth: 2,
        borderColor: '#FFE0D1',
    },
    image: {
        width: 68,
        height: 68,
        borderRadius: 34,
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 6,
        textAlign: 'left',
        letterSpacing: 0.1,
    },
    chipsRow: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: 8,
    },
    chip: {
        borderWidth: 1,
        borderColor: '#FF7043',
        color: '#FF7043',
        fontSize: 13,
        fontWeight: '600',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginRight: 8,
        backgroundColor: '#FFF8F3',
        overflow: 'hidden',
    },
    instructions: {
        fontSize: 14,
        color: '#666',
        textAlign: 'left',
        lineHeight: 19,
        opacity: 0.92,
    },
});

export default RecipeCard;  