$('#setGoHomeTime').on('click',function(){

		var go_home_time = localStorage.getItem("go_home_time")
		go_home_time = go_home_time == 'null' || go_home_time == undefined   ?  '18:00' :localStorage.getItem("go_home_time");
		go_home_time=prompt("请输入下班时间",go_home_time); // 弹出input框

		if(go_home_time != null){
			localStorage.setItem("go_home_time", go_home_time);
		}

console.log(go_home_time)
})
$('#to_github').on('click',function(){
		window.open('https://github.com/sbjim/go-home')

})

var d = new Date(),
    dd = d.getDay(),
    friday = new Date((5 - dd)*(3600*24*1000)+d.getTime()).getTime();

// 返回指定格式的时间
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


var data = document.getElementById('data')
var time1 = document.getElementById('time1')
var time2 = document.getElementById('time2')
var time3 = document.getElementById('time3')
var time4 = document.getElementById('time4')
var now_time = document.getElementById('now_time')
var a = ["日", "一", "二", "三", "四", "五", "六"];
var day_lists = [
	'又是美好的一天！',
	'用你的可爱和温柔温暖每一天的阳光。',
	'喜欢早晨的风，好像什么都可以重新开始。',
	'愿你成为自己喜欢的样子，不抱怨，不将就，有野心，有光芒！',
	'没心没肺，才能活着不累。',
	'生活不简单，尽量简单过。',
	'有期待的人，每一天都是崭新的一天。',
	'✿一生很短 你要大胆 ʙɪᴜ～✿',
	'纯粹一点，幸运一点，俗气一点。',
	'尽情打扮，尽情可爱。',
	'微笑 抬头 告诉自己要加油吖、',
	'奇迹是努力的另一个名字。',
	'把身体照顾好，把喜欢的事做好，把重要的人待好，你要的一切都在路上！',
	'心存感激，所遇皆温柔。',
	'一念之间，天地皆宽，万事万物都会有不一样的风景。',
];

var week = (new Date()).getDay();

var str = "今天是星期" + a[week] + '，'+day_lists[Math.floor(Math.random()*day_lists.length)]
data.innerHTML = str;
var timer = setInterval(function () {
	// 下班时间
	var go_home_time = localStorage.getItem("go_home_time")
	go_home_time = go_home_time == null || go_home_time == undefined   ?  '18:00' :localStorage.getItem("go_home_time");


		var str = new Date().Format("yyyy-MM-dd ")+go_home_time;
		var endweek = new Date(friday).Format("yyyy-MM-dd ")+go_home_time;

    var endweekdata = Date.parse(new Date(endweek)) / 1000
    var enddate = Date.parse(new Date(str)) / 1000
    var nowdata = Date.parse(new Date()) / 1000
    var time = enddate - nowdata

    // 计算下班时间
    if (time >= 0) {
        var min = parseInt(time / 60)
        var s = time % 60
        time1.innerHTML = '距离下班还有：' + min + '分' + s + '秒'
        time2.innerHTML = '距离下班还有：' + time + '秒'

        var weektime = endweekdata - nowdata
        var weeekmin = parseInt(weektime / 60)

        var weeeks = weektime % 60
        time3.innerHTML = '距离周末还有：' + weeekmin + '分' + s + '秒'
        time4.innerHTML = '距离周末还有：' + weektime + '秒'
    }
    else {
        time = time * -1
        var min = parseInt(time / 60)
        var s = time % 60
        if (min > 0) {
            time1.innerHTML = '已经加班：' + min + '分' + s + '秒'
        } else {
            time1.innerHTML = '已经加班：' + s + '秒'
        }

        time2.innerHTML = '已经加班：' + time + '秒'

        var weektime = endweekdata - nowdata
        var weeekmin = parseInt(weektime / 60)

        var weeeks = weektime % 60
        time3.innerHTML = '距离周末还有：' + weeekmin + '分' + s + '秒'
        time4.innerHTML = '距离周末还有：' + weektime + '秒'


    }
            now_time.innerHTML = new Date().Format("yyyy-MM-dd h:m:s")


}, 150)
