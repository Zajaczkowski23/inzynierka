import AvatarFace from "../../assets/avatar-face.svg";
import "./Leaderboard.css";

const Leaderboard = () => {
  const leaderboard = [
    { place: 1, name: "profile1", points: 100 },
    { place: 2, name: "profile2", points: 90 },
    { place: 3, name: "profile3", points: 80 },
    { place: 4, name: "profile4", points: 70 },
    { place: 5, name: "profile5", points: 60 },
    { place: 6, name: "profile6", points: 50 },
    { place: 7, name: "profile7", points: 40 },
    { place: 8, name: "profile8", points: 30 },
    { place: 9, name: "profile9", points: 20 },
    { place: 10, name: "profile10", points: 10 },
  ];

  return (
    <div>
      <div className="leaderboard-container">
        <div className="leaderboard-title">Leaderboard</div>
        <div className="leaderboard">
          {leaderboard.map((profile) => (
            <div
              className={`leaderboard-profile ${
                profile.place === 1
                  ? "gold"
                  : profile.place === 2
                  ? "silver"
                  : profile.place === 3
                  ? "bronze"
                  : ""
              }`}
              key={profile.name}
            >
              <div className="leaderboard-profile-place">{profile.place}</div>
              <div className="leaderboard-profile-img">
                <img src={AvatarFace} alt="Avatar picture of user" />
              </div>
              <div className="leaderboard-profile-name">{profile.name}</div>
              <div className="leaderboard-profile-points">{profile.points}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
