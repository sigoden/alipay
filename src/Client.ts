import * as request from "request";
import { Stream } from "stream";
import * as errors from "./errors";
import {
  ClientOptions,
  CommonRes,
  ExecuteParams,
  NotifyParams
} from "./types/Common";
import * as utils from "./utils";

export class Client {
  public options: ClientOptions;
  private _aesCode?: string;
  constructor(options: ClientOptions) {
    options.privateKey = utils.formatKey(options.privateKey, "RSA PRIVATE KEY");
    options.alipayPublicKey = utils.formatKey(
      options.alipayPublicKey,
      "PUBLIC KEY"
    );
    this.options = Object.assign(
      {
        gateway: "https://openapi.alipay.com/gateway.do",
        timeout: 5000,
        signType: "RSA2"
      },
      options
    );
  }

  set aesCode(code: string) {
    this._aesCode = code;
  }

  public async execute<REQ, RES extends CommonRes>(
    method: string,
    req: REQ,
    params: ExecuteParams = {}
  ) {
    this.setExecuteParams(method, req, params);
    return new Promise<RES>((resolve, reject) => {
      request(
        Object.assign(
          {
            url: this.options.gateway,
            method: "POST",
            timeout: this.options.timeout
          },
          params.biz_content ? { qs: params } : { formData: params }
        ),
        (err, _, bodyStr: string) => {
          if (err) {
            return reject(new errors.RequestError(err));
          }
          const body = JSON.parse(bodyStr);
          const resKey = method.replace(/\./g, "_") + "_response";
          if (typeof body[resKey] === "string") {
            body[resKey] = utils.aesDecode(body[resKey], this._aesCode);
          }
          const ret = <RES> body[resKey];
          if (
            !utils.verifySign(
              JSON.stringify(ret),
              body.sign,
              this.options.alipayPublicKey,
              this.options.signType
            )
          ) {
            return reject(new errors.ValidateSignError(ret));
          }
          if (!/^1/.test(ret.code)) {
            return reject(new errors.BusinessError(ret));
          }
          resolve(ret);
        }
      );
    });
  }

  public async pageExecute<REQ>(
    method: string,
    req: REQ,
    params: ExecuteParams = {}
  ) {
    this.setExecuteParams(method, req, params);
    return new Promise<string>(resolve => {
      // 生成表单
      const formName = `alipaySDKSubmit${Date.now()}`;
      resolve(`
        <form action="${
          this.options.gateway
        }" method="post" name="${formName}" id="${formName}">
          ${Object.keys(params)
            .map(key => {
              const value = String(params[key]).replace(/\"/g, "&quot;");
              return `<input type="hidden" name="${key}" value="${value}" />`;
            })
            .join("")}
        </form>
        <script>document.forms["${formName}"].submit();</script>
      `);
    });
  }

  /**
   * 通知验签
   */
  public checkNotifySign(notifyParams: NotifyParams): boolean {
    const expectSign = notifyParams.sign;
    const signType = notifyParams.sign_type || "RSA2";

    if (!expectSign) {
      return false;
    }

    const decodeSign = utils.getDecodeSign(notifyParams);

    return utils.verifySign(
      decodeSign,
      expectSign,
      this.options.alipayPublicKey,
      signType
    );
  }

  private setExecuteParams(method: string, req: any, params: ExecuteParams) {
    if (!Object.keys(req).some(key => isBinaryParam(req[key]))) {
      params.biz_content = JSON.stringify(req);
      if (this._aesCode) {
        params.biz_content = utils.aesEncode(params.biz_content, this._aesCode);
      }
      this.appendParams(method, params, this.options);
      params.sign = utils.sign(params, this.options);
    } else {
      const binaryParams = {};
      const normalParams = {};
      Object.keys(req).forEach(key => {
        const data = isBinaryParam(req[key]);
        if (isBinaryParam(data)) {
          binaryParams[key] = data;
        } else {
          normalParams[key] = data;
        }
      });
      this.appendParams(method, params, this.options);
      params.sign = utils.sign(normalParams, this.options);
    }
  }

  private appendParams(
    method: string,
    params: any = {},
    options: ClientOptions
  ): any {
    params.method = method;
    params.app_id = options.appId;
    params.charset = params.charset || "utf-8";
    params.version = params.version || "1.0";
    params.sign_type = params.signType || "RSA2";
    params.timestamp = params.timestamp || utils.getTimestamp();
  }
}

function isBinaryParam(data: any) {
  return Buffer.isBuffer(data) || data instanceof Stream.Readable;
}
