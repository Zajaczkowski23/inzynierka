import { useState } from "react";
import "./PickTeam.css";

const PickTeam = ({ homeTeam, awayTeam, nameOfUser }) => {
  const [winner, setWinner] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const predictionData = {
      homeTeam,
      awayTeam,
      predictedWinner: winner === "draw" ? "Draw" : winner,
      user: nameOfUser,
    };

    try {
      const response = await fetch(
        "http://localhost:4200/api/matchPrediction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(predictionData),
        }
      );

      if (!response.ok) {
        throw new Error("Ooops, something was wrong");
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="pickTeamContainer">
      <form onSubmit={handleSubmit} className="formContainer">
        <h2>Pick a Winner</h2>
        <div className="teamInfo">Home Team: {homeTeam}</div>
        <div className="teamInfo">Away Team: {awayTeam}</div>
        <div>
          <input
            type="radio"
            id="homeTeam"
            name="winner"
            value="home"
            onChange={() => setWinner(homeTeam)}
          />
          <label htmlFor="homeTeam">{homeTeam}</label>
        </div>
        <div>
          <input
            type="radio"
            id="awayTeam"
            name="winner"
            value="away"
            onChange={() => setWinner(homeTeam)}
          />
          <label htmlFor="awayTeam">{awayTeam}</label>
        </div>
        <div>
          <input
            type="radio"
            id="draw"
            name="winner"
            value="draw"
            onChange={() => setWinner("draw")}
          />
          <label htmlFor="draw">Draw</label>
        </div>
        <button type="btn" className="btn">
          Submit Choice
        </button>
      </form>
    </div>
  );
};

export default PickTeam;
