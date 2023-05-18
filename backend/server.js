import express, { urlencoded } from "express";
import bcrypt from "bcryptjs";
import { MongoClient, ObjectId } from "mongodb";

// koplar databas server
const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();

//Sparar db och collection i variable för att göra koden snyggare
const db = client.db("Bank");
const usersCollection = db.collection("users");

const port = 1337;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Listning on ${port}`);
});

app.post("/users/register", async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password);
  await usersCollection.insertOne({ email: req.body.email, password: hash });
  res.status(201).send();
});

app.post("/users/login", async (req, res) => {
  const user = await usersCollection.findOne({ email: req.body.email });

  if (user === null) {
    res.status(400).send();
    return;
  }

  const result = bcrypt.compareSync(req.body.password, user.password);
  if (result === true) {
    res.status(200).send();
  } else {
    res.status(400).send();
  }
});
