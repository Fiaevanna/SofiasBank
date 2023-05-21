import express, { urlencoded } from "express";
import bcrypt from "bcryptjs";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";

// koplar databas server
const client = new MongoClient("mongodb://127.0.0.1:27017");
await client.connect();

//Sparar db och collection i variable för att göra koden snyggare
const db = client.db("Bank");
const usersCollection = db.collection("users");
const bankAccountsCollection = db.collection("bankAccounts");

const port = 1337;
const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function isLoggedIn(req, res, next) {
  const user = await usersCollection.findOne({ email: req.headers.email });

  if (user == null) {
    res.status(401).send("Access forbidden");
    return;
  }
  const result = bcrypt.compareSync(req.headers.password, user.password);
  if (result == true) {
    next();
  } else {
    res.status(401).send("Access forbidden");
  }
}

app.listen(port, () => {
  console.log(`Listning on ${port}`);
});

app.post("/users/register", async (req, res) => {
  if (req.body.email == undefined || req.body.password == undefined) {
    res.status(400).send();
    return;
  }
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
//skapar bankonton 
app.post("/bankaccounts", isLoggedIn, async (req, res) => {
  const user = await usersCollection.findOne({ email: req.headers.email });
  await bankAccountsCollection.insertOne({
    name: req.body.name,
    userId: user._id,
    balance: Number(req.body.balance),
    bankAccountNumber: new ObjectId(),
  });
  res.status(201).send();
});

//Hämtar alla mina bankkonton
app.get("/bankaccounts", isLoggedIn, async (req, res) => {
  const user = await usersCollection.findOne({ email: req.headers.email });
  const bankAccounts = await bankAccountsCollection
    .find({ userId: user._id })
    .toArray();
  res.status(200).json(bankAccounts);
});
//här sätter jag in pengar till specefikt bankkonto 
app.patch("/bankaccounts/:id/insert", isLoggedIn, async (req, res) => {
  const user = await usersCollection.findOne({ email: req.headers.email });
  
  await bankAccountsCollection.updateOne(
    {
      userId: user._id,
      bankAccountNumber: new ObjectId(req.params.id),
    },
    { "$inc": { "balance": Number(req.body.balance) } }
  );
  res.status(200).send();
});
//här tar jag ut pengar om tillräckligt finns 
app.patch("/bankaccounts/:id/withdraw", isLoggedIn, async (req, res) => {
  const user = await usersCollection.findOne({ email: req.headers.email });

  const bankAccount = await bankAccountsCollection.findOne({
    userId: user._id,
    bankAccountNumber: new ObjectId(req.params.id),
  });

  if (bankAccount.balance < req.body.balance) {
    res.status(400).send("Not enough money")
    return;
  }

  const withdrawAmount = -Math.abs(req.body.balance)

  await bankAccountsCollection.updateOne(
    {
      userId: user._id,
      bankAccountNumber: new ObjectId(req.params.id),
    },
    { $inc: { balance: withdrawAmount } }
  );
  res.status(200).send();
});


app.delete("/bankaccounts/:id", isLoggedIn, async (req,res) => {
  const user = await usersCollection.findOne({email: req.headers.email})
  await bankAccountsCollection.deleteOne({ userId: user._id, bankAccountNumber: new ObjectId(req.params.id) })
  res.status(200).send()
})