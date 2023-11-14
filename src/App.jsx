import "./App.css";
import AllMatches from "./components/AllMatches/AllMatches";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <main className="main">
      <Header />
      <div className="flex">
        <Nav />
        <AllMatches />
      </div>
    </main>
  );
}

export default App;
