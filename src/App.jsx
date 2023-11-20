import "./App.css";
import AllMatches from "./components/AllMatches/AllMatches";
import FeaturedMatch from "./components/FeaturedMatch/FeaturedMatch";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <main className="main">
      <Header />
      <div className="main__flex">
        <Nav />
        <AllMatches />
        <FeaturedMatch />
      </div>
    </main>
  );
}

export default App;
