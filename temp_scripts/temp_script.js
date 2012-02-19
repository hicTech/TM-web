
$(document).ready(function(){
	
	
	/*
	 * sidebar NOTE: se trova SIDEBAR-search in SIDEBAR-item lo espande se no no!
	 */

	$(".SIDEBAR-item").each(function(){
		$(this).click(function(){
			if($(this).find(".SIDEBAR-button").is(".selected")){
				if($(this).find(".SIDEBAR-search").is(":visible")){
					$(this).find(".SIDEBAR-search").hide("slideUp")
				}
				else{
					$(this).find(".SIDEBAR-search").show("slideDown")
				}
				return false;
			}
			$(".SIDEBAR-button").removeClass("selected");
			$(this).find(".SIDEBAR-button").addClass("selected");
			$(".SIDEBAR-search").hide("slideUp");
			$(this).find(".SIDEBAR-search").show("slideDown")
		});
		
		$(this).find("button .search").click(function(){
			//cerca 
		});
		
		$(this).find(".close").click(function(event){
			// chiudi
		});
	});
	
	$(".SIDEBAR-search").click(function(event){
		event.stopPropagation();
	})



	/*
	 * switch MAINAREA (LIVE)
	 */	
	
	$(".MAINAREA-header ul li div").click(function(i){
			var $this=$(this);
			 var index = $(".MAINAREA-header ul li div").index(this);
			if(!$this.is(".header-tab-item-selected")){ //if not selected
				$this.parent().parent().find(".header-tab-item-selected").removeClass("header-tab-item-selected")
				$this.addClass("header-tab-item-selected");
				var $view_data_box=$this.parent().parent().parent().next();
				$view_data_box.find("ul li:visible").hide();
				$view_data_box.find("ul li").eq(index).show();
				
			}
	})
	
	
	/*
	 * collassable fieldset (LIVE)
	 */
	var collapsible_fieldset = $("fieldset.collapsible") 
	var collapsible_area = collapsible_fieldset.find(".FIELDSET-collapsible-area")
	collapsible_fieldset.find("legend").find("button").click(function(){
		collapsible_area.toggle();
	})
	
	
	/*
	 * datepicker (LIVE) e dataRange Picker
	 */
	
	$("input[type='date']").each(function(){
		if( ! $(this).is("[data-role='dateRange-from']") && ! $(this).is("[data-role='dateRange-to']")){
			$(this).datepicker({ 
				dateFormat: 'dd/mm/yy'
			});
		}
	})
	
	$('[data-role="dateRange-from"]').each(function(){

		var dates = $(this).parents(".FORM-field-row").find("input[type='date']").datepicker({
			onSelect: function( selectedDate ) {
				var option = $(this).attr("data-role") == "dateRange-from" ? "minDate" : "maxDate",
					instance = $( this ).data( "datepicker" ),
					date = $.datepicker.parseDate(
						instance.settings.dateFormat ||
						$.datepicker._defaults.dateFormat,
						selectedDate, instance.settings );
				dates.not( this ).datepicker( "option", option, date );
			}
		});
	});
	
	/*
	 * SLIDER (LIVE)
	 */
	
	$(".FORM-slider").each(function(){
		var $input = $(this).parents(".FORM-field-row").find("input");
		
		var init_value = ( !! $(this).data("init-value") ) ? $(this).data("init-value") : "";
		var min_value = ( !! $(this).data("min-value") ) ? $(this).data("min-value") : "";
		var max_value = ( !! $(this).data("max-value") ) ? $(this).data("max-value") : "";
		var step_value = ( !! $(this).data("step-value") ) ? $(this).data("step-value") : "";
		
		( $(this).data("readonly") == true ) ? $input.attr("disabled","disabled") : "";
		
		$input.val(init_value);	
		
		$(this).slider({
			value:init_value,
			min: min_value,
			max: max_value,
			step: step_value,
			slide: function( event, ui ) {
				$input.val(ui.value);
			}
		})
	});
	
	
	/*
	 * alert
	 */
	
	$("#alert").click(function(){
		var $alert = $('<div title="Titolo alert"><p><span class="ui-icon ui-icon-info" style="float:left; margin:0 7px 20px 0;"></span>Testo alert</p></div>');
		$alert.dialog({
			modal:true,
			autoOpen: false,
			show: "fade",
			hide: "fade",
			buttons: {
				Ok: function() {
					$( this ).dialog( "close" );
				}
			}
		});
		$alert.dialog( "open" );
		return false;
	})
	
	
	$("#confirm").click(function(){
		var $confirm = $('<div title="Titolo confirm"><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>Testo confirm</p></div>');
		$confirm.dialog({
			modal:true,
			autoOpen: false,
			show: "fade",
			hide: "fade",
			buttons: {
				"Conferma": function() {
					alert('conferma');
					$( this ).dialog( "close" );
				},
				"Nega": function() {
					alert('nega');
					$( this ).dialog( "close" );
				}
			}
		});
		$confirm.dialog( "open" );
		return false;

	})
	
	
	/*
	 * input[type='search']  (LIVE)  
	 * oltre alle questioni di livesearch gli spegniamo l'iconuzza della lente di ingrandimento
	 * al focus (sempre) e se al blur il value è vuoto la riaccendiamo
	 */
	
	$("input[type='search']")
	
	.focus(function(){ 
		$(this).addClass("input_no_value");
	})
	
	.blur(function(){
		if($(this).val() == "") 
			$(this).removeClass("input_no_value")
	})
	
	
	
	$("input[type='search']").autocomplete({
			source: [
			"ActionScript",
			"AppleScript",
			"Asp",
			"BASIC",
			"C",
			"C++",
			"Clojure",
			"COBOL",
			"ColdFusion",
			"Erlang",
			"Fortran",
			"Groovy",
			"Haskell",
			"Java",
			"JavaScript",
			"Lisp",
			"Perl",
			"PHP",
			"Python",
			"Ruby",
			"Scala",
			"Scheme"
		]
		});
		
	$(".forward").click(function(){
		
				
	});
	
	/*
	 * gestione SLIDER
	 * 
	 * 
	 */
	
	slider = $('.SLIDER').bxSlider({
			    	controls : false
			    });
	
	$('#navigator_back').click(function(){
	    slider.goToPreviousSlide();
	    return false;
	});
	
	$('#navigator_forward').click(function(){
	    slider.goToNextSlide();
	    return false;
	});
	
	/*
	 * Di seguito gestisco lo slargamento automatico del div .SHEET e il ricalcolo dello slider
	 * la funzione refreshLayout() viene invocata al caricamento 
	 * ed al resizing delle window
	 * OKKIO: deve essere invocata anche al resizing di una delle linee
	 * sue sorelle (vedi expander_h).
	 */
	

	refreshLayout()
	
	$(function(){
	    $(window).resize(function(){
	        refreshLayout()
	    });
	});
	
	function refreshLayout(){
		
		var expander_h = getViewPort().height 	- parseInt(($(".MAINAREA-header").is(":visible")) ? $(".MAINAREA-header").css("height") : 0)
												- parseInt(($(".MAINAREA-controller").is(":visible")) ? $(".MAINAREA-controller").css("height") : 0) 
												- parseInt(($(".MAINAREA-navigator").is(":visible")) ? $(".MAINAREA-navigator").css("height") : 0) 
												- parseInt(($(".MAIN-header").is(":visible")) ? $(".MAIN-header").css("height") : 0) 
												- parseInt(($(".MAIN-footer").is(":visible")) ? $(".MAIN-footer").css("height") : 0) 
												- parseInt(($(".MAINAREA-sheet-footer").is(":visible")) ? $(".MAINAREA-sheet-footer").css("height") : 0) 
												- parseInt(($(".MAINAREA-footer").is(":visible")) ? $(".MAINAREA-footer").css("height") : 0);							
										
		$(".SHEET").css("height",expander_h);
		$(".SHEET").css("width",getViewPort().width - 250);
		
		var current_slide = slider.getCurrentSlide();
		slider.destroyShow();
		slider = $('.SLIDER').bxSlider({
			    	controls : false,
			    	startingSlide : current_slide
			    });
		
		if(jQuery.browser.version == 7){
			var tr_expander_h = expander_h + parseInt(($(".MAIN-header").is(":visible")) ? $(".MAIN-header").css("height") : 0) 
										   + parseInt(($(".MAIN-footer").is(":visible")) ? $(".MAIN-footer").css("height") : 0);
			$(".SHEET").parents("tr").eq(0).css("height",tr_expander_h);
		}

	}
	
	
	
	/*
	 * calcolo viewport crossbrowser
	 */
	
	function getViewPort(){
		if (typeof window.innerWidth != 'undefined'){
		      viewportWidth = window.innerWidth,
		      viewportHeight = window.innerHeight
		}
		else if (typeof document.documentElement != 'undefined'
		&& typeof document.documentElement.clientWidth !=
		'undefined' && document.documentElement.clientWidth != 0){
			viewportWidth = document.documentElement.clientWidth,
			viewportHeight = document.documentElement.clientHeight
		}  
		
		else{
			viewportWidth = document.getElementsByTagName('body')[0].clientWidth,
			viewportHeight = document.getElementsByTagName('body')[0].clientHeight
		}
		
		return {
			width : viewportWidth,
			height : viewportHeight
		}
	}
	
	
	
	
	

});

	
	