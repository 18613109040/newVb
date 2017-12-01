import Cookie from "js-cookie";

/**
 * @desc 链接数组对象里的某个属性,并返回一个数组，如 [{mis_doctor_id:123},{mis_doctor_id:3497}] 返回数组[123, 3497]
 * @param arr
 * @param prop
 * @returns {Array}
 */
export function getArrProp(arr, prop) {
    let result = [];
    if (!arr) return result;
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i][prop])
    }
    return result;
}

export function encodeSign(num) {
    return 0 | Math.pow(2, num);
}

//按位解析位和,返回array
export function decodeSignList(signSum, map) {
    let result = [];
    Object.keys(map).forEach((item) => {
        if (decodeSign(signSum, item)) {
            result.push(map[item])
        }
    });
    return result;
}

//价格转换 digit:精确到小数点后多少位,不传精确到元, 传则精确到相关位, 最大4位
export function convertPrice(price, digit = 0) {
    let tarPrice = parseInt(price);
    if (price < 100) {
        return tarPrice.toFixed(digit)
    } else {
        return (tarPrice / 10000).toFixed(digit)
    }
}

//性别转换
export function convertGender(genderCode) {
    switch (genderCode.toString()) {
        case '0':
            return '未填写';
            break;
        case '1':
            return '男';
            break;
        case '2':
            return '女';
            break;
        default:
            return '';
    }
}

/**
 * @description 时间转换,处理13位的时间戳(毫秒)
 * @param timeStamp 13位的时间戳(毫秒)
 * @param fmt 输出的时间格式 string 'yyyy-MM-dd hh:mm:ss'
 */
export function convertTimeToStr(timeStamp, fmt = 'yyyy-MM-dd hh:mm:ss') {
    let date, k, o, tmp;
    if (!timeStamp) {
        return false;
    }
    if (typeof timeStamp == 'string') {
        timeStamp = parseInt(timeStamp)
    }
    //如果是10位数,则乘以1000转换为毫秒
    if (timeStamp.toString().length == 10) {
        timeStamp = timeStamp * 1000
    }
    date = new Date(timeStamp);
    o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                tmp = RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length);
                fmt = fmt.replace(RegExp.$1, tmp);
            }
        }
    }
    return fmt
}

/**
 * @description 时间转换,将时间字符串转为时间戳
 * @param dateStr 日期字符串
 * @param isSecond 为true则输出10位时间戳(秒),默认为13位(毫秒)
 * @returns {number}
 */
export function convertStrToStamp(dateStr, isSecond = false) {
    if (!dateStr) {
        return '';
    }
    let date = new Date(dateStr);
    if (date.toString() == 'Invalid Date') {
        console.error('[convertStrToStamp]: 日期格式错误.');
    } else {
        return isSecond ? Math.round(date.getTime() / 1000) : date.getTime();
    }
}

/**
 * @description 参数处理,处理一个对象,剔除其中值为空的项,返回有值的项.用在发送参数的时候处理参数对象.
 * @param object 输入的参数对象
 * @returns {*}
 */
export function handleParams(object) {
    if (typeof object !== 'object') return false;
    let keys = Object.keys(object), res = {};
    if (keys.length) {
        keys.forEach(item => {
            if (object[item] && object[item] != '') {  //目标参数value存在(不为null/undefined/false,或空字符串)
                res[item] = object[item];
            }
        })
    }
    return res;
}

/**
  * @description 将对象转换为URL字符串,方便发送或存储
  * @param o 将要转为URL参数字符串的对象
  * @param key URL参数字符串的前缀
  * @param encode true/false 是否进行URL编码,默认为true
  * @return string URL参数字符串
 **/
export function objToUrlString(o, key, encode) {
    if (o == null) return '';
    var fn = function (obj, key, encode) {
        var paramStr = '',
            t = typeof (obj);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(obj) : obj);
        } else {
            for (var i in obj) {
                var k = key == null ? i : key + (obj instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += fn(obj[i], k, encode);
            }
        }
        return paramStr;
    };
    var result = fn(o, key, encode);
    return result.substr(1)
}

/**
 * @description url字符串转换成对象
 * @param string
 * @returns {{}}
 */
export function urlStringToObj(string) {
    'use strict';
    var params = {},
        q = string ? string : window.location.search.substring(1),
        e = q.split('&'),
        l = e.length,
        f,
        i = 0;
    for (i; i < l; i += 1) {
        f = e[i].split('=');
        params[f[0]] = decodeURIComponent(f[1]);
    }
    return params;
}


/**
 * @description 从cookie中取用户信息,返回用户对象
 * @returns {{user_id: (*|boolean), login_id: (*|boolean), open_id: (*|boolean), user_role: (*|boolean), cur_role: (*|boolean)}}
 */
export function getUser() {
    if (typeof document !== 'undefined' && window) {
        return {};
    }
}

/**
 * @description 清理当前用户信息
 */
