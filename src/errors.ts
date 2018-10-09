import { CommonRes } from "./types/Common";
/**
 * 请求异常
 */
export class RequestError extends Error {
  public err: Error;
  constructor(err: Error) {
    super(err.message);
    this.err = err;
  }
}

/**
 * 签名错误
 */
export class ValidateSignError extends Error {
  public data: any;
  constructor(data: any) {
    super("签名不匹配");
    this.data = data;
  }
}

/**
 * 业务错误
 */
export class BusinessError extends Error {
  /**
   * 网关返回码,详见文档
   * @typedef String(-)
   * @example 40004
   */
  public code: string;
  /**
   * 网关返回码描述,详见文档
   * @typedef String(-)
   * @example Business Failed
   */
  public msg: string;
  /**
   * 业务返回码，参见具体的API接口文档
   * @typedef String(-)
   * @example ACQ.TRADE_HAS_SUCCESS
   */
  public subCode?: string;
  /**
   * 业务返回码描述，参见具体的API接口文档
   * @typedef String(-)
   * @example 交易已被支付
   */
  public subMsg?: string;
  constructor(res: CommonRes) {
    super(
      `code:${res.code},msg:${res.msg},subCode:${
        res.sub_code
      },subMsg:${res.sub_msg}`
    );
    this.code = res.code;
    this.msg = res.msg;
    this.subCode = res.sub_code;
    this.subMsg = res.sub_msg;
  }
}
