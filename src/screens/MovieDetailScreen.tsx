import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {baseImageUrl, movieCredits, movieDetails} from '../api/APICall';
import {borderRadius, colors, fontfamily, fontsize, spacing} from '../themes/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';

const getMovieDetail = async (movieId: number) => {
  try {
    const response = await fetch(movieDetails(movieId));
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong with the API getMovieDetail call',
      error,
    );
  }
};

const MoiveDetailScreen = ({navigation, route}: any) => {
  const [movie, setMovie] = useState<any>(undefined);
  const [movieCast, setMovieCast] = useState<any>(undefined);
  const {movieId} = route.params;

  useEffect(() => {
    (async () => {
      const tempMovieDetail = await getMovieDetail(movieId);
      setMovie(tempMovieDetail);
    })();

    (async () => {
      const tempMovieCast = await movieCredits(movieId);
      setMovieCast(tempMovieCast);
    })();
  }, [movieId]);

  if (!movie && !movieCast) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            title={''}
            action={() => navigation.goBack()}
          />
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
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{uri: baseImageUrl('w780', movie?.backdrop_path)}}
          style={styles.imgBG}>
          <LinearGradient
            colors={[colors.BlackRGB10, colors.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                iconName="close"
                title={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.imgBG}>
          <Image
            source={{uri: baseImageUrl('w342', movie?.poster_path)}}
            style={styles.posterImage}
          />
        </View>
      </View>
      <View style={styles.timeContent}>
        <CustomIcon name="clock" style={styles.clockIcon} />
        <Text style={styles.runtimeText}>
          {Math.floor(movie?.runtime / 60)}h {Math.floor(movie?.runtime % 60)}m
        </Text>
      </View>
      <View>
        <Text style={styles.title}>
          {movie?.original_title}
        </Text>
        <View style={styles.genresContainer}>
          {movie?.genres.map((item: any) => {
            return (
              <View style={styles.genreBox} key={item.id}>
                <Text style={styles.genreText}>
                  {item.name}
                </Text>
              </View>
            );
          })}
        </View>
        <View>
          <Text style={styles.tagLine}>{movie?.tagline}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.Black,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  scrollViewContainer: {
    flex: 1,
  },

  appHeaderContainer: {
    marginHorizontal: spacing.space_36,
    marginTop: spacing.space_20 * 2,
  },

  imgBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  posterImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },

  timeContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.space_15,
  },
  clockIcon: {
    color: colors.WhiteRGBA50,
    fontSize: fontsize.font_20,
    marginRight: spacing.space_8,
  },
  runtimeText: {
    color: colors.WhiteRGBA75,
    fontSize: fontsize.font_14,
    fontFamily: fontfamily.poppinsMedium,
    alignSelf: 'center',
  },

  title: {
    fontFamily: fontfamily.poppinsRegular,
    fontSize: fontsize.font_24,
    color: colors.White,
    marginHorizontal: spacing.space_36,
    marginVertical: spacing.space_15,
    textAlign: 'center',
  },

  genresContainer: {
    display: 'flex',
    flex: 1,
    gap: spacing.space_20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  genreBox: {
    borderColor: colors.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: spacing.space_4,
    paddingHorizontal: spacing.space_10,
    borderRadius: borderRadius.radius_25,
  },
  genreText: {
    fontFamily: fontfamily.poppinsRegular,
    fontSize: fontsize.font_10,
    color: colors.WhiteRGBA75,
  },
  tagLine: {
    fontFamily: fontfamily.poppinsThin,
    fontSize: fontsize.font_14,
    fontStyle: 'italic',
    color: colors.White,
    marginHorizontal: spacing.space_36,
    marginVertical: spacing.space_15,
    textAlign: 'center',
  },

  infoContainer: {

  },
  rateContainer: {

  },
});

export default MoiveDetailScreen;
