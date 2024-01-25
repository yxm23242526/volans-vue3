/**
 * 规则校验类，一般是正则表达式
 * 
 * @param value 校对字符串
 * @returns 
 */

export function validateAccount(value) {
    return true
}

export function validatePassword(value) {
    return true
}

/**
 * 验证正数和一位小数
 * @param value
 * @returns {*}
 */
export function verifyNumberIntegerAndFloat(value) {
    // 匹配空格
    let v = value.replace(/(^\s*)|(\s*$)/g, '');
    // 只能是数字和小数点，不能是其他输入
    v = v.replace(/[^\d.]/g, '');
    // 以0开始只能输入一个
    v = v.replace(/^0{2}$/g, '0');
    // 保证第一位只能是数字，不能是点
    v = v.replace(/^\./g, '');
    // 小数只能出现1位
    v = v.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    // 小数点后面保留1位
    v = v.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3');
    // 返回结果
    return v;

}