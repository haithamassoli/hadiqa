import { LayoutAnimation } from "react-native";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import SearchResults from "./searchResults";
import { hs, ms, vs } from "@utils/platform";
import { useTheme } from "@shopify/restyle";
import { Box, Theme } from "@styles/theme";
import ControlledInput from "./controlledInput";
import { TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  validationSearchSchema,
  validationSearchSchemaType,
} from "@src/types/schema";

let delayTimer: any;
const options = {
  keys: ["title"],
};

const SearchInput = ({ list }: { list: any }) => {
  const { colors } = useTheme<Theme>();
  const { control, getValues, setValue, formState, watch, reset } =
    useForm<validationSearchSchemaType>({
      resolver: zodResolver(validationSearchSchema),
    });
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      const fuse = new Fuse<any>(list, options);
      const searchResults = fuse.search(getValues("search") || "");
      console.log(searchResults);
      const newArr = searchResults.slice(0, 5).map((result) => {
        return result.item;
      });
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setResults(newArr.slice(0, 5));
    }, 400);
    return () => {
      clearTimeout(delayTimer);
    };
  }, [watch("search")]);

  const handleFocus = () => setSearchBarFocused(true);

  const handleBlur = () => {
    setSearchBarFocused(false);
    setResults([]);
    reset();
  };

  return (
    <Box>
      <ControlledInput
        control={control}
        onFocus={handleFocus}
        onBlur={handleBlur}
        name="search"
        placeholder="ابحث عن حديقة أو مرفق عام ..."
        textAlignVertical="center"
        mode="outlined"
        outlineStyle={{
          borderRadius: ms(18),
        }}
        style={{
          backgroundColor: colors.secBackground,
          zIndex: 10,
          paddingHorizontal: hs(8),
          height: vs(48),
          lineHeight: vs(26),
          textAlignVertical: "center",
        }}
        contentStyle={{
          fontSize: ms(14),
          textAlignVertical: "center",
        }}
        left={
          <TextInput.Icon
            icon="magnify"
            size={ms(24)}
            style={{
              paddingTop: vs(8),
            }}
          />
        }
        right={
          formState.isDirty && getValues("search").length > 0 ? (
            <TextInput.Icon
              icon="close"
              size={ms(24)}
              style={{
                paddingTop: vs(8),
              }}
              onPress={() => setValue("search", "")}
            />
          ) : null
        }
      />
      {searchBarFocused && results.length > 0 && (
        <Box
          backgroundColor="secBackground"
          position="absolute"
          top={vs(32)}
          overflow="hidden"
          left={0}
          right={0}
          height={vs(198)}
          paddingTop="vl"
          borderBottomLeftRadius="l"
          borderBottomRightRadius="l"
        >
          <SearchResults results={results} handleBlur={handleBlur} />
        </Box>
      )}
    </Box>
  );
};

export default SearchInput;
