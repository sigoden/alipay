import { Client } from "./Client";
import { CommonRes, ExecuteParams } from "./types/Common";
import * as types from "./types/pay";

/**
 * 支付
 *
 * @see {@link https://docs.open.alipay.com/api_1}
 */
export class Pay {
  public client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * 统一收单交易支付接口
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.pay/}
   */
  public async payTrade(
    req: types.PayTradeReq,
    params: ExecuteParams & {
      notify_url?: string;
    } = {}
  ) {
    return this.client.execute<
      types.PayTradeReq,
      CommonRes & types.PayTradeRes
    >("alipay.trade.pay", req, params);
  }

  /**
   * app支付接口
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.app.pay/}
   */
  public async appPayTrade(
    req: types.AppPayTradeReq,
    params: ExecuteParams & {
      return_url?: string;
      notify_url?: string;
    } = {}
  ) {
    return this.client.execute<
      types.AppPayTradeReq,
      CommonRes & types.AppPayTradeRes
    >("alipay.trade.app.pay", req, params);
  }

  /**
   * 统一收单交易撤销接口
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.cancel/}
   */
  public async cancelTrade(
    req: types.CancelTradeReq,
    params: ExecuteParams & {
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.execute<
      types.CancelTradeReq,
      CommonRes & types.CancelTradeRes
    >("alipay.trade.cancel", req, params);
  }

  /**
   * 统一收单交易关闭接口
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.close/}
   */
  public async closeTrade(
    req: types.CloseTradeReq,
    params: ExecuteParams & {
      notify_url?: string;
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.execute<
      types.CloseTradeReq,
      CommonRes & types.CloseTradeRes
    >("alipay.trade.close", req, params);
  }

  /**
   * 统一收单交易创建接口
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.create/}
   */
  public async createTrade(
    req: types.CreateTradeReq,
    params: ExecuteParams & {
      notify_url?: string;
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.execute<
      types.CreateTradeReq,
      CommonRes & types.CreateTradeRes
    >("alipay.trade.create", req, params);
  }

  /**
   * 电脑网站支付
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.page.pay/}
   */
  public async pagePayTrade(
    req: types.PagePayTradeReq,
    params: ExecuteParams & {
      return_url?: string;
      notify_url?: string;
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.pageExecute<types.PagePayTradeReq>(
      "alipay.trade.page.pay",
      req,
      params
    );
  }

  /**
   * 统一收单线下交易预创建
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.precreate/}
   */
  public async preCreateTrade(
    req: types.PreCreateTradeReq,
    params: ExecuteParams & {
      notify_url?: string;
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.execute<
      types.PreCreateTradeReq,
      CommonRes & types.PreCreateTradeRes
    >("alipay.trade.precreate", req, params);
  }

  /**
   * 统一收单交易退款查询
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.fastpay.refund.query/}
   */
  public async queryRefund(
    req: types.QueryRefundReq,
    params: ExecuteParams & {
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.execute<
      types.QueryRefundReq,
      CommonRes & types.QueryRefundRes
    >("alipay.trade.fastpay.refund.query", req, params);
  }

  /**
   * 统一收单线下交易查询
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.query/}
   */
  public async queryTrade(
    req: types.QueryTradeReq,
    params: ExecuteParams & {
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.execute<
      types.QueryTradeReq,
      CommonRes & types.QueryTradeRes
    >("alipay.trade.query", req, params);
  }

  /**
   * 统一收单交易退款接口
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.refund/}
   */
  public async refundTrade(
    req: types.RefundTradeReq,
    params: ExecuteParams & {
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.execute<
      types.RefundTradeReq,
      CommonRes & types.RefundTradeRes
    >("alipay.trade.refund", req, params);
  }

  /**
   * 统一收单交易结算接口
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.order.settle/}
   */
  public async settleOrder(
    req: types.SettleOrderReq,
    params: ExecuteParams & {
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.execute<
      types.SettleOrderReq,
      CommonRes & types.SettleOrderRes
    >("alipay.trade.order.settle", req, params);
  }

  /**
   * 统一收单交易结算接口
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.orderinfo.sync/}
   */
  public async syncOrderInfo(
    req: types.SyncOrderInfoReq,
    params: ExecuteParams & {
      app_auth_token?: string;
    } = {}
  ) {
    return this.client.execute<
      types.SyncOrderInfoReq,
      CommonRes & types.SyncOrderInfoRes
    >("alipay.trade.orderinfo.sync", req, params);
  }

  /**
   * 手机网站支付接口
   * @see {@link https://docs.open.alipay.com/api_1/alipay.trade.wap.pay/}
   */
  public async wapPayTrade(
    req: types.WapPayTradeReq,
    params: ExecuteParams & {
      return_url?: string;
      notify_url?: string;
    } = {}
  ) {
    return this.client.execute<
      types.WapPayTradeReq,
      CommonRes & types.WapPayTradeRes
    >("alipay.trade.wap.pay", req, params);
  }
}
