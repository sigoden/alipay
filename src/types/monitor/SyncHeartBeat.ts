export interface SyncHeartBeatReq {
  /**
   * 发送心跳的设备所依赖的支付宝产品
   * @description 发送心跳的设备所依赖的支付宝产品，目前仅支持FP：当面付产品
   * @example FP
   * @typedef String(5)
   */
  product: string;
  /**
   * 发送心跳的设备类型
   * @description 发送心跳的设备类型：   CR——收银机；   STORE——门店；   VM——售卖
   * @example CR
   * @typedef String(10)
   */
  type: string;
  /**
   * 发送心跳的设备ID
   * @description 商户下唯一识别终端的标识。若发起方为收银机，可为收银机设备的ID，最短6位；如没有设备ID，可填MAC地址
   * @example 1001023
   * @typedef String(32)
   */
  equipment_id: string;
  /**
   * 心跳发生时间
   * @description 产生心跳的时间，格式为：yyyy-MM-dd HH:mm:ss
   * @example 2015-01-22 16:46:02
   * @typedef String(19)
   */
  time: string;
  /**
   * 门店ID
   * @description 门店ID。需要和交易接口中的门店ID保持一致。 如无门店ID，请填“DF”
   * @example 112
   * @typedef String(32)
   */
  store_id: string;
  /**
   * 网络类型
   * @description pos设备连接的网络类型：2G、3G、WIFI、LAN。 LAN：有线网络
   * @example LAN
   * @typedef String(4)
   */
  network_type: string;
  /**
   * 系统商编号
   * @description 系统商的编号
   * @example 2088511833207846
   * @typedef String(16)
   */
  sys_service_provider_id?: string;
  /**
   * mac地址
   * @description Mac地址
   * @example 01-23-45-67-89-AB
   * @typedef String(64)
   */
  mac?: string;
  /**
   * 交易性能信息
   * @description 两次心跳时间内的交易相关信息。包括期间所有交易的商户订单号、耗时和状态。
   *   最多发送前30笔交易信息。json格式，具体参见下面的“交易性能信息参数说明”。
   *   多笔交易按时间顺序直接拼接。 如果由于网络等原因心跳发送失败，则该交易性能信息本地继续累积，
   *   直到有心跳发送成功后，本地数据才可以清除。此数据非常重要，有交易则必填
   * @example [{“OTN”:“201508011234”,“TC”:“5”,“STAT”:“S”},{“OTN”:“201508012345”,“TC”:“15”,“STAT”,“X”}]
   * @typedef String(256)
   */
  trade_info: string;
  /**
   * 异常信息
   * @description 心跳时间段内的机具异常原因，如有多个用“|”分隔。
   * - HE_PRINTER——打印机异常；
   * - HE_SCANER——扫描枪异常；
   * - HE_OTHER——其他硬件异常
   * @example HE_PRINTER
   * @typedef String(128)
   */
  exception_info?: string;
  /**
   * 扩展信息
   * @description 心跳信息发送方自定义，json格式
   * @example {“SHOP_ID”:“BJ_ZZ_001”,“TERMINAL_ID”:“1234”}
   * @typedef String(256)
   */
  extend_info?: string;
}

interface SyncHeartBeatPerf {
  /**
   * 商户订单号
   * @description 商户订单号
   * @example 201508011234
   * @typedef String(32)
   */
  OTN: string;
  /**
   * 交易耗时
   * @description 在终端上，从扫描到条码开始，到支付宝下单支付结果返回的间隔时间，单位为秒
   * @example 5.315
   * @typedef String(8)
   */
  TC: string;
  /**
   * 交易状态
   * @description
   * - S——交易成功；
   * - I-支付宝返回支付处理中；
   * - F——支付宝返回失败；
   * - P——商户收银系统失败；
   * - X——建立连接异常；
   * - Y——报文上送异常；
   * - Z——报文接收异常
   * @example S
   * @typedef String(1)
   */
  STAT: string;
}

export interface SyncHeartBeatRes {}
