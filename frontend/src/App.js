import "./Combination.css";
import GraphVitamin from "./components/GraphVitamin";
import PickedVitamin from "./components/PickedVitamin";
import SearchVitamin from "./components/SearchVitamin";
import { store } from "./store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
