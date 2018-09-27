export interface QueryRefundReq {
  /**
   * 支付宝交易号，和商户订单号不能同时为空
   * @typedef String(64)
   * @example 20150320010101000
   */
  trade_no?: string;
  /**
   * 订单支付时传入的商户订单号,和支付宝交易号不能同时为空。 trade_no,out_trade_no如果同时存在优先取trade_no
   * @typedef String(64)
   * @example 2.0141126110010046e+27
   */
  out_trade_no?: string;
  /**
   * 请求退款接口时，传入的退款请求号，如果在退款请求时未传入，则该值为创建交易时的外部交易号
   * @typedef String(64)
   * @example 2.0141126110010046e+27
   */
  out_request_no: string;
  /**
   * 银行间联模式下有用，其它场景请不要使用；
   * 双联通过该参数指定需要查询的交易所属收单机构的pid;
   * @typedef String(16)
   * @example 2088101117952222
   */
  org_pid?: string;
}

export interface QueryRefundRes {
  /**
   * 支付宝交易号
   * @typedef String(64)
   * @example 2014112611001004680073956707
   */
  trade_no?: string;
  /**
   * 创建交易传入的商户订单号
   * @typedef String(64)
   * @example 20150320010101001
   */
  out_trade_no?: string;
  /**
   * 本笔退款对应的退款请求号
   * @typedef String(64)
   * @example 20150320010101001
   */
  out_request_no?: string;
  /**
   * 发起退款时，传入的退款原因
   * @typedef String(256)
   * @example 用户退款请求
   */
  refund_reason?: string;
  /**
   * 该笔退款所对应的交易的订单金额
   * @typedef Price(11)
   * @example 100.20
   */
  total_amount?: number;
  /**
   * 本次退款请求，对应的退款金额
   * @typedef Price(11)
   * @example 12.33
   */
  refund_amount?: number;
  /**
   * 退分账明细信息
   * @typedef RefundRoyaltyResult
   */
  refund_royaltys?: RefundRoyaltyResult;
  /**
   * 本次退款金额中买家退款金额
   * @typedef String(11)
   * @example 88.88
   */
  present_refund_buyer_amount?: string;
  /**
   * 本次退款金额中平台优惠退款金额
   * @typedef String(11)
   * @example 88.88
   */
  present_refund_discount_amount?: string;
  /**
   * 本次退款金额中商家优惠退款金额
   * @typedef String(11)
   * @example 88.88
   */
  present_refund_mdiscount_amount?: string;
}

interface RefundRoyaltyResult {
  /**
   * 退分润金额
   * @typedef Price(9)
   * @example 10
   */
  refund_amount: number;
  /**
   * 退分润结果码
   * @typedef String(32)
   * @example SUCCESS
   */
  result_code: string;
  /**
   * 转出人支付宝账号对应用户ID
   * @typedef String(28)
   * @example 2088102210397302
   */
  trans_out?: string;
  /**
   * 转出人支付宝账号
   * @typedef String(64)
   * @example alipay-test03@alipay.com
   */
  trans_out_email?: string;
  /**
   * 转入人支付宝账号对应用户ID
   * @typedef String(28)
   * @example 2088102210397302
   */
  trans_in?: string;
  /**
   * 转入人支付宝账号
   * @typedef String(64)
   * @example zen_gwen@hotmail.com
   */
  trans_in_email?: string;
}
