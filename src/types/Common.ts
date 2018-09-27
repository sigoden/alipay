export interface CommonRes {
  /**
   * 网关返回码,详见文档
   * @typedef String(-)
   * @example 40004
   */
  code: string;
  /**
   * 网关返回码描述,详见文档
   * @typedef String(-)
   * @example Business Failed
   */
  msg: string;
  /**
   * 业务返回码，参见具体的API接口文档
   * @typedef String(-)
   * @example ACQ.TRADE_HAS_SUCCESS
   */
  sub_code?: string;
  /**
   * 业务返回码描述，参见具体的API接口文档
   * @typedef String(-)
   * @example 交易已被支付
   */
  sub_msg?: string;
}

export interface ClientOptions {
  /** 网关 */
  gateway?: string;
  /** 应用ID */
  appId: string;
  /**
   * 应用私钥字符串
   * RSA签名验签工具：https://docs.open.alipay.com/291/106097）
   * 密钥格式一栏请选择 “PKCS1(非JAVA适用)”
   */
  privateKey: string;
  signType?: "RSA2" | "RSA";
  /** 支付宝公钥 */
  alipayPublicKey: string;
  /** 网关超时时间（单位毫秒，默认 5s） */
  timeout?: number;
}

export interface ExecuteParams {
  [k: string]: any;
}

export interface NotifyParams {
  sign: string;
  sign_type?: string;
  [k: string]: any;
}
