
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
		var expander_h = getViewPort().height 	- parseInt(($(".MAINAREA-header").is(":visible")) ? $(".MAINAREA-header").css("height") : 0)
												- parseInt(($(".MAINAREA-controller").is(":visible")) ? $(".MAINAREA-controller").css("height") : 0) 
												- parseInt(($(".MAINAREA-navigator").is(":visible")) ? $(".MAINAREA-navigator").css("height") : 0) 
												- parseInt(($(".MAIN-header").is(":visible")) ? $(".MAIN-header").css("height") : 0) 
												- parseInt(($(".MAIN-footer").is(":visible")) ? $(".MAIN-footer").css("height") : 0) 
												- parseInt(($(".MAINAREA-sheet-footer").is(":visible")) ? $(".MAINAREA-sheet-footer").css("height") : 0);							
		

		$(".SHEET").css("height",expander_h);
		
		
		if(jQuery.browser.msie && jQuery.browser.version == 7){
			var tr_expander_h = expander_h + parseInt(($(".MAIN-header").is(":visible")) ? $(".MAIN-header").css("height") : 0) 
										   + parseInt(($(".MAIN-footer").is(":visible")) ? $(".MAIN-footer").css("height") : 0);
			$(".SHEET").parents("tr").eq(0).css("height",tr_expander_h);
		}
	
		/// tolgo la width e i margin della sidebar alla width della viewport (circa 250)
		$(".SHEET").css("width",getViewPort().width - 250);
		$(".CONTROLLER-wrapper").css("width",getViewPort().width - 235);
		
		calculateSlider();	
		calculateController();
	
	}
	

	
	function calculateController(){
		
		var scroller_tollerance = 70;    // di quanti pixel il contenuto deve eccedere rispetto al contenitore per attivare lo scroller
		var hidding_arrows_offset = 12;
		var sensibility = 6;
		
		///////////// calcolo e settaggio della correta width a CONTROLLER-wrapper-nowrap
		////////////  (come somma delle width e dei margin dei suoi figli)
		var controller_content_with_ammount = 0;
		$(".CONTROLLER-wrapper-nowrap > div").each(function(){
			controller_content_with_ammount += parseInt($(this).css("width"))+28
		});
		
		$(".CONTROLLER-wrapper-nowrap").css("width",controller_content_with_ammount)
		
		// setto i controller laterali
		var content_width = controller_content_with_ammount;
		var wrapper_width = parseInt( $(".MAINAREA-controller").css("width") );
		var wrapper_height = parseInt( $(".MAINAREA-controller").css("height") );
		var overflow = content_width - wrapper_width
		
		
		
		if(overflow < scroller_tollerance)
			return false;
		
		else{
			$(".CONTROLLER-arrow-right").show();
			$(".CONTROLLER-arrow-right,.CONTROLLER-arrow-left").css("height",wrapper_height-20);
			$(".CONTROLLER-arrow-right > div , .CONTROLLER-arrow-left > div").css( "margin-top" , ((wrapper_height/2)-24) )
			
			
			
			var interval_right;	
			$(".CONTROLLER-arrow-right").hover(
					
												
					function(){
						interval_right = setInterval(function(){
							scrollContent("ahead" , sensibility)
						});
					},
					function(){
						clearInterval(interval_right);
					}
			 );
			
			var interval_left;	
			$(".CONTROLLER-arrow-left").hover(
					function(){
						interval_left = setInterval(function(){
							scrollContent("backwards" , sensibility)
						});
					},
					function(){
						clearInterval(interval_left);
					}
			 );
			
			
			
			// gestione accensione/spengimento delle frecce
			$(".CONTROLLER-wrapper").scroll(function() {
				var scroll_x_left_offset =  Math.abs( $(".CONTROLLER-wrapper").position().left - $(".CONTROLLER-wrapper-nowrap").position().left );
				var scroll_x_right_offset = Math.abs( $(".CONTROLLER-wrapper").position().left - $(".CONTROLLER-wrapper-nowrap").position().left - overflow );
				
				(scroll_x_left_offset <= hidding_arrows_offset) ? $(".CONTROLLER-arrow-left").fadeOut("slow") : $(".CONTROLLER-arrow-left").fadeIn();
				(scroll_x_right_offset <= hidding_arrows_offset) ? $(".CONTROLLER-arrow-right").fadeOut("slow") : $(".CONTROLLER-arrow-right").fadeIn();
				
			});
					  
			
		}

	}
	
	function scrollContent(direction , sensibility){
		var speed = 5;
		var arrow_width = $(".CONTROLLER-arrow-right").width();
		//alert(arrow_width)
		if(direction == "backwards"){
			speed = ( parseInt(( 150 - (mouseX - $(".CONTROLLER-wrapper").position().left) )/ sensibility) ) * -1;
		}
		else{
			speed = ((mouseX - $(".CONTROLLER-arrow-right").offset().left) / sensibility) //$(".CONTROLLER-wrapper").position().left 
		}
		$(".CONTROLLER-wrapper").scrollTo( {top:'-=0px', left:'+='+speed});
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

	
	