import {Injectable} from "@angular/core";
import {AlertController, LoadingController, ToastController, Loading} from "ionic-angular";

declare let $: any;

@Injectable()
export class AppGlobal {
  //缓存key的配置
  static cache: any = {
    slides: "_dress_slides",
    categories: "_dress_categories",
    products: "_dress_products",
  }
  //接口基地址
  static domain = "http://212.64.57.254:8080/swtaobao3";
  static porxyUrl = "http://127.0.0.1:3001/api/url";

  static API: any = {
    // 首页
    getTopData: '/api/top',
    // 商品详细
    getTopDetail: '/api/detail',
    // 商品口令
    getShortUrl: '/api/shorturl',

    // 首页最高销售
    getTopSell: '/api/topsell',

    // 搜索
    getSearchUrl: '/search/se',
    getSearchkey: 'http://127.0.0.1:3001/api/key',

    // 搜索热词
    getSearchHotKeyWord: '/search/hot',

    // 热门销售
    getTopProductData: '/three/top',
    getTopProductData2: 'http://127.0.0.1:3001/three/topproduct',
    // 热门销售分类
    getTopCate: '/three/cate',


  };
}

@Injectable()
export class AppService {

  private globalLoading: Loading = null;

  constructor(public loadingCtrl: LoadingController,
              private alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  private handleError(error: Response | any) {
    let msg = '';
    if (error.status == 400) {
      msg = '请求无效(code：404)';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在(code：404)';
      console.error(msg + '，请检查路径是否正确');
    }
    if (error.status == 500) {
      msg = '服务器发生错误(code：500)';
      console.error(msg + '，请检查路径是否正确');
    }
    console.log(error);
    if (msg != '') {
      this.toast(msg);
    }
  }

  /**
   * 参数编码
   * @param params
   * @returns {string}
   */
  encode(params) {
    var str = '';
    if (params) {
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          var value = params[key]
          str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
        }
      }
      str = '?' + str.substring(0, str.length - 1);
    }
    return str;
  }

  /**
   * http get 函数
   * @param url
   * @param params
   * @param callback
   * @param {boolean} loader
   */
  httpGet(pkurl, params, callback, loader: boolean = false) {
    let loading = this.loadingCtrl.create({});
    if (loader) {
      loading.present();
    }
    let resultParams = params;
    resultParams.pkurl = AppGlobal.domain + pkurl;
    resultParams.m = "GET";
    if (pkurl.indexOf('http')>=0){
      resultParams.pkurl = pkurl;
    }

    var self = this;
    $.ajax({
      type: 'POST',
      url: AppGlobal.porxyUrl,
      contentType:"application/x-www-form-urlencoded",
      data: resultParams,
      success: function (res) {
        try {
          var d = res;
          if (loader) {
            loading.dismiss();
          }
          let result = d == null ? "[]" : d;
          callback(JSON.parse(result));
        }catch (e){
          if (loader) {
            loading.dismiss();
          }
          self.handleError(e)
        }
      },
      error: function (error) {
        if (loader) {
          loading.dismiss();
        }
        self.handleError(error)
      }

    });

  }

  /**
   * http post 函数
   * @param url
   * @param params
   * @param callback
   * @param {boolean} loader
   */
  httpPost(pkurl, params, callback, loader: boolean = false) {
    let loading = this.loadingCtrl.create();
    if (loader) {
      loading.present();
    }
    let resultParams = params;
    resultParams.pkurl = AppGlobal.domain + pkurl;
    resultParams.m = "POST";
    if (pkurl.indexOf('http')>=0){
      resultParams.pkurl = pkurl;
    }

    var self = this;
    $.ajax({
      type: 'POST',
      url: AppGlobal.porxyUrl,
      contentType:"application/x-www-form-urlencoded",
      data: resultParams,
      success: function (res) {
        var d = res
        if (loader) {
          loading.dismiss();
        }
        let result = d == null ? "[]" : d;
        callback(JSON.parse(result));
      },
      error: function (error) {
        if (loader) {
          loading.dismiss();
        }
        self.handleError(error)
      }

    });
  }

  /**
   * 全局 Alert
   * @param message
   * @param callback
   */
  alert(message, callback?) {
    if (callback) {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: [{
          text: "确定",
          handler: data => {
            callback();
          }
        }]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: '提示',
        message: message,
        buttons: ["确定"]
      });
      alert.present();
    }
  }

  /**
   * 全局 Toast
   * @param message
   * @param callback
   */
  toast(message, callback?) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      dismissOnPageChange: true,
    });
    toast.present();
    if (callback) {
      callback();
    }
  }

  /**
   * 全局 显示 Loading
   * @param message
   * @param callback
   */
  showLoading() {
    if (this.globalLoading==null){
      this.globalLoading = this.loadingCtrl.create({});
      this.globalLoading.present();
    }
  }

  /**
   * 全局 隐藏 Loading
   * @param message
   * @param callback
   */
  hideLoading() {
    if (this.globalLoading!=null){
      this.globalLoading.dismissAll();
      this.globalLoading = null;
    }
  }



  /**
   * 设置全局参数
   * @param {string} key
   * @param obj
   */
  setItem(key: string, obj: any) {
    try {
      var json = JSON.stringify(obj);
      window.localStorage[key] = json;
    }
    catch (e) {
      console.error("window.localStorage error:" + e);
    }
  }

  /**
   * 获取全局参数
   * @param {string} key
   * @param callback
   */
  getItem(key: string, callback) {
    try {
      var json = window.localStorage[key];
      var obj = JSON.parse(json);
      callback(obj);
    }
    catch (e) {
      console.error("window.localStorage error:" + e);
    }
  }


    encodeSearchKey(key) {
        const encodeArr = [{
            code: '%',
            encode: '%25'
        }, {
            code: '?',
            encode: '%3F'
        }, {
            code: '#',
            encode: '%23'
        }, {
            code: '&',
            encode: '%26'
        }, {
            code: '=',
            encode: '%3D'
        }];
        return key.replace(/[%?#&=]/g, ($, index, str) => {
            for (const k of encodeArr) {
                if (k.code === $) {
                    return k.encode;
                }
            }
        });
    }

}
