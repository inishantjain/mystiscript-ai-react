import MyPostsSection from "./MyPostsSection";
import ProfileSection from "./ProfileSection";
import EditProfile from "./EditProfile";
export { EditProfile };

function ProfilePage() {
  return (
    <>
      <ProfileSection />
      <MyPostsSection />
    </>
  );
}

export default ProfilePage;
