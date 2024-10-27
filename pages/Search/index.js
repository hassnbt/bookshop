// pages/history.js
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    // Retrieve history from local storage when the component mounts
    const storedHistory = JSON.parse(localStorage.getItem('routeHistory')) || [];
    setHistory(storedHistory);
  },[]);
if(history){
  return (
    <div>
      <h1>Your Browsing History</h1>
      {history.length > 0 ? (
        <ul>
          {history.map((url, index) => (
            <li key={index}>
              <Link href={url}>{url}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No browsing history available.</p>
      )}
    </div>
  );
}};

export default HistoryPage;
