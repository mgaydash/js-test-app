 jQuery(document).ready(function(){
	initWidgets();
        jQuery("#smallCalendar").miniCalendarWidget();
	jQuery("#eventCalendar").eventCalendarWidget();
        jQuery("#pagingBox").pagingBoxWidget();
        
}); 
function initWidgets(){
	(function($){
		$.widget("ben.eventCalendarWidget", {
			options: {
                            gui: "",
                            startDate: "",
                            endDate: "",
                            view: "month",
                            selectedDay: "",
                            monthTitleRow: "",
                            weekTitleRow: "",
                            dayTitleRow: "",
                            monthRow: "",
                            weekRow: "",
                            dayRow: ""
			},
			_create: function(){
                            var local = this,
                                options = local.options;
                            var today = new Date();
                            local._prepare();
                            options.gui.css({"height":jQuery(window).height() - 60,"overflow":"hidden"});
                            local.monthView(today);
                            options.gui.bind("click",function(){
                               console.log("yup"); 
                            });
                            jQuery("#backButton").bind("click",function(){
                                local.pageBack(); 
                            });
                            jQuery("#todayButton").bind("click",function(){
                                var todayDate = new Date();
                                local.monthView(todayDate);
                            });
                            jQuery("#forwardButton").bind("click",function(){
                                local.pageForward();
                            });
                            jQuery(".miniDay").bind("changeSelectedDay",function(e,data){
                               local.option("selectedDay",data.selectedDay);
                               local.refresh();
                            });
                            
                            jQuery("#monthButton").bind("click",function(){
                            	local.monthView(options.selectedDay);
                                local.option("view","month");
                            });
                            jQuery("#weekButton").bind("click",function(){
                            	local.weekView(options.selectedDay);
                                local.option("view","week");
                            });
                            jQuery("#dayButton").bind("click",function(){
                                local.dayView(options.selectedDay);
                                local.option("view","day") ;
                            });
			},
                        refresh: function(){
                            var local = this;
                            var options = local.options;
                            switch(options.view){
                                case "month":
                                    local.monthView(options.selectedDay);
                                    break;
                                case "week":
                                    local.weekView(options.selectedDay);
                                    break;
                                case "day":
                                    local.dayView(options.selectedDay);
                                    break;
                            }
                        },
                        _inDisplayRange: function(theDate){
                            var local = this,
                                options = local.options;
                            if(local._datesAreEqual(options.startDate,theDate))
                                return true;
                            else if(local._datesAreEqual(options.endDate,theDate))
                                return true;
                            else if(options.startDate < theDate && options.endDate > theDate)
                                return true;
                            else
                                return false;
                        },
                        _retrieveClosestSunday: function(theDate){
                            var local = this;
                            var options = local.options;
                            while(theDate.getDay() != 0){
                                theDate.setDate(theDate.getDate()-1);                                
                            }
                            return theDate;
                        },
                        createNewDateCopy: function(date){
                          var newDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());  
                          return newDate;
                        },
                        dayView: function(theDate){
                            var local= this;
                            var options = local.options;
                            var tempDate = local.createNewDateCopy(theDate);
                            var weekDayString = local._determinDayClass(options.selectedDay);
                            var dayRowClone;
                            options.dayTitleRow.find(".dayLabel").text(weekDayString);
                            options.gui.empty();
                            options.gui.append(options.dayTitleRow);
                            for(var i=0;i<24;i++){
                                dayRowClone = options.dayRow.clone();
                                options.gui.append(dayRowClone);
                            }
                            options.gui.find(".dayTitle").each(function(){
                                jQuery(this).find(".dayNumber").text(options.selectedDay.getDate());
                            });
                            var theHour = {hour:12,AmPm: "AM"};
                            options.gui.find(".hourCellBody").each(function(){
                                var theElement = jQuery(this);
                                theElement.text(theHour.hour + ":00 " + theHour.AmPm);
                                theHour = local._retrieveNextHour(theHour);
                            });
                        },
                        weekView: function(theDate){
                            var local = this;
                            var options = local.options;
                            var dateCopy = local.createNewDateCopy(theDate);
                            var day1 = local._retrieveClosestSunday(dateCopy);
                            var weekRowClone;
                            options.gui.empty();
                            options.gui.append(options.weekTitleRow);
                            for(var i=0;i<24;i++){
                                weekRowClone = options.weekRow.clone();
                                options.gui.append(weekRowClone);
                            }
                            options.gui.find(".weekDayTitle").each(function(){
                                jQuery(this).find(".weekDayNumber").text(day1.getDate());
                                day1.setDate(day1.getDate()+1);
                            });
                            var theHour = {hour:12,AmPm: "AM"};
                            options.gui.find(".hourCellBody").each(function(){
                                var theElement = jQuery(this);
                                theElement.text(theHour.hour + ":00 " + theHour.AmPm);
                                theHour = local._retrieveNextHour(theHour);
                            });
                        },
                        _retrieveNextHour: function(theHour){
                        	var nextHour = {hour:theHour.hour,AmPm: theHour.AmPm};
                        	if(theHour.hour == 11){
                        		if(nextHour.AmPm == "AM")
                        			nextHour.AmPm = "PM";
                        		else
                        			nextHour.AmPm = "AM";
                        	}
                        	if(nextHour.hour == 12)
                        		nextHour.hour = 1;
                        	else
                        		nextHour.hour++;
                        	
                        	return nextHour;
                        },
                        monthView: function(theDate){
                            var local = this;
                            var options = local.options;
                            var today = new Date();
                            var day1 = new Date(theDate.getFullYear(),theDate.getMonth(),theDate.getDate());
                            day1.setMonth(day1.getMonth(),1);
                            var dayClass = local._determinDayClass(day1);
                            var dayElement;
                            var firstDayFound = false;
                            var monthCheck;
                            var monthRowClone;
                            options.gui.empty();
                            options.gui.append(options.monthTitleRow.clone());
                            for(var i=0;i<5;i++){
                                monthRowClone = options.monthRow.clone();
                                options.gui.append(monthRowClone);
                            }
                            options.gui.find(".monthDay").each(function(i){
                                dayElement = jQuery(this);
                                if(firstDayFound){
                                    dayElement.find(".monthDayNumber").text(day1.getDate());
                                    dayElement.find(".monthDayBody").css("background-color","white");
                                    if(local._datesAreEqual(day1,today))
                                        dayElement.find(".monthDayNumber").css("color","red");
                                    else
                                        dayElement.find(".monthDayNumber").css("color","black");
                                }else if(dayElement.hasClass(dayClass)){
                                    dayElement.find(".monthDayNumber").text(day1.getDate());
                                    dayElement.find(".monthDayBody").css("background-color","white");
                                    local.option("startDate",day1);
                                    firstDayFound = true;
                                }else{
                                    dayElement.find(".monthDayNumber").text("");
                                    dayElement.find(".monthDayBody").css("background-color","#ccc");
                                }
                                dayElement.show();
                                //checking for end of month -ba
                                if(firstDayFound){
                                    monthCheck = new Date(day1.getFullYear(),day1.getMonth(),day1.getDate());
                                    monthCheck.setDate(monthCheck.getDate()+1);
                                    if(day1.getMonth() == monthCheck.getMonth())
                                        day1.setDate(day1.getDate()+1);
                                    else{
                                        local.option("endDate",day1);
                                        var length = options.gui.find(".monthDay").length;
                                        var theArray = options.gui.find(".monthDay");
                                        var hideTheRest = false;
                                        var grayTheRest = false;
                                        if(i >= 34)
                                            grayTheRest = true;
                                        for(var j=i+1;j<=length;j++){
                                            if(hideTheRest){
                                                jQuery(theArray[j]).hide();
                                            }else{
                                                jQuery(theArray[j]).show();
                                                jQuery(theArray[j]).find(".monthDayBody").css("background-color","#ccc");
                                                jQuery(theArray[j]).find(".monthDayNumber").text("");
                                            }
                                            if(j >= 34){
                                                if(!grayTheRest)
                                                    hideTheRest = true;
                                            }
                                        }
                                        return false;
                                    }
                                }
                            });
                        },
                        pageForward: function(){
                            var local = this;
                            var options = local.options;
                            switch(options.view){
                                case "month":
                                    options.startDate.setMonth(options.startDate.getMonth()+1,1);
                                    local.monthView(options.startDate);
                                    break;
                                case "week":
                                    break;
                                case "day":
                                    break;
                            }
                        },
                        pageBack: function(){
                            var local = this;
                            var options = local.options;
                            switch(options.view){
                                case "month":
                                    options.startDate.setMonth(options.startDate.getMonth()-1,1);
                                    local.monthView(options.startDate);
                                    break;
                                case "week":
                                    break;
                                case "day":
                                    break;
                            }
                        },
                        _datesAreEqual: function(date1,date2){
                            if(date1.getDate() == date2.getDate()){
                                if(date1.getMonth() == date2.getMonth()){
                                    if(date1.getFullYear() == date2.getFullYear()){
                                        return true;
                                    }
                                }
                            }
                            return false;
                        },
                        _determinDayClass: function(date){
                            var theDay = date.getDay();
                            switch(theDay){
                                case 0:
                                    return "Sun";
                                case 1:
                                    return "Mon";
                                case 2:
                                    return "Tues";
                                case 3:
                                    return "Wed";
                                case 4:
                                    return "Thurs";
                                case 5:
                                    return "Fri";
                                case 6:
                                    return "Sat";
                            }
                        },
			_prepare: function(){
                            var local = this;
                            var options = local.options;
                            var today = new Date();
                            local.option("gui",jQuery(local.element));
                            local.option("monthTitleRow",options.gui.find(".monthTitleRow").detach());
                            local.option("monthRow",options.gui.find(".monthRow").detach());
                            local.option("weekRow",options.gui.find(".weekRow").detach());
                            local.option("weekTitleRow",options.gui.find(".weekTitleRow").detach());
                            local.option("selectedDay",today);
                            local.option("dayTitleRow",options.gui.find(".dayTitleRow").detach());
                            local.option("dayRow", options.gui.find(".dayRow").detach());
			}
		});
	}(jQuery));
        
        (function($){
		$.widget("ben.pagingBoxWidget", {
			options: {
                            startDate: "",
                            endDate: "",
                            gui: "",
                            view: "month",
                            labelElement: "",
                            backButton: "",
                            todayButton: "",
                            forwardButton: "",
                            monthButton:"",
                            weekButton:"",
                            dayButton:"",
                            monthNameArray: "",
                            dayNameArray: "",
                            startDateString: "",
                            endDateString: "",
                            dateLabel: "",
                            smallCalendar: "",
                            selectedDay: ""
			},
			_create: function(){
                            var local = this;
                            var options = local.options;
                            local._prepare();
                            var today = new Date();
                            local.calcDates(today);
                            local.makeDateStrings();
                            options.monthButton.css("background-color","gray");
                            options.monthButton.bind("click",function(){
                               local.setView("month");
                               local.calcDates(options.startDate);
                               local.makeDateStrings();
                            });
                            options.weekButton.bind("click",function(){
                               local.setView("week");
                               local.calcDates(options.selectedDay);
                               local.makeDateStrings();
                            });
                            options.dayButton.bind("click",function(){
                               local.setView("day");
                               local.option("startDate",options.selectedDay);
                               local.option("endDate",options.selectedDay);
                               local.makeDateStrings();
                            });
                            options.backButton.bind("click",function(){
                                local.pageBack();
                            });
                            options.todayButton.bind("click",function(){
                                var todayDate = new Date();
                                local.calcDates(todayDate);
                                local.makeDateStrings();
                            });
                            options.forwardButton.bind("click",function(){
                                local.pageForward();
                            });
                            options.smallCalendar.find(".miniDay").bind("click",function(){
                               var theElement = jQuery(this);
                               if(theElement.text() != ""){
                                   var theDay = theElement.text();
                                   var month = options.smallCalendar.find("#monthLabel").text();
                                   var year = options.smallCalendar.find("#yearLabel").text();
                                   var dateString = month + " " + theDay + ", " + year;
                                   var newDate = new Date(dateString);
                                   local.option("selectedDay",newDate);
                                   local.calcDates(newDate);
                                   local.makeDateStrings();
                               }
                            });
			},
                        makeDateStrings: function(){
                            var local = this;
                            var options = local.options;
                            var dayString = options.dayNameArray[options.startDate.getDay()];
                            var monthString = options.monthNameArray[options.startDate.getMonth()];
                            local.option("startDateString", dayString + " " + monthString + " " + options.startDate.getDate() + " " + options.startDate.getFullYear());
                            dayString = options.dayNameArray[options.endDate.getDay()];
                            monthString = options.monthNameArray[options.endDate.getMonth()];
                            local.option("endDateString", dayString + " " + monthString + " " + options.endDate.getDate() + " " + options.endDate.getFullYear());
                            if(options.view == "day")
                                options.dateLabel.text(options.startDateString);
                            else
                                options.dateLabel.text(options.startDateString + " - " + options.endDateString);
                        },
                        setView: function(theView){
                            var local = this;
                            var options = local.options;
                            local.option("view",theView);
                            switch(theView){
                                case "month":
                                    options.monthButton.css("background-color","gray");
                                    options.weekButton.css("background-color","white");
                                    options.dayButton.css("background-color","white");
                                    break;
                                case "week":
                                    options.monthButton.css("background-color","white");
                                    options.weekButton.css("background-color","gray");
                                    options.dayButton.css("background-color","white");
                                    break;
                                case "day":
                                    options.monthButton.css("background-color","white");
                                    options.weekButton.css("background-color","white");
                                    options.dayButton.css("background-color","gray");
                                    break;
                            }
                        },
                        calcDates: function(theDate){
                            var local = this;
                            var options = local.options;
                            switch(options.view){
                                case "month":
                                    var tempDate = new Date(theDate.getFullYear(),theDate.getMonth(),theDate.getDate());
                                    tempDate.setMonth(tempDate.getMonth(),1);
                                    local.option("startDate",tempDate);
                                    var temp2Date = new Date(tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate());
                                    temp2Date.setMonth(temp2Date.getMonth()+1,0);
                                    local.option("endDate",temp2Date);
                                    break;
                                case "week":
                                    var tempDate = new Date(theDate.getFullYear(),theDate.getMonth(),theDate.getDate());
                                    while(tempDate.getDay() != 0){
                                        tempDate.setDate(tempDate.getDate()-1);
                                    }
                                    local.option("startDate",tempDate);
                                    var tempDate2 = new Date(tempDate.getFullYear(),tempDate.getMonth(),tempDate.getDate());
                                    tempDate2.setDate(tempDate2.getDate()+6);
                                    local.option("endDate",tempDate2);
                                    break;
                                case "day":
                                    var tempDate = new Date(theDate.getFullYear(),theDate.getMonth(),theDate.getDate());
                                    local.option("startDate",tempDate);
                                    var tempDate2 = new Date(theDate.getFullYear(),theDate.getMonth(),theDate.getDate());
                                    local.option("endDate",tempDate2);
                                    break;
                            }
                        },
                        refreshPageBox: function(){
                            var local = this;
                            var options = local.options;
                        },        
                        pageForward: function(){
                            var local = this;
                            var options = local.options;
                            switch(options.view){
                                case "month":
                                    local.checkForShortMonth("forward");
                                    break;
                                case "week":
                                    options.selectedDay.setDate(options.selectedDay.getDate()+7);
                                    break;
                                case "day":
                                    options.selectedDay.setDate(options.selectedDay.getDate()+1);
                                    break;
                            }
                            local.calcDates(options.selectedDay);
                            local.makeDateStrings();
                        },
                        pageBack: function(){
                            var local = this;
                            var options = local.options;
                            switch(options.view){
                                case "month":
                                    local.checkForShortMonth("back");
                                    break;
                                case "week":
                                    options.selectedDay.setDate(options.selectedDay.getDate()-7);
                                    break;
                                case "day":
                                    options.selectedDay.setDate(options.selectedDay.getDate()-1);
                                    break;
                            }
                            local.calcDates(options.selectedDay);
                            local.makeDateStrings();
                        },
                        checkForShortMonth: function(dir){
                            var local = this;
                            var options = local.options;
                            var nextMonth = local.createNewDateCopy(options.selectedDay);
                            var currentSelectedDate = local.createNewDateCopy(options.selectedDay);
                            /*setting nextMonth to first day of month then adding a month to make sure that we will be,
                            only 1 month ahead - BA */
                            nextMonth.setDate(1);
                            if(dir == "forward"){
                                nextMonth.setMonth(nextMonth.getMonth()+1);
                                //now increment currentSelectedDate by a month and make sure it is only one month ahead -BA
                                currentSelectedDate.setMonth(currentSelectedDate.getMonth()+1);
                            }else if(dir == "back"){
                                nextMonth.setMonth(nextMonth.getMonth()-1);
                                currentSelectedDate.setMonth(currentSelectedDate.getMonth()+1);
                            }
                            if(currentSelectedDate.getMonth() != nextMonth.getMonth()){
                                while(currentSelectedDate.getMonth() != nextMonth.getMonth()){
                                    currentSelectedDate.setDate(currentSelectedDate.getDate()-1);
                                }
                            }
                            local.option("selectedDay",currentSelectedDate);
                            console.log(options.selectedDay);
                        },
                        createNewDateCopy: function(d){
                            var dateCopy = new Date(d.getFullYear(),d.getMonth(),d.getDate());
                            return dateCopy;
                        },
			_prepare: function(){
                            var local = this;
                            var options = local.options;
                            local.option("gui",local.element);
                            local.option("backButton",options.gui.find("#backButton"));
                            local.option("todayButton",options.gui.find("#todayButton"));
                            local.option("forwardButton",options.gui.find("#forwardButton"));
                            local.option("monthButton",options.gui.find("#monthButton"));
                            local.option("weekButton",options.gui.find("#weekButton"));
                            local.option("dayButton",options.gui.find("#dayButton"));
                            local.option("dateLabel",options.gui.find("#dateLabel"));
                            var monthNameArray = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
                            local.option("monthNameArray",monthNameArray);
                            var dayNameArray = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                            local.option("dayNameArray",dayNameArray);
                            var today = new Date();
                            local.option("smallCalendar",jQuery("#smallCalendar"));
                            local.option("selectedDay",today);
			}
		});
	}(jQuery));
    
    (function($){
		$.widget("ben.miniCalendarWidget", {
			options: {
                            startDate: "",
                            endDate: "",
                            selectedDay:"",
                            gui: "",
                            rightButton: "",
                            leftButton: "",
                            monthLabel: "",
                            yearLabel: "",
                            monthNameArray: "",
                            highlightStartDate: "",
                            highlightEndDate: "",
                            tempElementBgColor: "",
                            view: "",
                            weekRow: ""
			},
			_create: function(){
                            var local = this;
                            var options = local.options;
                            var today = new Date();
                            local.calcDates(today);
                            local._prepare();
                            local.cloneWeekRows();
                            local.refreshCalendar();
                            options.rightButton.bind("click",function(){
                               local.navMonthForward("month");
                            });
                            options.leftButton.bind("click",function(){
                               local.navMonthBack("month"); 
                            });
                            options.gui.find(".miniDay").bind("mouseover",function(){
                               var theElement = jQuery(this);
                               local.option("tempElementBgColor",theElement.css("background-color"));
                               if(theElement.text() != "")
                                   theElement.css("background-color","yellow");
                            });
                            options.gui.find(".miniDay").bind("mouseout",function(){
                               var theElement = jQuery(this);
                               var color = theElement.css("background-color");
                               if(color == "rgb(255, 255, 255)")
                                   theElement.css("background-color",color);
                               else if(color == "rgb(128, 128, 128)")
                                   theElement.css("background-color","gray");
                               else
                                   theElement.css("background-color",options.tempElementBgColor);
                            });
                            options.gui.find(".miniDay").bind("click",function(){
                            	var theElement = jQuery(this);
                            	if(theElement.text() != ""){
                                    local.option("tempElementBgColor","#ddf");
                                    local.calcNewSelectedDate(theElement.text());
                                    theElement.trigger("changeSelectedDay",{selectedDay:options.selectedDay});
                                    local.calcDates(options.selectedDay);
                                    local.calcHighlightDates();
                                    local.refreshCalendar();
                                }
                            });
                            
                            jQuery("#monthButton").bind("click",function(){
                                local.option("view","month");
                                var sd = local.createNewDateCopy(options.selectedDay);
                            	local.calcHighlightDates();
                                local.calcDates(sd);
                                local.refreshCalendar();
                            });
                            jQuery("#weekButton").bind("click",function(){
                                local.option("view","week");
                                var sd = local.createNewDateCopy(options.selectedDay);
                            	local.calcHighlightDates();
                                local.calcDates(sd);
                                local.refreshCalendar();
                            });
                            jQuery("#dayButton").bind("click",function(){
                                local.option("view","day");
                                var sd = local.createNewDateCopy(options.selectedDay);
                                local.calcHighlightDates();
                                local.calcDates(sd);
                                local.refreshCalendar();
                            });
                            
                            jQuery("#backButton").bind("click",function(){
                                local.pageBack(options.view);
                            });
                            jQuery("#todayButton").bind("click",function(){
                                var today = new Date();
                                local.option("selectedDay",local.createNewDateCopy(today));
                                local.calcDates(today);
                                local.calcHighlightDates();
                                local.refreshCalendar();                                
                            });
                            jQuery("#forwardButton").bind("click",function(){
                                local.pageForward(options.view);
                            });
			},
                        navMonthForward: function(){
                            var local = this;
                            var options = local.options;
                            var tempDate = local.createNewDateCopy(options.startDate);
                            tempDate.setMonth(tempDate.getMonth()+1);
                            local.calcDates(tempDate);
                            local.calcHighlightDates();
                            local.refreshCalendar();
                        },
                        navMonthBack: function(){
                            var local = this;
                            var options = local.options;
                            var tempDate = local.createNewDateCopy(options.startDate);
                            tempDate.setMonth(tempDate.getMonth()-1);
                            local.calcDates(tempDate);
                            local.calcHighlightDates();
                            local.refreshCalendar();
                        },
                        cloneWeekRows: function(){
                          var local = this;
                          var options = local.options;
                          var weekRowClone = options.weekRow.clone();
                          for(var i=0;i<6;i++){
                              options.gui.append(weekRowClone);
                              weekRowClone = options.weekRow.clone();
                          }
                        },
                        checkForSundayOutOfView: function(){
                          var local = this;
                          var options = local.options;
                          var sd = options.selectedDay;
                          if(sd.getDay() != 0){
                              var tempDate = new Date(sd.getFullYear(),sd.getMonth(),sd.getDate());
                              while(tempDate.getDay() != 0){
                                  tempDate.setDate(tempDate.getDate()-1);
                              }
                              if(tempDate.getMonth() != sd.getMonth()){
                                  local.calcDates(tempDate);
                                  return true;
                              }
                          }
                          return false;
                        },
                        calcNewSelectedDate: function(theDay){
                            var local = this;
                            var options = local.options;
                            var month = options.monthLabel.text();
                            var year = options.yearLabel.text();
                            var dateString = month + " " + theDay + ", " + year;
                            var newSelectedDate = new Date(dateString);
                            local.option("selectedDay",newSelectedDate);
                        },
                        calcHighlightDates: function(){
                            var local = this;
                            var options = local.options;
                            var sd = options.selectedDay;
                            var tempDate = local.createNewDateCopy(sd);
                            if(options.view =="month")
                                tempDate.setDate(1);
                            else if(options.view == "week")
                                while(tempDate.getDay() != 0){
                                    tempDate.setDate(tempDate.getDate()-1);
                                }
                            local.option("highlightStartDate",local.createNewDateCopy(tempDate));
                            if(options.view == "month")
                                tempDate.setMonth(tempDate.getMonth()+1,0);
                            else if(options.view == "week"){
                                tempDate.setDate(tempDate.getDate()+6);
                                local.checkForSundayOutOfView();
                            }                                
                            local.option("highlightEndDate",local.createNewDateCopy(tempDate));
                        },
                        createNewDateCopy: function(date){
                          var newDate = new Date(date.getFullYear(),date.getMonth(),date.getDate());  
                          return newDate;
                        },
                        calcDates: function(d){
                            var local = this;
                            var theDate = local.createNewDateCopy(d);
                            theDate.setDate(1);
                            var tempStart = local.createNewDateCopy(theDate);
                            theDate.setMonth(theDate.getMonth()+1,0);
                            local.option("startDate",tempStart);
                            local.option("endDate",local.createNewDateCopy(theDate));
                        },
                        refreshCalendar: function(){
                            var local = this;
                            var options = local.options;
                            var today = new Date();
                            var day1 = local.createNewDateCopy(options.startDate);
                            var dayClass = local._determinDayClass(day1);
                            var dayElement;
                            var firstDayFound = false;
                            options.gui.find(".miniDay").each(function(i){
                                dayElement = jQuery(this);
                                if(firstDayFound){
                                    dayElement.text(day1.getDate());
                                    local._determineBgColor(dayElement,day1);
                                }else if(dayElement.hasClass(dayClass)){
                                    dayElement.text(day1.getDate());
                                    firstDayFound = true;
                                    local._determineBgColor(dayElement,day1);
                                }else{
                                    dayElement.text("");
                                    dayElement.css("background-color","#fff");
                                }
                                //checking for end of month -ba
                                if(firstDayFound){
                                    monthCheck = local.createNewDateCopy(day1);
                                    monthCheck.setDate(monthCheck.getDate()+1);
                                    if(day1.getMonth() == monthCheck.getMonth())
                                        day1.setDate(day1.getDate()+1);
                                    else{
                                        var length = options.gui.find(".miniDay").length;
                                        var theArray = options.gui.find(".miniDay");
                                        for(var j=i+1;j<=length;j++){
                                            jQuery(theArray[j]).text("");
                                            jQuery(theArray[j]).css("background-color","#fff");
                                        }
                                        return false;
                                    }
                                }
                            });
                            options.monthLabel.text(options.monthNameArray[options.startDate.getMonth()]);
                            options.yearLabel.text(options.startDate.getFullYear());
                        },
                        _determineBgColor: function(element,day){
                        	var local = this;
                        	var options = local.options;
                        	var today = new Date();
                        	if(local._datesAreEqual(day,today))
                            	element.css("background-color","gray");
                            else if((day > options.highlightStartDate && day < options.highlightEndDate) || local._datesAreEqual(day,options.highlightStartDate) || local._datesAreEqual(day,options.highlightEndDate))
                                element.css("background-color","#ddf");
                            else
    				element.css("background-color","#FFF");
                        },
                        pageForward: function(distance){
                            var local = this;
                            var options = local.options;
                            if(distance == undefined) distance = options.view;
                            switch(distance){
                                case "month":
                                    local.checkForShortMonth("forward");
                                    break;
                                case "week":
                                    options.selectedDay.setDate(options.selectedDay.getDate()+7);
                                    break;
                                case "day":
                                    options.selectedDay.setDate(options.selectedDay.getDate()+1);
                                    break;
                            }
                            local.calcDates(options.selectedDay);
                            local.calcHighlightDates();
                            local.refreshCalendar();
                        },
                        
                        pageBack: function(distance){
                            var local = this;
                            var options = local.options;
                            if(distance == undefined) distance = options.view;
                            switch(distance){
                                case "month":
                                    local.checkForShortMonth("back");
                                    break;
                                case "week":
                                    options.selectedDay.setDate(options.selectedDay.getDate()-7);
                                    break;
                                case "day":
                                    options.selectedDay.setDate(options.selectedDay.getDate()-1);
                                    break;
                            }
                            local.calcDates(options.selectedDay);
                            local.calcHighlightDates();
                            local.refreshCalendar();
                        },
                        checkForShortMonth: function(dir){
                            var local = this;
                            var options = local.options;
                            var nextMonth = local.createNewDateCopy(options.selectedDay);
                            var currentSelectedDate = local.createNewDateCopy(options.selectedDay);
                            /*setting nextMonth to first day of month then adding a month to make sure that we will be,
                            only 1 month ahead - BA */
                            nextMonth.setDate(1);
                            if(dir == "forward"){
                                nextMonth.setMonth(nextMonth.getMonth()+1);
                                //now increment currentSelectedDate by a month and make sure it is only one month ahead -BA
                                currentSelectedDate.setMonth(currentSelectedDate.getMonth()+1);
                            }else if(dir == "back"){
                                nextMonth.setMonth(nextMonth.getMonth()-1);
                                currentSelectedDate.setMonth(currentSelectedDate.getMonth()-1);
                            }
                            if(currentSelectedDate.getMonth() != nextMonth.getMonth()){
                                while(currentSelectedDate.getMonth() != nextMonth.getMonth()){
                                    currentSelectedDate.setDate(currentSelectedDate.getDate()-1);
                                }
                            }
                            local.option("selectedDay",currentSelectedDate);
                        },
                        _datesAreEqual: function(date1,date2){
                            if(date1.getDate() == date2.getDate()){
                                if(date1.getMonth() == date2.getMonth()){
                                    if(date1.getFullYear() == date2.getFullYear()){
                                        return true;
                                    }
                                }
                            }
                            return false;
                        },
                        _determinDayClass: function(date){
                            var theDay = date.getDay();
                            switch(theDay){
                                case 0:
                                    return "sunday";
                                case 1:
                                    return "monday";
                                case 2:
                                    return "tuesday";
                                case 3:
                                    return "wednesday";
                                case 4:
                                    return "thursday";
                                case 5:
                                    return "friday";
                                case 6:
                                    return "saturday";
                            }
                        },
			_prepare: function(){
                            var local = this;
                            var options = local.options;
                            var monthNameArray = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
                            var today = new Date();
                            local.option("gui",local.element);
                            local.option("leftButton",options.gui.find("#miniPageLeftButton"));
                            local.option("rightButton",options.gui.find("#miniPageRightButton"));
                            local.option("monthLabel",options.gui.find("#monthLabel"));
                            local.option("yearLabel",options.gui.find("#yearLabel"));
                            local.option("highlightStartDate",local.createNewDateCopy(options.startDate));
                            local.option("highlightEndDate",local.createNewDateCopy(options.endDate));
                            local.option("selectedDay",today);
                            local.option("monthNameArray",monthNameArray);
                            local.option("view","month");
                            local.option("weekRow",options.gui.find(".miniWeekRow").detach());
			}
		});
	}(jQuery));
        /*
	(function($){
		$.widget("ben.widgetTemplate", {
			options: {
			},
			_create: function(){
			
			},
			_prepare: function(){
			
			}
		});
	}(jQuery));*/
			
}