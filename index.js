let transaction = {
  ID: 1308,
  Amount: 12580,
  Currency: "NGN",
  CustomerEmail: "anon8@customers.io",
  SplitInfo: [
    {
      SplitType: "FLAT",
      SplitValue: 45,
      SplitEntityId: "LNPYACC0019",
    },
    {
      SplitType: "RATIO",
      SplitValue: 3,
      SplitEntityId: "LNPYACC0011",
    },
    {
      SplitType: "PERCENTAGE",
      SplitValue: 3,
      SplitEntityId: "LNPYACC0015",
    },
  ],
};

import express from "express";
const app = express();
// import { getSplitInfo } from "./splitpayment";
import { getSplitInfo } from "./splitpayment.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World, from express");
});

app.post("/split-payments/compute", (req, res) => {
  let payload = req.body;
  const answer = getSplitInfo(payload);
  res.json(answer);
});

app.listen(process.env.port || 3000);

console.log("Web Server is listening at port " + (process.env.port || 3000));
