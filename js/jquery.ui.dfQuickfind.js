(function($){
	$.widget("df.quickfind",{
		options: {
			createLink: "../test.html",
			displayFragmentUrl: "",
			formatObject: {},
			formTitle: "Dataforma Quickfind",
			isMoreResultsLocation: "moreResults",
			maxHeight: 260,
			outputElementId: "",
			resultLocation: "searchResult",
			rowHoverColor: "yellow",
			searchDelay: 500,
			searchUrl: "",
			width: 600,
			zebraStripeColor: "#dddddd",
			//element class strings
				//no associated obj
				_displayFragmentCreateLinkClass: "df_quickfind_default_createLink",
				_displayFragmentHeaderCellClass: "df_quickfind_default_headerCell",
				_displayFragmentNumFoundClass: "df_quickfind_default_numFound",
				_displayFragmentRowCellClass: "df_quickfind_default_rowCell",
				_displayFragmentTitleClass: "df_quickfind_default_title",
				//has associated obj
				_displayFragmentHeaderClass: "df_quickfind_default_header",
				_displayFragmentRowClass: "df_quickfind_default_row",
				_displayFragmentTbodyClass: "df_quickfind_default_tbody",
				_displayFragmentWrapperClass: "df_quickfind_default_wrapper",
				_resultContainerClass: "df_quickfind_result",
			//element objects
			_displayFragmentHeader: {},
			_displayFragmentRow: {},
			_displayFragmentTbody: {},
			_displayFragmentWrapper: {},
			_resultContainer: {},
			//vars
			_addable: "addable",
			_canSearch: true,
			_classPrefix: "df_quickfind_default_dynamic_",
			_displayFragmentTitleHeight: 57,
			_kbScrollOffset: 69,
			_loadingGif: "../images/spinner.gif",
			_isKbSelect: false,
			_isMoreResults: false,
			_queryString: "",
			_rowArray: [],
			_rowIndex: -1,
			_searchNum: 0,
			_searchString: ""
		},
		_addDialog: function(){
			var that = this;
			var options = that.options;
			options._resultContainer.dialog({
				autoOpen: false,
				draggable: false,
				height: options.maxHeight,
				hide: "fade",
				modal: false,
				position: [that.element.position().left, that.element.position().top], //todo
				resizable: false,
				show: "fade",
				width: options.width,
				zindex: 1005
			});
			options._resultContainer.parent().find(".ui-dialog-titlebar").css("display", "none");
			options._resultContainer.parent().css("border", "none");
			options._resultContainer.parent().css("background", "none");
			options._resultContainer.css("padding", "0px");
		},
		_addListeners: function(){
			var that = this;
			var options = that.options;
			var timeoutFunc;
			//add search to target input
			that.element.keyup(function(e){
				if(e.keyCode !== 40 && e.keyCode !== 38 && e.keyCode !== 13 && e.keyCode !== 27){
					options._searchNum = 0;	
					clearTimeout(timeoutFunc);
					timeoutFunc = setTimeout(
						function(){
							that._ajaxSearch();
						},
						options.searchDelay
					);
				}
			});
			//add close using jq.outside-events
			options._resultContainer.bind('clickoutside', function(){
				that._closeDialog();
			});
			//detect when the result table wrapper div has been scrolled to the bottom
			options._displayFragmentWrapper.scroll(function(){
				if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){
					if(options._isMoreResults && options._searchNum > 0 && options._canSearch){
						options._canSearch = false;
						options._displayFragmentTbody.append("<tr><td align='center' colspan='" + options.formatObject.length + "'><img alt='loading' src='" + options._loadingGif + "'/></td></tr>");
						that._ajaxSearch();
					}
				}
			});
			//add click and mouseover handlers to result table rows
			options._displayFragmentRow
				.click(function(){ 
					$("#" + options.outputElementId).val($("#" + options.outputElementId).val() + $(this).find("." + options._classPrefix + options._addable).html() + "\n");
					that._closeDialog();
					that.element.val("");
					that.element.focus();
				})
				.mouseover(function(){
					$(document).mousemove(function(){
						options._isKbSelect = false;
					});
					if(!options._isKbSelect){
						for(var i = 0; i < options._rowArray.length; i++){
							options._rowArray[i].css("background", "");
						}
						$(this).css("background", options.rowHoverColor);
						$(this).css("cursor", "pointer");
						options._rowIndex = this.rowIndex;
					}
				});
			//enable arrow key selection
			$(document).on("keyup", function(e){
				if(options._rowArray.length > 0){
					if(e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13 || e.keyCode === 27){
						options._isKbSelect = true;
						if(e.keyCode === 40){ //down arrow
							if(options._rowIndex < options._rowArray.length - 1){
								options._rowIndex++;
								options._rowArray[options._rowIndex].css("background", options.rowHoverColor)
							}
							if(options._rowIndex > 0 && options._rowIndex < options._rowArray.length){
								options._rowArray[options._rowIndex - 1].css("background", "");
							}
						}
						if(e.keyCode === 38){ //up arrow
							if(options._rowIndex > 0){
								options._rowIndex--;
								options._rowArray[options._rowIndex].css("background", options.rowHoverColor);
							}
							if(options._rowIndex < options._rowArray.length){
								options._rowArray[options._rowIndex + 1].css("background", "");
							}
						}
						if(e.keyCode === 27){ //escape key
							that._closeDialog();
						}
						if(e.keyCode === 13){ //enter key
							options._rowArray[options._rowIndex].triggerHandler("click");
						}
						//scroll the div when the arrows highlight elements - the constant is the offset before which the animation begins
						if(options._rowIndex >= 0){
							options._displayFragmentWrapper.animate({
								scrollTop: options._rowIndex * (options._displayFragmentWrapper[0].scrollHeight / options._rowArray.length) - options._kbScrollOffset
							},
							0 //animation disabled - too laggy
							);
						}
					}
				}
			});
		},
		_ajaxSearch: function(){
			var that = this;
			var options = that.options;
			$.ajax({
				cache: false,
				data: that._prepareQueryString(),
				dataType: "json",
				error: function(response){
					alert("error"); //make this better 
				},
				url: options.searchUrl,
				success: function(response){
					that.option("_isMoreResults", response[options.isMoreResultsLocation]);
					that._displayResults(response);
				}
			}).done(function(){ 
				//code that will execute when the call is complete
			});
		},
		_closeDialog: function(){
			var that = this;
			var options = that.options;
			options._displayFragmentTbody.html("");
			options._searchNum = 0;
			options._resultContainer.dialog("close");
			options._rowArray = [];
			options._rowIndex = -1;
		},
		_create: function(){
			var that = this;
			that._createElements();
			that._addDialog();
			that._retrieveDisplayFragment(); //calls _prepareForm and _addListeners upon fragmant retrieval
		},
		_createElements: function(){
			var that = this;
			var options = that.options;
			//result container
			that.element.after("<div class='" + options._resultContainerClass + "' style='background:white; border:2px solid #666;'></div>");
			that.option("_resultContainer", $("." + options._resultContainerClass));
		},
		_displayResults: function(response){
		//uses the cloned fragment row to fill out a table based on the json response
			var that = this;
			var options = that.options;
			if(options._searchNum  == 0){
				that._closeDialog(); //visually refresh if the user enters more text after initial search
			}
			else{
				options._displayFragmentTbody.find("tr:last-child").remove();
			}
			options._searchNum++;
			$("." + options._displayFragmentNumFoundClass).html(response[options.resultLocation].length);
			for(var i = 0; i < response[options.resultLocation].length; i++){  //row loop
				var jsonData = response.searchResult[i];
				var newRow = options._displayFragmentRow.clone(true);
				for(key in jsonData){ //column loop								//column loop
					var thisCol = newRow.find("." + options._classPrefix + key);
					thisCol.html(jsonData[key]);
					thisCol.attr("title", jsonData[key]);
				}
				if((i % 2) == (options._searchNum % 2)){
					newRow.attr("bgcolor", options.zebraStripeColor); //not using css so we can keep the highlight on hover
				}
				options._rowArray.push(newRow);
				options._displayFragmentTbody.append(newRow);
			}
			options._resultContainer.dialog("open");
			options._canSearch = true;
			//using the jq ui position plugin to positon the dialog window appropriately near the target element
			options._resultContainer.parent().position({
				my: "left top",
				at: "left bottom",
				of: that.element
			});
			that.element.focus();
			//if there few enouth results that the entered height for the dialog will leave white space, shrink the dialog
			if(options._displayFragmentWrapper[0].scrollHeight > options._displayFragmentTbody.outerHeight() + 2){ //constant here to compensate for differences in ie vs firefox
				options._resultContainer.dialog("option", "height", options._displayFragmentTbody.outerHeight() + options._displayFragmentTitleHeight)
				options._displayFragmentWrapper.css("height", options._displayFragmentTbody.outerHeight());
			}
		},
		_prepareForm: function(){
		//the form is prepared to accept the json search response by formatting the response table based on the passed formatting object
			var that = this;
			var options = that.options;
			var form = options._resultContainer;
			var format = options.formatObject;
			var headerCell = form.find("." + options._displayFragmentHeaderCellClass);
			var rowCell = form.find("." + options._displayFragmentRowCellClass);
			that.option("_displayFragmentHeader", form.find("." + options._displayFragmentHeaderClass));
			that.option("_displayFragmentRow", form.find("." + options._displayFragmentRowClass));
			that.option("_displayFragmentTbody", form.find("." + options._displayFragmentTbodyClass));
			that.option("_displayFragmentWrapper", form.find("." + options._displayFragmentWrapperClass));
			
			options._displayFragmentHeader.html("");
			options._displayFragmentRow.html("");
			options._displayFragmentTbody.html("");
			//set the titlebar information
			$("." + options._displayFragmentCreateLinkClass).attr("href", options.createLink);
			$("." + options._displayFragmentTitleClass).html(options.formTitle);
			//set height for wrapper div based on the height of the dialog and attach a handler for scrolling to the bottom
			options._displayFragmentWrapper.css("height", options.maxHeight - options._displayFragmentTitleHeight);
			//create headers and row cells according the formatting object 
			for(var i = 0; i < format.length; i++){
				var row = format[i];
				var thisHeader = headerCell.clone();
				var thisCell = rowCell.clone();
				
				thisHeader.css("width", row.width + "px");
				thisHeader.text(row.header);
				options._displayFragmentHeader.append(thisHeader);
				
				thisCell.css("width", row.width + "px");
				thisCell.addClass(options._classPrefix + row.label);
				if(row.addToOutput){
					thisCell.addClass(options._classPrefix + options._addable);
				}
				options._displayFragmentRow.append(thisCell);
			}
		},
		_prepareQueryString: function(){
			var queryString = "";
			//queryString += df.ajax.appPath + "/pages/gantt/RetrieveDurationInfo.action?id=" + that.target.val());
			return queryString;
		},
		_retrieveDisplayFragment: function(){
		//get the html display template
			var that = this;
			var options = that.options;
			$.get(
				options.displayFragmentUrl,
				function(response){
					$(options._resultContainer).html(response);
					//these are called here because they depend on the response object
					that._prepareForm();
					that._addListeners();
				},
				"html"
			);
		}
	});
})(jQuery);