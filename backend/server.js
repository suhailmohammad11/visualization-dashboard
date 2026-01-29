const express = require("express");
require("dotenv").config();
const cors=require("cors")
const app = express();
require("./db/connections");

app.use(express.json());
app.use(cors())
const port = process.env.PORT || 5000;

const InsightRoutes= require("./routes/InsightRoutes")
app.use("/api", InsightRoutes)

app.listen(port, () => {
console.log("Server Connected on port", port);
});
