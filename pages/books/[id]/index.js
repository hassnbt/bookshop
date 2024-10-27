import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import bookData from '../../../dummy-data.json'; // Adjust the path if necessary
import BookDetails from '../../components/bookdet/Details';

export default function GenrePage({ book, author }) {
    
const router=useRouter();
 // console.log("Router query:", router.query)
  // If book is not found, render a fallback message
  if (!book || !author) {
    return <h1>Book or Author data not found</h1>;
  }

  // Client-side effect for additional processing or logging
 function authordetails(bookid)
 {

router.push('/books/'+bookid+'/author');


 }

  return (
    <center>
      <div>
        <BookDetails 
          title={book.title} 
          description={book.description} 
          author={author.name} 
          price={book.price} 
          rating={book.rating} 
          authordetails={authordetails}
          authorid={book.authorId}

        />
      </div>
    </center>
  );
}

// Fetch data for each book and author
export async function getStaticProps({ params }) {
  const book = bookData.books.find((b) => b.id === params.id);
  const author = book ? bookData.authors.find((a) => a.id === book.authorId) : null;

  if (!book || !author) {
    return { notFound: true };
  }

  return {
    props: { book, author }
  };
}

// Define all possible book paths using getStaticPaths
export async function getStaticPaths() {
  const paths = bookData.books.slice(0, 3).map((book) => ({
    params: { id: book.id.toString() },
  }));

  return {
    paths,
    fallback: true, // or 'blocking' if you want to handle additional paths dynamically
  };
}

