import React, { useEffect, useState } from 'react'
import bookData from '../../../dummy-data.json'; // Adjust path as necessary
import { useRouter } from 'next/router';
import Books from '@/pages/components/bookdetails/Books';

export default function index() {
    const router=useRouter();

    const id=router.query.id;
    const [data, setData] = useState();

    useEffect(()=>
        {
const arr=[...bookData.books];
console.log(id);
const arr1=arr.filter((x)=>x.genreId===id);
console.log(arr1);

setData(arr1);



        },[router.query.id])


        function viewGenre(genreId) {
            console.log("Selected Genre ID:", genreId);
            router.push('/viewgenre/' + genreId);
          }
        function bookDetails(bookId) {
            console.log("Selected Book ID:", bookId);
            router.push('/books/' + bookId);
          }
  if(data){      
  return (
    <div>
        <center>
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
</center>
    </div>
  )
}

else
return <div>Loading....</div>

}

