// src/navigation/BottomTabNavigation.tsx
import React from 'react';
import { View, Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screen/Main/HomeScreen';
import ReportScreen from '../../screen/Main/ReportScreen';
import ReporteEspecifico from '../../screen/Main/SpecifReportScreen';
import Cursos from '../../screen/Main/CoursesScreen';
import { COLORS, icons } from '../../constants';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          height: Platform.OS === 'ios' ? 90 : 60,
          backgroundColor: COLORS.white,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? icons.home : icons.homeOutline}
              resizeMode="contain"
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? icons.calendar : icons.calendarOutline}
              resizeMode="contain"
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ReporteEspecifico"
        component={ReporteEspecifico}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? icons.user : icons.userOutline}
              resizeMode="contain"
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Courses"
        component={Cursos}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? icons.courses : icons.coursesOutline} // Asumiendo que tienes íconos para courses
              resizeMode="contain"
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? COLORS.primary : COLORS.black,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
