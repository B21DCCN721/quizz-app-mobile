import DefaultLayout from "../../../layouts/DefaultLayout";
import Button from "../../../components/Button";

function ProfileScreenTeacher({ navigation }) {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  };
  return (
    <DefaultLayout>
      <Button
        title="Đăng xuất"
        sxButton="mx-2 bg-pink flex flex-row justify-between items-center"
        sxText="font-interRegular"
        onClick={handleLogout}
      ></Button>
      <Button
        title="Chỉnh sửa"
        sxButton="mx-2 bg-pink flex flex-row justify-between items-center"
        sxText="font-interRegular"
        onClick={() => navigation.navigate("EditProfileTeacher")}
      ></Button>
    </DefaultLayout>
  );
}

export default ProfileScreenTeacher;
