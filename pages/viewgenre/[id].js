import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import bookData from '../../dummy-data.json'; // Adjust the path if necessary
import styles from './Genrepage.module.css';

export default function GenrePage() {
  const router = useRouter();
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // To handle any fetch errors

  useEffect(() => {
    // Log the bookData object to verify its structure
    console.log("bookData:", bookData.genres);
console.log(router.query.id)
    // Check if router.query.id is defined and a genre exists
    if (router.query.id) {
      // Fetch genre data from the API based on the genre ID
      fetch(`http://localhost:3000/api/genre/${router.query.id}`)
        .then(res => res.json())
        .then(data => {
          // Assuming your API returns the genre data in `data.genre`
          if (data && data.book) {
            setGenre(data.book); // Set the genre to state
          } else {
            setError('Genre not found.');
          }
        })
        .catch(err => {
          console.error('Error fetching genre:', err);
          setError('Failed to fetch genre data.');
        })
        .finally(() => setLoading(false)); // Stop loading once done
    } else {
      setError('No genre ID provided.');
      setLoading(false);
    }
  }, [router.query.id]);

  // Log the router query to see the current ID
  console.log("Router query:", router.query);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while waiting for data
  }

  return (
    <center>
      <div className={styles.heading}>
        <h1>{error || (genre ? genre.name : "Genre not found")}</h1>
      </div>
    </center>
  );
}
