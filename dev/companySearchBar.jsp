<%@ taglib prefix="s" uri="/struts-tags" %>
<script type="text/javascript" src="<s:url namespace='/' value='/js/jquery/df.Ajax.js.jsp'/>"></script>
<script src="<s:url namespace='/pages/gantt' action='COREIMPLjs' includeParams='none'/>" language="javascript"></script>
<% /* this contains most of the function needed for the forms */ %>
<script src="<s:url namespace='/pages/gantt' action='FORMSjs' includeParams='none'/>" language="javascript" ></script>
<% /* RWB: NOTE - this requires external functions 'filter()' and 'loadYear()' */ %>
<% /* RWB: NOTE - to turn on or off filtering fields, use 'FilterSearchBar.on()' and 'FilterSearchBar.off()' respectively */ %>

<div id="companySearchBarControl" style="overflow:auto; background-color:#DDDDDD;" > <!-- JCO: used with resize() in core_impl.js -->
	<table id="companySearchBar" height="50px" cellspacing="2px" bgcolor="#DDDDDD">
		<tbody>
			<tr>
				<td align="left" class="filtersearchbar_header">
					<table id="innerSearchBarTable" cellspacing="4px" border="0">
						<tbody>
							<tr >
								<td align="center" colspan="1"><font style="font-size:12px;">Foreman:</font></td>
								<td align="center" colspan="1"><font style="font-size:12px;">Phase:</font></td>
								<td align="center" colspan="1"><font style="font-size:12px;">Division:</font></td>
								<td align="center" colspan="1"><font style="font-size:12px;">Project Type:</font></td>
								<td align="center" colspan="1"><font style="font-size:12px;">Department:</font></td>
								<td align="center" colspan="1"><font style="font-size:12px;">Location:</font></td>
								<td align="center" colspan="1"><font style="font-size:12px;">Show&nbsp;Subphases</font></td>
								<td align="center" style="font-size:12px; white-space:nowrap;">
									<button type="button" align="right" id="btnPrintProjGo" style="font-size:11px;" onclick="goPrint();">Switch to Print View</button>
								</td>

							</tr>
							<tr >
								<td><select id="ForemanDropList" name="foreman" style="width:100px;font-size:12px;"></select></td>
								<td><select id="PhaseNameDropList" name="phasename" style="width:100px;font-size:12px;"></select></td>
								<td><select id="DivisionDropList" onchange="FilterSearchBar.checkDivision()" name="division" style="width:100px;font-size:12px;"></select></td>
								<td><select id="ProjectTypeDropList" name="projectType" style="width:100px;font-size:12px;"></select></td>
								<td><select id="DepartmentDropList" name="department" style="width:100px;font-size:12px;"></select></td>
								<td><select id="LocationDropList" name="location" style="width:100px;font-size:12px;"></select></td>
								<td align="center"><input type="checkbox" id="showAllPhases" name="showAllPhases"></td>
								<td style="white-space:nowrap;"><button type="button" id="distest" onclick="FilterSearchBar.selectDateRangeFilters()" style="font-size:12px;">Search</button>
									<button style="font-size:12px;" onclick="FilterSearchBar.resetDrops()" type="button">Reset</button>
									<button id="btnCompNWD" type="button" style="font-size:12px;">New&nbsp;NWD</button></td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</div>

