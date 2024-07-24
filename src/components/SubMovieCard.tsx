import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {borderRadius, colors, fontfamily, fontsize, spacing} from '../themes/theme';

const SubMovieCard = (props: any) => {
  console.log(props.image);
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container,
          props.shouldMarginatedatEnd
            ? props.isFirst
              ? {marginLeft: spacing.space_36}
              : props.isLast
              ? {marginRight: spacing.space_36}
              : {}
            : {},
          props.shouldMarginatedAround ? {margin: spacing.space_12} : {},
          {maxWidth: props.cardWidth},
        ]}>
        <Image
          source={{uri: props.image}}
          style={[styles.imgStyle, {width: props.cardWidth}]}
        />
        <Text style={styles.textTitle} numberOfLines={1}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    color: colors.White,
    fontFamily: fontfamily.poppinsRegular,
    fontSize: fontsize.font_14,
    textAlign: 'center',
    paddingVertical: spacing.space_10,
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
});

export default SubMovieCard;
