import express, { urlencoded } from "express"

const port = 1337; 
const app = express();

app.use(express.urlencoded());

app.listen(port, () => {
    console.log(`Listning on ${port}`)
});