import { Tabs } from "expo-router";
import Groups from '../../../assets/images/groups.svg';
import Friends from '../../../assets/images/@mail.svg';
import Profile from '../../../assets/images/profile.svg';
import { Colors } from "../../constants/colors";

export default function AppLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false;
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textGray,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: Colors.background, borderTopColor: Colors.textGray, borderTopWidth: 0.5 },
        headerStyle: { backgroundColor: Colors.background, borderBottomColor: Colors.textGray, borderBottomWidth: 0.5 },
        headerTitleStyle: { color: 'white' , fontSize: 18, fontWeight: '600' },
      }}>
      <Tabs.Screen
        name="groupTab"
        options={{
          title: "Groups",
          tabBarIcon: ({ color, size}) => (
            <Groups width={size} height={size} fill={color} />
          )
        }} />
      <Tabs.Screen
        name="friendsTab"
        options={{
          title: "Friends",
          tabBarIcon: ({ color, size }) => (
            <Friends width={size} height={size} fill={color} />
          )
        }} />
      <Tabs.Screen
        name="profileTab"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Profile width={size} height={size} fill={color} />
          )
        }} />
    </Tabs>
  );
}
