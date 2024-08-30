import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors, fontfamily, fontsize, spacing} from '../themes/theme';
import CustomIcon from './CustomIcon';

const SettingComponent = (props: any) => {
  return (
    <View style={styles.container}>
      <View>
        <CustomIcon name={props.icon} style={styles.iconStyle} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subtitle}>{props.subheading}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <CustomIcon name={'arrow-right'} style={styles.iconStyle} />
      </View>
    </View>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: spacing.space_20,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    color: colors.White,
    fontSize: fontsize.font_24,
    paddingHorizontal: spacing.space_20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_18,
    color: colors.White,
  },
  subtitle: {
    fontFamily: fontfamily.poppinsRegular,
    fontSize: fontsize.font_14,
    color: colors.WhiteRGBA15,
  },
});
