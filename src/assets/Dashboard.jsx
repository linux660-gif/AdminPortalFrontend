import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Dashboard.css';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const investors = [
    { id: 1, name: 'John Mwangi', shares: 15, investment: 4500000, lastDividend: 675000, nextPayment: '2023-12-15' },
    { id: 2, name: 'Sarah Kamau', shares: 8, investment: 2400000, lastDividend: 360000, nextPayment: '2023-12-15' },
    { id: 3, name: 'David Ochieng', shares: 20, investment: 6000000, lastDividend: 900000, nextPayment: '2023-12-15' },
    { id: 4, name: 'Grace Wambui', shares: 12, investment: 3600000, lastDividend: 540000, nextPayment: '2023-12-15' }
  ];


  const properties = [
    { id: 1, name: 'Greenview Apartments', location: 'Nairobi', units: 24, occupancy: '92%', annualYield: '18%' },
    { id: 2, name: 'Lakeview Villas', location: 'Naivasha', units: 8, occupancy: '100%', annualYield: '22%' },
    { id: 3, name: 'Hilltop Residences', location: 'Limuru', units: 12, occupancy: '83%', annualYield: '15%' }
  ];


  const documents = [
    { id: 1, name: '2023 Financial Report', type: 'Financial', date: '2023-10-15' },
    { id: 2, name: 'Company By-Laws', type: 'Legal', date: '2022-03-10' },
    { id: 3, name: 'Investment Agreement Template', type: 'Contract', date: '2023-05-22' },
    { id: 4, name: 'AGM Minutes - 2023', type: 'Meeting', date: '2023-06-30' }
  ];


  const financialOverview = {
    totalInvestment: 16500000,
    annualDividends: 2475000,
    propertiesValue: 22000000,
    occupancyRate: '91%'
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      
      <div className="dashboard-content">
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <button 
              className="sidebar-toggle" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className={`bi bi-chevron-${sidebarOpen ? 'left' : 'right'}`}></i>
            </button>
            {sidebarOpen && <h3>Investment Portal</h3>}
          </div>
          
          <nav className="sidebar-nav">
            <Link 
              to="/" 
              className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="bi bi-speedometer2"></i>
              {sidebarOpen && <span>Overview</span>}
            </Link>
            
            <Link 
              to="/investors" 
              className={`sidebar-item ${activeTab === 'investors' ? 'active' : ''}`}
              onClick={() => setActiveTab('investors')}
            >
              <i className="bi bi-people"></i>
              {sidebarOpen && <span>Investors</span>}
            </Link>
            
            <Link 
              to="/properties" 
              className={`sidebar-item ${activeTab === 'properties' ? 'active' : ''}`}
              onClick={() => setActiveTab('properties')}
            >
              <i className="bi bi-house"></i>
              {sidebarOpen && <span>Properties</span>}
            </Link>
            
            <Link 
              to="/dividends" 
              className={`sidebar-item ${activeTab === 'dividends' ? 'active' : ''}`}
              onClick={() => setActiveTab('dividends')}
            >
              <i className="bi bi-cash-stack"></i>
              {sidebarOpen && <span>Dividends</span>}
            </Link>
            
            <Link 
              to="/documents" 
              className={`sidebar-item ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <i className="bi bi-folder"></i>
              {sidebarOpen && <span>Documents</span>}
            </Link>
            
            <Link 
              to="/reports" 
              className={`sidebar-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <i className="bi bi-graph-up"></i>
              {sidebarOpen && <span>Reports</span>}
            </Link>
          </nav>
        </aside>

        <main className="main-content">
          <header className="dashboard-header">
            <h1>Investment Overview</h1>
            <div className="header-actions">
              <button className="btn btn-primary">
                <i className="bi bi-plus"></i> Add Investor
              </button>
              <button className="btn btn-outline-secondary">
                <i className="bi bi-download"></i> Generate Report
              </button>
            </div>
          </header>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-info">
                <h3>KSh {financialOverview.totalInvestment.toLocaleString()}</h3>
                <p>Total Investment</p>
              </div>
              <div className="stat-icon">
                <i className="bi bi-currency-exchange"></i>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-info">
                <h3>KSh {financialOverview.annualDividends.toLocaleString()}</h3>
                <p>Annual Dividends</p>
              </div>
              <div className="stat-icon">
                <i className="bi bi-cash-coin"></i>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-info">
                <h3>KSh {financialOverview.propertiesValue.toLocaleString()}</h3>
                <p>Properties Value</p>
              </div>
              <div className="stat-icon">
                <i className="bi bi-building"></i>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-info">
                <h3>{financialOverview.occupancyRate}</h3>
                <p>Occupancy Rate</p>
              </div>
              <div className="stat-icon">
                <i className="bi bi-house-check"></i>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">
              <h4>Recent Investors</h4>
              <Link to="/investors">View All</Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Shares</th>
                      <th>Investment</th>
                      <th>Last Dividend</th>
                      <th>Next Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investors.map(investor => (
                      <tr key={investor.id}>
                        <td>{investor.name}</td>
                        <td>{investor.shares}</td>
                        <td>KSh {investor.investment.toLocaleString()}</td>
                        <td>KSh {investor.lastDividend.toLocaleString()}</td>
                        <td>{investor.nextPayment}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-eye"></i> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header">
                  <h4>Property Portfolio</h4>
                  <Link to="/properties">View All</Link>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Property Name</th>
                          <th>Location</th>
                          <th>Units</th>
                          <th>Occupancy</th>
                          <th>Annual Yield</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map(property => (
                          <tr key={property.id}>
                            <td>{property.name}</td>
                            <td>{property.location}</td>
                            <td>{property.units}</td>
                            <td>
                              <div className="progress" style={{ height: '20px' }}>
                                <div 
                                  className="progress-bar" 
                                  role="progressbar" 
                                  style={{ width: property.occupancy }}
                                  aria-valuenow={parseInt(property.occupancy)} 
                                  aria-valuemin="0" 
                                  aria-valuemax="100"
                                >
                                  {property.occupancy}
                                </div>
                              </div>
                            </td>
                            <td>{property.annualYield}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h4>Company Documents</h4>
                  <Link to="/documents">View All</Link>
                </div>
                <div className="card-body">
                  <div className="document-list">
                    {documents.map(document => (
                      <div className="document-item" key={document.id}>
                        <div className="document-icon">
                          <i className="bi bi-file-earmark-text"></i>
                        </div>
                        <div className="document-details">
                          <h6>{document.name}</h6>
                          <div className="document-meta">
                            <span className="badge bg-secondary">{document.type}</span>
                            <span className="text-muted">{document.date}</span>
                          </div>
                        </div>
                        <div className="document-actions">
                          <button className="btn btn-sm btn-outline-secondary">
                            <i className="bi bi-download"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h4>Upcoming Dividend Payments</h4>
              <Link to="/dividends">View All</Link>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <i className="bi bi-info-circle"></i> Next dividend payment scheduled for <strong>December 15, 2023</strong>. 
                Total payout: <strong>KSh 2,475,000</strong> to be distributed to <strong>4 investors</strong>.
              </div>
              <div className="dividend-calendar">
                <div className="calendar-header">
                  <span>December 2023</span>
                  <div className="calendar-nav">
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-chevron-left"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </div>
                <div className="calendar-body">
                  <div className="calendar-day">
                    <div className="day-header">15</div>
                    <div className="day-events">
                      <div className="event dividend-event">
                        <i className="bi bi-cash-coin"></i>
                        <span>Dividend Payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}