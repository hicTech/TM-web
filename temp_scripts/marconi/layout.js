
$(document).ready(function(){
	
	

	/*
	 * Di seguito gestisco lo slargamento automatico del div .SHEET e il ricalcolo dello slider
	 * la funzione calculateLayout() viene invocata al caricamento 
	 * ed al resizing delle window
	 * OKKIO: deve essere invocata anche al resizing di una delle linee
	 * sue sorelle (vedi expander_h).
	 */
	
	
	calculateLayout();
	calculateLayout(); // non so perchè ma se non è chrome debbo invocarlo due volte (credo sia un problema di css)
	
	
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
		
		
		//horizontal
		///////////// calcolo e settaggio della correta width a CONTROLLER-wrapper-nowrap
		////////////  (come somma delle width e dei margin dei suoi figli)
	
		/// tolgo la width e i margin della sidebar alla width della viewport (circa 250)
		$(".SHEET").css("width",getViewPort().width - 250);
		$(".CONTROLLER-wrapper").css("width",getViewPort().width - 235);
		
		calculateSlider();	
		calculateController();
	
	}
	

	
	function calculateController(){
		
		var speed = 4;
		
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
		
		
		
		if(overflow < 70)
			return false;
		else{
			$(".CONTROLLER-arrow-right").show();
			$(".CONTROLLER-arrow-right,.CONTROLLER-arrow-left").css("height",wrapper_height-20);
			$(".CONTROLLER-arrow-right > div , .CONTROLLER-arrow-left > div").css( "margin-top" , ((wrapper_height/2)-24) )
			
			
			
			var interval_right;	
			$(".CONTROLLER-arrow-right").hover(
					
												
					function(){
						interval_right = setInterval(function(){
							//$(document).one().bind("mousemove",function(e){console.log( e.pageX);}); 
							$(".CONTROLLER-wrapper").scrollTo( {top:'-=0px', left:'+='+speed})
						});
					},
					function(){
						//$(document).one().unbind("mousemove"); 
						clearInterval(interval_right);
					}
			 );
			
			var interval_left;	
			$(".CONTROLLER-arrow-left").hover(
					function(){
						interval_left = setInterval(function(){
							$(".CONTROLLER-wrapper").scrollTo( {top:'-=0px', left:'-='+speed});
						});
					},
					function(){
						clearInterval(interval_left);
					}
			 );
			
			
			
			
			$(".CONTROLLER-wrapper").scroll(function() {
				var scroll_x_left_offset =  Math.abs( $(".CONTROLLER-wrapper").position().left - $(".CONTROLLER-wrapper-nowrap").position().left);
				var scroll_x_right_offset = Math.abs($(".CONTROLLER-wrapper").position().left - $(".CONTROLLER-wrapper-nowrap").position().left - overflow);
				
				if(scroll_x_left_offset <= 12){
					$(".CONTROLLER-arrow-left").hide();
				}
				else{
					$(".CONTROLLER-arrow-left").show();
				}
				
				if(scroll_x_right_offset <= 12){
					$(".CONTROLLER-arrow-right").hide();
				}
				else{
					$(".CONTROLLER-arrow-right").show();
				}
			});
					  
			
		}

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

	
	