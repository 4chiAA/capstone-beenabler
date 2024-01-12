import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import {useEffect, useState} from "react";
import {Beehive} from "./types/Beehive.ts";
import axios from "axios";

export default function App() {

  const [beehives, setBeehives] = useState<Beehive[]>([])

  useEffect(() => {
    fetchBeehives()
  }, []);

  function fetchBeehives() {
    axios.get("/api/beehives")
        .then(response => setBeehives(response.data))
        .catch((error: Error) => console.error(error));
  }

  return (
    <>
      <Routes>
        <Route path={"/home"} element={<Home beehivesPreview={beehives}/>}/>
      </Routes>
    </>
  )
}

