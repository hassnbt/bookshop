import Head from "next/head";
import { useRouter } from "next/router";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import bookData from '../dummy-data.json';
import Books from "./components/bookdetails/Books";
import { useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./components/themebutton/Themebutton";


// Local font setup
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home({arr,arr1}) {
  const router = useRouter();
  const y = useRef();
  const [data, setData] = useState(arr);
  const [filter, setFilter] = useState(arr1);
   
  function viewGenre(genreId) {
    console.log("Selected Genre ID:", genreId);
    router.push('/viewgenre/' + genreId);
  }

  function bookDetails(bookId) {
    console.log("Selected Book ID:", bookId);
    router.push('/books/' + bookId);
  }

  const handleGenreChange = () => {

    const selectedGenre = y.current.value;
    if(selectedGenre=='All')
      {
        console.log('all')
        const arr=[...bookData.books];
        setData(arr);
      }
      else
      {

    console.log(selectedGenre);
    const arr=[...bookData.books];
    console.log(arr);
    const arr1=arr.filter(x=>x.genreId===selectedGenre);
    console.log(arr1);
    setData(arr1);
  }

  };
  function viewauthorpage()
  {

router.push('/Author');

  }
  function viewgenrepage()
  {

router.push('/Genres');

  }
if(!filter || !data)
  return <div>Loading...</div>;
else
{  return (
    <>
      <Head>
        <title>Books List</title>
      </Head>

      <div className={styles.container}>
        <h1 className={styles.heading}>Books</h1>

        <select ref={y} onChange={handleGenreChange}>
        <option key='All'value='All'>ALL</option>
          {
         
          filter.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
     

        {data.map((book) => (
          <Books 
            key={book.id}
            bookid={book.id}
            title={book.title}
            price={book.price}
            genreId={book.genreId}
            onViewGenre={viewGenre}
            bookdetails={bookDetails}
          />
        ))}
      </div>
    </>
  );
}}

export async function  getStaticProps()
{
  const arr=[...bookData.books];

const arr1=[...bookData.genres];

console.log(arr);
console.log(arr1);





  return{
    props: {arr,arr1},
    revalidate:10

  }
}