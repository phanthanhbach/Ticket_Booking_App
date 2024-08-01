/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

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
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('screen');

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
      setNowPlayingList([
        {id: 'dummy1'},
        ...tempNowPlaying.results,
        {id: 'dummy2'},
      ]);

      const tempUpcomingMovies = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcomingMovies.results);

      const tempPopularMovies = await getPopularMoviesList();
      setPopularMoviesList(tempPopularMovies.results);
    })();
  }, []);

  const scrollX = useRef(new Animated.Value(0)).current;

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
      <Animated.FlatList
        horizontal={true}
        data={nowPlayingList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.nowPlayContainer}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={width * 0.7}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
        renderItem={({item, index}: {item: any; index: number}) => {
          if (!item.original_title) {
            return (
              <View
                style={{width: (width - (width * 0.7)) / 2}}
              />
            );
          }
          const inputRange = [
            (index - 2) * (width * 0.7),
            (index - 1) * (width * 0.7),
            (index) * (width * 0.7),
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.75, 1, 0.75],
            extrapolate: 'clamp',
          });
          return (
            <MovieCard
              shouldMarginatedatEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetail', {movieId: item.id});
              }}
              cardWidth={width * 0.7}
              isFirst={index === 0 ? true : false}
              isLast={index === nowPlayingList?.length - 1 ? true : false}
              title={item.original_title}
              image={baseImageUrl('w780', item.poster_path)}
              genres={item.genre_ids.slice(1, 4)}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              scale={scale}
            />
          );
        }}
      />

      <CategoryHeader title="Popular" />
      <FlatList
        horizontal={true}
        data={popularMoviesList}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.containerGap}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}: {item: any; index: number}) => (
          <SubMovieCard
            shouldMarginatedatEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetail', {movieId: item.id});
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
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}: {item: any; index: number}) => (
          <SubMovieCard
            shouldMarginatedatEnd={true}
            cardFunction={() => {
              navigation.push('MovieDetail', {movieId: item.id});
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
    gap: spacing.space_32,
  },

  nowPlayContainer: {
    alignItems: 'center',
  },
});

export default HomeScreen;
