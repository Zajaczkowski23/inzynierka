import "./App.css";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import useFetch from "./hooks/fetchDataHook";

function App() {
  const api = "http://localhost:3000/events";
  const { data, loading, error } = useFetch(api);

  console.log(data);

  return (
    <main className="main">
      <Header />
      <Nav />
    </main>
  );
}

export default App;
