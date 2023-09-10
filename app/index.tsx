import { useData } from "@apis/data";
import Loading from "@components/loading";
import SearchInput from "@components/searchInput";
import { Feather } from "@expo/vector-icons";
import { darkMapJson, lightMapJson } from "@src/data/map";
import Colors from "@styles/colors";
import { Box } from "@styles/theme";
import { hs, ms, vs } from "@utils/platform";
import { useStore } from "@zustand/store";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Animated, { FadeInUp } from "react-native-reanimated";

const HomeScreen = () => {
  const { isDark, toggleTheme } = useStore();
  const { data, isLoading } = useData();

  if (isLoading) return <Loading />;

  const showLocationsOfInterest = () => {
    return data?.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item?.location}
          title={item?.title}
          pinColor={Colors.primary}
          onPress={() => router.push(`/gardens/${item.id}`)}
        />
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
        <Box width={"86%"} height={ms(48)}>
          <SearchInput list={data} />
        </Box>
        <TouchableOpacity onPress={toggleTheme} style={styles.toggle}>
          <Feather
            name={isDark ? "sun" : "moon"}
            size={ms(24)}
            color={isDark ? Colors.lightText : Colors.darkText}
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
    paddingTop: vs(72),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggle: {
    width: "12%",
    height: ms(48),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    paddingTop: vs(22),
  },
});
