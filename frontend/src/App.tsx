import './App.css'
import HomePage from "./pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import BeehiveCreatePage from "./pages/BeehiveCreatePage.tsx";
import BeehiveDetailPage from "./pages/BeehiveDetailPage.tsx";
import Header from "./components/Header.tsx";
import BeehiveUpdatePage from "./pages/BeehiveUpdatePage.tsx";

export default function App() {

  return (
      <div>
          <Header/>
          <Routes>
              <Route path={"/"} element={<HomePage/>}/>
              <Route path={"/beehive/:id"} element={<BeehiveDetailPage/>}/>
              <Route path={"/create"} element={<BeehiveCreatePage/>}/>
              <Route path={"/beehive/update/:id"} element={<BeehiveUpdatePage/>}/>
          </Routes>
      </div>
  )
}
