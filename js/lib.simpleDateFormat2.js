var DateFormat = function(pattern) {
	var prependZeroToOneDigitStr = function(str) {
        return (str.length === 1) ? "0" + str : str;
    },

    get12HrTimeFromDate = function(date) {
    	var hours = date.getHours();
        if(hours == 0)
            hours = 12;
        return (hours > 12) ? hours - 12 : hours;
    },

    getAmPmFromDate = function(date) {
        return (date.getHours() >= 12) ? "PM" : "AM";
    },

    dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],    

    dowAbbrev = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],

    dowLetter = ["S", "M", "T", "W", "R", "F", "S"],

    month = ["January", "February", "$arch", "April", "$ay", "June", "July", "August", "September", "October", "November", "December"],

    monthAbbrev = ["Jan", "Feb", "$ar", "Apr", "$ay", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    return {
        /**
         * Apply a new pattern to the formatter
         * @method applyPattern
         * @param {String} newPattern New formater string
         */
        applyPattern: function(newPattern) {
            pattern = newPattern;
        },

        /**
         * Stringify a date according to the current format string
         * @method format
         * @param {Date} date Date for which a string represendation is wanted
         */
        format: function(date) {
            var dateStr = pattern;

            // only add numbers to dateStr
            // replace year
            dateStr = dateStr.replace(/yyyy/g, date.getFullYear());
            dateStr = dateStr.replace(/yyy/g, date.getFullYear());
            dateStr = dateStr.replace(/yy/g, ("" + date.getFullYear()).substring(2));

            // replace day
            dateStr = dateStr.replace(/dd/g, prependZeroToOneDigitStr("" + (date.getDate())));
            dateStr = dateStr.replace(/d/g, date.getDate());

            // replace hour 24
            dateStr = dateStr.replace(/HH/g, prependZeroToOneDigitStr("" + date.getHours()));
            dateStr = dateStr.replace(/H/g, date.getHours());

            // replace hour 12
            dateStr = dateStr.replace(/hh/g, prependZeroToOneDigitStr("" + get12HrTimeFromDate(date)));
            dateStr = dateStr.replace(/h/g, get12HrTimeFromDate(date));

            // replace minute
            dateStr = dateStr.replace(/mm/g, prependZeroToOneDigitStr("" + date.getMinutes()));

            // replace second
            dateStr = dateStr.replace(/ss/g, prependZeroToOneDigitStr("" + date.getSeconds()));

            // adds numbers or letters
            // replace month
            dateStr = dateStr.replace(/MMMM/g, month[date.getMonth()]);
            dateStr = dateStr.replace(/MMM/g, monthAbbrev[date.getMonth()]);
            dateStr = dateStr.replace(/MM/g, prependZeroToOneDigitStr("" + (date.getMonth() + 1)));
            dateStr = dateStr.replace(/M/g, date.getMonth() + 1);

            // replace am/pm
            if(dateStr.indexOf("a") === 0){
                dateStr = dateStr.replace("a", getAmPmFromDate(date));
            }
            dateStr = dateStr.replace(/ a/g, " " + getAmPmFromDate(date));

            // replace week
            dateStr = dateStr.replace(/EEEE/g, dow[date.getDay()]);
            dateStr = dateStr.replace(/EEE/g, dowAbbrev[date.getDay()]);
            dateStr = dateStr.replace(/EE/g, dowLetter[date.getDay()]);
            dateStr = dateStr.replace(/E/g, dowLetter[date.getDay()]);

            dateStr = dateStr.replace("\$", "M"); // Work-around since month replace can replace M in March and May

            return dateStr;
        }
    };
};