import "react-native-gesture-handler";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as ReThemeProvider } from "@shopify/restyle";
import { StatusBar } from "expo-status-bar";
import { useStore } from "@zustand/store";
import { useFonts } from "expo-font";
import {
  PaperProvider,
  MD3LightTheme,
  TextInput,
  configureFonts,
  Text,
} from "react-native-paper";
import { useCallback, useEffect } from "react";
import { MaterialDark, MaterialLight, fontConfig } from "@styles/material";
import { ThemeProvider } from "@react-navigation/native";
import theme, { Box, ReText, darkTheme } from "@styles/theme";
import Colors from "@styles/colors";
import { I18nManager, Platform, ScrollView, UIManager } from "react-native";
import { Stack, SplashScreen } from "expo-router";
import {
  DarkNavigationColors,
  LightNavigationColors,
} from "@styles/navigation";
import RNRestart from "react-native-restart";
import { getDataFromStorage } from "@utils/helper";
import Header from "@components/header";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: Infinity,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

const getTheme = async () => {
  try {
    const darkMode = await getDataFromStorage("isDark");
    console.log(darkMode);
    if (darkMode === null) {
      useStore.setState({ isDark: false });
    } else {
      useStore.setState({ isDark: darkMode });
    }
  } catch (error) {
    console.log(error);
  }
};

export default function RootLayout() {
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  ReText.defaultProps = ReText.defaultProps || {};
  ReText.defaultProps.allowFontScaling = false;

  ScrollView.defaultProps = ScrollView.defaultProps || {};
  ScrollView.defaultProps.showsVerticalScrollIndicator = false;
  ScrollView.defaultProps.showsHorizontalScrollIndicator = false;

  const { isDark } = useStore();

  const forceRTL = () => {
    if (!I18nManager.isRTL) {
      try {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
        RNRestart.restart();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    forceRTL();
    getTheme();
  }, []);

  const [fontsLoaded] = useFonts({
    CairoReg: require("@assets/fonts/Cairo-Reg.ttf"),
    CairoBold: require("@assets/fonts/Cairo-Bold.ttf"),
  });
  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const materialTheme: any = {
    ...MD3LightTheme,
    dark: isDark,
    isV3: true,
    version: 3,
    colors: isDark
      ? { ...MD3LightTheme.colors, ...MaterialDark }
      : { ...MD3LightTheme.colors, ...MaterialLight },
    fonts: configureFonts({ config: fontConfig }),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ReThemeProvider theme={isDark ? darkTheme : theme}>
        <StatusBar
          style={isDark ? "light" : "dark"}
          backgroundColor={
            isDark ? Colors.darkBackground : Colors.lightBackground
          }
        />
        <PaperProvider theme={materialTheme}>
          <ThemeProvider
            value={isDark ? DarkNavigationColors : LightNavigationColors}
          >
            <Box
              flex={1}
              backgroundColor="mainBackground"
              onLayout={onLayoutRootView}
            >
              <Stack
                screenOptions={{
                  animation: "slide_from_left",
                }}
              >
                <Stack.Screen
                  name="index"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="complaints"
                  options={{
                    header: (props) => (
                      <Header
                        title="الشكاوى والإقتراحات"
                        onPress={() => props.navigation.goBack()}
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="gardens/[gardenId]"
                  options={{
                    title: "",
                  }}
                />
              </Stack>
            </Box>
          </ThemeProvider>
        </PaperProvider>
      </ReThemeProvider>
    </QueryClientProvider>
  );
}
