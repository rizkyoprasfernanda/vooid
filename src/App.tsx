import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import 'react-native-url-polyfill/auto';
import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import ProfileSettings from './screens/ProfileSettings';
import TermsCondition from './screens/TermsCondition';
import ForgotPassword from './screens/ForgotPassword';
import VerificationForgotPassword from './screens/VerificationForgotPassword';
import ResetPassword from './screens/ResetPassword';
import ChangePassword from './screens/ChangePassword';
import Navigation from './component/Navigation';

enableScreens();

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerificationForgotPassword: {email: string};
  ResetPassword: {email: string};
  ChangePassword: undefined;
  TermsCondition: undefined;
  Profile: undefined;
  ProfileSettings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Home" component={Navigation} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="VerificationForgotPassword"
          component={VerificationForgotPassword}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="TermsCondition" component={TermsCondition} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
