import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {borderRadius, colors, fontfamily, fontsize, spacing} from '../themes/theme';

const CastCard = (props: any) => {
  return (
    <View
      style={[
        styles.container,
        props.shouldMarginatedatEnd
          ? props.isFirst
            ? {marginLeft: spacing.space_24}
            : props.isLast
            ? {marginRight: spacing.space_24}
            : {}
          : {},
        {maxWidth: props.cardWidth},
      ]}>
      <Image source={{uri: props.imagePath}} style={[styles.cardImg, {width: props.cardWidth}]} />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subTitle}>{props.subTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImg: {
    borderRadius: borderRadius.radius_25 * 4,
    aspectRatio: 1920 / 2880,
  },
  title: {
    alignSelf: 'stretch',
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_12,
    color: colors.White,
  },
  subTitle: {
    alignSelf: 'stretch',
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_10,
    color: colors.White,
  },
});

export default CastCard;
