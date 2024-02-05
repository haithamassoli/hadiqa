import Feather from "@expo/vector-icons/Feather";
import { ms } from "@utils/platform";
import Colors from "@styles/colors";
import { TouchableOpacity } from "react-native";
import switchTheme from "react-native-theme-switch-animation";
import { useStore } from "@zustand/store";

export const ColorSchemeButton = () => {
  const { isDark, toggleTheme } = useStore();
  return (
    <TouchableOpacity
      onPress={(e) => {
        e.currentTarget.measure(
          (
            x1: number,
            y1: number,
            width: number,
            height: number,
            px: number,
            py: number
          ) => {
            switchTheme({
              switchThemeFunction: () => {
                toggleTheme();
              },
              animationConfig: {
                type: "circular",
                duration: 900,
                startingPoint: {
                  cy: py + height / 2,
                  cx: px + width / 2,
                },
              },
            });
          }
        );
      }}
    >
      <Feather
        name={isDark ? "sun" : "moon"}
        color={isDark ? Colors.darkText : Colors.lightText}
        size={ms(24)}
      />
    </TouchableOpacity>
  );
};
