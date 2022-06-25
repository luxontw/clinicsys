const express = require("express");
const router = express.Router();

let data = [
  { id: 1, name: "林丞祥", nhi_card_no: "000045458181", phone: "0912612010" },
  { id: 2, name: "杜彥君", nhi_card_no: "000014178651", phone: "0972414871" },
  { id: 3, name: "賴怡璇", nhi_card_no: "000031241120", phone: "0911215103" },
  { id: 4, name: "蔡文筠", nhi_card_no: "000051243364", phone: "0932641571" },
  { id: 5, name: "陳韻如", nhi_card_no: "000071471220", phone: "0933414521" },
  { id: 6, name: "張鈞安", nhi_card_no: "000084715654", phone: "0966414521" },
];

router.get("/", (req, res) => {
  console.log(data);
  res.json(data);
});

//http://localhost:8888/api/members/status/active
router.get("/status/:flag", (req, res) => {
  const newData = data.filter((val, idx) => {
    return val.status === req.params.flag;
  });
  console.log(req.params.flag);
  console.log(newData);
  res.json(newData);
});

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.email) {
    res.status(400).json({ err: "請輸入name、email" });
    return;
  }

  if (data.findIndex((val, idx) => val.name === req.body.name) >= 0) {
    res.status(400).json({ err: "姓名重複!" });
    return;
  }
  if (data.findIndex((val, idx) => val.email === req.body.email) >= 0) {
    res.status(400).json({ err: "信箱重複!" });
    return;
  }

  const maxId = Math.max(...data.map((el) => el.id));
  const newMember = {
    id: maxId + 1,
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  data.push(newMember);
  console.log(data);
  res.json(newMember);
});

router.put("/", (req, res) => {
  if (!req.body.name || !req.body.email) {
    res.status(400).json({ err: "請輸入name、email" });
    return;
  }

  const pos = data.findIndex((el, idx) => el.email === req.body.email);

  if (pos < 0) {
    res.status(400).json({ err: "email不存在!" });
    console.log("email不存在!");
    return;
  }

  data[pos].name = req.body.name;

  console.log(data[pos]);
  res.json(data[pos]);
});

router.put("/id/:id", (req, res) => {
  req.params.id = parseInt(req.params.id);
  const pos = data.findIndex((el, idx) => el.id === req.params.id);

  if (pos < 0) {
    console.log(req.params.id);
    res.status(400).json({ err: `id:${req.params.id}不存在!` });
    return;
  }

  if (req.body.name) {
    data[pos].name = req.body.name;
  }
  if (req.body.email) {
    data[pos].email = req.body.email;
  }

  console.log(data[pos]);
  res.json(data[pos]);
});

router.delete("/", (req, res) => {
  newData = data;
  // 0 0 1
  if (!req.body.id && !req.body.email && req.body.name) {
    newData = data.filter((val, idx) => {
      return val.name !== req.body.name;
    });
  }
  // 0 1 0
  if (!req.body.id && req.body.email && !req.body.name) {
    newData = data.filter((val, idx) => {
      return val.email !== req.body.email;
    });
  }
  // 0 1 1
  if (!req.body.id && req.body.email && req.body.name) {
    newData = data.filter((val, idx) => {
      return val.email !== req.body.email || val.name !== req.body.name;
    });
  }
  // 1 0 0
  if (req.body.id && !req.body.email && !req.body.name) {
    newData = data.filter((val, idx) => {
      return val.id !== req.body.id;
    });
  }
  // 1 0 1
  if (req.body.id && !req.body.email && req.body.name) {
    newData = data.filter((val, idx) => {
      return val.id !== req.body.id || val.name !== req.body.name;
    });
  }
  // 1 1 0
  if (req.body.id && req.body.email && !req.body.name) {
    newData = data.filter((val, idx) => {
      return val.id !== req.body.id || val.email !== req.body.email;
    });
  }
  // 1 1 1
  if (req.body.id && req.body.email && req.body.name) {
    newData = data.filter((val, idx) => {
      return val.id !== req.body.id || val.email !== req.body.email || val.name !== req.body.name;
    });
  }
  data = newData;
  console.log(req.body);
  console.log(data);
  res.json(data);
});

router.delete("/status/:flag", (req, res) => {
  const newData = data.filter((val, idx) => {
    return val.status !== req.params.flag;
  });
  data = newData;
  console.log(req.params.flag);
  console.log(data);
  res.json(data);
});

module.exports = router;
