
$(document).ready(function(){
	var $el = $(".SEARCH-container");
	
	$el.find("input").each(function(){
		var $t = $(this);
		var label = $t.parents(".FORM-field-row").find("FORM-label").html();
		var value = $t.val();
		var entity = $t.parents(".SEARCH-box").data("search-entity") 
		$t.blur(function(){
			setTimeout(function(){
				if ( value != "" ){
					$t.addClass("active-field",300);
					addSearchTag("input" , value , entity , label);
				}
				else{
					$t.removeClass("active-field",1000);
					removeSearchTag(entity , label);	
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
			( checked == "checked" ) ?  $container.addClass("active-field",300) : $container.removeClass("active-field",1000) ;
		});
		
	})
	
	
	function addSearchTag(type , value , entity , label){
		return '<div>'+
					'<div class="SEARCH-tag-container" data-search-tag-id="search_tag_'+entity+'_'+label+'">'+
						'<span>'+label+':<span class="SEARCH-tag-value"> '+value+'</span></span>'+
						'<div></div>'+
					'</div>'+
			  '</div>';
	}

});

	
	