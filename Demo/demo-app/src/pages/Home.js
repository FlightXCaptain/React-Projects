import React, { useState } from 'react';

function Home() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiCall = (endpoint) => {
    setLoading(true);
    setError(null);
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        setApiData(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  };

  const renderTable = (data) => {
    if (!data || !data.data) return null;

    const items = Array.isArray(data.data) ? data.data : [data.data];
    const keys = Object.keys(items[0] || {});

    return (
      <table className="api-table">
        <thead>
          <tr>
            {keys.map(key => (
              <th key={key}>{key.replace(/_/g, ' ').toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              {keys.map(key => (
                <td key={key}>
                  {key === 'avatar' ? <img src={item[key]} alt="avatar" className="avatar" /> : item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the Home page.</p>
      <div className="button-section">
        <button onClick={() => handleApiCall('https://reqres.in/api/users?page=1')}>Get Users</button>
        <button onClick={() => handleApiCall('https://reqres.in/api/users/2')}>Get User 2</button>
        <button onClick={() => handleApiCall('https://reqres.in/api/unknown/2')}>Get Resource 2</button>
      </div>
      <div className="api-data">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {apiData && renderTable(apiData)}
      </div>
    </div>
  );
}

export default Home;
