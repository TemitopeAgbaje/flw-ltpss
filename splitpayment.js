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

export function getSplitInfo(transactionInfo) {
  let balance = transactionInfo.Amount;

  let splitBreakdown = [];

  let splitTypeArray = ["RATIO", "FLAT", "PERCENTAGE"];
  let sortSplitType = splitTypeArray.sort();

  transactionInfo.SplitInfo.map((transaction) => {
    if (transaction.SplitType == "FLAT") {
      let amountFlat = transaction.SplitValue;

      let balanceFlat = balance - amountFlat;

      balance = balanceFlat;

      splitBreakdown.push({
        SplitType: transaction.SplitType,
        SplitEntityId: transaction.SplitEntityId,
        Amount: amountFlat,
      });
    } else if (transaction.SplitType == "PERCENTAGE") {
      let amount = (transaction.SplitValue / 100) * balance;

      splitBreakdown.push({
        SplitType: transaction.SplitType,
        SplitEntityId: transaction.SplitEntityId,
        Amount: balance - amount,
      });
    } else if (transaction.SplitType == "RATIO") {
      let count = (transaction.SplitType == "RATIO").length;

      if (count > 1) {
        for (let i = 0; i < count; i++) {
          total += transaction.SplitValue[i];
          amount = (transaction.SplitValue[i] / total) * balance;
        }
      } else {
        var amount = (1 / transaction.SplitValue) * balance;
      }
      splitBreakdown.push({
        SplitType: transaction.SplitType,
        SplitEntityId: transaction.SplitEntityId,
        Amount: balance - amount,
      });
    }
  });

  return {
    ID: transactionInfo.ID,
    Balance: balance,
    SplitBreakdown: splitBreakdown,
  };
}
