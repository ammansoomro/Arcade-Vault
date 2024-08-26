import express from "express";
import cors from "cors";

// App Config
const app = express();
const port = 4007;

// Middles Wares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
