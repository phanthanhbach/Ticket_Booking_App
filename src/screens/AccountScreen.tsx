import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import {colors, fontfamily, fontsize, spacing} from '../themes/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';

const AccountScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          iconName="close"
          title={'My Profile'}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/image/avatar.png')}
          style={styles.avatarImage}
        />
        <Text style={styles.avatarText}>Hyaku Urisu</Text>
      </View>

      <View style={styles.profileContainer}>
        <SettingComponent
          icon="user"
          heading="Account"
          subheading="Edit Profile"
          subtitle="Change Password"
        />
        <SettingComponent
          icon="setting"
          heading="Settings"
          subheading="Theme"
          subtitle="Permissions"
        />
        <SettingComponent
          icon="dollar"
          heading="Offers & Refferrals"
          subheading="Offer"
          subtitle="Refferrals"
        />
        <SettingComponent
          icon="info"
          heading="About"
          subheading="About Movies"
          subtitle="more"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.Black,
  },
  appHeaderContainer: {
    marginHorizontal: spacing.space_36,
    marginTop: spacing.space_20 * 2,
  },
  profileContainer: {
    alignItems: 'center',
    padding: spacing.space_20,
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_16,
    marginTop: spacing.space_16,
    color: colors.White,
  },
});

export default AccountScreen;
