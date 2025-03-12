import { View, TextInput } from "react-native";
import Select from "../Select";
import IconSearch from "../../../assets/icons/search.svg";
import PropTypes from "prop-types";

function Search({ valueInput = "", onChange, valueSelect, itemsSelect, setValueSelect }) {

  return (
    <View>
      <View className="flex flex-row items-center bg-grayInput  border border-grayBorder rounded-10 px-4 h-[48px]">
        <IconSearch />
        <TextInput
          className="flex-1 placeholder:text-semibold placeholder:text-base"
          placeholder="Nhập tên hoặc mã bài thi"
          value={valueInput}
          onChangeText={(text) => onChange(text)}
        />
      </View>
      <Select
        sxView="my-0 mt-2"
        sxLabel="hidden"
        placeholder="Lọc theo lớp"
        items={itemsSelect}
        value={valueSelect}
        setValue={setValueSelect}
      />
    </View>
  );
}

export default Search;
