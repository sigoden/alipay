import request = require("request");
import { Client } from "../src/Client";
import * as errors from "../src/errors";
import utils = require("../src/utils");
import helper = require("./fixtures/helper");

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

describe("Client", () => {
  test("formatKey", () => {
    const client = new Client({
      appId: helper.APP_ID,
      privateKey: helper.PRIVATE_KEY,
      alipayPublicKey: helper.ALIPAY_PUBLIC_KEY
    });

    expect(client.options.privateKey).toBe(
      `-----BEGIN RSA PRIVATE KEY-----\n${
        helper.PRIVATE_KEY
      }\n-----END RSA PRIVATE KEY-----`
    );
    expect(client.options.alipayPublicKey).toBe(
      `-----BEGIN PUBLIC KEY-----\n${
        helper.ALIPAY_PUBLIC_KEY
      }\n-----END PUBLIC KEY-----`
    );
  });

  describe("execute", () => {
    let client: Client;
    beforeEach(() => {
      client = new Client({
        gateway: helper.GATE_WAY,
        appId: helper.APP_ID,
        privateKey: helper.PRIVATE_KEY,
        signType: "RSA2",
        alipayPublicKey: helper.ALIPAY_PUBLIC_KEY,
        timeout: 10000
      });
    });
    test("RequestError", async () => {
      (request as any).mockImplementation((v, cb) =>
        cb(new Error("custom error"), null, null)
      );
      try {
        await client.execute(
          helper.METHOD_CLOSE_TRADE,
          helper.BIZ_CONTENT_CLOSE_TRADE
        );
      } catch (err) {
        expect(err).toBeInstanceOf(errors.RequestError);
      }
    });
    test("ValidateSignError", async () => {
      const resBody = {
        alipay_trade_close_response: {
          code: "10000",
          msg: "Success",
          trade_no: "2013112111001004500000675971",
          out_trade_no: "YX_001"
        },
        sign: "signStr"
      };
      (request as any).mockImplementation((v, cb) => cb(null, null, resBody));
      try {
        await client.execute(
          helper.METHOD_CLOSE_TRADE,
          helper.BIZ_CONTENT_CLOSE_TRADE
        );
      } catch (err) {
        expect(err).toBeInstanceOf(errors.ValidateSignError);
      }
    });
    test("BusinessError", async () => {
      const resBody = {
        alipay_trade_close_response: {
          code: "40004",
          msg: "Business Failed",
          subCode: "NO_RIGHT",
          subMsg: "无权限使用接口"
        },
        sign: "OK"
      };
      (request as any).mockImplementation((v, cb) => cb(null, null, resBody));
      try {
        await client.execute(
          helper.METHOD_CLOSE_TRADE,
          helper.BIZ_CONTENT_CLOSE_TRADE
        );
      } catch (err) {
        expect(err).toBeInstanceOf(errors.BusinessError);
      }
    });
    test("success response", async () => {
      const data = {
        code: "10000",
        msg: "Success",
        trade_no: "2013112111001004500000675971",
        out_trade_no: "YX_001"
      };
      const resBody = {
        alipay_trade_close_response: data,
        sign: "OK"
      };
      (request as any).mockImplementation((v, cb) => cb(null, null, resBody));
      const ret = await client.execute(
        helper.METHOD_CLOSE_TRADE,
        helper.BIZ_CONTENT_CLOSE_TRADE
      );
      expect(ret).toBe(data);
    });
  });
  describe("pageExecute", () => {
    let client: Client;
    beforeEach(() => {
      client = new Client({
        appId: helper.APP_ID,
        privateKey: helper.PRIVATE_KEY,
        alipayPublicKey: helper.ALIPAY_PUBLIC_KEY
      });
    });
    test("should return html", async () => {
      const html = await client.pageExecute(
        "alipay.trade.page.pay",
        {
          product_code: "FAST_INSTANT_TRADE_PAY",
          subject: "abc",
          body: "234",
          // timeout_express: "90m",
          total_amount: "0.01"
        },
        {
          notify_url:
            "http://api.test.alipay.net/atinterface/receive_notify.htm"
        }
      );
      expect(
        html.indexOf(
          `<input type="hidden" name="method" value="alipay.trade.page.pay" />`
        ) > -1
      ).toBe(true);
      expect(html.indexOf(`<input type="hidden" name="biz_content"`) > -1).toBe(
        true
      );
    });
  });
  describe("checkNotifySign", () => {
    let client: Client;
    beforeEach(() => {
      client = new Client({
        appId: helper.APP_ID,
        privateKey: helper.PRIVATE_KEY,
        alipayPublicKey: helper.ALIPAY_PUBLIC_KEY
      });
    });
    test("check notify sign", () => {
      const data = {
        notify_type: "trade_status_sync",
        notify_id: "91722adff935e8cfa58b3aabf4dead6ibe",
        notify_time: "2017-02-16 21:46:15",
        sign_type: "RSA2",
        sign:
          // tslint:disable-next-line:max-line-length
          "WcO t3D8Kg71dTlKwN7r9PzUOXeaBJwp8/FOuSxcuSkXsoVYxBpsAidprySCjHCjmaglNcjoKJQLJ28/Asl93joTW39FX6i07lXhnbPknezAlwmvPdnQuI01HZsZF9V1i6ggZjBiAd5lG8bZtTxZOJ87ub2i9GuJ3Nr/NUc9VeY="
      };

      expect(client.checkNotifySign(data)).toBe(false);
    });
  });
});
