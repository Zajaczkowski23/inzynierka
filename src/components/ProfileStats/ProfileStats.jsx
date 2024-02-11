import AvatarFace from "../../assets/avatar-face.svg";
import "./ProfileStats.css";

const ProfileStats = () => {
  return (
    <div className="profile-stats">
      <img src={AvatarFace} alt="Avatar of the profile" />
      <div className="user-name">Kris</div>
      <div className="user-stats">
        <div className="stats-detail">
          <p className="stat">Match Predictions</p>
          <p className="stat-value">10</p>
        </div>
        <div className="stats-detail">
          <p className="stat">Correct Predictions</p>
          <p className="stat-value">4</p>
        </div>
        <div className="stats-detail">
          <p className="stat">Average correct odds</p>
          <p className="stat-value">40%</p>
        </div>
        <div className="stats-detail">
          <p className="stat">Predictors rank</p>
          <p className="stat-value">6</p>
        </div>
        <div className="stats-detail">
          <p className="stat">Points</p>
          <p className="stat-value">50</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
