import { Client } from "./Client";
import { CommonRes, ExecuteParams } from "./types/Common";
import * as types from "./types/monitor";
/**
 * 云监控
 *
 * @see {@link https://docs.open.alipay.com/264/105816}
 */
export class Monitor {
  public client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * 交易保障
   * @see {@link https://docs.open.alipay.com/264/105816}
   */
  public async syncHeartBeat(
    req: types.SyncHeartBeatReq,
    params: ExecuteParams & {
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.execute<
      types.SyncHeartBeatReq,
      CommonRes & types.SyncHeartBeatRes
    >("monitor.heartbeat.syn", req, params);
  }
}
