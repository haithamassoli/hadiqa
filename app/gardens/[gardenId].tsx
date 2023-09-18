import { useDataById } from "@apis/data";
import Header from "@components/header";
import ImagesCarousel from "@components/imagesCarousel";
import Loading from "@components/loading";
import CustomButton from "@components/ui/customButton";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
import { Box, ReText, Theme } from "@styles/theme";
import { hs, ms, vs } from "@utils/platform";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Linking, ScrollView, Share, TouchableOpacity } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Animated, { FadeInUp } from "react-native-reanimated";

type SECTIONSTYPE = { title: string; content: string };

const GardenScreen = () => {
  const { colors } = useTheme<Theme>();
  const [activeSections, setActiveSections] = useState([]);
  const { gardenId }: { gardenId: string } = useLocalSearchParams();

  const { data, isLoading } = useDataById(gardenId);

  const primaryColor =
    data?.category === "مكتبة" ? colors.libraryPrimary : colors.primary;

  if (isLoading) return <Loading />;

  const renderHeader = (section: SECTIONSTYPE, index: number) => {
    return (
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [
            {
              translateY: vs(125),
            },
          ],
        })
          .duration(600)
          .delay(index * 200 + 400)}
      >
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="mainBackground"
          paddingHorizontal="hm"
          paddingVertical="vs"
          borderRadius="m"
        >
          <ReText fontFamily="CairoBold" textAlign="left" variant="BodyLarge">
            {section.title}
          </ReText>
          <Feather name="chevron-down" size={ms(20)} color={colors.text} />
        </Box>
      </Animated.View>
    );
  };

  const renderContent = (section: SECTIONSTYPE, index: number) => {
    return (
      <Animated.View entering={FadeInUp.duration(600)}>
        <Box
          backgroundColor="secBackground"
          paddingHorizontal="hm"
          paddingVertical="vs"
        >
          <ReText variant="BodyLarge" textAlign="left">
            {section.content}
          </ReText>
        </Box>
      </Animated.View>
    );
  };

  const updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: hs(16),
      }}
    >
      <Stack.Screen
        options={{
          header: (props) => (
            <Header
              onPress={() => props.navigation.goBack()}
              title={data?.title!}
            />
          ),
        }}
      />
      <Animated.View entering={FadeInUp.duration(600)}>
        <ImagesCarousel images={data?.images!} color={primaryColor} />
      </Animated.View>
      <Box height={vs(18)} />
      <Animated.View entering={FadeInUp.duration(600).delay(200)}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="vm"
        >
          <CustomButton
            title="للشكاوى والملاحظات"
            onPress={() => router.push(`/complaints?color=${primaryColor}`)}
            style={{
              width: "64%",
              borderRadius: ms(18),
              backgroundColor: primaryColor,
            }}
          />
          <TouchableOpacity
            onPress={() => Linking.openURL(data?.locationLink!)}
            style={{
              backgroundColor: primaryColor,
              borderRadius: ms(18),
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: hs(12),
              height: vs(46),
              marginHorizontal: hs(8),
            }}
          >
            <Feather
              name="map-pin"
              size={ms(24)}
              color={colors.mainBackground}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Share.share({
                message: `مرحباً، أنصحك بزيارة ${data?.title!}، للمزيد من المعلومات قم بزيارة الرابط التالي: ${data?.locationLink!}`,
              })
            }
            style={{
              backgroundColor: primaryColor,
              borderRadius: ms(18),
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: hs(12),
              height: vs(46),
            }}
          >
            <Feather
              name="share-2"
              size={ms(24)}
              color={colors.mainBackground}
            />
          </TouchableOpacity>
        </Box>
      </Animated.View>
      <Animated.View
        entering={FadeInUp.withInitialValues({
          transform: [
            {
              translateY: vs(325),
            },
          ],
        })
          .duration(600)
          .delay(400)}
      >
        <Accordion
          sections={data?.accordion!}
          sectionContainerStyle={{
            backgroundColor: colors.secBackground,
            borderRadius: ms(10),
            marginBottom: vs(12),
            paddingHorizontal: hs(14),
            paddingVertical: vs(8),
          }}
          activeSections={activeSections}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSections}
          touchableComponent={TouchableOpacity}
        />
      </Animated.View>
    </ScrollView>
  );
};

export default GardenScreen;
