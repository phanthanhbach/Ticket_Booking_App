import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import {
  borderRadius,
  colors,
  fontfamily,
  fontsize,
  spacing,
} from '../themes/theme';

const AppHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBG} onPress={() => props.action()}>
        <CustomIcon name={props.iconName} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.textHeader}>{props.title}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconBG: {
    height: spacing.space_20 * 2,
    width: spacing.space_20 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.radius_20,
    backgroundColor: colors.Orange,
  },
  iconStyle: {
    color: colors.White,
    fontSize: fontsize.font_24,
  },

  textHeader: {
    flex: 1,
    color: colors.White,
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_20,
    textAlign: 'center',
  },
  emptyContainer: {
    height: spacing.space_20 * 2,
    width: spacing.space_20 * 2,
  },
});

export default AppHeader;
