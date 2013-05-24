(function($){
    $.widget("namespace.widgetName",{
        options: {
            
        },
        _create: function(){
            
        }
    });
})(jQuery);
   
(function($){
    $.widget("test.lib",{
        options: {
            
        },
		_convertCheckBoxToBoolean: function(checkbox){
        //simple conversion from checkbox state to boolean
            if(checkbox.attr("checked") == "checked")
                return true;
            return false;
        },
		_daysInMonth: function(month, year){
		//returns the number of days in the passed month of the passed year
		//Date.getMonth, Date.getFullYear would be example args
			return 32 - new Date(year, month, 32).getDate();
		},
		_isDateBefore: function(strDate1, strDate2){
		//this compares 2 date strings formatted in the mm/dd/yyyy format
		//this will return true if strDate1 is before strDate2
			var date1 = new Date();
			var date2 = new Date();
			var d1mm =strDate1.substring(0, 2);
			var d1dd = strDate1.substring(3, 5);
			var d1yyyy = strDate1.substring(6, 10);
			var d2mm = strDate2.substring(0, 2);
			var d2dd = strDate2.substring(3, 5);
			var d2yyyy = strDate2.substring(6, 10);
			
			d1mm--;
			date1.setMonth(d1mm);
			date1.setDate(d1dd);
			date1.setFullYear(d1yyyy);
			d2mm--;
			date2.setMonth(d2mm);
			date2.setDate(d2dd);
			date2.setFullYear(d2yyyy);
			if(date1.getTime() < date2.getTime())
				return true;
			return false;
		},
		_sortObjectArrayByKey: function(objAr, key){
		//sort objAr by the value associated with key
			objAr.sort(function(a, b){
				var nameA = a[key].toLowerCase();
				var nameB = b[key].toLowerCase();
				if (nameA < nameB) //sort string ascending
					return -1; 
				if (nameA > nameB)
					return 1;
				return 0; //default return value (no sorting)
			});
		}
    });
})(jQuery);
   
formatDateStr = function(date, formatStr){
//converts Dates to displayable strings
	vYear4Str = date.getFullYear() + '';
	vYear2Str = vYear4Str.substring(2, 4);
	vMonthStr = (date.getMonth() + 1) + '';
	vDayStr   = date.getDate() + '';
	if(vDayStr < 10){
		vDayStr = "0" + vDayStr;
	}
	if(vMonthStr < 10){
		vMonthStr = "0" + vMonthStr;
	}
	switch(formatStr){
		case 'mm/dd/yyyy':
			return(vMonthStr + '/' + vDayStr + '/' + vYear4Str);
		case 'dd/mm/yyyy':
			return(vDayStr + '/' + vMonthStr + '/' + vYear4Str);
		case 'yyyy-mm-dd':
			return(vYear4Str + '-' + vMonthStr + '-' + vDayStr);
		case 'mm/dd/yy':
			return(vMonthStr + '/' + vDayStr + '/' + vYear2Str);
		case 'dd/mm/yy':
			return(vDayStr + '/' + vMonthStr + '/' + vYear2Str);
		case 'yy-mm-dd':
			return(vYear2Str + '-' + vMonthStr + '-' + vDayStr);
		case 'mm/dd':
			return(vMonthStr + '/' + vDayStr);
		case 'dd/mm':
			return(vDayStr + '/' + vMonthStr);
	}  
}   

formatDateStr = function(date){
//converts Dates to displayable strings
	vYear4Str = date.getFullYear() + '';
	vYear2Str = vYear4Str.substring(2, 4);
	vMonthStr = (date.getMonth() + 1) + '';
	vDayStr   = date.getDate() + '';
	if(vDayStr < 10){
		vDayStr = "0" + vDayStr;
	}
	if(vMonthStr < 10){
		vMonthStr = "0" + vMonthStr;
	}
	return(vMonthStr + '/' + vDayStr + '/' + vYear4Str);
}

function isValidKey(keyId){
//this is currently set to return true for character keys and false for others
	switch(keyId){
	//valid keys
		case 48: //0	 
		case 49: //1	 
		case 50: //2	 
		case 51: //3	 
		case 52: //4	 
		case 53: //5	 
		case 54: //6	 
		case 55: //7	 
		case 56: //8	 
		case 57: //9	 
		case 65: //a	 
		case 66: //b	 
		case 67: //c	 
		case 68: //d	 
		case 69: //e	 
		case 70: //f	 
		case 71: //g	 
		case 72: //h	 
		case 73: //i	 
		case 74: //j	 
		case 75: //k	 
		case 76: //l	 
		case 77: //m	 
		case 78: //n	 
		case 79: //o	 
		case 80: //p	 
		case 81: //q	 
		case 82: //r	 
		case 83: //s	 
		case 84: //t	 
		case 85: //u	 
		case 86: //v	 
		case 87: //w	 
		case 88: //x	 
		case 89: //y	 
		case 90: //z	 
		case 96: //numpad 0	 
		case 97: //numpad 1	 
		case 98: //numpad 2	 
		case 99: //numpad 3	 
		case 100: //numpad 4	 
		case 101: //numpad 5	 
		case 102: //numpad 6	 
		case 103: //numpad 7	 
		case 104: //numpad 8	 
		case 105: //numpad 9	 
		case 106: //multiply	 
		case 107: //add	 
		case 109: //subtract	 
		case 110: //decimal point	 
		case 111: //divide	 
		case 186: //semi-colon	 
		case 187: //equal sign	 
		case 188: //comma	 
		case 189: //dash	 
		case 190: //period	 
		case 191: //forward slash	 
		case 192: //grave accent	 
		case 219: //open bracket	 
		case 220: //back slash	 
		case 221: //close braket	 
		case 222: //single quote
			return true;
	//invalid keys
		case 8: //backspace
		case 9: //tab
		case 13: //enter
		case 16: //shift
		case 17: //ctrl
		case 18: //alt
		case 19: //pause/break	 
		case 20: //caps lock	 
		case 27: //escape
		case 33: //page up	 
		case 34: //page down	 
		case 35: //end	 
		case 36: //home	 
		case 37: //left arrow	  
		case 38: //up arrow	 
		case 39: //right arrow	 
		case 40: //down arrow	 
		case 45: //insert	 
		case 46: //delete	 
		case 91: //left window key	 
		case 92: //right window key	 
		case 93: //select key	 
		case 112: //f1	 
		case 113: //f2	 
		case 114: //f3	 
		case 115: //f4	 
		case 116: //f5	 
		case 117: //f6	 
		case 118: //f7	 
		case 119: //f8	 
		case 120: //f9	 
		case 121: //f10	 
		case 122: //f11	 
		case 123: //f12	 
		case 144: //num lock	 
		case 145: //scroll lock	 
			return false;
   }
}