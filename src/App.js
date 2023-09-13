import './App.css';
import NftCollection from './pages/NftCollection';
import Home from './pages/Home';
import {
  Route,
  Routes
} from 'react-router-dom';

import 'aos/dist/aos.css';
import Header from './components/Header/Header';
import Account from './pages/Account';
import AddressList from './components/AddressList/AddressList';

function App() {
  return (
    <div className="App"> 
      <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/nft-collection" element={<NftCollection />} />
          <Route exact path="/account" element={<Account />} />
          <Route exact path="/opts" element={<AddressList />} />
        </Routes>        
    </div>    
  );
}

export default App;
