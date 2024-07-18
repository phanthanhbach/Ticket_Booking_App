import { StyleSheet, Text} from 'react-native';
import React from 'react';
import { colors, fontfamily, fontsize, spacing } from '../themes/theme';

const CategoryHeader = (props: any) => {
  return (
    <Text style={styles.text}>
      {props.title}
    </Text>
  );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: fontfamily.poppinsSemiBold,
        fontSize: fontsize.font_20,
        color: colors.White,
        paddingHorizontal: spacing.space_36,
        paddingVertical: spacing.space_28,
    },
});

export default CategoryHeader;
