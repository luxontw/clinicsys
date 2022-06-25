const myConn = require("../../database/mysqlConn");

const tblName = "ns_members";

const tblMember = {
  tblName: tblName,
  create: async () => {
    try {
      const sql = `
            CREATE TABLE IF NOT EXISTS ${tblName} 
            (
            id INT AUTO_INCREMENT PRIMARY KEY COMMENT '代號',
            name VARCHAR(30) NOT NULL COMMENT '姓名',
            email VARCHAR(50) NOT NULL COMMENT 'email',
            status varchar(10) COMMENT '狀態'
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
};

module.exports = tblName;
module.exports = tblMember;
