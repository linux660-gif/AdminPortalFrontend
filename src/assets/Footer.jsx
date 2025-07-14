import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dashboard-footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-section">
            <h5 className="footer-heading">About Our Company</h5>
            <p className="footer-text">
              We specialize in providing quality housing investments with 
              consistent returns for our valued investors through 
              strategic property acquisition and management.
            </p>
            <div className="footer-contact">
              <p><i className="bi bi-geo-alt"></i> 123 Investment Plaza, Nairobi, Kenya</p>
              <p><i className="bi bi-telephone"></i> +254 700 123 456</p>
              <p><i className="bi bi-envelope"></i> info@housinginvestments.co.ke</p>
            </div>
          </div>

          <div className="footer-section">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/investors">Investor Portal</Link></li>
              <li><Link to="/properties">Our Properties</Link></li>
              <li><Link to="/dividends">Dividend Policy</Link></li>
              <li><Link to="/documents">Company Documents</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h5 className="footer-heading">Legal</h5>
            <ul className="footer-links">
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/disclaimer">Investment Disclaimer</Link></li>
              <li><Link to="/compliance">Regulatory Compliance</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h5 className="footer-heading">Subscribe</h5>
            <p className="footer-text">
              Get the latest investment opportunities and reports
            </p>
            <div className="footer-subscribe">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email address" 
              />
              <button className="btn btn-primary">
                Subscribe
              </button>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Email"><FaEnvelope /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {currentYear} Housing Investments Ltd. All rights reserved.
          </div>
          <div className="footer-legal">
            <span>Registration No: PVT-12345678</span>
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;