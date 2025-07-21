import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";
import { PRIMARY } from "../../GlobalStyles";
import { MaterialIcons } from '@expo/vector-icons';

const RecipesHeader = () => {
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 60,
    }).start();
  }, [translateY]);

  return (
    <Animated.View style={[styles.headerBlock, { transform: [{ translateY }] }]}> 
      <View style={styles.row}>
        <Text style={styles.title}>⭐ Favorite Recipes</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerBlock: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: PRIMARY,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: 'left',
  },
});

export default RecipesHeader; 