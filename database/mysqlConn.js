const mysql = require("mysql2");
const myConn = mysql.createPool({
  host: "web.newxe.tw",
  port: 3306,
  user: "clinicsys",
  password: "BGWft0zDt2xgyt33qEWL",
  database: "clinicsys",
  charset: "utf8",
});
const myConnPrms = myConn.promise();

module.exports = myConn;
global.myCon = myConn;

module.exports = myConnPrms;
global.myConPrms = myConnPrms;