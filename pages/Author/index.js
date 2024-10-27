import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import bookData from '../../dummy-data.json'; // Adjust path as necessary
import Authordetails from '../components/authordetails/Authordetails';

// SWR fetcher function to retrieve all authors
const fetchAuthors = () => {
  return bookData.authors || [];
};

export default function AuthorPage() {
  const [authors, setAuthors] = useState([]);
  
  // Use SWR for client-side fetching of all authors
  const { data, error } = useSWR('authors', fetchAuthors);

  // Set authors to state once data is available
  useEffect(() => {
    if (data) setAuthors(data);
  }, [data]);

  if (error) return <div>Failed to load author information.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
        <center> <h1>Authors Information</h1></center>
     
      {authors.map((author) => (
        
         <Authordetails name={author.name} biography={author.biography}/>
      
      ))}
    </div>
  );
}
