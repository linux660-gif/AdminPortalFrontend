import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiFilter, FiDownload, FiUpload, FiEye, FiEdit, FiTrash2, FiUser, FiMail, FiPhone, FiMapPin, FiDollarSign, FiFileText } from 'react-icons/fi';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const InvestorsList = () => {
  // Sample investor data
  const [investors, setInvestors] = useState([
    {
      id: 1,
      name: 'John Mwangi',
      idNo: '12345678',
      phone: '+254712345678',
      email: 'john.mwangi@example.com',
      town: 'Nairobi',
      shares: 15,
      shareValue: 4500000,
      transactions: [
        { date: '2023-01-15', shares: 5, amount: 1500000 },
        { date: '2023-03-22', shares: 10, amount: 3000000 }
      ],
      documents: [
        { type: 'ID Copy', uploaded: '2023-01-10', verified: true },
        { type: 'KRA Pin', uploaded: '2023-01-12', verified: true },
        { type: 'Bank Details', uploaded: '2023-01-12', verified: false }
      ],
      lastUpdated: '2023-06-15'
    },
    // More sample investors...
  ]);

  // State for sorting and filtering
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const filteredInvestors = investors.filter(investor => 
    Object.values(investor).some(
      value => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const sortedInvestors = [...filteredInvestors].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const viewInvestorDetails = (investor) => {
    setSelectedInvestor(investor);
    setShowModal(true);
  };

  return (
    <div className="investors-container">
      <div className="page-header">
        <h2>Investor Management</h2>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FiDownload className="icon" /> Export
          </button>
          <button className="btn btn-success">
            <FiUpload className="icon" /> Import
          </button>
          <Link to="/investors/new" className="btn btn-primary">
            <FiUser className="icon" /> Add New Investor
          </Link>
        </div>
      </div>

      <div className="search-filter-bar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search investors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-options">
          <button className="btn btn-outline-secondary">
            <FiFilter className="icon" /> Filter
          </button>
          <select className="form-select">
            <option>All Investors</option>
            <option>Active</option>
            <option>Pending Verification</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => requestSort('name')}>
                <div className="th-content">
                  Name {getSortIcon('name')}
                </div>
              </th>
              <th onClick={() => requestSort('idNo')}>
                <div className="th-content">
                  ID No {getSortIcon('idNo')}
                </div>
              </th>
              <th onClick={() => requestSort('phone')}>
                <div className="th-content">
                  Phone {getSortIcon('phone')}
                </div>
              </th>
              <th onClick={() => requestSort('email')}>
                <div className="th-content">
                  Email {getSortIcon('email')}
                </div>
              </th>
              <th onClick={() => requestSort('town')}>
                <div className="th-content">
                  Town {getSortIcon('town')}
                </div>
              </th>
              <th onClick={() => requestSort('shares')}>
                <div className="th-content">
                  Shares {getSortIcon('shares')}
                </div>
              </th>
              <th onClick={() => requestSort('shareValue')}>
                <div className="th-content">
                  Share Value {getSortIcon('shareValue')}
                </div>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedInvestors.map(investor => (
              <tr key={investor.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar">
                      {investor.name.charAt(0)}
                    </div>
                    <div>
                      <div className="fw-bold">{investor.name}</div>
                      <small className="text-muted">ID: {investor.id}</small>
                    </div>
                  </div>
                </td>
                <td>{investor.idNo}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <FiPhone className="me-2" />
                    {investor.phone}
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <FiMail className="me-2" />
                    {investor.email}
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <FiMapPin className="me-2" />
                    {investor.town}
                  </div>
                </td>
                <td>{investor.shares}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <FiDollarSign className="me-2" />
                    {investor.shareValue.toLocaleString()}
                  </div>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => viewInvestorDetails(investor)}
                  >
                    <FiEye />
                  </button>
                  <button className="btn btn-sm btn-outline-secondary me-2">
                    <FiEdit />
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <nav>
          <ul className="pagination">
            <li className="page-item disabled">
              <span className="page-link">Previous</span>
            </li>
            <li className="page-item active"><span className="page-link">1</span></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>

      {showModal && selectedInvestor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Investor Details</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="investor-profile-header">
                <div className="profile-avatar">
                  {selectedInvestor.name.charAt(0)}
                </div>
                <div className="profile-info">
                  <h4>{selectedInvestor.name}</h4>
                  <p className="text-muted">ID: {selectedInvestor.idNo}</p>
                  <div className="profile-stats">
                    <div className="stat-item">
                      <span className="stat-label">Shares</span>
                      <span className="stat-value">{selectedInvestor.shares}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Investment Value</span>
                      <span className="stat-value">KSh {selectedInvestor.shareValue.toLocaleString()}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Last Updated</span>
                      <span className="stat-value">{selectedInvestor.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                  onClick={() => setActiveTab('details')}
                >
                  Details
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('transactions')}
                >
                  Transactions
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
                  onClick={() => setActiveTab('documents')}
                >
                  Documents
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'details' && (
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Full Name</span>
                      <span className="detail-value">{selectedInvestor.name}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">ID Number</span>
                      <span className="detail-value">{selectedInvestor.idNo}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Phone Number</span>
                      <span className="detail-value">{selectedInvestor.phone}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Email Address</span>
                      <span className="detail-value">{selectedInvestor.email}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Physical Address</span>
                      <span className="detail-value">{selectedInvestor.town}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Number of Shares</span>
                      <span className="detail-value">{selectedInvestor.shares}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Share Value</span>
                      <span className="detail-value">KSh {selectedInvestor.shareValue.toLocaleString()}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Investment Date</span>
                      <span className="detail-value">2023-01-15</span>
                    </div>
                  </div>
                )}

                {activeTab === 'transactions' && (
                  <div className="transactions-list">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Transaction Type</th>
                          <th>Shares</th>
                          <th>Amount</th>
                          <th>Receipt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvestor.transactions.map((txn, index) => (
                          <tr key={index}>
                            <td>{txn.date}</td>
                            <td>Share Purchase</td>
                            <td>{txn.shares}</td>
                            <td>KSh {txn.amount.toLocaleString()}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">
                                <FiFileText /> View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'documents' && (
                  <div className="documents-list">
                    <div className="document-upload-area">
                      <div className="upload-box">
                        <p>Drag & drop files here or click to browse</p>
                        <button className="btn btn-primary">
                          <FiUpload /> Upload Document
                        </button>
                      </div>
                    </div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Document Type</th>
                          <th>Upload Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvestor.documents.map((doc, index) => (
                          <tr key={index}>
                            <td>{doc.type}</td>
                            <td>{doc.uploaded}</td>
                            <td>
                              <span className={`badge ${doc.verified ? 'bg-success' : 'bg-warning'}`}>
                                {doc.verified ? 'Verified' : 'Pending'}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary me-2">
                                <FiEye /> View
                              </button>
                              <button className="btn btn-sm btn-outline-secondary">
                                <FiDownload /> Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button className="btn btn-primary">
                Edit Investor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};




export default InvestorsList;