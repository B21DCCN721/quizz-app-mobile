import { ScrollView } from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import { CardTest, CardDetail } from "../../components/Card";

function LessonScreen({ navigation }) {
  return (
    <DefaultLayout>
      <ScrollView>
        <CardTest info={{name:'abc'}}/>
        <CardDetail info={{name:'abc'}}/>
      </ScrollView>
    </DefaultLayout>
  );
}

export default LessonScreen;
