# Alipay SDK

蚂蚁金服开放平台 SDK

> 第一次使用，请参考[支付宝开放平台配置](#支付宝开放平台配置)设置公钥

# SDK 使用文档

## 开始使用

```js
const { Client, Pay } = require("@sigodenjs/alipay");
const errors = require("@sigodenjs/alipay/errors");
const client = new Client({
  appId: "2016123456789012",
  privateKey: fs.readFileSync("./private-key.pem", "ascii"),
  alipayPublicKey: fs.readFileSync("./public-key.pem", "ascii")
});

// 如果使用 AES 加密
// client.aseCode = "+a3I6ffQNJJFhH0Cq8nT5g=="

// 1. 直接使用 client.execute
client
  .execute("alipay.trade.fastpay.refund.query", {
    trade_no: "20150320010101001",
    out_trade_no: "2014112611001004680073956707",
    out_request_no: "2014112611001004680073956707",
    org_pid: "2088101117952222"
  })
  .then(ret => {});

// 2. 使用封装了的API
const pay = new Pay(client);
pay
  .queryRefund({
    trade_no: "20150320010101001",
    out_trade_no: "2014112611001004680073956707",
    out_request_no: "2014112611001004680073956707",
    org_pid: "2088101117952222"
  })
  .then(ret => {
    //
  })
  .catch(err => {
    if (err instanceof errors.RequestError) {
    } else if (err instanceof errors.ValidateSignError) {
    } else if (err instanceof errors.BusinessError) {
    }
  });
```

### 页面类接口调用

```js
client
  .pageExecute("alipay.trade.page.pay", {
    out_trade_no: "20150320010101001",
    product_code: "FAST_INSTANT_TRADE_PAY",
    total_amount: 88.88,
    subject: "Iphone6 16G",
    body: "Iphone6 16G",
    passback_params: "merchantBizType%3d3C%26merchantBizNo%3d2016010101111",
    extend_params: { sys_service_provider_id: "2088511833207846" }
  })
  .then(ret => {
    res.set("Content-Type", "text/html");
    res.send(ret);
  });
```

### 文件上传类接口调用

```js
client.execute("alipay.offline.material.image.upload", {
    image_type: 'jpg',
    image_name: '海地捞',
    // 使用 fs.createReadStream 加载图片或视频
    image_content: fs.createReadStream('./海底捞.jpg')
    imaeg_pid: '2088021822217233'
})
```

## 业务类

业务类比照蚂蚁金服开放平台 API 文档的接口进行归类。它最大的作用是提供类型系统支持。

- `Pay`封装支付API
- `Finance`封装财务API
- `Monitor`封装云监控API

# 支付宝开放平台配置

## 1. 注册支付宝开放平台账号

支付宝开放平台： https://open.alipay.com/

## 2. 生成密钥

1. 下载 RSA 密钥工具：https://docs.open.alipay.com/291/106097/
2. 切换到生成秘钥 tab，秘钥格式选择“PKCS1（非 JAVA 适用）”

   > 不需要手动修改秘钥格式，SDK 会自动处理

   ![img](https://gw.alipayobjects.com/zos/rmsportal/WYvBOnJBmBzBovsqYePF.png)

3. 新建 private-key.pem 保存私钥，文件格式如下：

   ```
   // 粘贴上一步生成的私钥到这里（不需要换行）
   ```

   完整的 private-key.pem 文件例子：

   ```
   MIIEpQIBAAKCAQEA7EqgH28GDbCgaonIDWIhMSPYAGMLNjCzmk7jtxNSLFjI+bbTZe43N5Bbo8cmk/LpULIGrtiyhfre1WMWIG6voK/GNL+9pY3PxkOdr+VveWp3ZDuaWQToN7Tq/f+MUMkvEBhcCP+b7UheQXX80zAEWe7HGh5mpj9bmbtb57d34e1b72GX/dTVVeJDU5/Eg6L/UcKeOmd4xtdGP4xqAPbgNhe2JuTOtRR/xl0ZT9mUtEpBLabrTR1EO256Zk1lzgXuMepAlyCIN0Rm0DxqnosRZjRg41ahkXs3RzInRbWXIIVdrjJsjC7rnlt6zZHdqRSDKy/9sZbAv0e8ZjaHjIEnvQIDAQABAoIBAHF2zDkL6Q492GoQS14R1vpvydM1vDaDYFsisrpArt7Yq3ktz4lMwHsP+NFGWkIFDQBQ3GCtcdxgQQyajg941yEEBtthj0GmPTVpVpkWRVc6RqZ88Hr6nj/Rwl3BjrFkShMif19azpc8fvZUH9mRXyWIQVdLbeM63VOO4mz8bravhYxX3Mea8sTzo4mzfM2J+E9eLsywrFNQ44HueQZrK6d1fFdEe1bC9BrDd9xWVPuOgKBZiAnpcSla9CHbmD4YFBOmGV1/+gnoDBJuaHNij4K9AuJSz90dnRUuByVfR9vMxENkBOIoOpIjs8+WvF+L2e1qKe4WhX89p9i+rpIb28kCgYEA+q0bo7s0YugkXPCMGyK0hH/CoUqkx/sPjM1lJoXc24NtorX1MZcqH0Pa55A+6rfYAiRYcW7fv+nqmc8Bz32dTWROdL27wloHBkO+p7ZuSnc6b6L1rk5da77gC4DmI01LSFXT36dRFWJOBj7rWCp0pUlxmexp+VLrEEhzJs4Ob48CgYEA8U9PVR3gUV60mymSel4o0sMcALANt5SZvX2GoJ3FMFPWLyAq7WFZnttPjwXaqEda5efB9Brp0Wm092kTcMAcus3Rkytt/DSGVGAWhkF9FcPG06mpL2UK3z6glvdOq2zjCo6oglVtCOUKj0sxXYjXAhqF/SPw3Kgov2Ru9hMtDfMCgYEA0UlN1jkp15nxIhdDIjSreiQgnwDu6nfV17x0QuFoL21fT4WTHMAUTt4cGVD49oZfNgqaPLpQ3K2zTI7j+BPsDP0984GlDPKVAsn0l5lcI5e/lgz8CXcr0BUggPoxKjASNmZR6lyK+cuFUPmfC5EGqijTS6tyHtL3pjSWz0MiEkkCgYEAhSR9YTlay4q1m+cUKvBJFgERMk/xQZl8OlFINtbWNhQL2XSmOtO73yqiewd/3dmBDdkR6t3upNzuPJR9ZXiaYXeuasVLqhxRAb0CsJDxs1CSI7c44i2eEg88DA/oGC28F9ceosr/nijB6s5SLomSGFcKFuH9w8IEuZVwo9VwxoECgYEA4BM+BBRhtOQd8ae/Y8vAH828X9euupkhIrpQvk3iptNowAniiCoDXmQtwQOyDj8O9NkvCKRZcH5eApLrDo7dIQg5bvcT894MotSDbcEBvLkLvcKfb/Vw0GFVUhUAGRebyATkA7mDCeJ1VMyj/d6Ubg5FOy7L/U4X+Qwrwb/B/VA=
   ```

## 3. 设置应用公钥

1. 复制 2.2 中生成的应用公钥

   ![img](https://gw.alipayobjects.com/zos/rmsportal/EUxpNrlWOhTYWbfljYUe.png)

2. 登录开放平台设置应用公钥

   ![img](https://gw.alipayobjects.com/zos/rmsportal/CyUzmlKmpCNPAPdNevTd.png)

## 4. 保存支付宝公钥

> “支付宝公钥”用于开放平台返回值的进行验签

1. 开放平台“应用概览”页面中复制“支付宝公钥”

   ![img](https://gw.alipayobjects.com/zos/rmsportal/kdRFpjYmQdBNonEMXSBO.png)

2. 新建 public-key.pem 保存私钥，文件格式如下：

   ```
   // 粘贴上一步复制的“支付宝公钥”到这里（不需要换行）
   ```

   完整的 public-key.pem 文件例子：

   ```
   MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7EqgH28GDbCgaonIDWIhMSPYAGMLNjCzmk7jtxNSLFjI+bbTZe43N5Bbo8cmk/LpULIGrtiyhfre1WMWIG6voK/GNL+9pY3PxkOdr+VveWp3ZDuaWQToN7Tq/f+MUMkvEBhcCP+b7UheQXX80zAEWe7HGh5mpj9bmbtb57d34e1b72GX/dTVVeJDU5/Eg6L/UcKeOmd4xtdGP4xqAPbgNhe2JuTOtRR/xl0ZT9mUtEpBLabrTR1EO256Zk1lzgXuMepAlyCIN0Rm0DxqnosRZjRg41ahkXs3RzInRbWXIIVdrjJsjC7rnlt6zZHdqRSDKy/9sZbAv0e8ZjaHjIEnvQIDAQAB
   ```
