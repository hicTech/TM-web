
$(document).ready(function(){

	

	$(".SEARCH-container").each(function(){
		
		
		var $el = $(this)
		
		$el.find("input[type='search']").keyup(function(event){
			  if(event.keyCode == 13){
			    $(this).trigger("blur")
			  }
			 
			});
		
		
		$el.find("input[type='search']").each(function(){
			var $t = $(this);
			var unique = $t.data("search-role") == "unique";
			$t.blur(function(){
				
					if( $t.val() != "" ){
						addSearchTag($t);
						( unique ) ? $t.addClass("active-field",300) : $t.val("");;
					
					}
					else{
						( unique ) ? $t.removeClass("active-field",1000) : null;
					}
			});
			
			if(unique){
				$t.click(function(){
					removeSearchTag($t);
					$t.removeClass("active-field",300)
				})
			}
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
					$container.addClass("active-field",300);
					addSearchTag($t)
				}
				else{
					$container.removeClass("active-field",1000);
					removeSearchTag($t);
				}
			});
		})
		
		$el.find("select").each(function(){
			var $t = $(this);
			var unique = $t.data("search-role") == "unique";
			$t.change(function(){
				setTimeout(function(){
					if( $t.val() != "" ){
						( unique ) ? $t.addClass("active-field",300) : null;
						addSearchTag($t);
						$t.trigger("blur")
					}
					else{
						( unique ) ? $t.removeClass("active-field",1000) :null;
						removeSearchTag($t);
					}
				},200);
			})
		});
		
		
		/*
		 * 		
		<!-- ################################## RICERCA ESTESA ####################################--->
		<!-- ################################## RICERCA ESTESA ####################################--->
		<!-- ################################## RICERCA ESTESA ####################################--->
		<!-- ################################## RICERCA ESTESA ####################################--->
		 */
		
		$el.find(".advanced_search_button").each(function(){
			var id = $(this).parents(".SEARCH-box").data("search-entity")
			$(this).click(function(){
				showAdvancedSearch(id);
			})
			
		})
	
		$el.find(".clear_advanced_search_button").each(function(){
			$(this).click(function(){
				resetFullSearch($(this))
			})
		});
		
		$el.find(".close_advanced_search_button").each(function(){
			var id = $(this).parents(".SEARCH-container").attr("id").replace("full_search_","")
			$(this).click(function(){
				$("#full_search_"+id).dialog("close")
			})
		});
		
		$el.find(".confirm_advanced_search_button").each(function(){
			$(this).click(function(){
				var id = $(this).parents(".SEARCH-container").attr("id").replace("full_search_","")
				var result = $el.find(".SEARCH-tags-container").html();
				if(result.length != 0){
					$("#full_search_"+id).dialog("close");
					setResultsTag(result , id);
					$(".SEARCH-box").each(function(){
						if($(this).is(":visible"))
							$(this).hide();
					})
				}
				
			});

			
		})
		
		function setResultsTag(result , id){
				var r = result +'<button type="button" class="BUTTON reset_advanced_search_button">Annulla</button><button type="button" class="BUTTON edit_advanced_search_button">Modifica</button>';
				$(".SEARCH-tags-container").each(function(){
					if($(this).is(":visible")){
							 $(this).html(r);
							 $(this).find(".close_this_search_tag").hide();
							 $(this).find(".edit_advanced_search_button").click(function(){
							 	$(this).unbind("click")
								showAdvancedSearch(id);	
							 });
							 
							 $(this).find(".reset_advanced_search_button").click(function(){
							 	$(this).unbind("click")
							 	$(this).parents(".SEARCH-box-container").find(".SEARCH-box").show();
							 	$(this).parents(".SEARCH-tags-container").html("");
								resetFullSearch($(this))
							 });
					}
					
				});
			
		}
		
		function resetFullSearch($this){
			var id = $this.parents(".SEARCH-container").attr("id");
			var $element = $("#"+id);
			$element.find(".close_this_search_tag").each(function(){
					$(this).trigger("click")
				});
		
		}
		
		
		
	})
	
	
	
	function showAdvancedSearch(id){
		var $content = $("#full_search_"+id);
		$content.dialog({
			modal:true,
			title : "Ricerca avanzata",
			minWidth: 1000,
			minHeight: 600,
			draggable: false,
			resizable : false,
			
		});
		$content.dialog( "open" );
		return false;
		
	}

	
	
	
	
	
	
	
	
	/*
	 * search utility functions
	 */
	
	function addSearchTag($t , forced_label){

			if( $t.val().length < 3 ){
					UIalert("Attenzione","Inerisci 3 o più caratteri");
					return false;
				}
		
			var label = (forced_label == undefined) ? getTagLabel($t) : forced_label;
			var value = $t.val();
			var entity = getTagEntity($t);
			var $target = $t.parents(".SEARCH-container").find(".SEARCH-tags-container");
			var data_id = getTagId($t , forced_label);
			var type = getTagType($t);	
			var unique = $t.data("search-role") == "unique";
			
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

			if(unique){
				
				if( (type != "select" && type != "checkbox" ) && value.indexOf(" ") != -1){
					UIalert("Attenzione","Non sono ammassi spazi vuoti");
					return false;
				}
				if( $target.find('[data-search-tag-id="'+data_id+'"]').html() == null){
					$target.append(addSingleSearchTag($t ,  value));
					return true;
				}
				else{
					//$target.find('[data-search-tag-id="'+data_id+'"]').eq(0).after(addSingleSearchTag($t ,  value))
					$target.find('[data-search-tag-id="'+data_id+'"]').remove();
					$target.append(addSingleSearchTag($t ,  value));
					return true;
				}
				
			}
			else{
				if(type != "checkbox"){
					var arr = value.split(" ");
					for(i in arr){
						data_id = getTagId($t , arr[i]);
						
						if( $t.parents(".SEARCH-container").find('[data-search-tag-id="'+data_id+'"]').html() == null){
							$target.append( addSingleSearchTag($t , arr[i]) );
						}
					}
				}
					
			}
		}
		
		function addSingleSearchTag($t , value, label){
			
			var data_id = (label == undefined )? getTagId($t) : getTagId($t , label);
			var entity = getTagEntity($t);
			var label = (label == undefined )? getTagLabel($t) : label;
			//alert("appioppo "+data_id)
			var html = $('<div data-search-tag-id="'+data_id+'">'+
							'<div class="SEARCH-tag-container">'+
								'<span> <font class="'+entity+'"><b>'+entity+'</b></font> '+label+':<span class="SEARCH-tag-value"> <b>'+value+'</b></span></span>'+
								'<div class="close_this_search_tag"></div>'+
							'</div>'+
					  '</div>');
					  
			html.find(".close_this_search_tag").click(function(){
				var data_search_tag_id = $(this).parents("[data-search-tag-id]").data("search-tag-id")
				if( getTagType($t) == "checkbox" ){
					uncheckSearchFormField( data_search_tag_id,$t );
				}
				
				else if( getTagType($t) == "search" ){
					clearSearchFormField( data_search_tag_id,$t );
				}
				else if( getTagType($t) == "select" ){
					clearSearchFormSelect( data_search_tag_id,$t );
				}
					
				$(this).parents("[data-search-tag-id]").remove();
			});
			return html;
		}
		
		function removeSearchTag($t){ 
			var label = getTagLabel($t);
			var value = $t.val();
			var entity = getTagEntity($t);
			var unique = $t.data("search-role") == "unique";
			
			var data_id = getTagId($t)
			//alert(value)
			//alert($("data-search-tag-id="+data_id).html());
			if(value != ""){
				$t.parents(".SEARCH-container").find("[data-search-tag-id='"+data_id+"']").remove();
				return;
			}
			else{
				if(unique){
					$t.parents(".SEARCH-container").find("[data-search-tag-id='"+data_id+"']").remove()
				}
				else{
					$t.parents(".SEARCH-container").find("[data-search-tag-id*='"+data_id+"']").remove()
				}
			}
			
		
		}
		
		
		function getTagId($t , forced_label){
			var value = ($t.data("search-role") == "unique") ? "" : '_'+$t.val();
			var label = getTagLabel($t);
			var entity = getTagEntity($t);
			var id = ( forced_label != undefined ) ? 'search_tag_'+entity+'_'+label+'_'+forced_label : 'search_tag_'+entity+'_'+label+value;
			return id.toLowerCase();
		}
		
		function getTagLabel($t){
			return $t.parents(".FORM-field").find(".FORM-label").html();
		}
		
		function getTagEntity($t){
			return $t.parents(".SEARCH-box").data("search-entity");
		}
		
		function getTagType($t){
			return ($t.attr("type") == undefined) ? "select" : $t.attr("type");
		}
		
		function getTagContainer($t){
			return ( $t.is("[type='checkbox']") ) ? $t.parents(".checkbox-container") : $t.parents(".radio-container");
		}
		
		
		
		function uncheckSearchFormField(id,$t){
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
			});
		}
		
		function clearSearchFormField(id,$t){
			var id = id.replace("search_tag_","");
			id = id.split("_");
			var entity = id[0];
			var label = id[1];
			
			$t.parents(".SEARCH-container").find("[data-search-entity='"+entity+"']").find(".FORM-field-row").each(function(){
				if($(this).find(".FORM-label").html().toLowerCase() == label){
					$(this).find("input").val("");
					$(this).find("input").trigger("blur");
				}
			});
		}
		
		function clearSearchFormSelect(id,$t){
			if($t.data("search-role") != "unique")
				return false;
			var id = id.replace("search_tag_","");
			id = id.split("_");
			var entity = id[0];
			var label = id[1];
			$t.parents(".SEARCH-container").find("[data-search-entity='"+entity+"']").find(".FORM-field-row").each(function(){
				if($(this).find(".FORM-label").html().toLowerCase() == label){
					$(this).find("select").find('[value=""]').attr('selected', 'selected');
					$(this).find("select").trigger("change");
				}
			});
		}
	
	

});

	
// html ricerca

