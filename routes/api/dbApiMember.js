const myConn = require("../../database/mysqlConn");

const tblName = "ns_members";

const tblMember = {
  tblName: tblName,
  create: async () => {
    try {
      const sql = `
            CREATE TABLE IF NOT EXISTS ${tblName} 
            (
            id INT AUTO_INCREMENT PRIMARY KEY COMMENT '候診號碼',
            name VARCHAR(30) NOT NULL COMMENT '姓名',
            nhi_card_no VARCHAR(30) NOT NULL COMMENT '健保卡號',
            phone VARCHAR(30) NOT NULL COMMENT '手機號碼',
            email VARCHAR(50) NOT NULL COMMENT 'email'
            ) CHARACTER SET utf8 COLLATE utf8_general_ci;
        `;

      const [rs, flds] = await myConn.query(sql);
      console.log(rs);
      return rs;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  drop: async () => {
    try {
      const sql = `DROP TABLE IF EXISTS ${tblName};`;
      const [rs, flds] = await myConn.query(sql);
      return rs;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getSchema: async () => {
    try {
      const sql = `DESCRIBE ${tblName};`;
      const [rs, flds] = await myConn.query(sql);
      return rs;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getFieldName: async () => {
    try {
      const sql = `
            SELECT a.COLUMN_NAME, a.COLUMN_COMMENT
            FROM INFORMATION_SCHEMA.COLUMNS a
            WHERE a.TABLE_NAME = '${tblName}';
        `;
      const [rs, flds] = await myConn.query(sql);
      return flds;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  getAll: async () => {
    try {
      const sql = `SELECT * FROM ${tblName};`;
      const [rs, flds] = await myConn.query(sql);
      console.log("getAll:", rs);
      return rs;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  insertMany: async (oData) => {
    try {
      const dataSet = oData.map((obj) =>
        Object.entries(obj).map((el) => el[1])
      );
      console.log("dataSet", dataSet);

      const sql = `INSERT INTO ${tblName} (id, name, nhi_card_no, phone, email) VALUES ? ;`;
      const [rs, flds] = await myConn.query(sql, [dataSet]);
      console.log(rs, flds);
      console.log(rs.affectedRows + " Rows inserted");
      return rs.affectedRows;
    } catch (err) {
      console.log(err);
      return -1;
    }
  },
};

module.exports = tblName;
module.exports = tblMember;
