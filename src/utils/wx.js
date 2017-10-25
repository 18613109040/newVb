
// 默认配置
export function wxConfig(conf){
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: conf.appId, // 必填，公众号的唯一标识
    timestamp: conf.timestamp, // 必填，生成签名的时间戳
    nonceStr: conf.nonceStr, // 必填，生成签名的随机串
    signature: conf.signature,// 必填，签名，见附录1
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'onRecordEnd',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'chooseImage',
      'uploadImage',
      'previewImage',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
}

// 选择图片
let images={
  serverId:[],
  localId :[],
}
export function chooseImage(actions,callback,count=1){
  wx.chooseImage({
    count:count,
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    // success:callback,
    success: function (res) {
      actions.isLoading(1)
      images.serverId=[];
      images.localId = res.localIds;
      // uploadImage(0)
      callback();
    }
  });
}
// 上传图片
export function uploadImage(actions,callback,index=0){
  if (images.localId.length == 0) {
    actions.showAlert({text:'请先选择图片'});
    return;
  }
  wx.uploadImage({
    localId:images.localId[index] ,
    isShowProgressTips:0,
    success:  (res)=> {
      images.serverId.push(res.serverId);
      if(images.serverId.length == images.localId.length){
        callback(images.serverId.join(','));
        actions.isLoading(0)
        return
      }
      index = index < images.localId.length ? ++index:'';

      uploadImage(actions,callback,index)
    },
    fail: function (res) {
      actions.showAlert({text:'图片选择失败，请重新选择'})
        // base.alert("图片选择失败，请重新选择")
    }
  });
};

// 图片预览
export function previewImage(url,urls){
  urls = urls === undefined ? [url]:urls
  console.log(urls)
  wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
  });
}
// 扫码
// 返回扫码后的最终结果
export function onScanQRCode(callback=()=>{}){
  wx.scanQRCode({
    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
    success: function (res) {
      var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      var len = result.split(',');
      result = len.length>1?len[1]:len[0]
      callback(result);
    }
  });
}
/**
 * 隐藏右上角菜单中的某些菜单
 */
export function FXhide() {
  wx.ready(function () {
    wx.hideMenuItems({
      menuList: [
        'menuItem:share:appMessage', // 发送给朋友
        'menuItem:share:timeline', // 分享到朋友圈
        'menuItem:share:qq', // 分享到QQ
        'menuItem:share:weiboApp', //分享到微博
        'menuItem:share:QZone', //分享到qq空间
        'menuItem:copyUrl', //复制网页
        'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
        'menuItem:openWithSafari', // 在Safari中打开
        'menuItem:onMenuShareQZone'
      ],
      success: function (res) {
        //alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
      },
      fail: function (res) {
        // alert(JSON.stringify(res));
      }
    });
  });
}
export function FXhide2() {
  wx.ready(function () {
    wx.hideMenuItems({
      menuList: [
        'menuItem:originPage',
        'menuItem:copyUrl', //复制网页
        'menuItem:openWithQQBrowser', // 在QQ浏览器中打开
        'menuItem:openWithSafari' // 在Safari中打开
      ],
      success: function (res) {
        //alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
      },
      fail: function (res) {
        // alert(JSON.stringify(res));
      }
    });
  });
}

/**
 * 显示右上角菜单
 */
export function FXShow() {
  wx.ready(function () {
    wx.showMenuItems({
      menuList: [
        'menuItem:share:appMessage'// 发送给朋友
      ],
      success: function (res) {
        //alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
      },
      fail: function (res) {
        // alert(JSON.stringify(res));
      }
    });
  });
}
export function FXTimeLine() {
  wx.ready(function () {
    wx.showMenuItems({
      menuList: [
        'menuItem:share:timeline'// 发送给朋友
      ],
      success: function (res) {
        //alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
      },
      fail: function (res) {
        // alert(JSON.stringify(res));
      }
    });
  });
}
/**
 * 分享到朋友圈
 * @param shareModel
 */
export function shareApp(obj) {
  shareQQ(obj);
  shareWeibo(obj)
  wx.ready(function () {
    wx.onMenuShareAppMessage({
      title: obj.AppShareTitle, // 分享标题
      desc: obj.AppShareDes, // 分享描述
      link: obj.AppShareLink, // 分享链接
      imgUrl: obj.AppShareImg, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function (res) {
          // 用户确认分享后执行的回调函数
          // service.weiKeShare();
      },
      cancel: function () {
          // 用户取消分享后执行的回调函数
      }
    });
  });
}
/**
 * 分享给朋友圈
 * @param shareModel
 */
export function shareFr(shareModel) {
  wx.ready(function () {
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: shareModel.AppShareTitle, // 分享标题
      link: shareModel.AppShareLink, // 分享链接
      imgUrl: shareModel.AppShareImg, // 分享图标
      success: function (res) {
        // 用户确认分享后执行的回调函数
        // service.weiKeShare();
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  });
}
/**
 * 分享到QQ
 * @param shareModel
 */
export function shareQQ(shareModel) {
  wx.ready(function () {
    //分享给QQ
    wx.onMenuShareQQ({
      title: shareModel.AppShareTitle, // 分享标题
      desc: shareModel.AppShareDes, // 分享描述
      link: shareModel.AppShareLink, // 分享链接
      imgUrl: shareModel.AppShareImg, // 分享图标
      success: function () {
          // 用户确认分享后执行的回调函数
          // service.weiKeShare();
      },
      cancel: function () {
          // 用户取消分享后执行的回调函数
      }
    });
  });
}

/**
 * 分享到微博
 * @param shareModel
 */
export function shareWeibo(shareModel) {
  wx.ready(function () {
    //发送到腾迅微博
    wx.onMenuShareWeibo({
      title: shareModel.AppShareTitle, // 分享标题
      desc: shareModel.AppShareDes, // 分享描述
      link: shareModel.AppShareLink, // 分享链接
      imgUrl: shareModel.AppShareImg, // 分享图标
      success: function () {
          // service.weiKeShare();
      },
      cancel: function () {
          // 用户取消分享后执行的回调函数
      }
    });
  });
}






























