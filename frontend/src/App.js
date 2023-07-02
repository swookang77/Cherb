import './Combination.css';
import PickedVitamin from './components/PickedVitamin';
import SearchVitamin from './components/SearchVitamin';
import store from './store';
import { Provider } from 'react-redux'
function App() {
  return (
    <Provider store={store}>
      <div className="Combination">
        <div className="grid-container">
          <SearchVitamin />
          <PickedVitamin></PickedVitamin>
        </div>
      </div>
    </Provider>
  );
}

export default App;
