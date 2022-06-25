const express = require("express");
const router = express.Router();

const tblMember = require("./dbApiMember");
const tblName = tblMember.tblName;

let data = [
  { id: 1, name: "林丞祥", nhi_card_no: "000045458181", phone: "0912612010" },
  { id: 2, name: "杜彥君", nhi_card_no: "000014178651", phone: "0972414871" },
  { id: 3, name: "賴怡璇", nhi_card_no: "000031241120", phone: "0911215103" },
  { id: 4, name: "蔡文筠", nhi_card_no: "000051243364", phone: "0932641571" },
  { id: 5, name: "陳韻如", nhi_card_no: "000071471220", phone: "0933414521" },
  { id: 6, name: "張鈞安", nhi_card_no: "000084715654", phone: "0966414521" },
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
