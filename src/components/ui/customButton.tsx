import { vs } from "@utils/platform";
import { Button } from "react-native-paper";

const CustomButton = ({
  onPress,
  title,
  mode = "contained",
  style,
  contentStyle,
  textColor,
}: {
  onPress: () => void;
  title: string;
  mode?: "text" | "outlined" | "contained" | "elevated" | "contained-tonal";
  style?: any;
  contentStyle?: any;
  textColor?: string;
}) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      textColor={textColor || undefined}
      contentStyle={{
        height: vs(46),
        ...contentStyle,
      }}
      style={{
        ...style,
      }}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
