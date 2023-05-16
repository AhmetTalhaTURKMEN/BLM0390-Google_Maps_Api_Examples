import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "./components/mainPage";
import StreetView from "./components/streetView";
import ResizableRectangle from "./components/resizableRectangle";
import DrawPolygon from "./components/drawPolygon";
import Countries from './components/countries';
import NameMap from "./components/nameMap";
import MapTypes from "./components/mapTypes";


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage></MainPage>}></Route>
          <Route path="/resizablerectangle" element={<ResizableRectangle></ResizableRectangle>}></Route>
          <Route exact path="/streetview" element={<StreetView></StreetView>}></Route>
          <Route exact path="/drawpolygon" element={<DrawPolygon></DrawPolygon>}></Route>
          <Route exact path="/countries" element={<Countries></Countries>}></Route>
          <Route exact path="/namemap" element={<NameMap></NameMap>}></Route>
          <Route exact path="/maptypes" element={<MapTypes></MapTypes>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
