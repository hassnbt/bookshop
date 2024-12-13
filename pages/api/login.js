import { MongoClient } from 'mongodb';


const uri = 'mongodb+srv://hassanbt1040:abcd.12345@cluster0.q94sg.mongodb.net/?retryWrites=true&w=majority';

async function handler(req, res) {
    const{email,password}=req.body;
  if (req.method==="POST") {
    const client = new MongoClient(uri);
    try {

      
        console.log(email,password);
      await client.connect();
      const db = client.db('BOOKSHOP');
      const books = await db.collection('users').findOne({email:email,password:password});
console.log(books);
      res.status(200).json({ success: true, books });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Unable to find user', error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

export default handler;
