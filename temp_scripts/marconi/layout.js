
$(document).ready(function(){
	
	
		
	
	var mouseX,mouseY;
	$(document).bind("mousemove",function(e){
			mouseX = e.pageX;
			//mouseY = e.pageY;
	}); 
	
	$(function(){
	    $(window).resize(function(){
	        calculateLayout()
	    });
	});
	
	
	
	calculateLayout();
	
	
	
	
	function calculateLayout(){
		
		var $sidebar = $(".GENERAL-sidebar")
		var $sheet = $(".SHEET");
		var $controller = $(".CONTROLLER-wrapper");
		var $mainarea_header = $(".MAINAREA-header");
		var $mainarea_navigator = $(".MAINAREA-navigator");
		var $main_header = $(".MAIN-header");
		var $main_footer = $(".MAIN-footer");
		var $mainarea_sheet_footer = $(".MAINAREA-sheet-footer");
		var $mainarea_controller = $(".MAINAREA-controller");
		
		
		//vertical
		var expander_h = getViewPort().height 	- parseInt(( $mainarea_header.is(":visible") ) ? $mainarea_header.height() : 0)
												- parseInt(($mainarea_navigator.is(":visible")) ? $mainarea_navigator.height() : 0) 
												- parseInt(($main_header.is(":visible")) ? $main_header.height() : 0) 
												- parseInt(($main_footer.is(":visible")) ? $main_footer.height() : 0) 
												- parseInt(($mainarea_sheet_footer.is(":visible")) ? $mainarea_sheet_footer.height() : 0);	
								
		// inserisco nel conto se e quanti controller ci sono									
		$mainarea_controller.each(function(){
			( $(this).is(":visible") ) ? expander_h= expander_h - parseInt($mainarea_controller.height()) : 0;		
		});
		
		$sheet.css("height",expander_h);
		
		
		if(jQuery.browser.msie && jQuery.browser.version == 7){
			var tr_expander_h = expander_h + parseInt(($main_header.is(":visible")) ? $main_header.height() : 0) 
										   + parseInt(($main_footer.is(":visible")) ? $main_footer.height() : 0);
			$sheet.parents("tr").eq(0).css("height",tr_expander_h);
		}
	

		/// tolgo la width e i margin della sidebar alla width della viewport (circa 250)
		$sheet.css("width",getViewPort().width - ($sidebar.width()+30) );
		$controller.css("width",getViewPort().width - parseInt( $sidebar.width()) -25);
		
		calculateSlider();
		
		$mainarea_controller.each(function(){
			if($(this).is(":visible"))calculateController($(this));
		})
		
	
	}
	

	
	function calculateController($el){
		
		var scroller_tollerance = 70;    // di quanti pixel il contenuto deve eccedere rispetto al contenitore per attivare lo scroller
		var hidding_arrows_offset = 12;
		var sensibility = 5;
		var scrollbar_height = 20;
		var interval = (jQuery.browser.mozilla) ? 40 : 1; 
		
		///////////// calcolo e settaggio della correta width a CONTROLLER-wrapper-nowrap
		////////////  (come somma delle width e dei margin dei suoi figli)
		var controller_content_with_ammount = 0;
		$el.find(".CONTROLLER-wrapper-nowrap > div").each(function(){
			controller_content_with_ammount += parseInt($(this).width())+29
		});
		
		$el.find(".CONTROLLER-wrapper-nowrap").css("width",controller_content_with_ammount)
		
		
		// setto i controller laterali
		var content_width = controller_content_with_ammount;
		var wrapper_width = parseInt( $el.width() );
		var wrapper_height = parseInt( $el.height() );
		var overflow = content_width - wrapper_width
		

		
		if(overflow < scroller_tollerance)
			return false;
		
		else{
			$el.find(".CONTROLLER-arrow-right").show();
			$el.find(".CONTROLLER-arrow-right,.CONTROLLER-arrow-left").css("height",wrapper_height - scrollbar_height);
			$el.find(".CONTROLLER-arrow-right > div , .CONTROLLER-arrow-left > div").css( "margin-top" , ((wrapper_height/2) - scrollbar_height) )
			
			
			
			var interval_right;	
			$el.find(".CONTROLLER-arrow-right").hover(							
					function(){
						interval_right = setInterval(function(){
							scrollContent("ahead" , sensibility , $el)
						},interval);
					},
					function(){
						clearInterval(interval_right);
					}
			 );
			
			var interval_left;	
			$el.find(".CONTROLLER-arrow-left").hover(
					function(){
						interval_left = setInterval(function(){
							scrollContent("backwards" , sensibility , $el)
						},interval);
					},
					function(){
						clearInterval(interval_left);
					}
			 );
			
			
			// gestione accensione/spengimento delle frecce
			$el.find(".CONTROLLER-wrapper").scroll(function() {
				var scroll_x_left_offset =  Math.abs( $el.find(".CONTROLLER-wrapper").position().left - $el.find(".CONTROLLER-wrapper-nowrap").position().left );
				var scroll_x_right_offset = Math.abs( $el.find(".CONTROLLER-wrapper").position().left - $el.find(".CONTROLLER-wrapper-nowrap").position().left - overflow );
				
				(scroll_x_left_offset <= hidding_arrows_offset) ? $el.find(".CONTROLLER-arrow-left").fadeOut("slow") : $el.find(".CONTROLLER-arrow-left").fadeIn();
				(scroll_x_right_offset <= hidding_arrows_offset) ? $el.find(".CONTROLLER-arrow-right").fadeOut("slow") : $el.find(".CONTROLLER-arrow-right").fadeIn();
			});
					  
		}

	}
	
	function scrollContent(direction , sensibility , $el){
		var speed = 5;
		var arrow_width = $el.find(".CONTROLLER-arrow-right").width();
		
		//alert(arrow_width)
		if(direction == "backwards"){
			speed = ( parseInt(( arrow_width - (mouseX - $el.find(".CONTROLLER-wrapper").position().left) )/ sensibility) ) * -1;
		}
		else{
			speed = ((mouseX - $el.find(".CONTROLLER-arrow-right").offset().left) / sensibility) 
		}
		$el.find(".CONTROLLER-wrapper").scrollTo( {top:'-=0px', left:'+='+speed});
	}
	
	function calculateSlider(){
		var current_slide = slider.getCurrentSlide();
		
		slider.destroyShow();
		slider = $('.SLIDER').bxSlider({
			    	controls : false,
			    	startingSlide : current_slide,
			    	infiniteLoop: false
			    });
			    
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

	
	