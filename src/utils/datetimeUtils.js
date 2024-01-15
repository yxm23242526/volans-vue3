
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
export function compareDate(data1, data2) {
	if (data1 === data2) {
		return 0;
	}
	return new Date(Date.parse(data1)) > new Date(Date.parse(data2)) ? 1 : -1;
}

/**
 * 加减天数
 * @param {*} data1 
 * @param {*} days 
 * @returns 
 */
export function calcuateDate(data1, days) {
	const st = new Date(Date.parse(data1));
	st.setDate(st.getDate() + days);
	return st.getFullYear() + "/" + (st.getMonth() + 1) + "/" + st.getDate();
}


/**
 * 格式化日期为 yy/mm/dd 格式
 * @param {*} data1 
 * @param {*} days 
 * @returns 
 */
export function formatDate(date) {
	const st = new Date(Date.parse(date));
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


/**
 * 得到当前是周几的中文
 */
export function getDayString (param) {
	
	const date = new Date(Date.parse(param));
	const dayOfWeek = date.getDay();
	switch (dayOfWeek) {
		case 0: return "周日";
		case 1: return "周一";
		case 2: return "周二";
		case 3: return "周三";
		case 4: return "周四";
		case 5: return "周五";
		default: return "周六";
	}
}