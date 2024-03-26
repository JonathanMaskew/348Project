import express from 'express';

// This will help us connect to the database
import db from '../db/connection.js';

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from 'mongodb';

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /rating.
const router = express.Router();

// This section will help you get a list of all the ratings.
router.get('/', async (req, res) => {
  let collection = await db.collection('ratings');
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single rating by id
router.get('/:id', async (req, res) => {
  let collection = await db.collection('ratings');
  const query = { itemId: req.params.id };
  let result = await collection.find(query).toArray();

  if (!result) res.send('Not found').status(404);
  else res.send(result).status(200);
});

// This section will help you create a new rating.
router.post('/:id', async (req, res) => {
  try {
    let newDocument = {
      rating: req.body.rating,
      review: req.body.review,
      itemId: req.params.id,
    };
    let collection = await db.collection('ratings');
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding rating');
  }
});

// // This section will help you delete a rating
router.delete('/:id', async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection('ratings');
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting rating');
  }
});

export default router;
