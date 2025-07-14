import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const mockNotifications = [
      { id: 1, message: 'New user registered', time: '2 mins ago', read: false },
      { id: 2, message: 'System update available', time: '1 hour ago', read: true },
      { id: 3, message: 'Database backup completed', time: '3 hours ago', read: true },
    ];
    setNotifications(mockNotifications);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <nav className={`navbar navbar-expand-lg ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <div className="d-flex align-items-center">
            <img 
              src="/company-logo.jpg" 
              alt="Company Logo" 
              className="me-2" 
              style={{ height: '30px' }}
            />
            <span className="fw-bold">KWHC PORTAL</span>
          </div>
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname.startsWith('/users') ? 'active' : ''}`} 
                to="/users"
              >
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname.startsWith('/content') ? 'active' : ''}`} 
                to="/content"
              >
                Content
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname.startsWith('/settings') ? 'active' : ''}`} 
                to="/settings"
              >
                Settings
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <div className="search-container me-3">
              <input 
                type="text" 
                className="form-control search-input" 
                placeholder="Search..."
              />
              <button className="search-btn">
                <i className="bi bi-search"></i>
              </button>
            </div>

            <div className="dropdown me-3">
              <button 
                className="btn btn-link position-relative p-0" 
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <i className="bi bi-bell fs-5"></i>
                {unreadNotifications > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadNotifications}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="dropdown-menu dropdown-menu-end notification-dropdown show">
                  <div className="dropdown-header">
                    <h6>Notifications ({notifications.length})</h6>
                    <small><a href="#">Mark all as read</a></small>
                  </div>
                  <div className="notification-list">
                    {notifications.map(notification => (
                      <a 
                        key={notification.id} 
                        href="#" 
                        className={`dropdown-item ${!notification.read ? 'unread' : ''}`}
                      >
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            {notification.message}
                            <div className="small text-muted">{notification.time}</div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="dropdown-footer">
                    <a href="#">View all notifications</a>
                  </div>
                </div>
              )}
            </div>

            <div className="dropdown">
              <button 
                className="btn dropdown-toggle user-dropdown" 
                type="button" 
                id="userDropdown" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                <div className="d-flex align-items-center">
                  <img 
                    src= '/admin-user.jpg'
                    alt="User" 
                    className="rounded-circle me-2" 
                    width="32" 
                    height="32"
                  />
                  <span className="d-none d-md-inline">{user?.name || 'Admin'}</span>
                </div>
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><Link className="dropdown-item" to="/profile"><i className="bi bi-person me-2"></i>Profile</Link></li>
                <li><Link className="dropdown-item" to="/settings"><i className="bi bi-gear me-2"></i>Settings</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={logout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;