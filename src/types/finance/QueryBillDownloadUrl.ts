export interface QueryBillDownloadUrlReq {
  /**
   * 账单类型，商户通过接口或商户经开放平台授权后其所属服务商通过接口可以获取以下账单类型：
   * - trade指商户基于支付宝交易收单的业务账单；
   * - signcustomer是指基于商户支付宝余额收入及支出等资金变动的帐务账单；
   * @typedef String(10)
   * @example trade
   */
  bill_type: string;
  /**
   * 账单时间：日账单格式为yyyy-MM-dd，月账单格式为yyyy-MM。
   * @typedef String(15)
   * @example 2016-04-05
   */
  bill_date: string;
}

export interface QueryBillDownloadUrlRes {
  /**
   * 账单下载地址链接，获取连接后30秒后未下载，链接地址失效。
   * @typedef String(2048)
   * @example http://dwbillcenter.alipay.com/downloadBillFile.resource?bizType=X
   * &userId=X&fileType=X&bizDates=X&downloadFileName=X&fileId=X
   */
  bill_download_url: string;
}
