
$(document).ready(function(){

		

	$(".SEARCH-container").each(function(){
		
		
		var $el = $(this)
		
		
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
						addSearchTag($t);
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
			var label = getTagLabel($t);
			$t.blur(function(){
				setTimeout(function(){
					if( $t.val() != "" ){
						//$t.addClass("active-field",300);
						($t.is('[data-role="dateRange-from"]')) ? addSearchTag($t ,label+" dopo il") :  addSearchTag($t ,label+" prima del");
					}
					else{
						//$t.removeClass("active-field",1000);
					}
				},200);
			})
		})
		
		$el.find("input[type='checkbox'],input[type='radio']").each(function(){
			var $t = $(this);
			var $container = getTagContainer($t);
			
			$t.click(function(){
				var name = $t.attr("name");
				//$("input[type='radio'][name='"+name+"']").parents(".radio-container").removeClass("active-field");
				var checked = $t.attr("checked");
				if( checked == "checked" ) {
					console.log("accendo")
					$container.addClass("active-field",300);
					addSearchTag($t)
				}
				else{
					console.log("spengo")
					$container.removeClass("active-field",1000);
					removeSearchTag($t,"checkbox");
				}
			});
		})
		
		$el.find("select").each(function(){
			var $t = $(this);
			$t.change(function(){
				setTimeout(function(){
					if( $t.val() != "" ){
						//$t.addClass("active-field",300);
						addSearchTag($t);
						$t.val("");
						$t.trigger("blur")
					}
					else{
						//$t.removeClass("active-field",1000);
					}
				},200);
			})
		});
		
		
		
	})
	
	/*
	 * utility
	 */
	
	function addSearchTag($t , forced_label){
			var label = (forced_label == undefined) ? getTagLabel($t) : forced_label;
			var value = $t.val();
			var entity = getTagEntity($t);
			var $target = $t.parents(".SEARCH-container").find(".SEARCH-tags-container");
			var data_id = getTagId($t , forced_label);
			var type = getTagType($t);	
	
			if(type == "checkbox"){
				
				if( $target.find('[data-search-tag-id="'+data_id+'"]').html() == null){
					$target.append(addSingleSearchTag($t , value));
					return true;
				}
			}
			
			if(type == "date"){
				
				if( $target.find('[data-search-tag-id="'+data_id+'"]').html() == null){
					$target.append(addSingleSearchTag($t , value , forced_label));
					return true;
				}
				else{
					
					$target.find('[data-search-tag-id="'+data_id+'"]').eq(0).after(addSingleSearchTag($t , value, forced_label))
					$target.find('[data-search-tag-id="'+data_id+'"]').eq(0).remove();
					
					return true;
				}
					
			}
			
			for(i in value.split(" ")){
				if( $t.parents(".SEARCH-container").find('[data-search-tag-id="'+data_id+'"]').html() == null){
					$target.append(addSingleSearchTag($t , value.split(" ")[i]));
				}
			}
			
		}
		
		function addSingleSearchTag($t , value, label){
			
			var data_id = getTagId($t , label);
			var entity = getTagEntity($t);
			var label = (label == undefined )? getTagLabel($t) : label;
	
			var html = $('<div data-search-tag-id="'+data_id+'">'+
							'<div class="SEARCH-tag-container">'+
								'<span> <font class="'+entity+'"><b>'+entity+'</b></font> '+label+':<span class="SEARCH-tag-value"> <b>'+value+'</b></span></span>'+
								'<div class="close_this_search_tag"></div>'+
							'</div>'+
					  '</div>');
					  
			html.find(".close_this_search_tag").click(function(){
				uncheckElement($(this).parents("[data-search-tag-id]").data("search-tag-id"),$t)
				$(this).parents("[data-search-tag-id]").remove();
			});
			return html;
		}
		
		function removeSearchTag($t,type){
			var label = getTagLabel($t);
			var value = $t.val();
			var entity = getTagEntity($t);
			
			var data_id = getTagId($t)
			//alert($("data-search-tag-id="+data_id).html());
			$t.parents(".SEARCH-container").find("[data-search-tag-id='"+data_id+"']").remove();
		}
		
		
		function getTagId($t , forced_label){
			var value = $t.val();
			var label = getTagLabel($t);
			var entity = getTagEntity($t);
			var id = ( $t.is("[type='date']") ) ? 'search_tag_'+entity+'_'+label+'_'+forced_label : 'search_tag_'+entity+'_'+label+'_'+value;
			return id.toLowerCase();
		}
		
		function getTagLabel($t){
			return $t.parents(".FORM-field-row").find(".FORM-label").html();
		}
		
		function getTagEntity($t){
			return $t.parents(".SEARCH-box").data("search-entity");
		}
		
		function getTagType($t){
			return $t.attr("type");
		}
		
		function getTagContainer($t){
			return ( $t.is("[type='checkbox']") ) ? $t.parents(".checkbox-container") : $t.parents(".radio-container");
		}
		
		
		
		function uncheckElement(id,$t){
			var id = id.replace("search_tag_","");
			id = id.split("_");
			var entity = id[0];
			var label = id[1];
			var value = id[2];
			
			$t.parents(".SEARCH-container").find("[data-search-entity='"+entity+"']").find(".FORM-field-row").each(function(){
				
				if($(this).find(".FORM-label").html().toLowerCase() == label){
					
					$(this).find("input").each(function(){
						if($(this).attr("value").toLowerCase() == value){
							$(this).removeAttr("checked");
							$(this).trigger("click");
							$(this).removeAttr("checked");
						}
					})
				}
			})
		}
	
	

});

	
	