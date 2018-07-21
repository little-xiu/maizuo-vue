function insertZ(n) {
	if(n<10) {
		n = '0' + n;
	}
	return n;
}
export function dateFilter(val,format) {
	let d = new Date(val);
	if(format == "date") {
		let month = d.getMonth()+1;
		let date = d.getDate();
		return month + "月" + date + "日";
	} else if (format == "weekday") {
		let week = d.getDay();//返回值是 0（周日） 到 6（周六） 之间的一个整数。
		let weekArr = ['日','一', '二', '三', '四', '五', '六'];
		return "星期" + weekArr[week];
	} else if(format == 'date/') {
		let month = d.getMonth()+1;
		let date = d.getDate();
		return insertZ(month) + '/' + insertZ(date);
	} else if (format == "hours") {
		let h = d.getHours();
		let m = d.getMinutes();
		return insertZ(h) + ":" + insertZ(m);
	}
}

export function actorsFilter(value) {
	if(!value) {
		return;
	} 
  var tmp = '';
  value.map((item, index)=>{
    tmp += item.name;
    if(index != value.length-1){
        tmp += ' | ';
    }
  })
  return tmp;
}
