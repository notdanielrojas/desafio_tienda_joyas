const express = require("express");
const logger = require("./middlewares/logger.middleware");
const getJewelryRouter = require("./routes/getJewelry.routes");
require("dotenv").config();

const app = express();

app.use(logger);
app.use(express.json());

app.use("/joyas", getJewelryRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
