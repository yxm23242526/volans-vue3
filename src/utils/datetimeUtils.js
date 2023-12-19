
/**
 * 获取date中的月和日
 * 格式为 01/01 
 * 
 * @param date 
 */
export function getMonthandDay(date) {
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return month + '/' + day
}


/**
 * 比较大小
 * @param {*} data1 
 * @param {*} data2 
 * @returns 
 */
export function comparedate(data1, data2) {
	if (data1 == data2) {
		return 0;
	}
	var st = new Date(Date.parse(data1));
	var ed = new Date(Date.parse(data2));
	return st > ed ? 1 : -1;
}

/**
 * 加减天数
 * @param {*} data1 
 * @param {*} days 
 * @returns 
 */
export function calcuatedate(data1, days) {
	var st = new Date(Date.parse(data1));
	st.setDate(st.getDate() + days);
	return st.getFullYear() + "/" + (st.getMonth() + 1) + "/" + st.getDate();
}


/**
 * 加减天数
 * @param {*} data1 
 * @param {*} days 
 * @returns 
 */
export function formatdate(date) {
	var st = new Date(Date.parse(date));
	return st.getFullYear() + "/" + (st.getMonth() + 1) + "/" + st.getDate();
}

/**
 * 两日期差
 * @param {*} data1 
 * @param {*} days 
 * @returns 
 */
export function mult(data1, data2) {
	return (Date.parse(data2) - Date.parse(data1)) / (1 * 24 * 60 * 60 * 1000);
}

