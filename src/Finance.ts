import { Client } from "./Client";
import { CommonRes, ExecuteParams } from "./types/Common";
import * as types from "./types/finance";
/**
 * 财务
 *
 * @see {@link https://docs.open.alipay.com/api_15}
 */
export class Finance {
  public client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * 查询对账单下载地址
   * @see {@link https://docs.open.alipay.com/api_15/alipay.data.dataservice.bill.downloadurl.query}
   */
  public async queryBillDownloadUrl(
    req: types.QueryBillDownloadUrlReq,
    params: ExecuteParams & {
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.execute<
      types.QueryBillDownloadUrlReq,
      CommonRes & types.QueryBillDownloadUrlRes
    >("alipay.data.dataservice.bill.downloadurl.query", req, params);
  }
}
