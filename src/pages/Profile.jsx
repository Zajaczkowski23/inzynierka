import Header from "../components/Header/Header";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import ProfileStats from "../components/ProfileStats/ProfileStats";
import Sidebar from "../components/Side-bar/Sidebar";

const Profile = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className="flex">
        <ProfileStats />
        <Leaderboard />
      </div>
    </div>
  );
};

export default Profile;
