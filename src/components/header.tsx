import { Box, ReText } from "@styles/theme";
import { Feather } from "@expo/vector-icons";
import { hs, ms } from "@utils/platform";
import Colors from "@styles/colors";
import { TouchableOpacity } from "react-native";

const Header = ({ onPress, title }: { onPress: () => void; title: string }) => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="hm"
      paddingVertical="vl"
      backgroundColor="mainBackground"
    >
      <ReText
        variant="TitleLarge"
        textAlign="left"
        fontFamily="CairoBold"
        color="primary"
      >
        {title}
      </ReText>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
        }}
      >
        <Feather name="chevron-left" size={ms(24)} color={Colors.primary} />
        <Feather
          name="chevron-left"
          size={ms(24)}
          color={Colors.primary}
          style={{
            marginLeft: hs(-12),
          }}
        />
      </TouchableOpacity>
    </Box>
  );
};

export default Header;
