import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import bookData from '../../dummy-data.json'; // Adjust the path if necessary
import styles from './Genrepage.module.css'
export default function GenrePage() {
  const router = useRouter();
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    // Log the bookData object to verify its structure
    console.log("bookData:", bookData.genres);
const genre=bookData.genres;
    // Check if genre data is available and router.query.id is defined
    if (genre && router.query.id) {
      const foundGenre = genre.find((x) => x.id == router.query.id);
      console.log(foundGenre)
      setGenre(foundGenre);
  

    } else {
      console.error("Genre data is not available or ID is missing.");
    }
  }, [router.query.id]);

  console.log("Router query:", router.query);

  return (
    <center>
    <div className={styles.heading}>
      <h1>{genre ? genre.name : "Genre not found"}</h1>
    </div>
    </center>
  );
}
