$(function() {

	let start_time = 	$("#input_start_time").val()  || "09:00"
	let end_time = 	$("#input_end_time").val() || "18:00"

	let weekOfDay = moment().format("E") // 指定日期的周的第几天 1,2,3,4,5,6,7

	let lastMonday1 = moment().subtract(weekOfDay - 1, 'days').format('YYYY-MM-DD'); //周一日期
	let lastTuesday2 = moment().subtract(weekOfDay - 2, 'days').format('YYYY-MM-DD'); //周二日期
	let lastWednesday3 = moment().subtract(weekOfDay - 3, 'days').format('YYYY-MM-DD'); //周三日期
	let lastThursday4 = moment().subtract(weekOfDay - 4, 'days').format('YYYY-MM-DD'); //周四日期
	let lastFriday5 = moment().subtract(weekOfDay - 5, 'days').format('YYYY-MM-DD'); //周五日期
	let lastSaturday6 = moment().subtract(weekOfDay - 6, 'days').format('YYYY-MM-DD'); //周六日期
	let lastSunday7 = moment().add(7 - weekOfDay, 'days').format('YYYY-MM-DD'); //周日日期

	//时间
	let time_lists = {
		"go_work_time": " "+start_time, // 上
		"off_work_time": " "+end_time, // 下
		'pay_day':15,
	}

	$("#msg").text(getRandomMsg(weekOfDay)) //鸡汤

	setInterval(function () {
		
		let go_home_time = moment().format("YYYY-MM-DD") + time_lists['off_work_time'] //今天下班的时间
		let time = moment().format("YYYY-MM-DD  HH:mm:ss"); //当前的时间

		// 每天的下班时间
		let start_day = moment(time, "YYYY-MM-DD HH:mm:ss");
		let end_day = moment(go_home_time, "YYYY-MM-DD HH:mm:ss");
		var every_day = end_day.diff(start_day, 'seconds')// 距离今天下班时间

		// 距离每周周五或者周六 最后上班的时间
		let lastDay = getLastDay(lastFriday5,lastSaturday6,lastSunday7) + time_lists['off_work_time']  // 周五下班时间
		lastDay = moment(lastDay, "YYYY-MM-DD HH:mm:ss");
		var over_day = lastDay.diff(start_day, 'seconds')  //距离周末时间

		// 获取本月底还剩多少天
		let monthLastDay = moment().endOf('month').format('YYYY-MM-DD') + time_lists['off_work_time'] //月底
		
		monthLastDay = moment(monthLastDay, "YYYY-MM-DD HH:mm:ss");
		var over_month = monthLastDay.diff(start_day, 'seconds')  //距离周末时间

		/**
		 * Js好难啊，不想写了，有空再说吧
		 * 比如今天是2号的话  15发工资。时间为：13天。如果为20号的话，则加本月的10天+下个月的15天 = 25天时间
		 * @type {string}
		 */
		let to_day = moment().format("DD")  //今天是多少号
		if (to_day > time_lists['pay_day']) {
			// 22 > 16  工资在下个月发放
			// console.log(to_day,time_lists['pay_day']);

		}else {
			// 工资在本月发放
		}
		let pain_msg = "我毕生的梦想，就是可以准点下班！";
		
		
		// 每周
		if(over_day < 0){
			$("#week").text(pain_msg)  //week last day，属于加班
		}else{
			$("#week").text(secondToday(over_day))  //week last day
		}
		
		//每天
		if(every_day < 0){
			$("#day").text("已经加班时间："+secondToday(Math.abs(every_day))+"，"+pain_msg)  //every day 加班
		}else{
			// 如果是双休的话 需要加判断  现在双休还存在 下班时间
			$("#day").text("距离下班还有："+secondToday(every_day))  //every day
		}
		
		// 月底
		if(over_month < 0){
			$("#month").text("明天又是新的一个月，请对我好点，期待！")  // month last day
		}else{
			$("#month").text(secondToday(over_month))  // month last day
		}
		
		$("#now_time").text(time)  // now time
	},250)



})
