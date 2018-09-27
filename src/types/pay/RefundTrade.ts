export interface RefundTradeReq {
  /**
   * 订单支付时传入的商户订单号,不能和 trade_no同时为空。
   * @typedef String(64)
   * @example 20150320010101001
   */
  out_trade_no?: string;
  /**
   * 支付宝交易号，和商户订单号不能同时为空
   * @typedef String(64)
   * @example 2014112611001004680073956707
   */
  trade_no?: string;
  /**
   * 需要退款的金额，该金额不能大于订单金额,单位为元，支持两位小数
   * @typedef Price(9)
   * @example 200.12
   */
  refund_amount: number;
  /**
   * 订单退款币种信息
   * @typedef String(8)
   * @example USD
   */
  refund_currency?: string;
  /**
   * 退款的原因说明
   * @typedef String(256)
   * @example 正常退款
   */
  refund_reason?: string;
  /**
   * 标识一次退款请求，同一笔交易多次退款需要保证唯一，如需部分退款，则此参数必传。
   * @typedef String(64)
   * @example HZ01RF001
   */
  out_request_no?: string;
  /**
   * 商户的操作员编号
   * @typedef String(30)
   * @example OP001
   */
  operator_id?: string;
  /**
   * 商户的门店编号
   * @typedef String(32)
   * @example NJ_S_001
   */
  store_id?: string;
  /**
   * 商户的终端编号
   * @typedef String(32)
   * @example NJ_T_001
   */
  terminal_id?: string;
  /**
   * 退款包含的商品列表信息，Json格式。
   * 其它说明详见：“商品明细说明”
   * @typedef GoodsDetail[]
   */
  goods_detail?: GoodsDetail[];
  /**
   * 退分账明细信息
   * @typedef OpenApiRoyaltyDetailInfoPojo[]
   */
  refund_royalty_parameters?: OpenApiRoyaltyDetailInfoPojo[];
  /**
   * 银行间联模式下有用，其它场景请不要使用；
   * 双联通过该参数指定需要退款的交易所属收单机构的pid;
   * @typedef String(16)
   * @example 2088101117952222
   */
  org_pid?: string;
}

interface GoodsDetail {
  /**
   * 商品的编号
   * @typedef String(32)
   * @example apple-01
   */
  goods_id: string;
  /**
   * 支付宝定义的统一商品编号
   * @typedef String(32)
   * @example 20010001
   */
  alipay_goods_id?: string;
  /**
   * 商品名称
   * @typedef String(256)
   * @example ipad
   */
  goods_name: string;
  /**
   * 商品数量
   * @typedef Number(10)
   * @example 1
   */
  quantity: number;
  /**
   * 商品单价，单位为元
   * @typedef Price(9)
   * @example 2000
   */
  price: number;
  /**
   * 商品类目
   * @typedef String(24)
   * @example 34543238
   */
  goods_category?: string;
  /**
   * 商品描述信息
   * @typedef String(1000)
   * @example 特价手机
   */
  body?: string;
  /**
   * 商品的展示地址
   * @typedef String(400)
   * @example http://www.alipay.com/xxx.jpg
   */
  show_url?: string;
}

interface OpenApiRoyaltyDetailInfoPojo {
  /**
   * 分账类型.
   * 普通分账为：transfer;
   * 补差为：replenish;
   * 为空默认为分账transfer;
   * @typedef String(32)
   * @example transfer
   */
  royalty_type?: string;
  /**
   * 支出方账户。如果支出方账户类型为userId，本参数为支出方的支付宝账号对应的支付宝唯一用户号，以2088开头的纯16位数字；如果支出方类型为loginName，本参数为支出方的支付宝登录号；
   * @typedef String(16)
   * @example 2088101126765726
   */
  trans_out?: string;
  /**
   * 支出方账户类型。userId表示是支付宝账号对应的支付宝唯一用户号;loginName表示是支付宝登录号；
   * @typedef String(64)
   * @example userId
   */
  trans_out_type?: string;
  /**
   * 收入方账户类型。userId表示是支付宝账号对应的支付宝唯一用户号;cardSerialNo表示是卡编号;loginName表示是支付宝登录号；
   * @typedef String(64)
   * @example userId
   */
  trans_in_type?: string;
  /**
   * 收入方账户。如果收入方账户类型为userId，本参数为收入方的支付宝账号对应的支付宝唯一用户号，以2088开头的纯16位数字；
   *   如果收入方类型为cardSerialNo，本参数为收入方在支付宝绑定的卡编号；如果收入方类型为loginName，本参数为收入方的支付宝登录号；
   * @typedef String(16)
   * @example 2088101126708402
   */
  trans_in?: string;
  /**
   * 分账的金额，单位为元
   * @typedef Number(9)
   * @example 0.1
   */
  amount?: number;
  /**
   * 分账信息中分账百分比。取值范围为大于0，少于或等于100的整数。
   * @typedef Number(3)
   * @example 100
   */
  amount_percentage?: number;
  /**
   * 分账描述
   * @typedef String(1000)
   * @example 分账给2088101126708402
   */
  desc?: string;
}

export interface RefundTradeRes {
  /**
   * 2013112011001004330000121536
   * @typedef String(64)
   * @example 支付宝交易号
   */
  trade_no: string;
  /**
   * 商户订单号
   * @typedef String(64)
   * @example 6823789339978248
   */
  out_trade_no: string;
  /**
   * 用户的登录id
   * @typedef String(100)
   * @example 159****5620
   */
  buyer_logon_id: string;
  /**
   * 本次退款是否发生了资金变化
   * @typedef String(1)
   * @example Y
   */
  fund_change: string;
  /**
   * 退款总金额
   * @typedef Price(11)
   * @example 88.88
   */
  refund_fee: number;
  /**
   * 退款币种信息
   * @typedef String(8)
   * @example USD
   */
  refund_currency?: string;
  /**
   * 退款支付时间
   * @typedef Date(32)
   * @example 2014-11-27 15:45:57
   */
  gmt_refund_pay: string;
  /**
   * 退款使用的资金渠道
   * @typedef TradeFundBill
   */
  refund_detail_item_list?: TradeFundBill;
  /**
   * 交易在支付时候的门店名称
   * @typedef String(512)
   * @example 望湘园联洋店
   */
  store_name?: string;
  /**
   * 买家在支付宝的用户id
   * @typedef String(28)
   * @example 2088101117955611
   */
  buyer_user_id: string;
  /**
   * 退回的前置资产列表
   * @typedef PresetPayToolInfo
   */
  refund_preset_paytool_list?: PresetPayToolInfo;
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
  /**
   * 渠道所使用的资金类型,目前只在资金渠道(fund_channel)是银行卡渠道(BANKCARD)的情况下才返回该信息(DEBIT_CARD:借记卡,CREDIT_CARD:信用卡,MIXED_CARD:借贷合一卡)
   * @typedef String(32)
   * @example DEBIT_CARD
   */
  fund_type?: string;
}

interface PresetPayToolInfo {
  /**
   * 前置资产金额
   * @typedef Price[](32)
   * @example 12.21
   */
  amount: number[];
  /**
   * 前置资产类型编码，和收单支付传入的preset_pay_tool里面的类型编码保持一致。
   * @typedef String(32)
   * @example 盒马礼品卡:HEMA；抓猫猫红包:T_CAT_COUPON
   */
  assert_type_code: string;
}
