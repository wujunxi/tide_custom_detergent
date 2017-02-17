require.config({
    baseUrl: './scripts',
    paths: {
        zepto: 'zepto.min',
        common: 'common.min'
    }
});
require(["zepto", "common"], function ($, common) {
    // 一级菜单数据
    var menu = {
        type: {index: 0, key: "type", val: "类型", type: "radio", subMenu: true},
        effect: {index: 1, key: "effect", val: "效果", type: "check", subMenu: true},
        smell: {index: 2, key: "smell", val: "香味", type: "radio", subMenu: true},
        color: {index: 3, key: "color", val: "颜色", type: "radio", subMenu: true},
        model: {index: 4, key: "model", val: "瓶型", type: "radio"},
        volume: {index: 5, key: "volume", val: "容量", type: "radio"},
        flag: {index: 6, key: "flag", val: "瓶标", type: "radio"},
        tip: {index: 7, key: "tip", val: "署名", type: "text"},
        gift: {index: 8, key: "gift", val: "礼盒", type: "radio"}
    };
    // 二级菜单数据
    var subMenu = {
        type: [{"key": "1", "val": "牛仔", "icon": "icon-niuzai"},
            {"key": "2", "val": "运动服", "icon": "icon-yundongfu"},
            {"key": "3", "val": "居家服", "icon": "icon-jujiafu"},
            {"key": "4", "val": "普通衣物", "icon": "icon-putongyiwu"},
            {"key": "5", "val": "高档布料", "icon": "icon-gaodangbuliao"},
            {"key": "6", "val": "内衣", "icon": "icon-neiyi"},
            {"key": "7", "val": "宝宝衣物", "icon": "icon-baobao"}],
        effect: [{"key": "1", "val": "洁净效果", "minVal": "1", "maxVal": "5", "icon": "icon-jiejing"},
            {"key": "2", "val": "除菌效果", "minVal": "1", "maxVal": "5", "icon": "icon-chujun"},
            {"key": "3", "val": "增白效果", "minVal": "1", "maxVal": "5", "icon": "icon-zengbai"},
            {"key": "4", "val": "护色效果", "minVal": "1", "maxVal": "5", "icon": "icon-huse"},
            {"key": "5", "val": "柔顺去静电", "minVal": "1", "maxVal": "5", "icon": "icon-roushun"}],
        smell: [{"key": "1", "val": "纯净雪莲", "icon": "icon-xuelian"},
            {"key": "2", "val": "养生甘草", "icon": "icon-gancao"},
            {"key": "3", "val": "薰衣草", "icon": "icon-xunyicao"},
            {"key": "4", "val": "缤纷花果", "icon": "icon-huaguo"},
            {"key": "5", "val": "清新柑橘", "icon": "icon-ganju"},
            {"key": "6", "val": "气质茉莉", "icon": "icon-moli"},
            {"key": "7", "val": "甜美樱桃", "icon": "icon-yingtao"}],
        color: [{"key": "1", "val": "无染料添加", "icon": "icon-wutianjia"},
            {"key": "2", "val": "天空蓝", "icon": "icon-tiankonglan"},
            {"key": "3", "val": "湖绿", "icon": "icon-hulv"},
            {"key": "4", "val": "樱桃粉", "icon": "icon-yingtaofen"}],
        flag: [{"key": "1", "val": "花"},
            {"key": "2", "val": "蝴蝶"},
            {"key": "3", "val": "织布"},
            {"key": "4", "val": "桃心"},
            {"key": "5", "val": "菱形"},
            {"key": "6", "val": "蒲公英"},
            {"key": "7", "val": "叶子"},
            {"key": "8", "val": "方块"},
            {"key": "9", "val": "圆圈"}],
        model: [{"key": "1", "val": "G型瓶"}],
        volume: [{"key": "1", "val": "500ml"}],
        gift: [{"key": "1", "val": "蓝色礼盒"},
            {"key": "2", "val": "绿色礼盒"},
            {"key": "3", "val": "粉色礼盒"},
            {"key": "4", "val": "紫色礼盒"}]
    };
    // 颜色样式表
    var colorClassTable = {
        1: "color-mibai",
        2: "color-tiankonglan",
        3: "color-hulv",
        4: "color-yingtaofen"
    };
    // 香味背景样式表
    var smellClassTable = {
        1: "smell-xuelian",
        2: "smell-gancao",
        3: "smell-xunyicao",
        4: "smell-huaguo",
        5: "smell-ganju",
        6: "smell-moli",
        7: "smell-yingtao"
    };
    // 瓶贴样式
    var labelClassTable = {
        "1": "label-hua",
        "2": "label-hudie",
        "3": "label-zhibu",
        "4": "label-taoxin",
        "5": "label-lingxing",
        "6": "label-pugongying",
        "7": "label-yezi",
        "8": "label-fangkuai",
        "9": "label-yuanquan"
    };

    // 礼盒样式
    var giftClassTable = {
        "1": "lihe-lan",
        "2": "lihe-lv",
        "3": "lihe-fen",
        "4": "lihe-zi"
    };

    // 定制结果
    var customObj = {
        model: "1",
        volume: "1",
        type: "",
        effect: [],
        color: "",
        smell: "",
        flag: "",
        tip: "",
        gift: ""
    };

    $(function () {
        var $body = $("body"),
            $divLoading = $("#divLoading"),
            $divNav = $("#divNav"),
            $spPrev = $("#spPrev"),
            $spNext = $("#spNext"),
            $spTitle = $("#spTitle"),
            $spPointer = $("#spPointer"),
            $spReagent = $("#spReagent"),
            $divStepOne = $("#divStepOne"),
            $btnBegin = $("#btnBegin"),
            $divStepTwo = $("#divStepTwo"),
            $divPanel = $("#divPanel"),
            $divSubPanel = $("#divSubPanel"),
            $divStage = $("#divStage"),
            $divBottleBG = $("#divBottleBG"),
            $divBottle = $("#divBottle"),
            $divMove,
            $divStepThree = $("#divStepThree"),
            $divStage2 = $("#divStage2"),
            $divBottleBG2 = $("#divBottleBG2"),
            $divBottle2 = $("#divBottle2"),
            $divPanel2 = $("#divPanel2"),
            $spTip = $("#spTip"),
            $tbTip = $("#tbTip"),
            $divInput = $("#divInput"),
            $spAdd = $("#spAdd"),
            $divStepFour = $("#divStepFour"),
            $divPanel3 = $("#divPanel3"),
            $divGiftBox = $("#divGiftBox"),
            $divStepFive = $("#divStepFive"),
            $ulField = $("#ulField"),
            $spModify = $("#spModify"),
            $spSure = $("#spSure");


        var cStep = 1, // 当前步骤
            isStepTwoInit = false,
            isStepThreeInit = false,
            isStepFourInit = false,
            moveStep, // 二级菜单移动步长
            moveWidth,// 二级菜单移动距离
            cMenu, // 当前选中一级菜单
            isSelectedColor = false, // 显示下一步指示
            timer = null,
            pageWith = $body.width();

        var numPick, muslin, infoDialog;

        bindEvent();

        /**
         * 事件绑定
         */
        function bindEvent() {
            // 导航
            $spNext.click(nextStep);
            $spPrev.click(prevStep);
            // ---------- 步骤一 ----------
            // 开始按钮
            $btnBegin.click(nextStep);
            // ---------- 步骤二 ----------
            // 点击一级菜单
            $divPanel.on("click", ".circle", function () {
                var $this = $(this),
                    i = $this.index();
                turn(i, $divPanel);
            });
            // 滑动一级菜单
            common.touch($divPanel).swipeRight(function () {
                //console.log("right");
                var cIndex = parseInt($divPanel.attr("data-index"));
                if (cIndex - 1 >= 0) {
                    turn(cIndex - 1, $divPanel);
                }
            }).swipeLeft(function () {
                //console.log("left");
                var cIndex = parseInt($divPanel.attr("data-index")),
                    total = $divPanel.children().length;
                if (cIndex + 1 < total) {
                    turn(cIndex + 1, $divPanel);
                }
            });
            // 点击二级菜单
            $divSubPanel.on("click", ".item", onSelectSubMenu);
            // ---------- 步骤三 ----------
            // 点击一级菜单
            $divPanel2.on("click", ".circle", function () {
                var $this = $(this),
                    i = $this.index();
                turn(i, $divPanel2);
            });
            // 滑动一级菜单
            common.touch($divPanel2).swipeRight(function () {
                //console.log("right");
                var cIndex = parseInt($divPanel2.attr("data-index"));
                if (cIndex - 1 >= 0) {
                    turn(cIndex - 1, $divPanel2);
                }
            }).swipeLeft(function () {
                //console.log("left");
                var cIndex = parseInt($divPanel2.attr("data-index")),
                    total = $divPanel2.children().length;
                if (cIndex + 1 < total) {
                    turn(cIndex + 1, $divPanel2);
                }
            });
            // ---------- 步骤四 ----------
            // 点击一级菜单
            $divPanel3.on("click", ".circle", function () {
                var $this = $(this),
                    i = $this.index();
                turn(i, $divPanel3);
            });
            // 滑动一级菜单
            common.touch($divPanel3).swipeRight(function () {
                //console.log("right");
                var cIndex = parseInt($divPanel3.attr("data-index"));
                if (cIndex - 1 >= 0) {
                    turn(cIndex - 1, $divPanel3);
                }
            }).swipeLeft(function () {
                //console.log("left");
                var cIndex = parseInt($divPanel3.attr("data-index")),
                    total = $divPanel3.children().length;
                if (cIndex + 1 < total) {
                    turn(cIndex + 1, $divPanel3);
                }
            });
            var matchWords = 0;
            // 署名输入框
            $tbTip.on("keyup", function (e) {
                var t = $tbTip.val();
                // 判断长度，字节长度不能超过18
                if (t.replace(/[^\x00-\xff]/g, "**").length > 18 && e.keyCode != "8") {
                    $tbTip.val(t.substr(0, matchWords));
                    return;
                } else {
                    matchWords = t.length;
                }
                // 长度过长时缩小
                if (t.replace(/[^\x00-\xff]/g, "**").length > 12) {
                    $spTip[0].style = "transform:scale(.4,.4) translateY(-1px)";
                } else {
                    $spTip[0].style = "transform:scale(.6,.6)";
                }
                $spTip.text(t);
            });
            // 在输入时，为了解决输入法挤变形布局，把一些元素隐藏掉
            $tbTip.on({
                "focus": function () {
                    $divInput.hide();
                    $spAdd.hide();
                    $body[0].style = "overflow-y:scroll;overflow-x:hidden;";
                }, "blur": function () {
                    $divInput.show();
                    $spAdd.show();
                    if($tbTip.val()){
                        $spPointer.show();
                    }else{
                        $spPointer.hide();
                    }
                    $body[0].style = "";
                    $spTip.text($tbTip.val());
                }
            });
            // 添加到购物车
            $spAdd.on("click", onAdd);
            $spModify.on("click", prevStep);
            $spSure.on("click", onApply);
            // ---------- 组件 ----------
            //遮盖层
            muslin = (function () {
                var $box = $(".muslin");
                var wrapObj = {
                    show: function () {
                        $box.show();
                        return wrapObj;
                    },
                    hide: function () {
                        $box.hide();
                        return wrapObj;
                    }
                };
                return wrapObj;
            })();
            //数字选择框
            numPick = (function (_opt) {
                var $box = $("#divNumPick"),
                    $add = $(".num-pick-add", $box),
                    $num = $(".num-pick-num", $box),
                    $minus = $(".num-pick-minus", $box),
                    $sure = $(".num-pick-sure", $box);
                var opt = $.extend({
                    min: 0,
                    max: 999
                }, _opt);
                var onClickSure = $.noop;
                var wrapObj = {
                    show: function () {
                        muslin.show();
                        $box.show();
                        return wrapObj;
                    },
                    hide: function () {
                        $box.hide();
                        muslin.hide();
                        return wrapObj;
                    },
                    val: function (v) {
                        if (arguments.length > 0) {
                            if (isNaN(parseInt(v))) {
                                return wrapObj;
                            }
                            $num.text(v);
                        } else {
                            return parseInt($num.text());
                        }
                        return wrapObj;
                    },
                    onSure: function (fun) {
                        onClickSure = fun;
                        return wrapObj;
                    }
                };
                $add.click(function () {
                    var v = wrapObj.val();
                    if (v < opt.max) {
                        wrapObj.val(v + 1);
                    }
                });
                $minus.click(function () {
                    var v = wrapObj.val();
                    if (v > opt.min) {
                        wrapObj.val(v - 1);
                    }
                });
                $sure.click(function () {
                    onClickSure(wrapObj.val());
                });
                return wrapObj;
            })({
                min: 1,
                max: 3
            });
            //提示信息对话框
            infoDialog = (function () {
                var $box = $("#divDialog"),
                    $content = $(".dialog-content", $box),
                    $sure = $(".dialog-sure", $box);
                var onSureClick;
                var wrapObj = {
                    show: function () {
                        muslin.show();
                        $box.show();
                        return wrapObj;
                    },
                    hide: function () {
                        $box.hide();
                        muslin.hide();
                        return wrapObj;
                    },
                    text: function (t) {
                        if (arguments.length > 0) {
                            $content.text(t);
                        } else {
                            return $content.text();
                        }
                        return wrapObj;
                    },
                    onSure: function (fun) {
                        onSureClick = fun;
                        return wrapObj;
                    }
                };
                $sure.click(function () {
                    onSureClick();
                });
                return wrapObj;
            })();
            // laoding切换
            $divStepOne.show();
            $divLoading.hide();
        }

        /**
         * 提交结果
         */
        function onApply() {
            var serial, price, id, k, item, jsonStr, subItem, temp, i, len;
            serial = "BJ-TIDE-" + ("000" + customObj.smell).substr(-3) + ("000" + customObj.flag).substr(-3);
            price = 19.9;
            id = $("#hdID").val();
            jsonStr = '{"serial":"' + serial + '","price":"' + price + '","id":"' + id + '",';
            for (k in customObj) {
                item = menu[k];
                if (item.type == "radio") {
                    subItem = common.findByAttr(subMenu[k], "key", customObj[k]);
                    temp = '"' + item.val + '":"' + subItem.val + '",';
                } else if (item.type == "check") {
                    temp = '"' + item.val + '":[';
                    for (i = 0, len = customObj[k].length; i < len; i++) {
                        subItem = common.findByAttr(subMenu[k], "key", customObj[k][i]);
                        temp += '"' + subItem.val + '",';
                    }
                    temp = temp.substr(0, temp.length - 1);
                    temp += '],'
                } else if (item.type == "text") {
                    temp = '"' + item.val + '":"' + customObj[k] + '",';
                }
                jsonStr += temp;
            }
            jsonStr = jsonStr.substr(0, jsonStr.length - 1);
            jsonStr += '}';
            $("#hdJsonStr").val(jsonStr);
            // console.log(jsonStr);
            $("#submitForm")[0].submit();
        }

        /**
         * 添加到购物车事件
         */
        function onAdd() {
            customObj.tip = $tbTip.val();
            var i, len, k, htmlStr = "", item, temp, subItem;
            // 配置结果校验
            for (k in customObj) {
                if (customObj[k].length == 0) {
                    alertInfo("还没有配置专属的" + menu[k].val);
                    return;
                }
            }
            // 配置信息
            for (k in customObj) {
                item = menu[k];
                if (item.type == "radio") {
                    subItem = common.findByAttr(subMenu[k], "key", customObj[k]);
                    temp = item.val + "：" + subItem.val;
                } else if (item.type == "check") {
                    temp = item.val + "：";
                    for (i = 0, len = customObj[k].length; i < len; i++) {
                        subItem = common.findByAttr(subMenu[k], "key", customObj[k][i]);
                        temp += subItem.val + "、";
                    }
                    temp = temp.substr(0, temp.length - 1);
                } else if (item.type == "text") {
                    temp = item.val + "：" + customObj[k];
                }
                htmlStr += '<li>' + temp + '</li>';
            }
            $ulField.html(htmlStr);
            $("#divStage4").remove();
            temp = $divStage2.clone();
            $(temp).attr({"id": "divStage4", "style": "margin:-280px 0 0 0;"});
            $divStepFive.prepend(temp);
            nextStep();
        }

        /**
         * 选中二级菜单事件
         */
        function onSelectSubMenu() {
            var $this = $(this),
                key = $this.attr("data-key"),
                degree = $this.attr("data-degree") || 1,
                $part = $this.closest(".part"),
                refreshType = "";
            if (cMenu.key == "type") {
                // 第一次选中类型时，如果没有瓶子颜色，则默认为1-原色
                if (customObj.color == "") {
                    customObj.color = "1";
                    refreshStage("color");
                }
            } else if (cMenu.key == "effect") {
                // 3-增白 4-护色不能同时选择
                if ((key == 3 && isSelect($part, 4) || (key == 4 && isSelect($part, 3)))) {
                    alertInfo("增白效果和护色效果不能同时选择！");
                    return;
                }
                // 选中效果后显示试剂图标
                $spReagent.show();
            } else if (cMenu.key == "smell") {
                refreshType = "smell";
            } else if (cMenu.key == "color") {
                $spPointer.show();
                isSelectedColor = true;
                refreshType = "color";
            }
            if (cMenu.type == "check") {
                $this.toggleClass("on");
            } else {
                // 非多选项，只能选中一个
                $(".on", $part).removeClass("on");
                $this.addClass("on");
            }
            refreshCache();
            if (refreshType) {
                refreshStage(refreshType);
            }
        }

        /**
         * 是否选中某一项
         * @param $part
         * @param key
         * @returns {boolean}
         */
        function isSelect($part, key) {
            var b = false;
            $part.find(".on").each(function () {
                var $this = $(this),
                    cKey = $this.attr("data-key");
                if (cKey == key) {
                    b = true;
                    return false;
                }
            });
            return b;
        }

        /**
         * 提示信息
         * @param t
         */
        function alertInfo(t) {
            infoDialog.text(t).onSure(function () {
                infoDialog.hide();
            }).show();
        }

        /**
         * 切换标题
         * @param i
         */
        function switchTitle(i) {
            $spTitle.remove();
            $spTitle.attr("class", "title title-" + (i + 1));
            $divNav.append($spTitle);
        }

        /**
         * 上一步
         */
        function prevStep() {
            $spPointer.hide();
            if (cStep == 2) { // 1 <- 2
                $divStepTwo.hide();
                $divStepOne.show();
                $divNav.hide();
                cStep--;
            } else if (cStep == 3) { // 2 <- 3
                $divStepThree.hide();
                $divStepTwo.show();
                if (isSelectedColor) {
                    $spPointer.show();
                }
                cStep--;
                switchTitle(cMenu.index);
            } else if (cStep == 4) { // 3 <- 4
                switchTitle(4);
                $spNext.show();
                $divStepThree.show();
                $divStepFour.hide();
                if ($tbTip.val()) {
                    $spPointer.show();
                }
                cStep--;
            } else if (cStep == 5) { // 4 <- 5
                $divNav.show();
                $divStepFour.show();
                $divStepFive.hide();
                cStep--;
            }
        }

        /**
         * 下一步
         */
        function nextStep() {
            $spPointer.hide();
            if (cStep == 1) { // 1 -> 2
                $divStepOne.hide();
                $divStepTwo.show();
                $divNav.show();
                cStep++;
                if (!isStepTwoInit) {
                    createSubPanel();
                    // 默认选中第一个
                    select(0, 0, $divPanel);
                    isStepTwoInit = true;
                }
            } else if (cStep == 2) { // 2 -> 3
                switchTitle(4);
                $divStepTwo.hide();
                $divStepThree.show();
                if($tbTip.val()){
                    $spPointer.show();
                }
                cStep++;
                if (!isStepThreeInit) {
                    // 默认选中第五个
                    select(4, 0, $divPanel2);
                    isStepThreeInit = true;
                }
            } else if (cStep == 3) { // 3 -> 4
                switchTitle(5);
                $divStepThree.hide();
                $divStepFour.show();
                $spNext.hide();
                cStep++;
                if (!isStepFourInit) {
                    // 默认选中第一个
                    select(0, 0, $divPanel3);
                    isStepFourInit = true;
                }
            } else if (cStep == 4) { // 4 -> 5
                $divNav.hide();
                $divStepFour.hide();
                $divStepFive.show();
                cStep++;
            }
        }

        /**
         * 轮转
         * @param i
         * @param $menu
         */
        function turn(i, $menu) {
            var cIndex = parseInt($menu.attr("data-index"));
            // if (i == cIndex) return;
            var d = Math.abs(cIndex - i);
            select(i, d, $menu);
        }

        /**
         * 选中菜单项
         * @param i
         * @param d
         * @param $menu
         */
        function select(i, d, $menu) {
            var k = $($menu.children()[i]).attr("data-key");
            // 一级菜单切换，设置过渡动画时长
            $menu.attr({
                "class": "panel tran-" + (d || 0), // tran-0 无动画效果
                "data-index": i,
                "data-key": k
            });
            // 依次修改菜单项位置
            $menu.children().each(function (j) {
                var $this = $(this),
                    classNames = $this.attr("class"),
                    hasP = classNames.indexOf("position") > -1,
                    p;
                if (j < i - 3 || j > i + 3) {
                    p = j < i - 3 ? 0 : 8;
                } else {
                    p = j - i + 4;
                }
                if (hasP) {
                    classNames = classNames.replace(/position-\w+/, "position-" + p);
                } else {
                    classNames += " position-" + p;
                }
                $this.attr("class", classNames);
            });
            if (cStep == 2) { // 步骤二选中属性
                // 切换标题
                switchTitle(i);
                switchSubMenu(i, d);
                cMenu = menu[k];
                if (cMenu.key == "color" && isSelectedColor) {
                    $spPointer.show();
                } else {
                    $spPointer.hide();
                }
            } else if (cStep == 3) { // 步骤三选中瓶贴
                refreshCache();
                refreshStage("label");
            } else if (cStep == 4) {
                refreshCache();
                refreshStage("gift");
            }
        }

        /**
         * 切换二级菜单
         * @param i 序号
         * @param d 跨度
         */
        function switchSubMenu(i, d) {
            // 设置过渡动画时长
            $divSubPanel.attr("class", "sub-panel tran-" + (d || 1));
            // 二级菜单切换
            var style, l;
            // 动画步长控制
            l = -i * moveStep;
            style = "width:" + moveWidth + "px;transform:translate(" + l + "px,0)";
            $divMove.attr("style", style);
        }

        /**
         * 刷新缓存
         */
        function refreshCache() {
            var $part, $elem, isChange = false, key, array = [];
            if (cStep == 2 && cMenu) {
                $part = $divSubPanel.find(".part").eq(cMenu.index);
                // 是否多选
                if (cMenu.type == "check") {
                    $(".on", $part).each(function () {
                        var $this = $(this),
                            k = $this.attr("data-key"),
                            d = $this.attr("data-degree");
                        k = d ? k + "-" + d : k;
                        array.push(k);
                    });
                    key = customObj[cMenu.key] || [];
                    if (key.join(",") != array.join(",")) {
                        isChange = true;
                        customObj[cMenu.key] = array;
                    }
                } else {
                    $elem = $(".on", $part);
                    if ($elem.length > 0) {
                        key = $elem.attr("data-key");
                    } else {
                        key = "";
                    }
                    if (customObj[cMenu.key] != key) {
                        isChange = true;
                        customObj[cMenu.key] = key;
                    }
                }
            } else if (cStep == 3) {
                key = $divPanel2.attr("data-key");
                if (customObj.flag != key) {
                    customObj.flag = key;
                    isChange = true;
                }
            } else if (cStep == 4) {
                key = $divPanel3.attr("data-key");
                if (customObj.gift != key) {
                    customObj.gift = key;
                    isChange = true;
                }
            }
            // 有属性变化时输出
            if (isChange) {
                console.log(customObj);
            }
        }

        /**
         * 刷新展示台
         * @param type color smell label gift
         */
        function refreshStage(type) {
            var temp, isAll = arguments.length == 0;
            // 更新香味背景
            if (isAll || type.indexOf("smell") != -1) {
                $divBottleBG.remove();
                temp = smellClassTable[customObj.smell] || "";
                $divBottleBG.attr("class", "stage-bg " + temp);
                $divStage.prepend($divBottleBG);
                temp = smellClassTable[customObj.smell] || "";
                $divBottleBG2.attr("class", "stage-bg " + temp);
            }
            // 更新颜色
            if (isAll || type.indexOf("color") != -1) {
                temp = colorClassTable[customObj.color] || "color-mibai";
                $divBottle.attr("class", "stage-bd " + temp);
            }
            // 更新瓶标
            if (isAll || type.indexOf("label") != -1) {
                temp = labelClassTable[customObj.flag] || "bottle-std";
                $divBottle2.attr("class", "stage-bd " + temp);
            }
            // 更新礼品盒
            if (isAll || type.indexOf("gift") != -1) {
                temp = giftClassTable[customObj.gift] || "";
                $divGiftBox.attr("class", "stage-bd " + temp);
            }
        }

        /***
         * 构造二级菜单块
         */
        function createSubPanel() {
            var items,
                htmlStr = "",
                k, len, n, w;
            moveStep = w = $divSubPanel.width();
            n = 0;
            for (k in menu) {
                if (!menu[k].subMenu) {
                    continue;
                }
                n++;
                items = subMenu[k];
                len = items.length;
                // 布局判断
                if (len < 5) { // < 5 one row
                    htmlStr += createSubMenu(items, 0, 0, w);
                } else if (len == 5) {// 5 3-2
                    htmlStr += createSubMenu(items, 3, 2, w);
                } else if (len == 6) {// 6 3-3
                    htmlStr += createSubMenu(items, 3, 3, w);
                } else if (len == 7) {// 7 4-3
                    htmlStr += createSubMenu(items, 4, 3, w);
                } else if (len == 8) {// 8 4-4
                    htmlStr += createSubMenu(items, 4, 4, w);
                }
            }
            moveWidth = n * w;
            htmlStr = '<div class="sub-panel-bd" style="width:' + moveWidth + 'px">' + htmlStr + '</div>';
            $divMove = $(htmlStr);
            $divSubPanel.append($divMove);
        }

        /**
         * 构建二级菜单
         * @param items
         * @param r1 第一行个数
         * @param r2 第二行个数
         * @param w 二级菜单宽度
         * @returns {string}
         */
        function createSubMenu(items, r1, r2, w) {
            r1 = r1 || items.length;
            r2 = r2 || 0;
            var htmlStr = "",
                i, len, temp, item;
            htmlStr += '<div class="row">';
            for (i = 0, len = r1; i < len; i++) {
                htmlStr += subMenuItem(items[i]);
            }
            // 第二行
            if (r2 != 0) {
                htmlStr += '</div><div class="row">';
                temp = "";
                for (i = 0, len = r2; i < len; i++) {
                    temp += subMenuItem(items[r1 + i]);
                }
                // 是否需要前后补空
                if ((r1 == 3 && r2 == 2) || (r1 == 4 && r2 == 3)) {
                    temp = '<div class="item none"></div>' + temp + '<div class="item none"></div>';
                }
                htmlStr += temp;
            }
            htmlStr += '</div>';
            // 包裹一个作为根节点
            htmlStr = '<div class="part" style="width:' + w + 'px;float:left;">' + htmlStr + '</div>';
            return htmlStr;
        }

        /**
         * 二级菜单项
         * @param item
         * @returns {string}
         */
        function subMenuItem(item) {
            var key, val, max, min, icon, className;
            key = item.key || '';
            val = item.val || '';
            max = item.max || '';
            min = item.min || '';
            icon = item.icon || '';
            className = "item " + icon;
            if (item.star) {
                className += " star";
            }
            if (item.on) {
                className += " on";
            }
            return '<div class="item-wrap"><span class="' + className + '" data-key="' + key + '" data-max="' + max + '" data-min="' + min + '"></span></div>';
        }
    });
});