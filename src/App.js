import './App.css';
import Checkout from './Components/Checkout/Checkout';
import Features from './Components/Features/Features';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Pricing from './Components/Pricing/Pricing';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewAllTransactions from './Components/ViewAllTransactions/ViewAllTransactions';

function App() {
  return (
    <Router>
    <Header logo="Designers"/>
    <div>
      <Routes>
    <Route path='/pricing' element={<><Pricing/><Features/></>}/>
    <Route path='/pricing/checkout' element={<><Checkout/></>}/>
    <Route path='/transactions' element={<><ViewAllTransactions/></>}/>
    </Routes>
    </div>
    <Footer logo="Designers" footerTitle="V-Designers" mention="vdesginers"/>
    </Router>
  );
}

export default App;
