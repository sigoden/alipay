export interface QueryTradeReq {
  /**
   * 订单支付时传入的商户订单号,和支付宝交易号不能同时为空。
   * trade_no,out_trade_no如果同时存在优先取trade_no
   * @typedef String(64)
   * @example 20150320010101001
   */
  out_trade_no?: string;
  /**
   * 支付宝交易号，和商户订单号不能同时为空
   * @typedef String(64)
   * @example 2014112611001004680 073956707
   */
  trade_no?: string;
  /**
   * 银行间联模式下有用，其它场景请不要使用；
   * 双联通过该参数指定需要查询的交易所属收单机构的pid;
   * @typedef String(16)
   * @example 2088101117952222
   */
  org_pid?: string;
}

export interface QueryTradeRes {
  /**
   * 支付宝交易号
   * @typedef String(64)
   * @example 2013112011001004330000121536
   */
  trade_no: string;
  /**
   * 商家订单号
   * @typedef String(64)
   * @example 6823789339978248
   */
  out_trade_no: string;
  /**
   * 买家支付宝账号
   * @typedef String(100)
   * @example 159****5620
   */
  buyer_logon_id: string;
  /**
   * 交易状态：
   * - WAIT_BUYER_PAY（交易创建，等待买家付款）
   * - TRADE_CLOSED（未付款交易超时关闭，或支付完成后全额退款）
   * - TRADE_SUCCESS（交易支付成功）
   * - TRADE_FINISHED（交易结束，不可退款）
   * @typedef String(32)
   * @example TRADE_CLOSED
   */
  trade_status: string;
  /**
   * 交易的订单金额，单位为元，两位小数。该参数的值为支付时传入的total_amount
   * @typedef Price(11)
   * @example 88.88
   */
  total_amount: number;
  /**
   * 标价币种，该参数的值为支付时传入的trans_currency，支持英镑：
   *   GBP、港币：HKD、美元：USD、新加坡元：SGD、日元：JPY、加拿大元：CAD、澳元：AUD、
   *   欧元：EUR、新西兰元：NZD、韩元：KRW、泰铢：THB、瑞士法郎：CHF、瑞典克朗：SEK、
   *   丹麦克朗：DKK、挪威克朗：NOK、马来西亚林吉特：MYR、印尼卢比：IDR、菲律宾比索：PHP、
   *   毛里求斯卢比：MUR、以色列新谢克尔：ILS、斯里兰卡卢比：LKR、俄罗斯卢布：RUB、
   *   阿联酋迪拉姆：AED、捷克克朗：CZK、南非兰特：ZAR、人民币：CNY、新台币：TWD。
   *
   * 当trans_currency 和 settle_currency 不一致时，trans_currency支持人民币：CNY、新台币：TWD
   * @typedef String(8)
   * @example TWD
   */
  trans_currency?: string;
  /**
   * 订单结算币种，对应支付接口传入的settle_currency，支持英镑：
   *   GBP、港币：HKD、美元：USD、新加坡元：SGD、日元：JPY、加拿大元：CAD、澳元：AUD、
   *   欧元：EUR、新西兰元：NZD、韩元：KRW、泰铢：THB、瑞士法郎：CHF、瑞典克朗：SEK、
   *   丹麦克朗：DKK、挪威克朗：NOK、马来西亚林吉特：MYR、印尼卢比：IDR、菲律宾比索：PHP、
   *   毛里求斯卢比：MUR、以色列新谢克尔：ILS、斯里兰卡卢比：LKR、俄罗斯卢布：RUB、
   *   阿联酋迪拉姆：AED、捷克克朗：CZK、南非兰特：ZAR
   * @typedef String(8)
   * @example USD
   */
  settle_currency?: string;
  /**
   * 结算币种订单金额
   * @typedef Price(11)
   * @example 2.96
   */
  settle_amount?: number;
  /**
   * 订单支付币种
   * @typedef Price(8)
   * @example CNY
   */
  pay_currency?: number;
  /**
   * 支付币种订单金额
   * @typedef String(11)
   * @example 8.88
   */
  pay_amount?: string;
  /**
   * 结算币种兑换标价币种汇率
   * @typedef String(11)
   * @example 30.025
   */
  settle_trans_rate?: string;
  /**
   * 标价币种兑换支付币种汇率
   * @typedef String(11)
   * @example 0.264
   */
  trans_pay_rate?: string;
  /**
   * 买家实付金额，单位为元，两位小数。该金额代表该笔交易买家实际支付的金额，不包含商户折扣等金额
   * @typedef Price(11)
   * @example 8.88
   */
  buyer_pay_amount?: number;
  /**
   * 积分支付的金额，单位为元，两位小数。该金额代表该笔交易中用户使用积分支付的金额，比如集分宝或者支付宝实时优惠等
   * @typedef Price(11)
   * @example 10
   */
  point_amount?: number;
  /**
   * 交易中用户支付的可开具发票的金额，单位为元，两位小数。该金额代表该笔交易中可以给用户开具发票的金额
   * @typedef Price(11)
   * @example 12.11
   */
  invoice_amount?: number;
  /**
   * 本次交易打款给卖家的时间
   * @typedef Date(32)
   * @example 2014-11-27 15:45:57
   */
  send_pay_date?: string;
  /**
   * 实收金额，单位为元，两位小数。该金额为本笔交易，商户账户能够实际收到的金额
   * @typedef String(11)
   * @example 15.25
   */
  receipt_amount?: string;
  /**
   * 商户门店编号
   * @typedef String(32)
   * @example NJ_S_001
   */
  store_id?: string;
  /**
   * 商户机具终端编号
   * @typedef String(32)
   * @example NJ_T_001
   */
  terminal_id?: string;
  /**
   * 交易支付使用的资金渠道
   * @typedef TradeFundBill
   */
  fund_bill_list: TradeFundBill;
  /**
   * 请求交易支付中的商户店铺的名称
   * @typedef String(512)
   * @example 证大五道口店
   */
  store_name?: string;
  /**
   * 买家在支付宝的用户id
   * @typedef String(16)
   * @example 2088101117955611
   */
  buyer_user_id: string;
  /**
   * 预授权支付模式，该参数仅在信用预授权支付场景下返回。信用预授权支付：CREDIT_PREAUTH_PAY
   * @typedef String(64)
   * @example CREDIT_PREAUTH_PAY
   */
  auth_trade_pay_mode?: string;
  /**
   * 买家用户类型。CORPORATE:企业用户；PRIVATE:个人用户。
   * @typedef String(18)
   * @example PRIVATE
   */
  buyer_user_type?: string;
  /**
   * 商家优惠金额
   * @typedef String(11)
   * @example 88.88
   */
  mdiscount_amount?: string;
  /**
   * 平台优惠金额
   * @typedef String(11)
   * @example 88.88
   */
  discount_amount?: string;
}

interface TradeFundBill {
  /**
   * 交易使用的资金渠道，详见 支付渠道列表
   * @typedef String(32)
   * @example ALIPAYACCOUNT
   */
  fund_channel: string;
  /**
   * 该支付工具类型所使用的金额
   * @typedef Price(32)
   * @example 10
   */
  amount: number;
  /**
   * 渠道实际付款金额
   * @typedef Price(11)
   * @example 11.21
   */
  real_amount?: number;
}