export function cleanUser() {
    if (typeof document !== 'undefined' && window) {
        let domainName = window.location.hostname;
        Cookie.remove("user_id", {domain: domainName});
        storage.removeArr(["user_id"])
    }
}


/**
 * @description 本地存储包装器
 * @param type不传默认为 localStorage, 传 session 为 sessionStorage
 */
export let storage = {
    checkWindow() {
        if (!window) {
            console.warn("[Storage] === Storage can ONLY used in browser.");
            return false;
        }
        return true;
    },
    checkSupport(type) {
        let winFlag = this.checkWindow();
        if (winFlag && window[type]) {
            return true
        } else {
            console.warn(`[Storage] === ${type} Storage is NOT supported.`);
            return false
        }
    },
    checkType(type) {
        if (type && type == 'session') {
            return 'sessionStorage'
        } else {
            return 'localStorage'
        }
    },
    setObj(obj, type) {
        Object.keys(obj).forEach((item) => {
            this.set(item, obj[item], type);
        })
    },
    set(key, value, type) {
        var curTime = new Date().getTime();
        let target = this.checkType(type);
        if (this.checkSupport(target)) {
            if(typeof(value)=="string" || Array.isArray(value))
               return window[target].setItem(key, JSON.stringify(value))
            else {
                let data=Object.assign({},value,{time:curTime})
                return window[target].setItem(key,JSON.stringify(data))
            }


        }
    },
    get(key,exp,type) {
        let target = this.checkType(type);
        if (this.checkSupport(target)) {
            if (window[target][key] && window[target][key] !== 'undefined') {
                let data=JSON.parse(window[target][key])
                if(exp>0){
                    if (new Date().getTime() - data.time>exp) {
                        console.log('信息已过期');

                    }else{
                        return data
                    }
                }else{
                     return data
                }
            } else {

                return window[target][key]
            }
        }
    },

    removeArr(arr, type) {
        if (Array.isArray(arr) && arr.length) {
            arr.forEach((item) => {
                this.remove(item, type)
            })
        } else {
            console.warn("[Storage] === Params must be an array.");
        }
    },
    remove(key, type) {
        let target = this.checkType(type);
        if (this.checkSupport(target)) {
            if (window[target][key] && window[target][key] !== 'undefined') {
                return window[target].removeItem(key)
            }
        }
    },
    clear(type) {
        let target = this.checkType(type);
        window[target].clear();
    },
};

/**
 * @desc 格式化一个对象为字符串如 name=pat&city_no=020&old=99;
 * @param data string
 **/
export function parseParams(data) {
    if (data == null) {
        return '';
    }
    let list = [];
    for (let item in data) {
        list.push(`${item}=${data[item]}`)
    }
    return list.join("&");
}

/**
 * @description 频率控制 返回函数连续调用时，func 执行频率限定为 次 / wait --
 * @param  {function}   func      传入函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始边界上的调用，传入{leading: false}。
 *                                如果想忽略结尾边界上的调用，传入{trailing: false}
 * @return {function}             返回客户调用函数
 */
export function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    // 上次执行时间点
    var previous = 0;
    if (!options) options = {};
    // 延迟执行函数
    var later = function () {
        // 若设定了开始边界不执行选项，上次执行时间始终为0
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        var now = Date.now();
        // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
        if (!previous && options.leading === false) previous = now;
        // 延迟执行时间间隔
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
        // remaining大于时间窗口wait，表示客户端系统时间被调整过
        if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
            //如果延迟执行不存在，且没有设定结尾边界不执行选项
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

/**
 * @description 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
export function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function () {
        // 据上一次触发时间间隔
        var last = Date.now() - timestamp;
        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };
    return function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}

/**    TODO
 * 获取URL中的参数，类似"key=aaa&name=aaa"
 * @name    参数名，如"key"
 */
export function getUrlPara(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

/**
 * 开始日期与结束日期，然后根据这个日期范围来列出之间每天的日期
 *@start_time @end_time 格式 yyyy-mm-dd
 */
export function getdayByStartToEnd(start_time, end_time) {
    let bd = new Date(start_time), be = new Date(end_time);
    let bd_time = bd.getTime(), be_time = be.getTime(), time_diff = be_time - bd_time;
    let d_arr = [];
    for (let i = 0; i <= time_diff - 1; i += 86400000) {
        let ds = new Date(bd_time + i);
        d_arr.push(ds.getFullYear() + "-" + (ds.getMonth() + 1) + '-' + ds.getDate())
    }
    return d_arr
}

//图片转base64
export function urlToBase64(url, callback) {
    if (b64datas[url]) {
        callback && callback(b64datas[url]);
        return;
    }
    var image = new Image();
    image.onload = function () {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');

        canvas.width = this.width;
        canvas.height = this.height;
        ctx.drawImage(this, 0, 0);

        var b64data = b64datas[url] = canvas.toDataURL('base64');
        callback && callback(b64data);
    };
    image.src = url;
}

