import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to the Image Editor</h1>
      <Link to="/editor">
        <button>Start Editing</button>
      </Link>
    </div>
  );
}

export default LandingPage;
