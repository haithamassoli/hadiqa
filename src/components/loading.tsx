import { ActivityIndicator } from "react-native-paper";

interface LoadingProps {
  size?: "small" | "large";
  color?: string;
}

const Loading = ({ size, color }: LoadingProps) => {
  return (
    <ActivityIndicator
      style={{ flex: 1 }}
      color={color}
      size={size || "large"}
    />
  );
};

export default Loading;
