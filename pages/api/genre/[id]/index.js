import { MongoClient, ObjectId } from 'mongodb';

// Replace with your connection string
const uri = 'mongodb+srv://hassanbt1040:abcd.12345@cluster0.q94sg.mongodb.net/?retryWrites=true&w=majority';

async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query; // Extract book ID from the query parameters
    const client = new MongoClient(uri);
console.log(id);
    try {
      await client.connect();
      const db = client.db('BOOKSHOP');
      const book = await db.collection('genres').findOne({ id:id});;

      if (!book) {
        return res.status(404).json({ success: false, message: 'Book not found' });
      }

      res.status(200).json({ success: true, book });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Unable to fetch book details', error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

export default handler;