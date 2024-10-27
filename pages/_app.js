import "@/styles/globals.css";
import { ThemeProvider } from "./components/ThemeContext/ThemeContext";
import ThemeToggle from "./components/themebutton/Themebutton";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
const router=useRouter();
  
  function viewauthorpage()
  {

router.push('/Author');

  }
  function view()
  {

router.push('/');

  }
  function viewgenrepage()
  {

router.push('/Genres');

  }
  function Search()
  {

router.push('/Search');

  }

  

   useEffect(() => {
    
    const handleRouteChange = (url) => {
      
      const history = JSON.parse(localStorage.getItem('routeHistory')) || [];
      history.push(url);
      localStorage.setItem('routeHistory', JSON.stringify(history));
      console.log('Route changed to:', url);
    };

    
    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange(window.location.pathname);
   
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
    
  
  return   <ThemeProvider>
    <ThemeToggle/>
    <button className={styles.butto} onClick={()=>viewauthorpage()}>View Authors</button>
    <button className={styles.butto} onClick={()=>viewgenrepage()}>View Genres</button>
    <button className={styles.butto} onClick={()=>view()}>View Home</button>
    <button className={styles.butto} onClick={()=>Search()}>View Search</button>


  <Component {...pageProps} />
</ThemeProvider>;
}
