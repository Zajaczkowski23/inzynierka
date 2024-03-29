import { useState } from "react";
import AllMatches from "../components/AllMatches/AllMatches";
import CalendarComponent from "../components/CalendarComponent/CalendarComponent";
import FeaturedMatch from "../components/FeaturedMatch/FeaturedMatch";
// import FeaturedMatch from "../components/FeaturedMatch/FeaturedMatch";
import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";
import BestPlayers from "../components/BestPlayers/BestPlayers";
import Sidebar from "../components/Side-bar/Sidebar";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <main className="main">
      <Header />
      <Sidebar />
      <div className="main__flex">
        <div className="calendar-container">
          <CalendarComponent onChange={setSelectedDate} />
          <Nav />
        </div>
        <AllMatches selectedDate={selectedDate} />
        <div>
          <FeaturedMatch date={selectedDate} />
          <BestPlayers />
        </div>
      </div>
    </main>
  );
};

export default Home;
