
/**
 * 获取date中的月和日
 * 格式为 01/01 
 * 
 * @param date 
 */
export function getMonthandDay(date){
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');
	return month + '/' + day
}