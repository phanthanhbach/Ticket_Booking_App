/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {colors, spacing} from '../themes/theme';
import InputHeader from '../components/InputHeader';
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImageUrl,
  searchMovies,
} from '../api/APICall';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try {
    const response = await fetch(nowPlayingMovies);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong with the API nowPlayingMovies call');
  }
};

const getUpcomingMoviesList = async () => {
  console.log(upcomingMovies);
  try {
    const response = await fetch(upcomingMovies);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong with the API upcomingMovies call');
  }
};

const getPopularMoviesList = async () => {
  try {
    const response = await fetch(popularMovies);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong with the API popularMovies call');
  }
};

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingList, setNowPlayingList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      const tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingList(tempNowPlaying.results);
    })();

    (async () => {
      const tempUpcomingMovies = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcomingMovies.results);
    })();

    (async () => {
      const tempPopularMovies = await getPopularMoviesList();
      setPopularMoviesList(tempPopularMovies.results);
    })();
  }, []);

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
      scrollEnabled={true}
      contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar hidden={true} />
      <View style={styles.inputHeaderContainer}>
        <InputHeader searchFunction={searchMoviesFunction} />
      </View>

      <CategoryHeader title="Now Playing" />
      <FlatList
        horizontal={true}
        data={nowPlayingList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.containerGap}
        renderItem={({item, index}: {item: any; index: number}) => (
          <SubMovieCard
            shouldMarginatedatEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === nowPlayingList?.length - 1 ? true : false}
            title={item.original_title}
            image={baseImageUrl('w342', item.poster_path)}
          />
        )}
      />

      <CategoryHeader title="Popular" />
      <FlatList
        horizontal={true}
        data={popularMoviesList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.containerGap}
        renderItem={({item, index}: {item: any; index: number}) => (
          <SubMovieCard
            shouldMarginatedatEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === popularMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            image={baseImageUrl('w342', item.poster_path)}
          />
        )}
      />

      <CategoryHeader title="Upcoming" />
      <FlatList
        horizontal={true}
        data={upcomingMoviesList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.containerGap}
        renderItem={({item, index}: {item: any; index: number}) => (
          <SubMovieCard
            shouldMarginatedatEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetails', {movieId: item.id});
            }}
            cardWidth={width / 3}
            isFirst={index === 0 ? true : false}
            isLast={index === upcomingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            image={baseImageUrl('w342', item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: colors.Black,
  },

  scrollViewContainer: {
    flexGrow: 1,
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

  containerGap: {
    gap: spacing.space_36,
  },
});

export default HomeScreen;
