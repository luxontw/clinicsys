const express = require("express");
const router = express.Router();

const tblMember = require("./dbApiMember");
const tblName = tblMember.tblName;

let data = [
    { id: 1, name: "John", email: "john@example.com", status: "active" },
    { id: 2, name: "Bob", email: "bob@example.com", status: "in-active" },
    { id: 3, name: "Peter", email: "peter@example.com", status: "active" },
    { id: 4, name: "Mary", email: "mary@example.com", status: "active" },
    { id: 5, name: "Helen", email: "helen@example.com", status: "active" },
  ];

router.get("/create", async (req, res) => {
  const rs = await tblMember.create();
  console.log(rs);
  if (rs === null) {
    res.status(400).json({ err: `資料表 ${tblName} 創建失敗...` });
  } else {
    res.json(rs);
  }
});

router.get("/drop", async (req, res) => {
  try {
    const rs = await tblMember.drop();
    if (rs === null) {
      console.log(`資料表 ${tblName} 刪除失敗...`);
      res.status(400).json({ err: `資料表 ${tblName} 刪除失敗...` });
      return;
    }
    console.log(rs);
    res.json(rs);
  } catch (err) {
    return;
  }
})

module.exports = router;
