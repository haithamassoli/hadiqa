import { useData } from "@apis/data";
import Loading from "@components/loading";
import NoConnection from "@components/noConnection";
import SearchInput from "@components/searchInput";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import { useTheme } from "@shopify/restyle";
import { darkMapJson, lightMapJson } from "@src/data/map";
import { Box, ReText, Theme } from "@styles/theme";
import { hs, ms, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, { FadeInUp } from "react-native-reanimated";

const HomeScreen = () => {
  const { isConnected } = useNetInfo();
  const { isDark, toggleTheme } = useStore();
  const { data, isLoading } = useData();
  const { colors } = useTheme<Theme>();

  if (isConnected === false) return <NoConnection />;
  if (isLoading) return <Loading />;

  const showLocationsOfInterest = () => {
    return data?.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item?.location}
          pinColor={colors.primary}
          onPress={() => router.push(`/gardens/${item?.id}`)}
        >
          <Box
            paddingHorizontal="hs"
            paddingVertical="vs"
            justifyContent="center"
            alignItems="center"
          >
            <ReText
              variant="LabelLarge"
              fontFamily="CairoBold"
              color="primary2"
            >
              {item?.title}
            </ReText>
            <Ionicons
              name="location-sharp"
              size={ms(38)}
              color={colors.primary}
            />
          </Box>
        </Marker>
      );
    });
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.container}
        initialRegion={{
          latitude: 31.954620555386903,
          longitude: 35.90197721349148,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={isDark ? darkMapJson : lightMapJson}
      >
        {showLocationsOfInterest()}
      </MapView>
      <Animated.View
        entering={FadeInUp.duration(600).delay(200)}
        style={styles.searchContainer}
      >
        <Box width={"86%"} height={vs(48)} marginBottom="vs">
          <SearchInput list={data} />
        </Box>
        <TouchableOpacity onPress={toggleTheme} style={styles.toggle}>
          <Feather
            name={isDark ? "sun" : "moon"}
            size={ms(24)}
            color={colors.text}
          />
        </TouchableOpacity>
      </Animated.View>
    </Box>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: hs(16),
    marginTop: vs(82),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggle: {
    width: "12%",
    height: vs(48),
    justifyContent: "center",
    alignItems: "center",
  },
});
