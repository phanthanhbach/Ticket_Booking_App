import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, spacing} from '../themes/theme';
import {baseImageUrl, searchMovies} from '../api/APICall';
import SubMovieCard from '../components/SubMovieCard';
import InputHeader from '../components/InputHeader';

const {width} = Dimensions.get('screen');

const SearchScreen = ({navigation}: any) => {
  const [searchMoviesList, setSearchMoviesList] = useState([]);

  const searchMoviesFunction = async (name: string) => {
    try {
      const response = await fetch(searchMovies(name));
      const json = await response.json();
      setSearchMoviesList(json.results);
    } catch (error) {
      console.error('Something went wrong with the API searchMovies call');
    }
  };

  useEffect(() => {
    searchMoviesFunction;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
          data={searchMoviesList}
          bounces={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.inputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction} />
            </View>
          }
          keyExtractor={item => item.id}
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}: {item: any; index: number}) => (
            <SubMovieCard
              shouldMarginatedatEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetail', {movieId: item.id});
              }}
              cardWidth={width / 2 - spacing.space_24}
              title={item.original_title}
              image={baseImageUrl('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.Black,
  },
  inputHeaderContainer: {
    display: 'flex',
    marginHorizontal: spacing.space_36,
    marginTop: spacing.space_36,
    marginBottom: spacing.space_18,
  },
  centerContainer: {
    alignItems: 'center',
  },
});

export default SearchScreen;
