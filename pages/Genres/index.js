import React from 'react';
import bookData from '../../dummy-data.json'; // Adjust path as necessary
import styles from './genre.module.css'; // Import a CSS module for custom styles
import { useRouter } from 'next/router';

export default function GenresPage({ genres }) {
  const router = useRouter();

  function viewBooks(genreId) {
    router.push('/Genres/' + genreId);
  }

  if (!genres) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Book Genres</h1>
      {genres.map((genre) => (
        <center key={genre.id}>
          <div className={styles.genreCard} onClick={() => viewBooks(genre.id)}>
            {genre.name}
          </div>
        </center>
      ))}
    </div>
  );
}

// Corrected `getServerSideProps` function
export async function getServerSideProps() {
  const genres = bookData.genres;

  return {
    props: { genres },
  };
}
