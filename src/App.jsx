import React, { useState, useEffect } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  // Conditional rendering based on loading and error states
  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-text">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        body {
          font-family: 'Inter', sans-serif;
          background-color: #f3f4f6;
          color: #1f2937;
          margin: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        .loading-container, .error-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
        }

        .loading-text {
          font-size: 1.25rem;
          color: #4b5563;
        }

        .error-text {
          font-size: 1.25rem;
          color: #ef4444;
        }

        .app-container {
          min-height: 100vh;
        }

        .header {
          background-color: #fff;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          padding: 1rem;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        
        .header-content {
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
        }

        .header-title {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .main-content {
          max-width: 1280px;
          margin-left: auto;
          margin-right: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .profile-card {
          background-color: #fff;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .avatar-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          gap: 0.5rem;
        }
        
        .avatar-img {
          width: 6rem;
          height: 6rem;
          border-radius: 9999px;
          border: 2px solid #d1d5db;
        }

        .warning-text {
          text-align: center;
        }
        
        .warning-line {
          background-color: #fecaca;
          color: #b91c1c;
          font-weight: 600;
          font-size: 0.75rem;
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
          padding-left: 0.75rem;
          padding-right: 0.75rem;
          border-radius: 9999px;
          margin-bottom: 0.25rem;
        }
        
        .documentation-button {
          color: #4b5563;
          text-decoration: underline;
          font-size: 0.75rem;
          font-weight: 600;
          margin-top: 0.25rem;
          background: none;
          border: none;
          cursor: pointer;
          outline: none;
        }

        .profile-details {
          flex-grow: 1;
        }
        
        .profile-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        
        .profile-info {
          color: #4b5563;
          margin-bottom: 0.25rem;
        }
        
        .info-label {
          font-weight: 600;
          color: #1f2937;
        }
        
        @media (min-width: 768px) {
          .main-content {
            padding: 2rem;
          }
        
          .profile-card {
            flex-direction: row;
            align-items: center;
            gap: 2rem;
          }
        
          .avatar-img {
            width: 8rem;
            height: 8rem;
          }
          
          .profile-name {
            font-size: 1.5rem;
          }
        }
      `}</style>
      <main className="main-content">
        {users.map(user => (
          <UserProfileCard key={user.id} user={user} />
        ))}
      </main>
    </div>
  );
}

const UserProfileCard = ({ user }) => (
  <div className="profile-card">
    <div className="avatar-container">
      <img
        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.name}`}
        alt={`${user.name}'s avatar`}
        className="avatar-img"
      />
      <div className="warning-text">
        <div className="warning-line">
          You are using an
        </div>
        <div className="warning-line">
          outdated API endpoint.
        </div>
        <button className="documentation-button">
          Documentation
        </button>
      </div>
    </div>
    <div className="profile-details">
      <h2 className="profile-name">{user.name}</h2>
      <p className="profile-info">
        <span className="info-label">Email:</span> {user.email}
      </p>
      <p className="profile-info">
        <span className="info-label">Phone:</span> {user.phone}
      </p>
      <p className="profile-info">
        <span className="info-label">Company:</span> {user.company.name}
      </p>
      <p className="profile-info">
        <span className="info-label">Website:</span> {user.website}
      </p>
      <p className="profile-info">
        <span className="info-label">Address:</span> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
      </p>
    </div>
  </div>
);
