/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { act } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import AccountScreen from '../screens/AccountScreen';

import { colors, fontsize, spacing } from '../themes/theme';
import CustomIcon from '../components/CustomIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: colors.Black,
                borderTopWidth: 0,
                height: spacing.space_10 * 10,
            },
        }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {
                    return <View style={[
                        styles.activeTabBackground,
                        focused ? {backgroundColor: colors.Orange} : {},
                        ]}>
                        <CustomIcon name="video" color={colors.White} size={fontsize.font_30} />
                    </View>;
                },
            }} />
            <Tab.Screen name="Search" component={SearchScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {
                    return <View style={[
                        styles.activeTabBackground,
                        focused ? {backgroundColor: colors.Orange} : {},
                        ]}>
                        <CustomIcon name="search" color={colors.White} size={fontsize.font_30} />
                    </View>;
                },
            }} />
            <Tab.Screen name="Ticket" component={TicketScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {
                    return <View style={[
                        styles.activeTabBackground,
                        focused ? {backgroundColor: colors.Orange} : {},
                        ]}>
                        <CustomIcon name="ticket" color={colors.White} size={fontsize.font_30} />
                    </View>;
                },
            }} />
            <Tab.Screen name="Account" component={AccountScreen} options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => {
                    return <View style={[
                        styles.activeTabBackground,
                        focused ? {backgroundColor: colors.Orange} : {},
                        ]}>
                        <CustomIcon name="user" color={colors.White} size={fontsize.font_30} />
                    </View>;
                },
            }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    activeTabBackground: {
        backgroundColor: colors.Black,
        padding: spacing.space_18,
        borderRadius: spacing.space_18 * 10,
    },
});

export default TabNavigator;
