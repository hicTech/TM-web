
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
				dateFormat: 'yy-mm-dd'
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
		var $form_field = $(this).parents(".FORM-field-row");
		var $input = $form_field.find("input.FORM-slider-input");
		
		var init_value = ( !! $(this).data("init-value") ) ? $(this).data("init-value") : "";
		var min_value = ( !! $(this).data("min-value") ) ? $(this).data("min-value") : "";
		var max_value = ( !! $(this).data("max-value") ) ? $(this).data("max-value") : "";
		var step_value = ( !! $(this).data("step-value") ) ? $(this).data("step-value") : "";
		var combo = ($(this).data("role") ) ? true : false;
		
		( $(this).data("readonly") == true ) ? $input.attr("disabled","disabled") : "";
		
		$input.val(init_value);	
		
		$(this).slider({
			value:init_value,
			min: min_value,
			max: max_value,
			step: step_value,
			slide: function( event, ui) {
				$input.val(ui.value);
				if(combo)
					$form_field.find("[data-role='combo-slider-data-preview']").html(ui.value)
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
	 * gestione SLIDER main
	 * 
	 */
	
	slider = $('.SLIDER').bxSlider({
			    	controls : false,
			    	infiniteLoop : false
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
	 * timepicker (LIVE)
	 */
	
	$("input[type='time']").timepicker({});
	
	
	
	
	/*
	 * multiple tags select & input
	 */
	
	$("select[data-role='tags']").each(function(){
		$(this).change(function(){
			addTag($(this),"select",$(this).val())
		})
	})
	
	$("input[data-role='tags']").each(function(){
		var $button = $('<button class="BUTTON small">Aggiungi</button>');
		$button.click(function(){
			addTag($(this),"input")
		})
		$(this).after($button)
	})
	
	
	
	function addTag(el,type,value){
			if(type.indexOf("select")==0)
				addSingleTag(el,type,value);
			else{	
				var val = el.parents(".FORM-field-row").find("input").val();
				
				if(val.indexOf("  ") != -1){
					alert("inserisci i tag separati da un solo spazio");
					return false;
				}
				else{
					if(val.indexOf(" ") > 0){
						var arr = val.split(" ");
						for (i in arr){
							(arr[i] != " ") ? addSingleTag(el,type,arr[i]) : null;
						}
					}
					else{
						addSingleTag(el,type,value);	
					}
				}
			}
	}
	
	function addSingleTag(el,type,value){
			var is_select = (type.indexOf("select")==0);
			var form_field_row = el.parents(".FORM-field-row");
			var input = (type == "select") ? form_field_row.find("select[data-role='tags']") : form_field_row.find("input[data-role='tags']");
			var hidden = form_field_row.find("input[type='hidden']")
			
			var tag_container = form_field_row.find(".tag_container");
			if(is_select){
				var $option = findOption(input, value);
				var value_to_add = $option.val();
				var label = $option.html();
				
				if(hidden.val() == ""){
					hidden.val(value_to_add); 
				}
				else{
					hidden.val(hidden.val()+","+value_to_add);
				}
				
				var $tag = $(addSpecificTag(value_to_add,label));
				$tag.find(".remove_this_tag").click(function(){
					removeTag($(this),label,"select",value)
				});
				tag_container.append($tag);
				$option.remove();
			}
			else{
				
				var inputVal = (_.isNull(value) || _.isUndefined(value)) ? input.val() : (""+value);
				if(inputVal==""){
					return
				}
				
				var hiddenVal=hidden.val();
				var arr=hiddenVal.split(",");
				
				if(_.indexOf(arr, inputVal)!=-1){
					input.val("");
					return false;
				}
				
				var $tag = $(addSpecificTag(inputVal,inputVal));
				$tag.find("remove_this_tag").click(function(inputVal){
					removeTag($(this),label,"input",inputVal)
				});
				
				tag_container.append($tag);
				input.val("");
				if(hidden.val() == ""){
					hidden.val(inputVal); 
				}
				else{
					hidden.val(hidden.val()+","+inputVal);
				}
			}
			
	}
	
	function addSpecificTag(value,label){
			return "<div class='FORM-tag-container' data-value='"+value+"'><span>"+label+"</span><div class='remove_this_tag'></div></div>";
		}
		
	function findOption(el, value){
			if(!(_.isNull(value) || _.isUndefined(value)))
				value = ""+value;
			if(_.isString(value))
				return $(el).find("option[value=\""+value+"\"]");
			else
				return $(el).find("option:selected");
		}
		
	function removeTag(el,value_to_remove,type,value){
			var tag=$(el).parent();
			var form_field_row = el.parents(".FORM-field-row");
			var hidden = form_field_row.find("input[type=hidden]")
			if(type=="select"){
				var select = form_field_row.find("select");
				
				
				select.append("<option value='"+value+"'>"+value_to_remove+"</option>");
				
				var parent = tag.parent();
				tag.remove();
				var new_value="";
				parent.find(".FORM-tag-container").each(function(){
					new_value+=$(this).data("value")+","
				})
				
				
				new_value=new_value.substr(0,new_value.length-1);
				hidden.val(new_value)
			}
			else{
				var hiddenVal=hidden.val();
				var arr= hiddenVal.split(",");
				arr.splice(_.indexOf(arr, value_to_remove),1);
				
				var new_value="";
				for(i in arr){
					new_value+=arr[i]
					if(i!=arr.length-1)
						new_value+=",";
				}
				hidden.val(new_value)
				tag.remove();
			}
		}
		
	
	

});

	
	