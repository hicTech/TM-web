
$(document).ready(function(){
	var $el = $(".SEARCH-container");
	
	$el.find(".SEARCH-box").each(function(){
		$(this).find(".BUTTON").click(function(){
			$(this).parents(".SEARCH-box-item-container").find(".SEARCH-box-advanced").toggle("fade");
		})
	})
	
	
	
	$el.find("input[type='search']").each(function(){
		var $t = $(this);
		$t.blur(function(){
			setTimeout(function(){
				if( $t.val() != "" ){
					//$t.addClass("active-field",300);
					addSearchTag("input" , $t);
					$t.val("");
					$t.trigger("blur")
				}
				else{
					//$t.removeClass("active-field",1000);
				}
			},200);
		})
	});
	
	$el.find("input[type='date']").each(function(){
		var $t = $(this);
		var label = $t.parents(".FORM-field-row").find(".FORM-label").html().toLowerCase();;
		$t.blur(function(){
			setTimeout(function(){
				if( $t.val() != "" ){
					//$t.addClass("active-field",300);
					($t.is('[data-role="dateRange-from"]')) ? addSearchTag("date" , $t ,label+" dopo il") :  addSearchTag("date" , $t ,label+" prima del");
					
				}
				else{
					//$t.removeClass("active-field",1000);
				}
			},200);
		})
	})
	
	$el.find("input[type='checkbox'],input[type='radio']").each(function(){
		var $t = $(this);
		var $container = ( $t.is("[type='checkbox']") ) ? $t.parents(".checkbox-container") : $t.parents(".radio-container");
		
		$t.click(function(){
			var name = $t.attr("name");
			$("input[type='radio'][name='"+name+"']").parents(".radio-container").removeClass("active-field");
			var checked = $t.attr("checked");
			if( checked == "checked" ) {
				$container.addClass("active-field",300);
				addSearchTag("checkbox",$t)
			}
			else{
				$container.removeClass("active-field",1000);
				removeSearchTag($t);
			}
		});
	})
	
	
	function addSearchTag(type , $t , forced_label){
		var label = (forced_label == undefined) ? $t.parents(".FORM-field-row").find(".FORM-label").html().toLowerCase() : forced_label;
		var value = $t.val();
		var entity = $t.parents(".SEARCH-box").data("search-entity");
		var $target = $(".SEARCH-tags-container");

		if(type == "checkbox"){
			$target.append(addSingleSearchTag(type , entity , label , value));
			return true;
		}
		for(i in value.split(" ")){
			var data_id = (type == "date" )? 'search_tag_'+entity+'_'+label : 'search_tag_'+entity+'_'+label+'_'+value;
			if( $('[data-search-tag-id="'+data_id+'"]').html() != null){
				$target.find($('[data-search-tag-id="'+data_id+'"]').replaceWith(addSingleSearchTag(type , entity , label , value.split(" ")[i])));
			}
			else{
				$target.append(addSingleSearchTag(type , entity , label , value.split(" ")[i]));
			}
		}
		
	}
	
	function addSingleSearchTag(type , entity , label , value){
		
		var data_id = (type == "date" )? 'search_tag_'+entity+'_'+label : 'search_tag_'+entity+'_'+label+'_'+value;

		
		var html = $('<div data-search-tag-id="'+data_id+'">'+
						'<div class="SEARCH-tag-container">'+
							'<span> <font class="'+entity+'"><b>'+entity+'</b></font> '+label+':<span class="SEARCH-tag-value"> <b>'+value+'</b></span></span>'+
							'<div class="close_this_search_tag"></div>'+
						'</div>'+
				  '</div>');
				  
		html.find(".close_this_search_tag").click(function(){
			$(this).parents("[data-search-tag-id]").remove();
		});
		
		return html;
	}
	
	function removeSearchTag($t){
		var label = $t.parents(".FORM-field-row").find(".FORM-label").html()
		var value = $t.val();
		var entity = $t.parents(".SEARCH-box").data("search-entity");
		
		var data_id = 'search_tag_'+entity+'_'+label+'_'+value;
		$("[data-search-tag-id='"+data_id+"']").remove();
	}
	
	
	
	

});

	
	