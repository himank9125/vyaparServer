const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routers/userRouter");
const inventoryRouter = require("./routers/inventoryRouter");
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/product", inventoryRouter);

app.get("/", (req, res) => {
  res.send("Welcome to My MERN Page");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGOOSE_DB_URL)
  .then(() => {
    console.log("******DB Connected*******");
    app.listen(process.env.PORT, () => {
      console.log("<<<<<<<<<Server Stablished>>>>>>>>");
    });
  })
  .catch((err) => {
    console.log("! Something went Wrong ");
  });
