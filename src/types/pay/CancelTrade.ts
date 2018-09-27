export interface CancelTradeReq {
  /**
   * 原支付请求的商户订单号,和支付宝交易号不能同时为空
   * @typedef String(64)
   * @example 20150320010101000
   */
  out_trade_no?: string;
  /**
   * 支付宝交易号，和商户订单号不能同时为空
   * @typedef String(64)
   * @example 2.0141126110010046e+27
   */
  trade_no?: string;
}

export interface CancelTradeRes {
  /**
   * 支付宝交易号
   * @typedef String(64)
   * @example 2013112011001004330000121536
   */
  trade_no: string;
  /**
   * 商户订单号
   * @typedef String(64)
   * @example 6823789339978248
   */
  out_trade_no: string;
  /**
   * 是否需要重试
   * @typedef String(1)
   * @example N
   */
  retry_flag: string;
  /**
   * 本次撤销触发的交易动作
   * - close：关闭交易，无退款
   * - refund：产生了退款
   * @typedef String(10)
   * @example close
   */
  action: string;
}
