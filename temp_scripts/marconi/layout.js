
$(document).ready(function(){
	
	
	var mouseX;
	$(document).bind("mousemove",function(e){
			mouseX = e.pageX;
	}); 
	
	
	calculateLayout();
	
	
	$(function(){
	    $(window).resize(function(){
	        calculateLayout()
	    });
	});
	
	function calculateLayout(){
		

		//vertical
		var expander_h = getViewPort().height 	- parseInt(($(".MAINAREA-header").is(":visible")) ? $(".MAINAREA-header").height() : 0)
												- parseInt(($(".MAINAREA-navigator").is(":visible")) ? $(".MAINAREA-navigator").height() : 0) 
												- parseInt(($(".MAIN-header").is(":visible")) ? $(".MAIN-header").height() : 0) 
												- parseInt(($(".MAIN-footer").is(":visible")) ? $(".MAIN-footer").height() : 0) 
												- parseInt(($(".MAINAREA-sheet-footer").is(":visible")) ? $(".MAINAREA-sheet-footer").height() : 0);	
													
		// inserisco nel conto se e quanti controller ci sono									
		$(".MAINAREA-controller").each(function(){
			( $(this).is(":visible") ) ? expander_h= expander_h -  parseInt($(".MAINAREA-controller").height()) : null;			
		});

		$(".SHEET").css("height",expander_h);
		
		
		if(jQuery.browser.msie && jQuery.browser.version == 7){
			var tr_expander_h = expander_h + parseInt(($(".MAIN-header").is(":visible")) ? $(".MAIN-header").height() : 0) 
										   + parseInt(($(".MAIN-footer").is(":visible")) ? $(".MAIN-footer").height() : 0);
			$(".SHEET").parents("tr").eq(0).css("height",tr_expander_h);
		}
	
		/// tolgo la width e i margin della sidebar alla width della viewport (circa 250)
		$(".SHEET").css("width",getViewPort().width - 250);
		$(".CONTROLLER-wrapper").css("width",getViewPort().width - 235);
		
		calculateSlider();
		
		$(".MAINAREA-controller").each(function(){
			calculateController($(this));
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
			controller_content_with_ammount += parseInt($(this).width())+28
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
			speed = ((mouseX - $el.find(".CONTROLLER-arrow-right").offset().left) / sensibility) //$(".CONTROLLER-wrapper").position().left 
		}
		$el.find(".CONTROLLER-wrapper").scrollTo( {top:'-=0px', left:'+='+speed});
	}
	
	function calculateSlider(){
		var current_slide = slider.getCurrentSlide();
		
		slider.destroyShow();
		slider = $('.SLIDER').bxSlider({
			    	controls : false,
			    	startingSlide : current_slide
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

	
	