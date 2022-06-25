const express = require("express");
const router = express.Router();

const tblMember = require("./dbApiMember");
const tblName = tblMember.tblName;

let data = [
  {
    id: 1,
    name: "林丞祥",
    nhi_card_no: "000045458181",
    phone: "0912612010",
    email: "lin@newxe.tw",
    status: "0",
  },
  {
    id: 2,
    name: "杜彥君",
    nhi_card_no: "000014178651",
    phone: "0972414871",
    email: "tu@newxe.tw",
    status: "1",
  },
  {
    id: 3,
    name: "賴怡璇",
    nhi_card_no: "000031241120",
    phone: "0911215103",
    email: "lai@newxe.tw",
    status: "2",
  },
  {
    id: 4,
    name: "蔡文筠",
    nhi_card_no: "000051243364",
    phone: "0932641571",
    email: "tsai@newxe.tw",
    status: "0",
  },
  {
    id: 5,
    name: "陳韻如",
    nhi_card_no: "000071471220",
    phone: "0933414521",
    email: "chen@newxe.tw",
    status: "1",
  },
  {
    id: 6,
    name: "張鈞安",
    nhi_card_no: "000084715654",
    phone: "0966414521",
    email: "chang@newxe.tw",
    status: "1",
  },
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
});

router.get("/reset", async (req, res) => {
  try {
    let rs = await tblMember.drop();
    if (rs === null) {
      res.status(400).json({ err: `資料表 ${tblName} 刪除失敗...` });
      return;
    }
    rs = await tblMember.create();
    if (rs === null) {
      res.status(400).json({ err: `資料表 ${tblName} 創建失敗...` });
      return;
    }
    rs = await tblMember.insertMany(data);
    console.log(rs);
    console.log({
      message: `TABLE ${tblName} 創建成功...`,
      inserted: rs,
    });
  } catch (err) {
    console.log(`/new error: ${err}`);
    res.status(400).json({ err: `/new error ...` });
  }
});

router.get("/", async (req, res) => {
  const rs = await tblMember.getAll();
  console.log(rs);
  if (rs === null) {
    res.status(400).json({ err: `查無資料` });
    return;
  }
  data = rs;
  console.log(data);
  res.json(data);
});

//http://localhost:8888/api/members/status/active
router.get("/status/:flag", (req, res) => {
  const newData = data.filter((el, idx) => el.status === req.params.flag);
  console.log(req.params.flag);
  console.log(newData);
  res.json(newData);
});

router.post("/", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.nhi_card_no ||
    !req.body.phone ||
    !req.body.email ||
    !req.body.status
  ) {
    res.status(400).json({ err: "請檢查輸入資料" });
    return;
  }

  if (
    data.findIndex((val, idx) => val.nhi_card_no === req.body.nhi_card_no) >= 0
  ) {
    res.status(400).json({ err: "健保卡號重複!" });
    return;
  }

  const maxId = Math.max(...data.map((el) => el.id));
  const newMember = {
    id: maxId + 1,
    name: req.body.name,
    nhi_card_no: req.body.nhi_card_no,
    phone: req.body.phone,
    email: req.body.email,
    status: req.body.status,
  };

  const count = await tblMember.insertMany([newMember]);
  if (count === -1) {
    res.status(400).json({ err: "新增資料失敗" });
    return;
  }
  data.push(newMember);
  console.log(data);
  res.status(200).json(newMember);
});

const updateMemberById = async (id, req, res) => {
  const pos = data.findIndex((el, idx) => el.id === id);

  if (pos < 0) {
    res.status(400).json({ err: `id=${id}: 資料不存在！` });
    console.log(`id=${id}: 資料不存在！`);
    return;
  }
  
  if (req.body.name) {
    data[pos].name = req.body.name;
  }
  // 健保卡號不能修改
  if (req.body.phone) {
    data[pos].phone = req.body.phone;
  }
  if (req.body.email) {
    data[pos].email = req.body.email;
  }
  if (req.body.status) {
    data[pos].status = req.body.status;
  }
  const count = await tblMember.updateOne(data[pos]);
  if (count === -1) {
    res.status(400).json({ err: "修改資料失敗" });
    return;
  }

  console.log(data);
  res.json(data[pos]);
};

router.put("/", (req, res) => {
  updateMemberById(req.body.id * 1, req, res);
});

router.put("/id/:id", (req, res) => {
  updateMemberById(req.params.id * 1, req, res);
})

const deleteMemberById = async (id, req, res) => {
  const pos = data.findIndex((el, idx) => el.id === id);
  if (pos < 0) {
    res.status(400).json({ err: `id=${id}: 資料不存在！` });
    console.log(`id=${id}: 資料不存在！`);
    return;
  }
  const count = await tblMember.deleteOne(data[pos]);
  if (count === -1) {
    res.status(400).json({ err: `刪除(id:${id})資料失敗` });
    return;
  }
  const theMeber = {...data[pos]};
  data.splice(pos, 1);
  res.json(theMeber);
};

router.delete("/", (req, res) => {
  const id = req.body.id * 1;
  deleteMemberById(id, req, res);
});

router.delete("/id/:id", (req, res) => {
  const id = req.params.id * 1;
  deleteMemberById(id, req, res);
});

module.exports = router;
