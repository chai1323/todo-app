import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
  Profile: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
