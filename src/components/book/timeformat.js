const TimeFormat = (timespan) => {
  var dateTime = new Date(timespan); // Convert the incoming string or milliseconds to standard time
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  // var second = dateTime.getSeconds()
  var millisecond = dateTime.getTime(); // Convert the currently edited time to milliseconds
  var now = new Date(); // Get the current time of the machine
  var nowNew = now.getTime(); // Convert the local time to milliseconds
  var milliseconds = 0;
  var timeSpanStr;
  milliseconds = nowNew - millisecond;
  if (milliseconds <= 1000 * 60 * 1) {
    // less than one minute is displayed as just
    timeSpanStr = 'just a moment ago';
  } else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    // More than one minute and less than one hour are displayed as minutes
    timeSpanStr = Math.round(milliseconds / (1000 * 60)) + 'minutes ago';
  } else if (
    1000 * 60 * 60 * 1 < milliseconds &&
    milliseconds <= 1000 * 60 * 60 * 24
  ) {
    // More than one hour and less than one day are displayed as hours
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + ' hours ago';
  } else if (
    1000 * 60 * 60 * 24 < milliseconds &&
    milliseconds <= 1000 * 60 * 60 * 24 * 15
  ) {
    // More than one day and less than fifteen days of display position days
    timeSpanStr =
      Math.round(milliseconds / (1000 * 60 * 60 * 24)) + ' Days ago';
  } else if (
    milliseconds > 1000 * 60 * 60 * 24 * 15 &&
    year === now.getFullYear()
  ) {
    timeSpanStr = month + '-' + day + ' ' + hour + ':' + minute;
  } else {
    timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
  }
  return timeSpanStr;
};
export default TimeFormat;
