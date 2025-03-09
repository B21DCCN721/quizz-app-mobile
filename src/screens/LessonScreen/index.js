import { View, Text, ScrollView } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";
import { CardTest } from "../../components/Card";

function LessonScreen({ navigation }) {
  return (
    <DefaultLayot>
      <ScrollView className="px-5 mt-5">
        <CardTest info={{name:'abc'}}/>
      </ScrollView>
    </DefaultLayot>
  );
}

export default LessonScreen;
