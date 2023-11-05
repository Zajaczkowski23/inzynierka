import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, search] = useState(null);

  const url =
    "https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=soccer&Timezone=-7&";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c1fd44d168msh200f557f08e7ddfp1259f6jsn9c37a26fb935",
      "X-RapidAPI-Host": "livescore6.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => console.log(data));
  });

  return (
    <main className="main">
      <Header />
    </main>
  );
}

export default App;
