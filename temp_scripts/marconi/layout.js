var fatto = false
$(document).ready(function(){
	
	
	
	
	var sliderRegister = new Array();
	refreshLayout();
	

	setTimeout(function(){
		refreshLayout()
	},200)
		

	$("#temp-button-anagrafica").click(function(){
		$('[data-mainarea-id=\'unita\']').hide();
		$('[data-mainarea-id=\'raccolta\']').hide();
		$('[data-mainarea-id=\'anagrafica\']').show();
		$('[data-mainarea-id=\'esempio\']').hide();
		refreshLayout();
	})
	
	$("#temp-button-raccolta").click(function(){
		$('[data-mainarea-id=\'unita\']').hide();
		$('[data-mainarea-id=\'anagrafica\']').hide();
		$('[data-mainarea-id=\'raccolta\']').show();
		$('[data-mainarea-id=\'esempio\']').hide();
		refreshLayout();
	})
	
	$("#temp-button-unita").click(function(){
		$('[data-mainarea-id=\'anagrafica\']').hide();
		$('[data-mainarea-id=\'raccolta\']').hide();
		$('[data-mainarea-id=\'unita\']').show();
		$('[data-mainarea-id=\'esempio\']').hide();
		refreshLayout();
	})
	
	$("#temp-button-esempio").click(function(){
		$('[data-mainarea-id=\'anagrafica\']').hide();
		$('[data-mainarea-id=\'raccolta\']').hide();
		$('[data-mainarea-id=\'unita\']').hide();
		$('[data-mainarea-id=\'esempio\']').show();
		refreshLayout();
	})
	

	
	var mouseX,mouseY;
	$(document).bind("mousemove",function(e){
			mouseX = e.pageX;
			//mouseY = e.pageY;
	}); 
	

    $(window).resize(function(){
    	refreshLayout();

    });

	$(".CONTROLLER-wrapper").resize(function(){
		refreshLayout();
	})
	
	$(".SEARCH-box-container").resize(function(){
		refreshLayout();
	})
	
	$(".MAINAREA-slider").resize(function(){
		refreshLayout();
	})
	


	var current_resizing_time = 0;
	
	function refreshLayout(){
		$(".GENERAL-mainarea").each(function(){
			if( $(this).is(":visible") ){
				
				//// impedisco che venga invocata a ripetizione sia al resizing della window sia dai vari listener
				var time=new Date();
				var now =  time.getTime();
				if (current_resizing_time !=0 && parseInt( now - current_resizing_time) < 500){
					return false;
				}
				current_resizing_time = now;
				//// impedisco che venga invocata a ripetizione sia al resizing della window sia dai vari listener
				
				calculateLayout( $(this) );
			   	setSlider($(this));
			}	
		})
	}
	


	
	function setSlider($mainarea){
		var mainarea_id = $mainarea.data("mainarea-id");
			   	
			   	// se per questa mainarea non esiste lo slider lo creo in sliderRegister{} pompo l'oggetto bxSlider ed il riferimento al DOM di questa mainarea
			    if(sliderRegister[mainarea_id] == undefined){
			    	
			    	sliderRegister[mainarea_id] = {
			    		"bxSliderObject" : createSlider( $mainarea ),
			    		"domObject" : $mainarea
			    	}
			    	
			    }
			    
			    // se per questa mainarea esiste lo slider me lo prendo da sliderRegister{} e lo refresho mantenendone la slide corrente selezionata
    			// in fine ripompo l'oggetto bxSlider in sliderRagister{} per mantenerlo coerente
			    else{
			    	var current_slide = sliderRegister[mainarea_id].bxSliderObject.getCurrentSlide();
			    	
					sliderRegister[mainarea_id].bxSliderObject.destroyShow();
					slider = sliderRegister[mainarea_id].domObject.find('.SLIDER').bxSlider({
						    	controls : false,
						    	startingSlide : current_slide,
						    	infiniteLoop: false,
						    	onAfterSlide: function(currentSlideNumber, totalSlideQty, currentSlideHtmlObject){
						    		updateSliderIndicators(currentSlideNumber,totalSlideQty,currentSlideHtmlObject);
				   				}
						    });
					sliderRegister[mainarea_id].bxSliderObject = slider;
			    }
	}
	
	function createSlider($mainarea){
		
		// creo il navigator
		$mainarea.find(".SLIDER > li").each(function(index){
			var title = $(this).find(".MAIN-title-text").html();
			var html_indicator = '<div class="step_indicator">'+title+'</div>';
			var current_slider;
			var mainarea_id = $mainarea.data("mainarea-id")
			
			var $indicator = $(html_indicator).click(function(){
				for (i in _.keys(sliderRegister)){
					if( mainarea_id == _.keys(sliderRegister)[i])
						current_slider = sliderRegister[mainarea_id].bxSliderObject;
				}
				current_slider.goToSlide(index);
					
			})
			$mainarea.find(".NAVIGATOR-steps-indicator-container").append($indicator)
		})
		
		slider = $mainarea.find('.SLIDER').bxSlider({
			    	controls : false,
			    	infiniteLoop: false
			    });
			    $mainarea.find('.back').click(function(){
				    slider.goToPreviousSlide();
				    return false;
				});
				
				 $mainarea.find('.forward').click(function(){
				    slider.goToNextSlide();
				    return false;
				});
				
		return slider;
	}
	
	function updateSliderIndicators(current_slide,tot,current_slide_html_obj){
		var $navigator = current_slide_html_obj.parents(".GENERAL-mainarea").find("tr.MAINAREA-navigator");
		$navigator.find(".step_indicator").removeClass("current");
		$navigator.find(".step_indicator").eq(current_slide).addClass("current");
		var $back_button = $navigator.find(".back");
		var $forward_button = $navigator.find(".forward");
		
		$back_button.removeClass("disabled");
		$forward_button.removeClass("disabled");
		
		if(current_slide == 0){
			$back_button.addClass("disabled");
		}
		else if(current_slide == tot-1 ){
			$forward_button.addClass("disabled");
		}

		
	}

	
	
	function calculateLayout($mainarea){

		var $sidebar = $(".GENERAL-sidebar")
		var $sheet = $mainarea.find(".SHEET");
		var $search = $mainarea.find(".SEARCH-container");
		var $controller = $mainarea.find(".CONTROLLER-wrapper");
		var $mainarea_header = $mainarea.find(".MAINAREA-header");
		var $main_header = $mainarea.find(".MAIN-header");
		var $mainarea_navigator = $mainarea.find(".MAINAREA-navigator");
		var $main_header = $mainarea.find(".MAIN-header");
		var $main_footer = $mainarea.find(".MAIN-footer");
		var $mainarea_sheet_footer = $mainarea.find(".MAINAREA-sheet-footer");
		var $mainarea_controller = $mainarea.find(".MAINAREA-controller");
		
		
		//vertical
		var expander_h = getViewPort().height 	- parseInt(( $mainarea_header.is(":visible") ) ? $mainarea_header.height() : 0)
												- parseInt(($mainarea_navigator.is(":visible")) ? $mainarea_navigator.height() : 0) 
												- parseInt(($search.is(":visible")) ? $search.height() : 0) 
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
	

		/// tolgo la width e i margin della sidebar alla width della viewport (160)
		
		$sheet.css("width",getViewPort().width - (130+30) );
		
		$controller.css("width",getViewPort().width - parseInt( $sidebar.width()) -25);
		
		$mainarea_controller.each(function(){
			if($(this).is(":visible"))calculateController($(this));
		})
		
	}
	
	
	
	
	
	
	function calculateController($el){
		
		var scroller_tollerance = 40;    // di quanti pixel il contenuto deve eccedere rispetto al contenitore per attivare lo scroller
		var hidding_arrows_offset = 30;
		var sensibility = 9;
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

	
	