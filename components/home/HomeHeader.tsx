import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import getGreeting from "../../utils/GetGreeting";
import { PRIMARY } from "../../GlobalStyles";

const HomeHeader = () => {
  const translateY = useRef(new Animated.Value(-100)).current; // Start above the screen

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
      <Text style={styles.greeting}>{getGreeting()} 👋</Text>
      <Text style={styles.title}>What ingredient do you have ?</Text>
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
  greeting: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 0,
  },
});

export default HomeHeader;