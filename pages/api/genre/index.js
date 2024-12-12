import { MongoClient } from 'mongodb';


const uri = 'mongodb+srv://hassanbt1040:abcd.12345@cluster0.q94sg.mongodb.net/?retryWrites=true&w=majority';

async function handler(req, res) {
  if (req.method === 'GET') {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const db = client.db('BOOKSHOP');
      const books = await db.collection('genres').find({}).toArray();

      res.status(200).json({ success: true, books });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Unable to fetch books', error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

export default handler;
