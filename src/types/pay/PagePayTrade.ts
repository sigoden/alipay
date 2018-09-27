export interface PagePayTradeReq {
  /**
   * 商户订单号，64个字符以内、可包含字母、数字、下划线；需保证在商户端不重复
   * @typedef String(64)
   * @example 20150320010101001
   */
  out_trade_no?: string;
  /**
   * 销售产品码，与支付宝签约的产品码名称。 注：目前仅支持FAST_INSTANT_TRADE_PAY
   * @typedef String(64)
   * @example FAST_INSTANT_TRADE_PAY
   */
  product_code?: string;
  /**
   * 订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000]
   * @typedef Price(11)
   * @example 88.88
   */
  total_amount?: number;
  /**
   * 订单标题
   * @typedef String(256)
   * @example Iphone6 16G
   */
  subject?: string;
  /**
   * 订单描述
   * @typedef String(128)
   * @example Iphone6 16G
   */
  body?: string;
  /**
   * 订单包含的商品列表信息，Json格式： {&quot;show_url&quot;:&quot;https://或http://打头的商品的展示地址&quot;} ，在支付时，可点击商品名称跳转到该地址
   * @typedef String
   * @example {&quot;show_url&quot;:&quot;https://www.alipay.com&quot;}
   */
  goods_detail?: string;
  /**
   * 公用回传参数，如果请求时传递了该参数，则返回给商户时会回传该参数。支付宝只会在异步通知时将该参数原样返回。本参数必须进行UrlEncode之后才可以发送给支付宝
   * @typedef String(512)
   * @example merchantBizType%3d3C%26merchantBizNo%3d2016010101111
   */
  passback_params?: string;
  /**
   * 业务扩展参数，详见业务扩展参数说明
   * @typedef String
   * @example {&quot;sys_service_provider_id&quot;:&quot;2088511833207846&quot;}
   */
  extend_params?: string;
  /**
   * 商品主类型：0&mdash;虚拟类商品，1&mdash;实物类商品（默认）
   * 注：虚拟类商品不支持使用花呗渠道
   * @typedef String(2)
   * @example 0
   */
  goods_type?: string;
  /**
   * 该笔订单允许的最晚付款时间，逾期将关闭交易。
   *   取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。
   *   该参数数值不接受小数点， 如 1.5h，可转换为 90m。该参数在请求到支付宝时开始计时。
   * @typedef String(6)
   * @example 90m
   */
  timeout_express?: string;
  /**
   * 可用渠道，用户只能在指定渠道范围内支付
   * 当有多个渠道时用&ldquo;,&rdquo;分隔
   * 注：与disable_pay_channels互斥
   * @typedef String(128)
   * @example pcredit,moneyFund,debitCardExpress
   */
  enable_pay_channels?: string;
  /**
   * 禁用渠道，用户不可用指定渠道支付
   * 当有多个渠道时用&ldquo;,&rdquo;分隔
   * 注：与enable_pay_channels互斥
   * @typedef String(128)
   * @example pcredit,moneyFund,debitCardExpress
   */
  disable_pay_channels?: string;
  /**
   * 获取用户授权信息，可实现如免登功能。获取方法请查阅：用户信息授权
   * @typedef String(40)
   * @example appopenBb64d181d0146481ab6a762c00714cC27
   */
  auth_token?: string;
  /**
   * PC扫码支付的方式，支持前置模式和跳转模式。
   * 前置模式是将二维码前置到商户的订单确认页的模式。需要商户在自己的页面中以iframe方式请求支付宝页面。具体分为以下几种：
   * 0：订单码-简约前置模式，对应iframe宽度不能小于600px，高度不能小于300px；
   * 1：订单码-前置模式，对应iframe宽度不能小于300px，高度不能小于600px；
   * 3：订单码-迷你前置模式，对应iframe宽度不能小于75px，高度不能小于75px；
   * 4：订单码-可定义宽度的嵌入式二维码，商户可根据需要设定二维码的大小。
   *
   * 跳转模式下，用户的扫码界面是由支付宝生成的，不在商户的域名下。
   * 2：订单码-跳转模式
   * @typedef String(2)
   * @example 4
   */
  qr_pay_mode?: string;
  /**
   * 商户自定义二维码宽度注：qr_pay_mode=4时该参数生效
   * @typedef String(4)
   * @example 100
   */
  qrcode_width?: string;
}

interface ExtendParams {
  /**
   * 系统商编号，该参数作为系统商返佣数据提取的依据，请填写系统商签约协议的PID
   * @typedef String(64)
   * @example 2088511833207846
   */
  sys_service_provider_id?: string;
  /**
   * 花呗分期数（目前仅支持3、6、12）注：使用该参数需要仔细阅读“花呗分期接入文档”
   * @typedef String(5)
   * @example 3
   */
  hb_fq_num?: string;
  /**
   * 卖家承担收费比例，商家承担手续费传入100，用户承担手续费传入0，仅支持传入100、0两种，其他比例暂不支持注：使用该参数需要仔细阅读“花呗分期接入文档”
   * @typedef String(3)
   * @example 100
   */
  hb_fq_seller_percent?: string;
}

export enum Channel {
  /**
   * 余额
   */
  balance = "balance",
  /**
   * 余额宝
   */
  moneyFund = "moneyFund",
  /**
   * 红包
   */
  coupon = "coupon",
  /**
   * 花呗
   */
  pcredit = "pcredit",
  /**
   * 花呗分期
   */
  pcreditpayInstallment = "pcreditpayInstallment",
  /**
   * 信用卡
   */
  creditCard = "creditCard",
  /**
   * 信用卡快捷
   */
  creditCardExpress = "creditCardExpress",
  /**
   * 信用卡卡通
   */
  creditCardCartoon = "creditCardCartoon",
  /**
   * 信用支付类型（包含信用卡卡通、信用卡快捷、花呗、花呗分期）
   */
  credit_group = "credit_group",
  /**
   * 借记卡快捷
   */
  debitCardExpress = "debitCardExpress",
  /**
   * 商户预存卡
   */
  mcard = "mcard",
  /**
   * 个人预存卡
   */
  pcard = "pcard",
  /**
   * 优惠（包含实时优惠+商户优惠）
   */
  promotion = "promotion",
  /**
   * 营销券
   */
  voucher = "voucher",
  /**
   * 积分
   */
  point = "point",
  /**
   * 商户优惠
   */
  mdiscount = "mdiscount",
  /**
   * 网银
   */
  bankPay = "bankPay"
}
