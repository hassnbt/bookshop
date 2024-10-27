import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import bookData from '../../../dummy-data.json'; // Adjust the path if necessary
import Authordetails from '@/pages/components/authordetails/Authordetails';

export default function index() {
  const router=useRouter();
const [author,setauthor]=useState();
  const Id=router.query.id;
  console.log(Id);
useEffect(()=>
  {
    const author=bookData.authors.find(x=>x.id===Id);
    console.log(author);
setauthor(author);


  },router.query.id)
  return (
    <div>
    { author&&<Authordetails name={author.name} biography={author.biography}/>
}
    </div>
  )
}
