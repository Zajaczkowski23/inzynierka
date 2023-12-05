import AllMatches from "../components/AllMatches/AllMatches";
import CalendarComponent from "../components/CalendarComponent/CalendarComponent";
import FeaturedMatch from "../components/FeaturedMatch/FeaturedMatch";
import Header from "../components/Header/Header";
import Nav from "../components/Nav/Nav";

const Home = () => {
  return (
    <main className="main">
      <Header />
      <div className="main__flex">
        <div>
          <CalendarComponent />
          <Nav />
        </div>
        <AllMatches />
        <FeaturedMatch />
      </div>
    </main>
  );
};

export default Home;
