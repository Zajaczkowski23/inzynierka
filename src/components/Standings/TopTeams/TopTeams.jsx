import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/fetchDataHook";
import { BarChart } from "@mui/x-charts/BarChart";
import "./TopTeams.css";

const TopTeams = ({ id, uniq }) => {
  const api = `https://api.sofascore.com/api/v1/unique-tournament/${uniq}/season/${id}/top-teams/overall`;
  const { data } = useFetch(api);

  const [selectedOption, setSelectedOption] = useState("avgRating");

  const [chartData, setChartData] = useState({ xAxisData: [], seriesData: [] });

  useEffect(() => {
    if (data) {
      const teamsData = data.topTeams[selectedOption].slice(0, 10);
      const xAxisData = teamsData.map((team) => team.team.name);
      const seriesData = [
        { data: teamsData.map((team) => team.statistics[selectedOption]) },
      ];

      setChartData({ xAxisData, seriesData });
    }
  }, [data, selectedOption]);

  return (
    <div className="top-teams-container" style={{ marginRight: "20px" }}>
      <div style={{ margin: "10px 0", fontSize: "16px", fontWeight: "bold" }}>
        Best Teams based on picked stats
      </div>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="avgRating">Average Rating</option>
        <option value="accurateCrosses">Accurate Crosses</option>
        <option value="accurateLongBalls">Accurate Long Balls</option>
        <option value="goalsScored">Goals Scored</option>
        <option value="goalsConceded">Goals Conceded</option>
        <option value="fouls">Fouls</option>
        <option value="hitWoodwork">Hit Woodwork</option>
        <option value="penaltyGoals">Penalty Goals</option>
        <option value="shotsOnTarget">Shots On Target</option>
        <option value="tackles">Tackles</option>
      </select>
      <BarChart
        xAxis={[{ scaleType: "band", data: chartData.xAxisData }]}
        series={chartData.seriesData}
        width={700}
        height={500}
      />
    </div>
  );
};

export default TopTeams;
