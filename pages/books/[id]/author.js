import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Authordetails from '@/pages/components/authordetails/Authordetails';
import axios from 'axios';

export default function Index() {
  const router = useRouter();
  const [author, setAuthor] = useState(null);  // Initialize author as null to handle loading state
  const Id = router.query.id;

  useEffect(() => {
   
    if (Id) {
   
      fetch(`/api/authors/${Id}`)
        .then((res) => res.json())
        .then((data) => setAuthor(data.authors))
        .catch((error) => console.error('Error fetching author:', error));
    }
  }, [Id]);  

  return (
    <div>
      
      {author ? (
        <Authordetails name={author.name} biography={author.biography} />
      ) : (
        <p>Loading...</p>  
      )}
    </div>
  );
}
