import {Animated, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {
  borderRadius,
  colors,
  fontfamily,
  fontsize,
  spacing,
} from '../themes/theme';
import {genres} from '../constants/genres';
import CustomIcon from './CustomIcon';

const MovieCard = (props: any) => {
  console.log(props.image);
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <Animated.View
        style={[
          styles.container,
          props.shouldMarginatedatEnd
            ? props.isFirst
              ? {marginLeft: spacing.space_36}
              : props.isLast
              ? {marginRight: spacing.space_36}
              : {}
            : {},
          {width: props.cardWidth},
          {transform: [{scale: props.scale}]},
        ]}>
        <Image
          source={{uri: props.image}}
          style={[styles.imgStyle, {width: props.cardWidth}]}
        />
        <View>
          <View style={styles.rateContainer}>
            <CustomIcon name="star" style={styles.starIcon} />
            <Text style={styles.voteText}>
              {props.voteAverage} ({props.voteCount})
            </Text>
          </View>
          <Text style={styles.textTitle} numberOfLines={1}>
            {props.title}
          </Text>
          <View style={styles.genreContainer}>
            {props.genres.map((item: keyof typeof genres) => {
              return (
                <View style={styles.genreBox} key={item}>
                  <Text style={styles.genreText}>
                    {genres[item]}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  voteText: {
    color: colors.White,
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_14,
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.Black,
  },

  imgStyle: {
    aspectRatio: 2 / 3,
    borderRadius: borderRadius.radius_20,
  },

  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.space_10,
  },

  starIcon: {
    color: colors.Yellow,
    fontSize: fontsize.font_20,
  },

  textTitle: {
    color: colors.White,
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_20,
    textAlign: 'center',
    paddingVertical: spacing.space_10,
  },

  genreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: spacing.space_20,
    flexWrap: 'wrap',
  },

  genreBox: {
    borderColor: colors.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: spacing.space_4,
    paddingHorizontal: spacing.space_10,
    borderRadius: borderRadius.radius_20,
  },

  genreText: {
    fontFamily: fontfamily.poppinsRegular,
    fontSize: fontsize.font_10,
    color: colors.WhiteRGBA75,
  },
});

export default MovieCard;
