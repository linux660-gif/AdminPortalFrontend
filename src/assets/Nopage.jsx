import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div className="no-page-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NoPage;