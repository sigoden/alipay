const fs = require("fs");
const path = require("path");
const helper = {};

helper.APP_ID = "2016073100135823";
helper.GATE_WAY = "https://openapi.alipaydev.com/gateway.do";

helper.PRIVATE_KEY = fs.readFileSync(
  path.join(__dirname, "app-private-key-no-wrapper.pem"),
  "ascii"
);
helper.ALIPAY_PUBLIC_KEY = fs.readFileSync(
  path.join(__dirname, "/alipay-public-key-no-wrapper.pem"),
  "ascii"
);

helper.METHOD_CLOSE_TRADE = "alipay.trade.close";
helper.BIZ_CONTENT_CLOSE_TRADE = {
  trade_no: "2013112611001004680073956707",
  out_trade_no: "HZ0120131127001",
  operator_id: "YX01"
};

module.exports = helper;
