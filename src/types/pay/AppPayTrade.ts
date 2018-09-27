export interface AppPayTradeReq {
  /**
   * 该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。
   *   该参数数值不接受小数点， 如 1.5h，可转换为 90m。
   * @typedef String(6)
   * @example 90m
   */
  timeout_express?: string;
  /**
   * 订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000]
   * @typedef String(9)
   * @example 9.00
   */
  total_amount?: string;
  /**
   * 收款支付宝用户ID。 如果该值为空，则默认为商户签约账号对应的支付宝用户ID
   * @typedef String(16)
   * @example 2088102147948060
   */
  seller_id?: string;
  /**
   * 销售产品码，商家和支付宝签约的产品码
   * @typedef String(64)
   * @example QUICK_MSECURITY_PAY
   */
  product_code?: string;
  /**
   * 对一笔交易的具体描述信息。如果是多种商品，请将商品描述字符串累加传给body。
   * @typedef String(128)
   * @example Iphone6 16G
   */
  body?: string;
  /**
   * 商品的标题/交易标题/订单标题/订单关键字等。
   * @typedef String(256)
   * @example 大乐透
   */
  subject?: string;
  /**
   * 商户网站唯一订单号
   * @typedef String(64)
   * @example 70501111111S001111119
   */
  out_trade_no?: string;
  /**
   * 绝对超时时间，格式为yyyy-MM-dd HH:mm。
   * @typedef String(32)
   * @example 2016-12-31 10:05
   */
  time_expire?: string;
  /**
   * 商品主类型 :0-虚拟类商品,1-实物类商品
   * @typedef String(2)
   * @example 0
   */
  goods_type?: string;
  /**
   * 优惠参数
   * 注：仅与支付宝协商后可用
   * @typedef String(512)
   * @example {"storeIdType":"1"}
   */
  promo_params?: string;
  /**
   * 公用回传参数，如果请求时传递了该参数，则返回给商户时会回传该参数。支付宝只会在同步返回（包括跳转回商户网站）和异步通知时将该参数原样返回。
   *   本参数必须进行UrlEncode之后才可以发送给支付宝。
   * @typedef String(512)
   * @example merchantBizType%3d3C%26merchantBizNo%3d2016010101111
   */
  passback_params?: string;
  /**
   * 描述分账信息，json格式，详见分账参数说明
   * @typedef RoyaltyInfo
   */
  royalty_info?: RoyaltyInfo;
  /**
   * 业务扩展参数
   * @typedef ExtendParams
   */
  extend_params?: ExtendParams;
  /**
   * 间连受理商户信息体，当前只对特殊银行机构特定场景下使用此字段
   * @typedef SubMerchant
   */
  sub_merchant?: SubMerchant;
  /**
   * 可用渠道，用户只能在指定渠道范围内支付
   * 当有多个渠道时用“,”分隔
   * 注，与disable_pay_channels互斥
   * @typedef String(128)
   * @example pcredit,moneyFund,debitCardExpress
   */
  enable_pay_channels?: string;
  /**
   * 商户门店编号
   * @typedef String(32)
   * @example NJ_001
   */
  store_id?: string;
  /**
   * 指定渠道，目前仅支持传入pcredit
   * 若由于用户原因渠道不可用，用户可选择是否用其他渠道支付。
   * 注：该参数不可与花呗分期参数同时传入
   * @typedef String(128)
   * @example pcredit
   */
  specified_channel?: string;
  /**
   * 禁用渠道，用户不可用指定渠道支付
   * 当有多个渠道时用“,”分隔
   * 注，与enable_pay_channels互斥
   * @typedef String(128)
   * @example pcredit,moneyFund,debitCardExpress
   */
  disable_pay_channels?: string;
  /**
   * 描述结算信息，json格式，详见结算参数说明
   * @typedef SettleInfo
   */
  settle_info?: SettleInfo;
  /**
   * 开票信息
   * @typedef InvoiceInfo
   */
  invoice_info?: InvoiceInfo;
  /**
   * 外部指定买家
   * @typedef ExtUserInfo
   */
  ext_user_info?: ExtUserInfo;
  /**
   * 商户传入业务信息，具体值要和支付宝约定，应用于安全，营销等参数直传场景，格式为json格式
   * @typedef String(512)
   * @example {"data":"123"}
   */
  business_params?: string;
}

