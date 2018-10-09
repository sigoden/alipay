import * as crypto from "crypto";
import omit = require("lodash.omit");
import { ClientOptions } from "./types/Common";

export const ALIPAY_ALGORITHM_MAPPING = {
  RSA: "RSA-SHA1",
  RSA2: "RSA-SHA256"
};

/**
 * 签名
 */
export function sign(params: any = {}, options: ClientOptions): string {
  if (typeof params.biz_content === "object") {
    params.biz_content = JSON.stringify(params.biz_content);
  }

  // 排序
  const signStr = Object.keys(params)
    .sort()
    .map(key => {
      let data = params[key];
      if (Array.prototype.toString.call(data) !== "[object String]") {
        data = JSON.stringify(data);
      }
      return `${key}=${data}`;
    })
    .join("&");

  return crypto
    .createSign(ALIPAY_ALGORITHM_MAPPING[options.signType])
    .update(signStr, "utf8")
    .sign(options.privateKey, "base64");
}

export function formatKey(key: string, type: string): string {
  const item = key.split("\n").map(val => val.trim());

  // 删除包含 `RSA PRIVATE KEY / PUBLIC KEY` 等字样的第一行
  if (item[0].includes(type)) {
    item.shift();
  }

  // 删除包含 `RSA PRIVATE KEY / PUBLIC KEY` 等字样的最后一行
  if (item[item.length - 1].includes(type)) {
    item.pop();
  }

  return `-----BEGIN ${type}-----\n${item.join("")}\n-----END ${type}-----`;
}

export function getDecodeSign(params: any) {
  const signArgs = omit(params, ["sign", "sign_type"]);

  return Object.keys(signArgs)
    .sort()
    .filter(val => val)
    .map(key => {
      let value = signArgs[key];

      if (Array.prototype.toString.call(value) !== "[object String]") {
        value = JSON.stringify(value);
      }
      return `${key}=${decodeURIComponent(value)}`;
    })
    .join("&");
}

export function verifySign(
  decodeSign: string,
  expectSign: string,
  alipayPublicKey: string,
  signType: string
) {
  const verifier = crypto.createVerify(ALIPAY_ALGORITHM_MAPPING[signType]);
  verifier.update(decodeSign, "utf8");
  return verifier.verify(alipayPublicKey, expectSign, "base64");
}

export function getTimestamp(date: Date = new Date()) {
  const year = date.getFullYear();
  const month = zerosLeft(String(date.getMonth() + 1), 2);
  const day = zerosLeft(String(date.getDate()), 2);
  const hour = zerosLeft(String(date.getHours()), 2);
  const minute = zerosLeft(String(date.getMinutes()), 2);
  const second = zerosLeft(String(date.getSeconds()), 2);
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function zerosLeft(str: string, length: number) {
  return ("0".repeat(length) + str).slice(-1 * length);
}
