// pages/info/[...slug].js
import { useRouter } from 'next/router';

const InfoPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  
  const renderContent = () => {
    if (!slug || slug.length === 0) {
      return <h1>Welcome to the Information Page</h1>;
    }

    switch (slug[0]) {
      case 'faqs':
        return <h2>Frequently Asked Questions</h2>;
      case 'support':
        return <h2>Support Information</h2>;
      default:
        return router.push('/404');
    }
  };

  return (
    <div>
      {renderContent()}
      
    </div>
  );
};

export default InfoPage;
