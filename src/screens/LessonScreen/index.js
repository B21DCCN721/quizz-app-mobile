import { ScrollView } from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import { CardTest, CardDetail } from "../../components/Card";

function LessonScreen({ navigation }) {
  return (
    <DefaultLayout>
      <ScrollView className="px-5 mt-5">
        <CardTest info={{name:'abc'}}/>
        <CardDetail info={{name:'abc'}}/>
      </ScrollView>
    </DefaultLayout>
  );
}

export default LessonScreen;
