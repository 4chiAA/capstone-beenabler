import './App.css'
import HomePage from "./pages/HomePage.tsx";
import {Route, Routes} from "react-router-dom";
import BeehiveCreatePage from "./pages/BeehiveCreatePage.tsx";
import BeehiveDetailPage from "./pages/BeehiveDetailPage.tsx";
import Header from "./components/Header.tsx";
import BeehiveUpdatePage from "./pages/BeehiveUpdatePage.tsx";
import EntryCreatePage from "./pages/EntryCreatePage.tsx";

export default function App() {

  return (
      <div>
          <Header/>
          <Routes>
              <Route path={"/"} element={<HomePage/>}/>
              <Route path={"/beehive/:beehiveId"} element={<BeehiveDetailPage/>}/>
              <Route path={"/beehive/create"} element={<BeehiveCreatePage/>}/>
              <Route path={"/beehive/update/:beehiveId"} element={<BeehiveUpdatePage/>}/>
              <Route path={"/entry/create/:beehiveId"} element={<EntryCreatePage/>}/>
          </Routes>
      </div>
  )
}
