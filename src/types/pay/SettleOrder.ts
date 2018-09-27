export interface SettleOrderReq {
  /**
   * 结算请求流水号 开发者自行生成并保证唯一性
   * @example 20160727001
   * @typedef String(64)
   */
  out_request_no: string;
  /**
   * 支付宝订单号
   * @example 2014030411001007850000672009
   * @typedef String(64)
   */
  trade_no: string;
  /**
   * 分账明细信息
   * @typedef OpenApiRoyaltyDetailInfoPojo[]
   */
  royalty_parameters: OpenApiRoyaltyDetailInfoPojo;
  /**
   * 操作员id
   * @example A0001
   * @typedef String(64)
   */
  operator_id?: string;
}

interface OpenApiRoyaltyDetailInfoPojo {
  /**
   * 分账支出方账户，类型为userId，本参数为要分账的支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字。
   * @example 2088101126765726
   * @typedef String(16)
   */
  trans_out?: string;
  /**
   * 分账收入方账户，类型为userId，本参数为要分账的支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字。
   * @example 2088101126708402
   * @typedef String(16)
   */
  trans_in?: string;
  /**
   * 分账的金额，单位为元
   * @example 0.1
   * @typedef Number(9)
   */
  amount?: number;
  /**
   * 分账信息中分账百分比。取值范围为大于0，少于或等于100的整数。
   * @example 100
   * @typedef Number(3)
   */
  amount_percentage?: number;
  /**
   * 分账描述
   * @example 分账给2088101126708402
   * @typedef String(1000)
   */
  desc?: string;
}

export interface SettleOrderRes {
  /**
   * 支付宝交易号
   * @example 2.015070921001004e+27
   * @typedef String(64)
   */
  trade_no: string;
}
