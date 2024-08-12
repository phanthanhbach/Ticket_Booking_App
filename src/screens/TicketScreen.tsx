import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from '../components/AppHeader';
import {
  borderRadius,
  colors,
  fontfamily,
  fontsize,
  spacing,
} from '../themes/theme';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';

const TicketScreen = ({navigation, route}: any) => {
  const [ticket, setTicket] = useState<any>(route.params);

  useEffect(() => {
    (async () => {
      try {
        const ticketData = await EncryptedStorage.getItem('ticket');
        if (ticketData !== undefined && ticketData !== null) {
          setTicket(JSON.parse(ticketData));
        }
      } catch (error) {
        console.error(
          'Something went wrong with the EncryptedStorage getItem',
          error,
        );
      }
    })();
  }, []);

  if (ticket !== route.params && route.params !== undefined) {
    setTicket(route.params);
  }

  if (!ticket) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name={'close'}
            title={'My Ticket'}
            action={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          iconName="close"
          title={'My Ticket'}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticket?.ticketImage}}
          style={styles.ticketBGImg}>
          <LinearGradient
            colors={[colors.OrangeRGBA0, colors.Orange]}
            style={styles.linearGradient}>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, left: -40},
              ]}></View>
            <View
              style={[
                styles.blackCircle,
                {position: 'absolute', bottom: -40, right: -40},
              ]}></View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.linear}></View>

        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}></View>
          <View
            style={[
              styles.blackCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}></View>
          <View style={styles.ticketDateContainer}>
            <View>
              <Text style={styles.dateTitle}>{ticket?.date.date}</Text>
              <Text style={styles.subTitle}>{ticket?.date.day}</Text>
            </View>
            <View>
              <CustomIcon name="clock" style={styles.clockIcon} />
              <Text style={styles.subTitle}>{ticket?.time}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subHeading}>Hall</Text>
              <Text style={styles.subTitle}>02</Text>
            </View>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subHeading}>Row</Text>
              <Text style={styles.subTitle}>03</Text>
            </View>
            <View style={styles.subTitleContainer}>
              <Text style={styles.subHeading}>Seats</Text>
              <Text style={styles.subTitle}>
                {ticket?.seatArray
                  .slice(1, 4)
                  .map((item: any, index: number, arr: any) => {
                    return item + (index === arr.length - 1 ? '' : ', ');
                  })}
              </Text>
            </View>
          </View>
          <Image
            source={require('../assets/image/barcode.png')}
            style={styles.barcode}
          />
        </View>
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

  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketBGImg: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: borderRadius.radius_25,
    borderTopRightRadius: borderRadius.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '70%',
  },

  linear: {
    borderTopColor: colors.Black,
    borderTopWidth: 3,
    width: 300,
    alignSelf: 'center',
    backgroundColor: colors.Orange,
    borderStyle: 'dashed',
  },

  ticketFooter: {
    backgroundColor: colors.Orange,
    borderBottomLeftRadius: borderRadius.radius_25,
    borderBottomRightRadius: borderRadius.radius_25,
    paddingBottom: spacing.space_20,
    alignItems: 'center',
    width: 300,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.space_10,
    gap: spacing.space_36,
  },
  dateTitle: {
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_24,
    color: colors.White,
  },
  subTitle: {
    fontFamily: fontfamily.poppinsRegular,
    fontSize: fontsize.font_14,
    color: colors.White,
  },
  clockIcon: {
    fontSize: fontsize.font_24,
    color: colors.White,
    paddingBottom: spacing.space_10,
  },

  ticketSeatContainer: {
    marginBottom: spacing.space_10,
    gap: spacing.space_36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitleContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subHeading: {
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_18,
    color: colors.White,
  },

  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: colors.Black,
  },
  barcode: {
    height: 50,
    aspectRatio: 158 / 52,
  },
});

export default TicketScreen;
