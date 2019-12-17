/**
 * 正则表达式
 * @type {{phone: RegExp}}
 */
//手机
export const phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
//qq
export const qq = /^[1-9]\d{4,13}$/;
//邮箱
export const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//身份证号
export const identity_card = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//银行卡号
export const bank_card = /^([1-9])(\d{12}|\d{15}|\d{18})$/;


export const isIDCard = (A) => {
    var t = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
    if (!A || "" == A || void 0 === A) return !1;
    if (A = A.toUpperCase(), !/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(A)) return !1;
    if (void 0 == t[A.substr(0, 2)]) return !1;
    var n = A.length,
        e = void 0;
    if (15 == n) {
        e = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var r = A.match(e),
            i = new Date("19" + r[2] + "/" + r[3] + "/" + r[4]);
        if (i.getYear() == Number(r[2]) && i.getMonth() + 1 == Number(r[3]) && i.getDate() == Number(r[4])) {
            var o = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2),
                c = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"),
                u = 0,
                s = void 0;
            for (A = A.substr(0, 6) + "19" + A.substr(6, A.length - 6), s = 0; s < 17; s++) u += A.substr(s, 1) * o[s];
            return A += c[u % 11], !0
        }
        return !1
    }
    if (18 == n) {
        e = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var a = A.match(e),
            f = new Date(a[2] + "/" + a[3] + "/" + a[4]);
        if (f.getFullYear() == Number(a[2]) && f.getMonth() + 1 == Number(a[3]) && f.getDate() == Number(a[4])) {
            var g = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2),
                h = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"),
                l = 0,
                B = void 0;
            for (B = 0; B < 17; B++) l += A.substr(B, 1) * g[B];
            return h[l % 11] == A.substr(17, 1)
        }
        return !1
    }
}