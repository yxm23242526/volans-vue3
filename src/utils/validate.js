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


/**
 * 去除小数点后的0
 * @param value
 * @returns {*}
 */
export function trimFloat(num, precision = 0) {
    // 首先确保输入的是数字
    num = parseFloat(num);

    // 如果是NaN，则直接返回
    if (isNaN(num)) {
        return num;
    }
    
    // 使用toFixed方法处理精度，然后去掉末尾的0
    let formattedNum = num.toFixed(precision).replace(/0+$/, '');
    // 对于小数点后全是0的情况（如1.000），toFixed方法会返回整数，这里需要特殊处理一下
    if (formattedNum.indexOf('.') === formattedNum.length - 1) {
        formattedNum = formattedNum.slice(0, -1);
    }
    
    // 返回结果
    return parseFloat(formattedNum);
}

