/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {colors, spacing} from '../themes/theme';
import InputHeader from '../components/InputHeader';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImageUrl,
  searchMovies,
} from '../api/APICall';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong with the API call");
  }
}

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingList, setNowPlayingList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  const searchMoviesFunction = async (searchText: string) => {
    navigation.navigate('Search', {searchText: searchText});
  };

  if (
    nowPlayingList == undefined &&
    nowPlayingList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden={true} />
        <View style={styles.inputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar hidden={true} />
      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: colors.Black,
  },

  scrollViewContainer: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  inputHeaderContainer: {
    marginHorizontal: spacing.space_36,
    marginTop: spacing.space_36,
  },
});

export default HomeScreen;
