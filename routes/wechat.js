var express = require('express');
var router = express.Router();
const { Wechat } = require('wechat-jssdk');

const wechatConfig = {
	//第一个为设置网页授权回调地址
	wechatRedirectUrl: "http://qgsdxk.natappfree.cc/", 
	wechatToken: "lihenian", //可选，第一次在微信控制台保存开发者配置信息时使用
	appId: "wx62aba559696345af",
	appSecret: "a93c3dd28ce34fb96228830141e51549",
	card: false, //开启卡券支持，默认关闭
	payment: false, //开启支付支持，默认关闭
	merchantId: '', //商户ID
	paymentSandBox: true, //沙箱模式，验收用例
	paymentKey: '', //必传，验签密钥，TIP:获取沙箱密钥也需要真实的密钥，所以即使在沙箱模式下，真实验签密钥也需要传入。
}

const wx = new Wechat(wechatConfig)
router.get('/', (req, res, next) => {
	console.log(req.query)
	if ('echostr' in req.query) {
		res.send(req.query.echostr)
	} else {
		wx.jssdk.getSignature(req.query.url).then(function(signatureDate) {
			res.json(signatureDate);
		})
	}
})
module.exports = router;
