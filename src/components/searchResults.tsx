import {
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  ScrollView,
} from "react-native";
import { hs, ms, vs } from "@utils/platform";
import { useTheme } from "@shopify/restyle";
import { Box, ReText, Theme } from "@styles/theme";
import { router } from "expo-router";

type Props = {
  results: any;
  handleBlur: () => void;
};

const SearchResults = ({ results, handleBlur }: Props) => {
  const { colors } = useTheme<Theme>();

  const handlePress = (result: any) => {
    router.push(`/gardens/${result.id}`);
    Keyboard.dismiss();
    handleBlur();
  };

  return (
    <ScrollView>
      {results.map((result: any, index: number) => (
        <Box key={index.toString()}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                borderColor: colors.mainBackground,
              },
            ]}
            onPress={() => handlePress(result)}
          >
            <ReText variant="LabelMedium" textAlign="left">
              {result.title}
            </ReText>
          </TouchableOpacity>
        </Box>
      ))}
    </ScrollView>
  );
};

export default SearchResults;

const styles = StyleSheet.create({
  button: {
    justifyContent: "flex-end",
    paddingHorizontal: hs(10),
    paddingVertical: vs(5),
    borderTopWidth: ms(2),
    borderColor: "#000",
  },
});
