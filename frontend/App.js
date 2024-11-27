const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Onboarding1 from "./screens/Onboarding1";
import Login from "./screens/CreateAccount";
import Login2 from "./screens/Login2";
import Login4 from "./screens/Login4";
import Onboarding2 from "./screens/Onboarding2";
import Login5 from "./screens/Login5";
import ForgotPassword from "./screens/ForgotPassword";
import SplashScreen from "./screens/SplashScreen";
import Login1 from "./screens/Login1";
import Login6 from "./screens/Login6";
import Onboarding from "./screens/Onboarding";
import Traditional from "./components/Traditional";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import CreateAccount from "./screens/CreateAccount";
import Signin from "./screens/Signin";
import Homepage2 from "./screens/Homepage2";
import Homepage1 from "./screens/Homepage1";
import Homepage from "./screens/Homepage";
import { Provider } from "react-redux";

import { store } from "./ReduxToolkit/store";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Urbanist-Regular": require("./assets/fonts/Urbanist-Regular.ttf"),
    "Urbanist-Bold": require("./assets/fonts/Urbanist-Bold.ttf"),
    "Urbanist-Black": require("./assets/fonts/Urbanist-Black.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          {hideSplashScreen ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* Congo 
              <Stack.Screen
                name="Login4"
                component={Login4}
                options={{ headerShown: false }}
              />


              
              Update Profile
              <Stack.Screen
                name="Login6"
                component={Login6}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login1"
                component={Login1}
                options={{ headerShown: false }}
              /> */}
              {/* //----------------------------------------------------------------         */}
              <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Onboarding2"
                component={Onboarding2}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Onboarding1"
                component={Onboarding1}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Onboarding"
                component={Onboarding}
                options={{ headerShown: false }}
              />
              {/* Its showing error even when successful account created Solved */}
              <Stack.Screen
                name="CreateAccount"
                component={CreateAccount}
                options={{ headerShown: false }}
              />
              {/* // Add forget password option in this page  */}
              <Stack.Screen
                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
              />
              {/* OTP
              <Stack.Screen
                name="Login5"
                component={Login5}
                options={{ headerShown: false }}
              /> */}
              {/* Need to work on this component  */}
              <Stack.Screen
                name="Login2"
                component={Login2}
                options={{ headerShown: false }}
              />
              {/* ---------------------------------------------------------------- */}
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login6"
                component={Login6}
                options={{ headerShown: false }}
              />
              {/* ---------------------------------------------------------------- */}
              {/* <Stack.Screen
                name="Homepage2"
                component={Homepage2}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Homepage1"
                component={Homepage1}
                options={{ headerShown: false }}
              /> */}
              <Stack.Screen
                name="Homepage"
                component={Homepage}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : null}
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};
export default App;
