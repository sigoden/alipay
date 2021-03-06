export interface PreCreateTradeReq {
  /**
   * 商户订单号,64个字符以内、只能包含字母、数字、下划线；需保证在商户端不重复
   * @typedef String(64)
   * @example 20150320010101001
   */
  out_trade_no: string;
  /**
   * 卖家支付宝用户ID。 如果该值为空，则默认为商户签约账号对应的支付宝用户ID
   * @typedef String(28)
   * @example 2088102146225135
   */
  seller_id?: string;
  /**
   * 订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000] 如果同时传入了【打折金额】，【不可打折金额】，【订单总金额】三者，
   *   则必须满足如下条件：【订单总金额】=【打折金额】+【不可打折金额】
   * @typedef Price(11)
   * @example 88.88
   */
  total_amount: number;
  /**
   * 可打折金额. 参与优惠计算的金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000] 如果该值未传入，
   *   但传入了【订单总金额】，【不可打折金额】则该值默认为【订单总金额】-【不可打折金额】
   * @typedef Price(11)
   * @example 8.88
   */
  discountable_amount?: number;
  /**
   * 订单标题
   * @typedef String(256)
   * @example Iphone6 16G
   */
  subject: string;
  /**
   * 订单包含的商品列表信息.json格式. 其它说明详见：“商品明细说明”
   * @typedef GoodsDetail[]
   */
  goods_detail?: GoodsDetail[];
  /**
   * 对交易或商品的描述
   * @typedef String(128)
   * @example Iphone6 16G
   */
  body?: string;
  /**
   * 商户操作员编号
   * @typedef String(28)
   * @example yx_001
   */
  operator_id?: string;
  /**
   * 商户门店编号
   * @typedef String(32)
   * @example NJ_001
   */
  store_id?: string;
  /**
   * 禁用渠道，用户不可用指定渠道支付
   * 当有多个渠道时用“,”分隔
   * 注，与enable_pay_channels互斥
   * 渠道列表：https://docs.open.alipay.com/common/wifww7
   * @typedef String(128)
   * @example pcredit,moneyFund,debitCardExpress
   */
  disable_pay_channels?: string;
  /**
   * 可用渠道，用户只能在指定渠道范围内支付
   * 当有多个渠道时用“,”分隔
   * 注，与disable_pay_channels互斥
   * 渠道列表
   * @typedef String(128)
   * @example pcredit,moneyFund,debitCardExpress
   */
  enable_pay_channels?: string;
  /**
   * 商户机具终端编号
   * @typedef String(32)
   * @example NJ_T_001
   */
  terminal_id?: string;
  /**
   * 业务扩展参数
   * @typedef ExtendParams
   */
  extend_params?: ExtendParams;
  /**
   * 该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。
   *   该参数数值不接受小数点， 如 1.5h，可转换为 90m。
   * @typedef String(6)
   * @example 90m
   */
  timeout_express?: string;
  /**
   * 描述结算信息，json格式，详见结算参数说明
   * @typedef SettleInfo
   */
  settle_info?: SettleInfo;
  /**
   * 商户传入业务信息，具体值要和支付宝约定，应用于安全，营销等参数直传场景，格式为json格式
   * @typedef String(512)
   * @example {"data":"123"}
   */
  business_params?: string;
  /**
   * 该笔订单允许的最晚付款时间，逾期将关闭交易，从生成二维码开始计时。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。
   *  该参数数值不接受小数点， 如 1.5h，可转换为 90m。
   * @typedef String(6)
   * @example 90m
   */
  qr_code_timeout_express?: string;
}

interface GoodsDetail {
  /**
   * 商品的编号
   * @typedef String(32)
   * @example apple-01
   */
  goods_id: string;
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

interface ExtendParams {
  /**
   * 系统商编号
   * 该参数作为系统商返佣数据提取的依据，请填写系统商签约协议的PID
   * @typedef String(64)
   * @example 2088511833207846
   */
  sys_service_provider_id?: string;
  /**
   * 行业数据回流信息, 详见：地铁支付接口参数补充说明
   * @typedef String(512)
   * @example {\"scene_code\":\"metro_tradeorder\",\"channel\":\"xxxx\",\"scene_data\":{\"asset_name\":\"ALIPAY\"}}
   */
  industry_reflux_info?: string;
  /**
   * 卡类型
   * @typedef String(32)
   * @example S0JP0000
   */
  card_type?: string;
}

interface SettleInfo {
  /**
   * 结算详细信息，json数组，目前只支持一条。
   * @typedef SettleDetailInfo[](10)
   */
  settle_detail_infos: SettleDetailInfo[];
  /**
   * 商户id类型，
   * @typedef String(32)
   * @example alipay: 支付宝分配的间连商户编号, merchant: 商户端的间连商户编号
   */
  merchant_type?: string;
}

interface SettleDetailInfo {
  /**
   * 结算收款方的账户类型。
   * - cardSerialNo：结算收款方的银行卡编号;
   * - userId：表示是支付宝账号对应的支付宝唯一用户号;
   * - loginName：表示是支付宝登录号；
   * @typedef String(64)
   * @example cardSerialNo
   */
  trans_in_type: string;
  /**
   * 结算收款方。
   * - 结算收款方类型是cardSerialNo时，本参数为用户在支付宝绑定的卡编号；
   * - 结算收款方类型是userId时，本参数为用户的支付宝账号对应的支付宝唯一用户号，以2088开头的纯16位数字；
   * - 结算收款方类型是loginName时，本参数为用户的支付宝登录号
   * @typedef String(64)
   * @example A0001
   */
  trans_in: string;
  /**
   * 结算汇总维度，按照这个维度汇总成批次结算，由商户指定。
   * 目前需要和结算收款方账户类型为cardSerialNo配合使用
   * @typedef String(64)
   * @example A0001
   */
  summary_dimension?: string;
  /**
   * 结算主体标识。当结算主体类型为SecondMerchant时，为二级商户的SecondMerchantID；当结算主体类型为Store时，为门店的外标。
   * @typedef String(64)
   * @example 2088xxxxx;ST_0001
   */
  settle_entity_id?: string;
  /**
   * 结算主体类型。
   * 二级商户:SecondMerchant;商户或者直连商户门店:Store
   * @typedef String(32)
   * @example SecondMerchant、Store
   */
  settle_entity_type?: string;
  /**
   * 结算的金额，单位为元。目前必须和交易金额相同
   * @typedef Number(9)
   * @example 0.1
   */
  amount: number;
}

export interface PreCreateTradeRes {
  /**
   * 商户的订单号
   * @typedef String(64)
   * @example 6823789339978248
   */
  out_trade_no: string;
  /**
   * 当前预下单请求生成的二维码码串，可以用二维码生成工具根据该码串值生成对应的二维码
   * @typedef String(1024)
   * @example https://qr.alipay.com/bavh4wjlxf12tper3a
   */
  qr_code: string;
}
