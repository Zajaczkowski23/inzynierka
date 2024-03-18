import { useEffect, useState } from "react";
import AvatarFace from "../../assets/avatar-face.svg";
import "./Leaderboard.css";
import axios from "axios";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4200/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="leaderboard-container">
        <div className="leaderboard-title">Leaderboard</div>
        <div className="leaderboard">
          {users &&
            users.map((profile, i) => (
              <div
                className={`leaderboard-profile ${
                  i === 0
                    ? "gold"
                    : i === 1
                    ? "silver"
                    : i === 2
                    ? "bronze"
                    : ""
                }`}
                key={profile.name}
              >
                <div className="leaderboard-profile-place">{i + 1}</div>
                <div className="leaderboard-profile-img">
                  <img src={AvatarFace} alt="Avatar picture of user" />
                </div>
                <div className="leaderboard-profile-name">{profile.name}</div>
                <div className="leaderboard-profile-points">
                  {-(5 * (i - 10))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
