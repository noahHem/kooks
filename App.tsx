import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './pages/HomeScreen';
import RecipesScreen from './pages/RecipesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PRIMARY } from './GlobalStyles';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadFavorites, saveFavorites } from './slices/favoritesSlice';
import type { RootState, AppDispatch } from './app/store';

const Tab = createBottomTabNavigator();

function AppInitializer() {
  const iconSize = 32;
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  useEffect(() => {
    dispatch(loadFavorites());
  }, [dispatch]);
  useEffect(() => {
    dispatch(saveFavorites(favorites));
  }, [favorites, dispatch]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: PRIMARY,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => {
            if (route.name === 'Home') {
              return <MaterialIcons name="home" size={iconSize} color={color} />;
            } else if (route.name === 'Recipes') {
              return <MaterialIcons name="restaurant-menu" size={iconSize} color={color} />;
            }
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Recipes" component={RecipesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppInitializer />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
