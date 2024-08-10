import {
  FlatList,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  borderRadius,
  colors,
  fontfamily,
  fontsize,
  spacing,
} from '../themes/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import {timeArray} from '../constants/timeArray';
import CustomIcon from '../components/CustomIcon';
import EncryptedStorage from 'react-native-encrypted-storage';

const generateDate = () => {
  const date = new Date();
  const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekDay[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekDays.push(tempDate);
  }
  return weekDays;
};

const generateSeats = () => {
  const numRow = 8;
  let numCol = 3;
  const rowArray = [];
  let start = 1;
  let reachNine = false;

  for (let i = 0; i < numRow; i++) {
    const colArray = [];
    for (let j = 0; j < numCol; j++) {
      const seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      colArray.push(seatObject);
      start++;
    }
    if (i === 3) {
      numCol += 2;
    }
    if (numCol < 9 && !reachNine) {
      numCol += 2;
    } else {
      reachNine = true;
      numCol -= 2;
    }
    rowArray.push(colArray);
  }
  return rowArray;
};

const SetBookingScreen = ({navigation, route}: any) => {
  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);

  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState<number[]>([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const selectSeat = (rowIndex: number, seatIndex: number, seatNum: number) => {
    if (!twoDSeatArray[rowIndex][seatIndex].taken) {
      const array = [...selectedSeatArray];
      const temp = [...twoDSeatArray];
      temp[rowIndex][seatIndex].selected = !temp[rowIndex][seatIndex].selected;
      if (!array.includes(seatNum)) {
        array.push(seatNum);
        setSelectedSeatArray(array);
      } else {
        const tempIndex = array.indexOf(seatNum);
        if (tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  const BookSeats = async () => {
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: route.params?.posterImage,
          }),
        );
      } catch (error) {
        console.error(
          'Something went wrong with the EncryptedStorage setItem',
          error,
        );
      }
      navigation.navigate('Ticket', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params?.posterImage,
      });
    } else {
      ToastAndroid.showWithGravity(
        'Please select Seats, Date and Time',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <View>
        <ImageBackground
          source={{uri: route.params?.bgImage}}
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
        <Text style={styles.screenText}>Screen this side</Text>
      </View>
      <View style={styles.seatContainer}>
        <View style={styles.containerGap20}>
          {twoDSeatArray?.map((row, rowIndex) => {
            return (
              <View key={rowIndex} style={styles.seatRow}>
                {row?.map((seat, seatIndex) => {
                  return (
                    <TouchableOpacity
                      key={seat.number}
                      onPress={() => {
                        selectSeat(rowIndex, seatIndex, seat.number);
                      }}>
                      <CustomIcon
                        name="seat"
                        style={[
                          styles.seatIcon,
                          seat.taken ? {color: colors.Grey} : {},
                          seat.selected ? {color: colors.Orange} : {},
                        ]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View style={styles.seatRadioContainer}>
          <View style={styles.radioContainer}>
            <CustomIcon name="radio" style={styles.radioIcon} />
            <Text style={styles.radioText}>Available</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              style={[styles.radioIcon, {color: colors.Grey}]}
            />
            <Text style={styles.radioText}>Taken</Text>
          </View>
          <View style={styles.radioContainer}>
            <CustomIcon
              name="radio"
              style={[styles.radioIcon, {color: colors.Orange}]}
            />
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>
      </View>
      <View>
        <FlatList
          data={dateArray}
          keyExtractor={item => item.date}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap20}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                <View
                  style={[
                    styles.dateContainer,
                    index === 0
                      ? {marginLeft: spacing.space_24}
                      : index === dateArray.length - 1
                      ? {marginRight: spacing.space_24}
                      : {},
                    index === selectedDateIndex
                      ? {backgroundColor: colors.Orange}
                      : {},
                  ]}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  <Text style={styles.dayText}>{item.day}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.outterContainer}>
        <FlatList
          data={timeArray}
          keyExtractor={item => item}
          horizontal
          bounces={false}
          contentContainerStyle={styles.containerGap20}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                <View
                  style={[
                    styles.timeContainer,
                    index === 0
                      ? {marginLeft: spacing.space_24}
                      : index === dateArray.length - 1
                      ? {marginRight: spacing.space_24}
                      : {},
                    index === selectedTimeIndex
                      ? {backgroundColor: colors.Orange}
                      : {},
                  ]}>
                  <Text style={styles.timeText}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalPriceText}>Total Price</Text>
          <Text style={styles.price}>$ {price}</Text>
        </View>
        <TouchableOpacity style={styles.buyButtonContainer} onPress={BookSeats}>
          <Text style={styles.buttonText}>Buy Tickets</Text>
        </TouchableOpacity>
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

  imgBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: spacing.space_36,
    marginTop: spacing.space_20 * 2,
  },

  screenText: {
    textAlign: 'center',
    fontFamily: fontfamily.poppinsRegular,
    fontSize: fontsize.font_12,
    color: colors.WhiteRGBA15,
  },

  seatContainer: {
    marginVertical: spacing.space_20,
  },
  containerGap20: {
    gap: spacing.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: spacing.space_20,
    justifyContent: 'center',
  },
  seatIcon: {
    color: colors.White,
    fontSize: fontsize.font_24,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: spacing.space_20,
  },
  radioContainer: {
    flexDirection: 'row',
    gap: spacing.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    color: colors.White,
    fontSize: fontsize.font_20,
  },
  radioText: {
    color: colors.White,
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_12,
  },

  dateContainer: {
    width: spacing.space_10 * 7,
    height: spacing.space_10 * 10,
    borderRadius: spacing.space_10 * 10,
    backgroundColor: colors.darkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: colors.White,
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_24,
  },
  dayText: {
    color: colors.White,
    fontFamily: fontfamily.poppinsRegular,
    fontSize: fontsize.font_12,
  },
  outterContainer: {marginVertical: spacing.space_20},
  timeContainer: {
    width: spacing.space_20 * 4,
    paddingVertical: spacing.space_10,
    paddingHorizontal: spacing.space_10,
    borderWidth: 1,
    borderColor: colors.WhiteRGBA50,
    borderRadius: borderRadius.radius_25,
    backgroundColor: colors.darkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: colors.White,
    fontFamily: fontfamily.poppinsRegular,
    fontSize: fontsize.font_14,
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.space_36,
    paddingBottom: spacing.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    color: colors.Grey,
    fontFamily: fontfamily.poppinsRegular,
    fontSize: fontsize.font_14,
  },
  price: {
    color: colors.White,
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_24,
  },
  buyButtonContainer: {
    backgroundColor: colors.Orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.radius_25,
    paddingHorizontal: spacing.space_20,
    paddingVertical: spacing.space_10,
  },
  buttonText: {
    color: colors.White,
    paddingHorizontal: spacing.space_20,
    fontFamily: fontfamily.poppinsMedium,
    fontSize: fontsize.font_16,
  },
});

export default SetBookingScreen;
