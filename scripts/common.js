define(["zepto", "exports"], function ($, exports) {

    var AJAX_SUCC = "00", // 成功返回码
        NOT_LOGIN = "0004"; // 未登录返回码

    exports.AJAX_SUCC = AJAX_SUCC;
    exports.NOT_LOGIN = NOT_LOGIN;

    /**
     * 根据属性值查找数组
     * @param array
     * @param attrName
     * @param value
     * @returns {*}
     */
    exports.findByAttr = function(array,attrName,value){
        var i,len,item;
        for(i = 0,len = array.length;i<len;i++){
            item = array[i];
            if(item[attrName] == value){
                return item;
            }
        }
        return null;
    };

    /**
     * 异步请求
     * 二次封装，对登陆超时和返回错误信息进行处理
     * @param options
     * @param callbackFun
     * @param errorFun
     * @param errTimeoutFun
     */
    exports.ajax = function(options, callbackFun, errorFun, errTimeoutFun){
        if (!options || !options.url) {
            $(callbackFun(false));
            return;
        }
        var opt = $.extend({
            url: "", // 请求地址
            cache: false, // 设置为 false 将不会从浏览器缓存中加载请求信息
            type: "get", // 请求方式
            data: {}, // 发送到服务器的数据
            dataType: "json", // 数据类型
            timeout: 6000, // 请求时长
            jsonp: "",
            display: "系统繁忙，请稍后重试",
            async: true, // 是否异步
            handleError: false // 是否处理异常
        }, options);
        var errUrl = '/error_receiver.html', // 错误接受页面，产生错误日志用
            loginUrl = "/login.html?backurl=" + encodeURI(top.location.href); // 超时登陆页
        $.ajax({
            url: opt.url,
            cache: opt.cache,
            type: opt.type,
            data: opt.data,
            dataType: opt.dataType,
            timeout: opt.timeout,
            async: opt.async,
            success: function (retData) {
                var code, msg, uid;
                if (opt.dataType.toLowerCase() === 'json') {
                    code = retData.code;
                    msg = retData.msg;
                    uid = retData.uid;
                }
                if (code != AJAX_SUCC) {
                    // 发送错误报告
                    $.get(errUrl, {
                        code: code,
                        msg: msg,
                        display: opt.display,
                        url: opt.url,
                        data: opt.data,
                        uid: uid || ""
                    });
                    if (opt.handleError) {
                        // 未登陆或超时
                        if (code == NOT_LOGIN) {
                            top.location.href = loginUrl;
                        } else {
                            alert(msg);
                            if (errorFun) {
                                errorFun();
                            }
                            return;
                        }
                    }
                }
                //回调函数
                $(callbackFun(retData));
            },
            error: function (request, textStatus, errorThrown) {
                //执行报错方法
                if (errorFun && errorFun != "" && textStatus != "timeout") {
                    errorFun();
                } else if (errTimeoutFun && errTimeoutFun != "" && textStatus == "timeout") {
                    errTimeoutFun();//超时
                } else if (textStatus == "timeout") {
                    alert("请求超时！");
                }
                // 发送错误报告
                $.get(errUrl, {
                    code: '-1',
                    msg: '',
                    display: 'timeout or unknow error',
                    url: opt.url,
                    data: opt.data,
                    uid: ""
                }); // end $.get
            } // end error
        });// end $.ajax
    };// end exports.ajax

    /**
     * 格式化以分为单位的数值，保留两位小数，并用逗号每三位隔离
     * @param str 待格式化的字符串，只允许数字或首字为负号
     */
    exports.fmoney = function (str) {
        str = "" + str;
        var flag,
            len,
            result;
        // 校验入参格式
        if (!/^-?\d+$/.test(str)) {
            throw "fmoney:error param!";
        }
        // 判断是否有负号
        flag = (str[0] == "-");
        if (flag) {
            str = str.substring(1);
        }
        len = str.length;
        if (len == 1) {
            result = "0.0" + str;
        } else if (len == 2) {
            result = "0." + str;
        } else {
            var part1, part2, ar;
            part1 = str.substr(0, len - 2);
            part2 = str.substr(len - 2, 2);
            if (len < 6) {
                result = part1 + "." + part2;
            } else {
                ar = part1.split("");
                // 倒插逗号
                for (var i = ar.length - 3; i > 0; i -= 3) {
                    ar.splice(i, 0, ",");
                }
                result = ar.join("") + "." + part2;
            }
        }
        // 将负号添加回去
        return (flag ? "-" : "") + result;
    };

    /**
     * 获得url中的Query对象
     * @param params
     * @returns {{}}
     */
    exports.getQueryObj = function (params) {
        if (!params) {
            params = window.location.search;
        }
        return exports.param2Obj(params, true);
    };

    /**
     * obj转换成参数串(encodeURI)
     * @param {Object} obj {'a':'1', 'b':'中国'}
     * @return {String} a=1&b=中国
     */
    exports.obj2Param = function (obj) {
        var str = "";
        for (var k in obj) {
            str += "&" + k + "=" + encodeURIComponent(obj[k].toString());
        }
        if (str != "") {
            str = str.substring(1, str.length);
        }
        return str;
    };

    /**
     * 将url中的query string转化为Object
     * @param params query string
     * @param isDecode boolean
     * @returns {{}}
     */
    exports.param2Obj = function (params, isDecode) {
        var obj = {};
        if (params != null && params != undefined && params != "") {
            params = params.replace(/\?/, "");
            var arr = params.split('&');
            for (var index = 0; index < arr.length; index++) {
                var pair = arr[index];
                var indexOf = pair.indexOf('=');
                if (indexOf != -1) {
                    var name = pair.substring(0, indexOf);
                    var val = "";
                    if (indexOf != pair.length - 1) {
                        val = pair.substring(indexOf + 1);
                    }
                    if (isDecode) {
                        obj[name] = decodeURIComponent(val);
                    } else {
                        obj[name] = val;
                    }
                } else {
                    obj[pair] = "";
                }
            }
        }
        return obj;
    };

    /**
     * 提示
     */
    exports.tip = (function () {
        var isInit = false,
            $box,
            timer;
        var wrapObj = {
            init: function () {
                if (isInit) return wrapObj;
                var htmlStr = '<div style="display:block;' +
                    'width:100%;line-height:30px;' +
                    'position:fixed;top:0;color:#fff;background:#e44545;' +
                    'text-align:center;font-family:微软雅黑;' +
                    '-webkit-transition: opacity 2s linear;' +
                    '-moz-transition: opacity 2s linear;' +
                    '-o-transition: opacity 2s linear;' +
                    'transition: opacity 2s linear;opacity:0;z-index:10;"></div>';
                $box = $(htmlStr).appendTo("body");
                isInit = true;
                return wrapObj;
            },
            show: function (text) {
                if (!isInit) this.init();
                if (timer) clearTimeout(timer);
                $box.text(text).css("opacity", "100");
                timer = setTimeout(function () {
                    $box.css("opacity", "0");
                }, 2000);
                return wrapObj;
            }
        };

        return wrapObj;
    })();

    /**
     * 错误提示
     * @param text
     */
    exports.tipError = function (text) {
        exports.tip.show(text);
    };

    /**
     * 触摸事件绑定
     * @param selector
     * @param _opt
     * @returns {{moveRight: wrapObj.moveRight, moveLeft: wrapObj.moveLeft, swipLeft: wrapObj.swipLeft, swipRight: wrapObj.swipRight}}
     */
    exports.touch = function(selector,_opt){
        var opt = $.extend({
            tolerance:0
        },_opt);

        var _x, _y;
        var onMoveRight,
            onMoveLeft,
            onSwipeRight,
            onSwipeLeft;

        onMoveRight = onMoveLeft = onSwipeRight = onSwipeLeft = function(){};

        $(selector).on("touchstart",_touchHandle);
        $(selector).on("touchmove",_touchHandle);
        $(selector).on("touchend",_touchHandle);

        var wrapObj = {
            moveRight:function(fun){
                onMoveRight = fun;
                return wrapObj;
            },
            moveLeft:function(fun){
                onMoveLeft = fun;
                return wrapObj;
            },
            swipeLeft:function(fun){
                onSwipeLeft = fun;
                return wrapObj;
            },
            swipeRight:function(fun){
                onSwipeRight = fun;
                return wrapObj;
            }
        };

        return wrapObj;

        function _touchHandle(e){
            //console.log(e,e.type);
            var t = e.type,
                x = e.changedTouches[0].clientX,
                y = e.changedTouches[0].clientY,
                d;
            //console.log(x,y);
            if (t == "touchstart") { // 在开始事件中保存初始位置
                _x = x;
                _y = y;
            } else if (t == "touchmove") { // 在移动事件中跟随
                d = x -_x;
                if (d > opt.tolerance) {
                    onMoveRight(e,d);
                    e.preventDefault();
                } else if (d < - opt.tolerance) {
                    onMoveLeft(e,d);
                    e.preventDefault();
                }
            } else if (t == "touchend") { // 在结束事件中判断左右滑动
                d = x - _x;
                if (d > opt.tolerance) {
                    onSwipeRight(e,d);
                } else if (d < - opt.tolerance) {
                    onSwipeLeft(e,d);
                }
            }
        }
    };

    /**
     * 日期格式化
     * @param formatStr
     * @returns {*}
     * @constructor
     */
    Date.prototype.Format = function (formatStr) {
        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        //var Week = ['7','1','2','3','4','5','6'];

        str = str.replace(/yyyy|YYYY/, this.getFullYear());
        str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

        str = str.replace(/mm/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
        str = str.replace(/m/g, this.getMonth());

        str = str.replace(/w|W/g, Week[this.getDay()]);

        str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
        str = str.replace(/d|D/g, this.getDate());

        str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
        str = str.replace(/h|H/g, this.getHours());
        str = str.replace(/MM/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
        str = str.replace(/M/g, this.getMinutes());

        str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
        str = str.replace(/s|S/g, this.getSeconds());

        return str;
    };
});