<!-- RWB: custom javascript object to allow filtering fields to be easily turned on/off -->
<script language="javascript">
	var FilterSearchBar = new function() {
		//RWB: NOTE - these fields must be set externally, otherwise the associated buttons in the filter/search bar will do nothing
		/**<!-- EXTERNALLY SET FIELDS -->**/
		this.selectDateRangeFilters = function () {};
		this.checkDivision = function () {};

		/**<!-- BUTTONS -->**/
		this.disableButtons = function() {
			var ele = document.getElementsByTagName("button");
			for(var i =0; i< ele.length;i++){
				ele[i].disabled = true;
			}
		};
		this.enableButtons = function() {
			var ele = document.getElementsByTagName("button");
			for(var i =0; i< ele.length;i++){
				ele[i].disabled = false;
			}
		};
		this.flipButtons = function() {
			var ele = document.getElementsByTagName("button");
			for(var i =0; i< ele.length;i++){
				ele[i].disabled = !ele[i].disabled ;
			}
		};
	};

	/* This function opens the existing html that is on the page into a new window/tab.  This new window has all the content the gantt chart
	 * has in html only.  There is no javascript and any and all navigation is disabled.  The new page is entirely read only.
	 * When the user if finished printing their gantt chart, they simply close the window/tab and their gantt chart is still there exactly as they left it.
	 * - JCO
	 */

	function goPrint(){
		try{
			var theChart = jQuery("#GanttBody");
			var cloneChart = theChart.clone();
			var w = window.open();
			w.document.open();
			var headInfo = //'<meta http-equiv="X-UA-Compatible" content="IE=9" >\r\n'+
				//'<META http-equiv="Content-Type" content="text/html; charset=utf-8">\r\n'+
				//'<META name="GENERATOR" content="Microsoft FrontPage 6.0">\r\n'+
			//'<META name="ProgId" content="FrontPage.Editor.Document">\r\n'+
			'<title>Print View</title>';
			//<tr id="vertTableRow1"></tr>

			w.document.write('<!DOCTYPE html>' + "<html><head>" + headInfo + "</head><body></body></html>");
			this.makeVerticalTable(jQuery(w.document).find("body"));
			//				this.makeVerticalPhaseBars(w.document); //MJG disabled - iterating past the bounds of dataCellArray
			w.document.close();
		}
		catch(e){
			console.log(e);
		}
	}
	function makeVerticalTable(newBody){
		//console.log(newBody);
		var horizTable1 = jQuery("#horizTable1").find("tbody");
		var horizTable2 = jQuery("#leftSideTableBody");
		var horizTable3 = jQuery("#rightSideTableBody");
		var horizTable4 = jQuery("#rightSideChartTable");
		//<div id="bigDaddyWrapper"></div>
		//var verticalTable = jQuery('<table id="vertTable1" cellspacing="0" cellpadding="0" style="font-size:12px;"><tr id="vertTableRow1"></tr></table>');
		//newBody.html(verticalTable);
		newBody.html('<table id="vertTable1" cellspacing="0" cellpadding="0" style="font-size:12px;"><tbody><tr id="vertTableRow1"></tr></tbody></table>');
		//newBody.html("<table><tr><td>hey</td></tr?<</table>");
		var vertTableRow1 = newBody.find("#vertTableRow1");
		//var vertTableRow1 = jQuery("<tr id='vertTableRow1'></tr>")
		//newBody.find("#vertTable1").append(vertTableRow1);
		//verticalTable.append(vertTableRow1);
		
		horzToVert(horizTable1,horizTable3,vertTableRow1);
		horzToVert(horizTable2,horizTable4,vertTableRow1);
	}
	function makeVerticalPhaseBars(newWindowDoc){
		var tdArray = jQuery(newWindowDoc).find("td");
		var dataCellArray = [];
		jQuery(jQuery(tdArray).get().reverse()).each(function(i){
			if(!(i== 0 || i==1)){
				var dataCell = jQuery(this).find(".dataCell:first");
				var dataCellPosition = jQuery(dataCell).position();
				dataCellArray.push(dataCellPosition);
			}
		});
		var i=0;
		jQuery(".phaseBar").each(function(){
			if(jQuery(this).is(":visible")){
				var horizBar = jQuery(this);
				var horizBarPosition = horizBar.position();
				var firstBarYPosition = jQuery(newWindowDoc).find("#vertTable1").height() - dataCellArray[i].top;
				var firstBarXPosition = dataCellArray[i].left;
				var barColor = horizBar.data("phaseBarWidget").getColor();
				var foremanName = horizBar.find(".foremanName");
				var removeSpaces = foremanName.text().replace(/ /g ,"&nbsp");
				//var foremanDiv = document.createElement("div");
				var foremanDiv = jQuery("<div></div>");
				//var vertPhaseBarWrapper = document.createElement("div");
				var vertPhaseBarWrapper = jQuery("<div></div>");
				//var verticalPhaseBar = document.createElement("div");
				var verticalPhaseBar = jQuery("<div></div>");
				var foremanSelector = jQuery(foremanDiv);
				var vertBarWrapper = jQuery(vertPhaseBarWrapper);
				var vertBar = jQuery(verticalPhaseBar);
				var vertLeftPosition = dataCellArray[i].left - 6;
				foremanSelector.html(removeSpaces);
				var firstDayPosition = -jQuery(newWindowDoc).find("#vertTable1").height() + 469;
				vertBarWrapper.css({"position":"relative","left":vertLeftPosition,"top":firstDayPosition + horizBarPosition.left});
				vertBar.css({"z-index":"1111","border-radius": "10px","position":"inherit","background-color":"#"+barColor,"height":horizBar.width(),"width":"15px"});
				foremanSelector.css({
					"position":"absolute",
					"dispaly":"block",
					"-webkit-transform":"rotate(90deg)",
					"-webkit-transform-origin":"left",
					"-ms-transform":"rotate(90deg)",
					"-ms-transform-origin":"left",
					"-moz-transform":"rotate(90deg)",
					"-moz-transform-origin":"8px",
					"padding-left": "2px"
				});
				if (jQuery.browser.webkit){
					vertBar.css("border", "solid red 1px");
				}
				vertBarWrapper.html(vertBar);
				vertBarWrapper.append(foremanSelector);
				jQuery(newWindowDoc).find("#vertTable1").append(vertBarWrapper);
				i++;
			}else{
				if(jQuery(this).data("phaseBarWidget").isInDateRange())
					i++;
			}
		});

	}
	function horzToVert(horizTable1,horizTable2,vertRow){
		var horiz2TrList = horizTable2.find("tr:visible");
		horizTable1.find("tr:visible").each(function(i){
			var theTr = jQuery(this);
			//var theTd = document.createElement("td");
			var theTd = jQuery("<td></td>");
			var theTr2 = horiz2TrList[i];
			if(theTr.attr("id") == "emptyHeaderRow"){
				//var vertDiv = document.createElement("div");
				var vertDiv = jQuery("<div></div>");
				vertDiv.css({"width":theTr.height(),"height":theTr.width()});
				theTd.append(vertDiv);
			}
			theTr.find("td:visible").each(function(i){
				var tdElement = jQuery(this);
				//var vertDiv = document.createElement("div");
				var vertDiv = jQuery("<div></div>");
				formatDiv(vertDiv,tdElement);
				theTd.append(vertDiv);
			});
			jQuery(theTr2).find("td:visible").each(function(i){
				var tdElement2 = jQuery(this);
				//var vertDiv2 = document.createElement("div");
				var vertDiv2 = jQuery("<div></div>");
				formatDiv(vertDiv2,tdElement2);
				theTd.append(vertDiv2);
			});
			vertRow.prepend(theTd);
			console.log(theTd[0].outerHTML);
			console.log(vertRow[0].outerHTML);
			//vertRow.prepend("hey");
			
		});
		vertRow.find(".paddingTest").each(function(){
			//	jQuery(this).parent().css({"display":"inline-block"});
			var width = jQuery(this).width();
			//jQuery(this).css("display", "");
			var widthAmount = ((jQuery(this).parent().height() / 2) - (width / 2));
			var numberOfNbsp = Math.floor(widthAmount / 6);
			for(var i = 0; i < numberOfNbsp; i++){
				jQuery(this).prepend("&nbsp;");
			}
		});
	}
	function formatDiv(newDiv,tdElement){
		var formatText = "";
		var dataCellFound = false;
		newDiv.css({
			"width":tdElement.height(),
			"height":tdElement.width(),
			"border-bottom":"1px solid black",
			"border-right":"1px solid black",
			"text-align":"center"
		});

		if(tdElement.hasClass("headerDataCell")){
			var color = tdElement.data("headerDataWidget").getBgColor();
			newDiv.css("background-color",color);
			var removeSpaces = tdElement.text().replace(/ /g ,"&nbsp");
			formatText += removeSpaces;
		}
		else if(tdElement.hasClass("dataCell")){
			var color = tdElement.data("dataCellWidget").getBgColor();
			newDiv.css("background-color",color);
			newDiv.addClass("dataCell");
		}
		else if(tdElement.hasClass("gdatehead")){
			newDiv.css({"border-bottom":""});
		}
		else if(tdElement.hasClass("emptyCollapseTd")){
			newDiv.css({"border-bottom":""});
		}
		else if(tdElement.hasClass("projectTitle")){
			formatText += tdElement.find("#collapseIcon").text();
			var removeSpaces = tdElement.find(".projectName").text().replace(/ /g ,"&nbsp");
			formatText += "&nbsp;" + removeSpaces;
			newDiv.css({"overflow":"hidden","white-space":"nowrap"});
		}
		else if(tdElement.hasClass("startDate")){
			formatText = "&nbsp;&nbsp;&nbsp;" + tdElement.text(); //MJG prepended spaces to date
		}
		else if(tdElement.hasClass("endDate")){
			formatText = "&nbsp;&nbsp;&nbsp;" + tdElement.text(); //MJG prepended spaces to date
		}
		else if(tdElement.hasClass("startDateHeader")){
			var removeSpaces = tdElement.text().replace("Start Date","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start&nbspDate"); //MJG centered the header with spaces
			formatText = removeSpaces;
		}
		else if(tdElement.hasClass("endDateHeader")){
			var removeSpaces = tdElement.text().replace("End Date","&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;End&nbspDate"); //MJG centered the header with spaces
			formatText = removeSpaces;
		}
		//var textDiv = document.createElement("div");
		var textDiv = jQuery("<div></div>");
		textDiv.html(formatText);
		textDiv.css({"padding-top":"1px","white-space":"nowrap","dispaly":"block","-webkit-transform":"rotate(90deg)","-ms-transform":"rotate(90deg)","-moz-transform":"rotate(90deg)"});
		if(/*tdElement.hasClass("startDate") || tdElement.hasClass("endDate") || */tdElement.hasClass("headerDataCell")) //MJG we don't want the date cells to be centered by the function
			textDiv.addClass("paddingTest");
		newDiv.append(textDiv);
	}
</script>