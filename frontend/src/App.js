import "./Combination.css";
import GraphVitamin from "./components/GraphVitamin";
import NavBar from "./components/NavBar";
import PickedVitamin from "./components/PickedVitamin";
import SearchVitamin from "./components/SearchVitamin";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MyGraph from "./components/MyGraph";
import MyCombination from "./components/MyCombination";
import MyVitamin from "./components/MyVitamin";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="navBar">
                  <NavBar></NavBar>
                </div>
                <div className="container">
                  <div className="search-vitamin">
                    <SearchVitamin></SearchVitamin>
                  </div>
                  <div className="picked-vitamin">
                    <PickedVitamin></PickedVitamin>
                  </div>
                  <div className="graph-vitamin">
                    총 영양성분(mg) 그래프
                    <GraphVitamin></GraphVitamin>
                  </div>
                </div>
              </div>
            }></Route>
          <Route
            path="/combination"
            element={
              <div>
                <div className="navBar">
                  <NavBar></NavBar>
                </div>
                <div className="container-mypage">
                  <div className="picked-vitamin">
                    <MyCombination></MyCombination>
                  </div>
                  <div className="search-vitamin">
                    <MyVitamin></MyVitamin>
                  </div>
                  <div className="graph-vitamin">
                    총 영양성분(mg) 그래프
                    <MyGraph></MyGraph>
                  </div>
                </div>
              </div>
            }></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
