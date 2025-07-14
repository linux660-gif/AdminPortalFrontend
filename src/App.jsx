import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './assets/Dashboard';
import InvestorsList from './assets/Investors';
import Navbar from './assets/Navbar';
import AdminFooter from './assets/Footer';
import NoPage from './assets/Nopage';
import NewInvestorSignUp from './assets/NewInvestorSignUp';

function App() {
  return (

    <Routes>
      <Route path = '/' element = {<Dashboard />} />
      <Route path = '/investors' element = { <InvestorsList/> }/>
      <Route path = "investors/new" element = { <NewInvestorSignUp />} />
      <Route path = '*' element = { <NoPage/> } />
      
      </Routes>
    /*}
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/investors" element={<InvestorsList />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </main>
        <AdminFooter />
      </div>
    </BrowserRouter>
    */
  );
}

export default App;