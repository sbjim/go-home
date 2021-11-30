$(function () {
  const end_time = $("#hurry-home-input_end_time").val() || "18:00";

  $("#hurry-home-msg").text(getRandomMsg());

  /** 渲染 */
  function renderElement(val, el) {
    $(`#hurry-home-${el}`).text(val);
  }
  const offTime = {
    today: moment(end_time, "HH:mm"),
    week: moment(`${getLastDay().format("YYYY-MM-DD")} ${end_time}`),
    month: moment(`${moment().endOf("month").format("YYYY-MM-DD")} ${end_time}`),
  };

  function renderTime() {
    const now = moment();
    /*下班时间*/
    const today = offTime.today.diff(now, "seconds");
    const week = offTime.week.diff(now, "seconds");
    const month = offTime.month.diff(now, "seconds");
    // 加班提示
    const pain_msg = "我毕生的梦想，就是可以准点下班！";
    // 双休需要加判断，双休存在下班时间
    /*每天*/ if (today < 0) renderElement(`已经加班：${conversionDate(Math.abs(today))}，${pain_msg}`, "day");
    else renderElement(`距离下班还有：${conversionDate(today)}`, "day");
    /*每周*/ if (week < 0) renderElement(pain_msg, "week");
    else renderElement(conversionDate(week), "week");
    /*月底*/ if (month < 0) renderElement("明天又是新的一个月，请对我好点，期待！", "month");
    else renderElement(conversionDate(month), "month");
    $("#hurry-home-now_time").text(now.format("LLLL"));
  };

  let _iterator;
  const dt = 1000;
  setTimeout(function () { renderTime(); _iterator = setInterval(renderTime, dt) }, 0)
});
