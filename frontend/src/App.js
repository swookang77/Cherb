import "./Combination.css";
import GraphVitamin from "./components/GraphVitamin";
import NavBar from "./components/NavBar";
import PickedVitamin from "./components/PickedVitamin";
import SearchVitamin from "./components/SearchVitamin";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
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
                    총 영양소(mg) 그래프
                    <GraphVitamin></GraphVitamin>
                  </div>
                </div>
              </div>
            }></Route>
          <Route path="/test" element={<NavBar></NavBar>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
