import { Box, ReText, Theme } from "@styles/theme";
import { Feather } from "@expo/vector-icons";
import { hs, ms, vs } from "@utils/platform";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@shopify/restyle";

const Header = ({ onPress, title }: { onPress: () => void; title: string }) => {
  const { colors } = useTheme<Theme>();
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="hm"
      backgroundColor="mainBackground"
      style={{
        paddingTop: useSafeAreaInsets().top + vs(12),
        paddingBottom: vs(16),
      }}
    >
      <ReText
        variant="TitleLarge"
        textAlign="left"
        fontFamily="CairoBold"
        color="text"
      >
        {title}
      </ReText>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
        }}
      >
        <Feather name="chevron-left" size={ms(24)} color={colors.text} />
        <Feather
          name="chevron-left"
          size={ms(24)}
          color={colors.text}
          style={{
            marginLeft: hs(-12),
          }}
        />
      </TouchableOpacity>
    </Box>
  );
};

export default Header;
