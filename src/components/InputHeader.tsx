import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  colors,
  spacing,
  borderRadius,
  fontfamily,
  fontsize,
} from '../themes/theme';
import CustomIcon from './CustomIcon';

const InputHeader = (props: any) => {
  const [searchText, setSearchText] = useState<string>('');
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        placeholder="Search Your Movies..."
        placeholderTextColor={colors.WhiteRGBA32}
        onChangeText={text => setSearchText(text)}
        value={searchText}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => props.searchFunction(searchText)}>
        <CustomIcon
          name="search"
          size={fontsize.font_20}
          color={colors.Orange}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: spacing.space_8,
    paddingHorizontal: spacing.space_24,
    borderWidth: 2,
    borderColor: colors.WhiteRGBA15,
    borderRadius: borderRadius.radius_25,
  },

  textInput: {
    width: '90%',
    fontFamily: fontfamily.poppinsRegular,
    fontSize: fontsize.font_14,
    color: colors.White,
  },

  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.space_10,
  },
});

export default InputHeader;
