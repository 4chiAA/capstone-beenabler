import './App.css'
import HomePage from "./pages/HomePage.tsx";
import {useEffect, useState} from "react";
import {Beehive} from "./types/Beehive.ts";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import BeehiveCreatePage from "./pages/BeehiveCreatePage.tsx";
import BeehiveDetailPage from "./pages/BeehiveDetailPage.tsx";
import Header from "./components/Header.tsx";

export default function App() {

  const [beehivesPreview, setBeehivesPreview] = useState<Beehive[]>([])
  const [beehive, setBeehive] = useState<Beehive | undefined | null>(undefined)

  useEffect(() => {
    fetchAllBeehives();
  }, []);

  function fetchAllBeehives() {
    axios.get("/api/beehives")
        .then(response => setBeehivesPreview(response.data))
        .catch((error: Error) => console.error(error));
  }

  const fetchBeehiveById = (id: string) => {
      axios.get("/api/beehives/" + id)
          .then(response => setBeehive(response.data))
          .catch((error: Error) => console.error(error));
          }


  return (
      <div>
          <Header/>
          <Routes>
              <Route path={""} element={<HomePage beehivesPreview={beehivesPreview}/>}/>
              <Route path={"/beehive/:id"} element={<BeehiveDetailPage beehive={beehive} fetchBeehiveById={fetchBeehiveById}/>}/>
              <Route path={"/create"} element={<BeehiveCreatePage/>}/>
          </Routes>
      </div>
  )
}
