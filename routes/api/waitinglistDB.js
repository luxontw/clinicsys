const express = require("express");
const router = express.Router();

const tblWaitinglist = require("./dbApiWaitinglist");
const tblMember = require("./dbApiMember");
const tblName = tblWaitinglist.tblName;

const raw_data = [
  {
    id: 1,
    member_id: 5,
  },
  {
    id: 2,
    member_id: 2,
  },
  {
    id: 3,
    member_id: 1,
  },
  {
    id: 4,
    member_id: 4,
  },
  {
    id: 5,
    member_id: 3,
  },
];

let data = [
  {
    id: 1,
    member_id: 5,
  },
  {
    id: 2,
    member_id: 2,
  },
  {
    id: 3,
    member_id: 1,
  },
  {
    id: 4,
    member_id: 4,
  },
  {
    id: 5,
    member_id: 3,
  },
];

router.get("/create", async (req, res) => {
  const rs = await tblWaitinglist.create();
  console.log(rs);
  if (rs === null) {
    res.status(400).json({ err: `資料表 ${tblName} 創建失敗...` });
  } else {
    res.json(rs);
  }
});

router.get("/drop", async (req, res) => {
  try {
    const rs = await tblWaitinglist.drop();
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
    let rs = await tblWaitinglist.drop();
    if (rs === null) {
      res.status(400).json({ err: `資料表 ${tblName} 刪除失敗...` });
      return;
    }
    rs = await tblWaitinglist.create();
    if (rs === null) {
      res.status(400).json({ err: `資料表 ${tblName} 創建失敗...` });
      return;
    }
    rs = await tblWaitinglist.insertMany(raw_data);
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

// http://localhost:8888/api/waitinglist/
router.get("/", async (req, res) => {
  const rs = await tblWaitinglist.getAll();
  console.log(rs);
  if (rs === null) {
    res.status(400).json({ err: `查無資料` });
    return;
  }
  data = rs;
  console.log(data);
  res.json(data);
});

router.get("/status/:flag", (req, res) => {
  const newData = data.filter((el, idx) => el.status === req.params.flag);
  console.log(req.params.flag);
  console.log(newData);
  res.json(newData);
});

router.post("/", async (req, res) => {
  if (!req.body.nhi_card_no) {
    res.status(400).json({ err: "請輸入健保卡號" });
    return;
  }

  if (data.findIndex((val, idx) => val.nhi_card_no === (req.body.nhi_card_no)) >= 0) {
    res.status(400).json({ err: "候診清單已有相同會員!" });
    return;
  }

  const member = await tblMember.getByNhiCard(req.body.nhi_card_no);
  console.log(member);
  if (member === null) {
    res.status(400).json({ err: `查無資料` });
    return;
  }
  console.log(member);

  const maxId = Math.max(...data.map((el) => el.id));
  const newWaitingMember = {
    id: maxId + 1,
    member_id: member[0].id,
  };

  const count = await tblWaitinglist.insertMany([newWaitingMember]);
  if (count === -1) {
    res.status(400).json({ err: "新增資料失敗" });
    return;
  }

  const fullInfoWaitingMember = {
    id: maxId + 1,
    member_id: member[0].id,
    name: member[0].name,
    nhi_card_no: member[0].nhi_card_no,
    phone: member[0].phone,
    email: member[0].email,
    status: member[0].status,
  };

  data.push(fullInfoWaitingMember);
  console.log(data);
  res.status(200).json(fullInfoWaitingMember);
});

const updateWaitinglistByWaitingId = async (id, req, res) => {
  const pos = data.findIndex((el, idx) => el.id === id);

  if (pos < 0) {
    res.status(400).json({ err: `id=${id}: 資料不存在！` });
    console.log(`id=${id}: 資料不存在！`);
    return;
  }

  data[pos].member_id = req.body.member_id;
  const count = await tblWaitinglist.updateOne(data[pos]);
  if (count === -1) {
    res.status(400).json({ err: "修改資料失敗" });
    return;
  }

  const memberDetail = await tblMember.getOne(req.body.member_id);
  console.log(memberDetail);
  if (memberDetail === null) {
    res.status(400).json({ err: `查無資料` });
    return;
  }
  console.log(memberDetail);

  data[pos].name = memberDetail[0].name;
  data[pos].nhi_card_no = memberDetail[0].nhi_card_no;
  data[pos].phone = memberDetail[0].phone;
  data[pos].email = memberDetail[0].email;
  data[pos].status = memberDetail[0].status;

  console.log(data);
  res.json(data[pos]);
};

router.put("/", (req, res) => {
  updateWaitinglistByWaitingId(req.body.id * 1, req, res);
});

router.put("/id/:id", (req, res) => {
  updateWaitinglistByWaitingId(req.params.id * 1, req, res);
});

const deleteWaitinglistByWaitingId = async (id, req, res) => {
  const pos = data.findIndex((el, idx) => el.id === id);
  if (pos < 0) {
    res.status(400).json({ err: `id=${id}: 資料不存在！` });
    console.log(`id=${id}: 資料不存在！`);
    return;
  }
  const count = await tblWaitinglist.deleteOne(data[pos]);
  if (count === -1) {
    res.status(400).json({ err: `刪除(id:${id})資料失敗` });
    return;
  }
  const theWaitinglist = { ...data[pos] };
  data.splice(pos, 1);
  res.json(theWaitinglist);
};

router.delete("/", (req, res) => {
  const id = req.body.id * 1;
  deleteWaitinglistByWaitingId(id, req, res);
});

router.delete("/id/:id", (req, res) => {
  const id = req.params.id * 1;
  deleteWaitinglistByWaitingId(id, req, res);
});

module.exports = router;
