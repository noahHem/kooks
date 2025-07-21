import React from "react";
import {
  SafeAreaView,
  StyleSheet,
} from "react-native";
import HomeHeader from "../components/home/HomeHeader";
import { BG } from "../GlobalStyles";
import HomeSearchbar from "../components/home/HomeSearchbar";
import { useListIngredientsQuery } from "../api/recipeApi";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import ModalFactory from "../factory/ModalFactory";
import HomeContent from "../components/home/HomeContent";

const HomeScreen = () => {

    const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
    const modal = useSelector((state: RootState) => state.app.modal);

    const {} = useListIngredientsQuery(undefined, {skip: ingredients.length > 0});

    return (
        <SafeAreaView style={styles.safeArea}>
          <HomeHeader />
          <HomeSearchbar />
          <HomeContent/>
          {ModalFactory(modal)}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
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
    alignItems: "center",
    marginTop: 32,
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

export default HomeScreen;