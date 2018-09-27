export interface SyncOrderInfoReq {
  /**
   * 支付宝交易号，和商户订单号不能同时为空
   * @example 2018061021001004680073956707
   * @typedef String(64)
   */
  trade_no?: string;
  /**
   * 标识一笔交易多次请求，同一笔交易多次信息同步时需要保证唯一
   * @example HZ01RF001
   * @typedef String(64)
   */
  out_request_no: string;
  /**
   * 交易信息同步对应的业务类型，具体值与支付宝约定；信用授权场景下传CREDIT_AUTH
   * @example CREDIT_AUTH
   * @typedef String(64)
   */
  biz_type: string;
  /**
   * 商户传入同步信息，具体值要和支付宝约定；用于芝麻信用租车、单次授权等信息同步场景，格式为json格式
   * @example "order_biz_info": "{\"status\":\"COMPLETE\"}"
   * @typedef String(2018)
   */
  order_biz_info?: string;
}

export interface SyncOrderInfoRes {
  /**
   * 支付宝交易号
   * @example 2.0180610121001002e+28
   * @typedef String(64)
   */
  trade_no: string;
  /**
   * 商户订单号
   * @example 20180610010101000
   * @typedef String(64)
   */
  out_trade_no: string;
  /**
   * 买家在支付宝的用户id
   * @example 2088101117955611
   * @typedef String(28)
   */
  buyer_user_id: string;
}
