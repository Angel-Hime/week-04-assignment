//TODO: set up a server

//imports
import express, { response } from "express";
import cors from "cors";
import { db } from "./dbConnection.js";

//config
const app = express();

app.use(express.json());
app.use(cors());

//port
const PORT = 8080; //! Server link? Not what Manny said tho
app.listen(PORT, () => {
  console.info(`Server is running in port ${PORT}`);
});

//root route
app.get("/", (_, res) => {
  res.json({ message: "Welcome to the server, we are happy to serve'ya" });
});

//=======================================================

//TODO: a route to READ data from the db
app.get("/feedback", async function (_, res) {
  const query = await db.query(
    `SELECT firstname, secondname, comment, likes FROM feedback;`
  );
  console.log(query);
  res.json(query.rows);
});

//TODO: a route to READ data from the db
app.get("/feedback/new", async function (_, res) {
  const query = await db.query(
    `SELECT firstname, secondname, comment, likes FROM feedback;`
  );
  console.log(query);
  res.json(query.rows);
});

//TODO: a route to CREATE data in the db
app.post("/newcomment", (req, _) => {
  const newComment = req.body.formValues;
  // console.log(newComment); // so we see what we are posting in the server terminal

  const query = db.query(
    `INSERT INTO feedback (firstname, secondname, comment, likes) VALUES ($1, $2, $3, $4)`,
    [newComment.firstName, newComment.secondName, newComment.commentData, 0]
  ); //! THIS WILL GIVE US A NULL IN LIKES - PENDING SOME CODE TO SEE IF WE CAN UPDATE THAT FROM NULL
  console.log(query); // so we can see the request in server terminal

  _.json({ status: "success", value: newComment });
});