interface RoyaltyInfo {
  /**
   * 分账类型
   * 卖家的分账类型，目前只支持传入ROYALTY（普通分账类型）。
   * @typedef String(150)
   * @example ROYALTY
   */
  royalty_type?: string;
  /**
   * 分账明细的信息，可以描述多条分账指令，json数组。
   * @typedef RoyaltyDetailInfos[](2500)
   */
  royalty_detail_infos: RoyaltyDetailInfos;
}

interface RoyaltyDetailInfos {
  /**
   * 分账序列号，表示分账执行的顺序，必须为正整数
   * @typedef Number(9)
   * @example 1
   */
  serial_no?: number;
  /**
   * 接受分账金额的账户类型：
   * 	userId：支付宝账号对应的支付宝唯一用户号。
   * 	bankIndex：分账到银行账户的银行编号。目前暂时只支持分账到一个银行编号。
   * storeId：分账到门店对应的银行卡编号。
   * 默认值为userId。
   * @typedef String(24)
   * @example userId
   */
  trans_in_type?: string;
  /**
   * 分账批次号
   * 分账批次号。
   * 目前需要和转入账号类型为bankIndex配合使用。
   * @typedef String(32)
   * @example 123
   */
  batch_no: string;
  /**
   * 商户分账的外部关联号，用于关联到每一笔分账信息，商户需保证其唯一性。
   * 如果为空，该值则默认为“商户网站唯一订单号+分账序列号”
   * @typedef String(64)
   * @example 20131124001
   */
  out_relation_id?: string;
  /**
   * 要分账的账户类型。
   * 目前只支持userId：支付宝账号对应的支付宝唯一用户号。
   * 默认值为userId。
   * @typedef String(24)
   * @example userId
   */
  trans_out_type: string;
  /**
   * 如果转出账号类型为userId，本参数为要分账的支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字。
   * @typedef String(16)
   * @example 2088101126765726
   */
  trans_out: string;
  /**
   * 如果转入账号类型为userId，本参数为接受分账金额的支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字。
   * 	如果转入账号类型为bankIndex，本参数为28位的银行编号（商户和支付宝签约时确定）。
   * 如果转入账号类型为storeId，本参数为商户的门店ID。
   * @typedef String(28)
   * @example 2088101126708402
   */
  trans_in: string;
  /**
   * 分账的金额，单位为元
   * @typedef Number(9)
   * @example 0.1
   */
  amount: number;
  /**
   * 分账描述信息
   * @typedef String(1000)
   * @example 分账测试1
   */
  desc?: string;
  /**
   * 分账的比例，值为20代表按20%的比例分账
   * @typedef String(3)
   * @example 100
   */
  amount_percentage?: string;
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
   * 使用花呗分期要进行的分期数
   * @typedef String(5)
   * @example 3
   */
  hb_fq_num?: string;
  /**
   * 使用花呗分期需要卖家承担的手续费比例的百分值，传入100代表100%
   * @typedef String(3)
   * @example 100
   */
  hb_fq_seller_percent?: string;
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

interface SubMerchant {
  /**
   * 间连受理商户的支付宝商户编号，通过间连商户入驻后得到。间连业务下必传，并且需要按规范传递受理商户编号。
   * @typedef String(11)
   * @example 19023454
   */
  merchant_id: string;
  /**
   * 商户id类型，
   * @typedef String(32)
   * @example alipay: 支付宝分配的间连商户编号, merchant: 商户端的间连商户编号
   */
  merchant_type?: string;
}

interface SettleInfo {
  /**
   * 结算详细信息，json数组，目前只支持一条。
   * @typedef SettleDetailInfo[](10)
   */
  settle_detail_infos: SettleDetailInfo;
}

interface SettleDetailInfo {
  /**
   * 结算收款方的账户类型。
   * cardSerialNo：结算收款方的银行卡编号。
   * 目前只支持cardSerialNo账户类型
   * @typedef String(64)
   * @example cardSerialNo
   */
  trans_in_type: string;
  /**
   * 结算收款方。当结算收款方类型是cardSerialNo时，本参数为用户在支付宝绑定的卡编号
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
   * 结算的金额，单位为元。目前必须和交易金额相同
   * @typedef Number(9)
   * @example 0.1
   */
  amount: number;
}

interface InvoiceInfo {
  /**
   * 开票关键信息
   * @typedef InvoiceKeyInfo(200)
   */
  key_info: InvoiceKeyInfo;
  /**
   * 开票内容
   * 注：json数组格式
   * @typedef String(400)
   * @example [{"code":"100294400","name":"服饰","num":"2","sumPrice":"200.00","taxRate":"6%"}]
   */
  details: string;
}

interface InvoiceKeyInfo {
  /**
   * 该交易是否支持开票
   * @typedef Boolean(5)
   * @example true
   */
  is_support_invoice: boolean;
  /**
   * 开票商户名称：商户品牌简称|商户门店简称
   * @typedef String(80)
   * @example ABC|003
   */
  invoice_merchant_name: string;
  /**
   * 税号
   * @typedef String(30)
   * @example 1464888883494
   */
  tax_num: string;
}

interface ExtUserInfo {
  /**
   * 姓名
   * 注： need_check_info=T时该参数才有效
   * @typedef String(16)
   * @example 李明
   */
  name?: string;
  /**
   * 手机号
   * 注：该参数暂不校验
   * @typedef String(20)
   * @example 16587658765
   */
  mobile?: string;
  /**
   * 身份证：IDENTITY_CARD、护照：PASSPORT、军官证：OFFICER_CARD、士兵证：SOLDIER_CARD、户口本：HOKOU等。如有其它类型需要支持，请与蚂蚁金服工作人员联系。
   * 注： need_check_info=T时该参数才有效
   * @typedef String(32)
   * @example IDENTITY_CARD
   */
  cert_type?: string;
  /**
   * 证件号
   * 注：need_check_info=T时该参数才有效
   * @typedef String(64)
   * @example 362334768769238881
   */
  cert_no?: string;
  /**
   * 允许的最小买家年龄，买家年龄必须大于等于所传数值
   * 注：
   * 1. need_check_info=T时该参数才有效
   * 2. min_age为整数，必须大于等于0
   * @typedef String(3)
   * @example 18
   */
  min_age?: string;
  /**
   * 是否强制校验付款人身份信息
   * T:强制校验，F：不强制
   * @typedef String(8)
   * @example F
   */
  fix_buyer?: string;
  /**
   * 是否强制校验身份信息
   * T:强制校验，F：不强制
   * @typedef String(1)
   * @example F
   */
  need_check_info?: string;
}

export interface AppPayTradeRes {
  /**
   * 商户网站唯一订单号
   * @typedef String(64)
   * @example 70501111111S001111119
   */
  out_trade_no: string;
  /**
   * 该交易在支付宝系统中的交易流水号。
   * @typedef String(64)
   * @example 2014112400001000340011111118
   */
  trade_no: string;
  /**
   * 该笔订单的资金总额，单位为RMB-Yuan。取值范围为[0.01，100000000.00]，精确到小数点后两位。
   * @typedef String(9)
   * @example 9.00
   */
  total_amount: string;
  /**
   * 收款支付宝账号对应的支付宝唯一用户号。
   * 以2088开头的纯16位数字
   * @typedef String(16)
   * @example 2088111111116894
   */
  seller_id: string;
}
