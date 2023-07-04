import './Combination.css';
import PickedVitamin from './components/PickedVitamin';
import SearchVitamin from './components/SearchVitamin';
import store from './store';
import { Provider } from 'react-redux'
function App() {
  return (
    <Provider store={store}>
      <div className="combination">
        <div className="grid-container">
          <div className="search-vitamin">
            <SearchVitamin />{" "}
          </div>
          <div className="vitaminlist">
            <PickedVitamin></PickedVitamin>
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
