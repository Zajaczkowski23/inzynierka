import "./App.css";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import useFetch from "./hooks/fetchDataHook";

function App() {
  const options = {
    method: "GET",
    url: "https://livescore6.p.rapidapi.com/matches/v2/list-live",
    params: {
      Category: "soccer",
      Timezone: "-7",
    },
    headers: {
      "X-RapidAPI-Key": "c1fd44d168msh200f557f08e7ddfp1259f6jsn9c37a26fb935",
      "X-RapidAPI-Host": "livescore6.p.rapidapi.com",
    },
  };

  // const { data, loading, error } = useFetch(options);

  return (
    <main className="main">
      <Header />
      <Nav />
    </main>
  );
}

export default App;
