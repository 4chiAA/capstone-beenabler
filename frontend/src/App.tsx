import './App.css'
import HomePage from "./pages/HomePage.tsx";
import {useEffect, useState} from "react";
import {Beehive} from "./types/Beehive.ts";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import BeehiveCreatePage from "./pages/BeehiveCreatePage.tsx";
import BeehiveDetailPage from "./pages/BeehiveDetailPage.tsx";
import Header from "./components/Header.tsx";
import BeehiveUpdatePage from "./pages/BeehiveUpdatePage.tsx";

export default function App() {

  const [beehivesPreview, setBeehivesPreview] = useState<Beehive[]>([])
  const [beehive, setBeehive] = useState<Beehive | undefined | null>(undefined)

  useEffect(() => {
    getAllBeehives();
  }, []);

  function getAllBeehives() {
    axios.get("/api/beehives")
        .then(response => setBeehivesPreview(response.data))
        .catch((error: Error) => console.error(error));
  }

  const getBeehiveById = (id: string) => {
      axios.get("/api/beehives/" + id)
          .then(response => setBeehive(response.data))
          .catch((error: Error) => console.error(error));
          }


  return (
      <div>
          <Header/>
          <Routes>
              <Route path={""} element={<HomePage beehivesPreview={beehivesPreview}/>}/>
              <Route path={"/beehive/:id"} element={<BeehiveDetailPage beehive={beehive} getBeehiveById={getBeehiveById}/>}/>
              <Route path={"/create"} element={<BeehiveCreatePage/>}/>
              <Route path={"/beehive/update/:id"} element={<BeehiveUpdatePage beehive={beehive} getBeehiveById={getBeehiveById}/>}/>
          </Routes>
      </div>
  )
}
