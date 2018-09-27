import request = require("request");
import { Client } from "../src/Client";
import { Pay } from "../src/Pay";
import helper = require("./fixtures/helper");

import utils = require("../src/utils");

// sign === "OK" 算作签名通过
utils.verifySign = (
  decodeSign: string,
  expectSign: string,
  alipayPublicKey: string,
  signType: string
) => {
  if (expectSign === "OK") {
    return true;
  }
  return false;
};

jest.mock("request");

const client = new Client({
  appId: helper.APP_ID,
  privateKey: helper.PRIVATE_KEY,
  alipayPublicKey: helper.ALIPAY_PUBLIC_KEY
});

describe("Pay", () => {
  test("should work", async () => {
    const pay = new Pay(client);
    const resBody = {
      alipay_trade_close_response: {
        code: "10000",
        msg: "Success",
        trade_no: "2013112111001004500000675971",
        out_trade_no: "YX_001"
      },
      sign: "OK"
    };
    (request as any).mockImplementation((v, cb) => cb(null, null, resBody));
    pay
      .closeTrade(
        {
          trade_no: "2013112611001004680073956707",
          out_trade_no: "HZ0120131127001",
          operator_id: "YX01"
        },
        {
          notify_url:
            "http://api.test.alipay.net/atinterface/receive_notify.htm"
        }
      )
      .then(ret => {
        expect(ret.out_trade_no).toBeDefined();
      });
  });
});
