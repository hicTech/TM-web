
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
				setTimeout(function(){
					if( $t.val() != "" ){
						addSearchTag($t);
						( unique ) ? $t.addClass("active-field",300) : $t.val("");;
					
					}
					else{
						( unique ) ? $t.removeClass("active-field",1000) : null;
					}
				},200);
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
		
		
		//tasti "ricerca avanzata" ed "altro"
		
		$el.find(".advanced_search_button").each(function(){
			//$(this).click(function(){
				//UIgenericOverlay();	
			//})
			
			/*$(this).click(function(){
				$(this).parents(".GENERAL-mainarea-table").find(".SEARCH-box-container").each(function(){
					$(this).toggle();
				});
				$(this).parents(".GENERAL-mainarea-table").find(".MAINAREA-slider").toggle();
			})*/
		})
		
		/*$el.find(".more_button").each(function(){
			$(this).click(function(){
				$(this).parents(".SEARCH-box-item-container").find(".SEARCH-box-more-fields").toggle("fade");
			})
		})*/
		
		$el.find(".confirm_advanced_search_button").each(function(){
			$(this).click(function(){
				
			})
		})
		
		$el.find(".clear_advanced_search_button").each(function(){
			$(this).click(function(){
				
			})
		})
		
		$el.find(".close_advanced_search_button").each(function(){
			$(this).click(function(){
				
			})
		})
		
		
		
		
	})
	
	
	
	
	
	
	
	
	
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
					$target.find('[data-search-tag-id="'+data_id+'"]').eq(0).after(addSingleSearchTag($t ,  value))
					$target.find('[data-search-tag-id="'+data_id+'"]').eq(0).remove();
					return true;
				}
				
			}
			else{
				var arr = value.split(" ");
				for(i in arr){
					data_id = getTagId($t , arr[i]);
					if( $t.parents(".SEARCH-container").find('[data-search-tag-id="'+data_id+'"]').html() == null){
						$target.append( addSingleSearchTag($t , arr[i] , arr[i]) );
					}
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
			return $t.parents(".FORM-field-row").find(".FORM-label").html();
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


var html_ricerca_completa ='<div class="SEARCH-box-container">'+
																
																
										'<div class="SEARCH-box ana" data-search-entity="anagrafica">'+
											'<div class="SEARCH-box-header"><div class="ICON-47  anagrafica onGreyCanvas"></div><div class="SEARCH-box-title anagrafica">Anagrafica</div></div>'+
											'<div class="SEARCH-box-item-container">'+
												
												
																	'<div class="FORM-field-row little">'+
																		'<p class="FORM-label">Codice</p>'+
																		'<p><input type="search" placeholder="placeholder"></p>'+
																	'</div>'+
															
																	'<div class="FORM-field-row little">'+
																		'<p class="FORM-label">Tipo</p>'+
																		'<div class="checkbox-container">'+
																			'<div>Paziente</div>'+
																			'<div><input type="checkbox"  value="paziente" /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div>Donatore</div>'+
																			'<div><input type="checkbox"  value="donatore" /></div>'+
																		'</div>'+
																		
																	'</div>'+
															
																	
																	'<div class="FORM-field-row little">'+
																		'<div class="FORM-field">'+
																			'<p class="FORM-label">Nome</p>'+
																			'<p><input style="width:120px" type="search" placeholder="placeholder"></p>'+
																		'</div>'+
																		'<div class="FORM-field">'+
																			'<p class="FORM-label">Cognome</p>'+
																			'<p><input style="width:120px" type="search" placeholder="placeholder"></p>'+
																		'</div>'+
																	'</div>'+
																	
																	'<div class="FORM-field-row little">'+
																		'<p class="FORM-label">Luogo di nascita</p>'+
																		'<p><input style="width:120px" type="search" placeholder="placeholder"></p>'+
																	'</div>'+
																	
																	'<div class="FORM-field-row little">'+
																		'<div class="FORM-field">'+
																			'<p class="FORM-label">Ospedale proven.</p>'+
																			'<p><input style="width:120px" type="search" placeholder="placeholder"></p>'+
																		'</div>'+
																		'<div class="FORM-field">'+
																			'<p class="FORM-label">Reparto proven.</p>'+
																			'<p><input style="width:120px" type="search" placeholder="placeholder"></p>'+
																		'</div>'+
																	'</div>'+
																	
															
																	'<div class="FORM-field-row little">'+
																		'<div class="FORM-field">'+
																			'<p class="FORM-label">Registrato</p>'+
																			'<p><input type="date" data-role="dateRange-from" placeholder="Dal"></p>'+
																		'</div>'+
																		'<div class="FORM-field">'+
																			'<p class="FORM-label">&nbsp; <!-- important --></p>'+
																			'<p><input type="date" data-role="dateRange-to" placeholder="Al"></p>'+
																		'</div>'+
																	'</div>'+
																	'<div class="FORM-field-row little">'+
																		'<div class="FORM-field">'+
																			'<p class="FORM-label">Modificato</p>'+
																			'<p><input type="date" data-role="dateRange-from" placeholder="Dal"></p>'+
																		'</div>'+
																		'<div class="FORM-field">'+
																			'<p class="FORM-label">&nbsp; <!-- important --></p>'+
																			'<p><input type="date" data-role="dateRange-to" placeholder="Al"></p>'+
																		'</div>'+
																	'</div>'+
																	
																
												

													
													
													
											'</div>'+
										'</div>'+
																
																
																
										'<div class="SEARCH-box rac" data-search-entity="raccolta">'+
											'<div class="SEARCH-box-header"><div class="ICON-47 raccolta onGreyCanvas"></div><div class="SEARCH-box-title raccolta">Raccolta</div></div>'+
											'<div class="" >'+
												
													
																	'<div class="FORM-field-row little">'+
																		'<p class="FORM-label">Codice</p>'+
																		'<p><input  type="search" placeholder="placeholder"></p>'+
																	'</div>'+
																
																	'<div class="FORM-field-row little">'+
																		'<p class="FORM-label">Tipo</p>'+
																		'<div class="checkbox-container">'+
																			'<div>HPC M (aut.)</div>'+
																			'<div><input type="checkbox"  value="HPC M (autologo)" /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div>HPC M (all.)</div>'+
																			'<div><input type="checkbox"  value="HPC M (allogenico)" /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div>HPC A (aut.)</div>'+
																			'<div><input type="checkbox" value="HPC A (autologo)"  /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div>HPC A (all.)</div>'+
																			'<div><input type="checkbox" value="HPC A (allogenico)"  /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div>TCT</div>'+
																			'<div><input type="checkbox" value="TCT"  /></div>'+
																		'</div>'+
																		'<div class="FORM-field-row little">'+
																			'<div class="FORM-field-row little">'+
																				'<p class="FORM-label">Collection facility</p>'+
																				'<p><input style="width:120px" type="search" placeholder="placeholder"></p>'+
																			'</div>'+
																		'</div>'+
																	
																		'<div class="FORM-field-row little">'+
																			'<p class="FORM-label">Stato</p>'+
																			
																			'<div class="checkbox-container icon">'+
																				'<div><div class="ICON-36 grey valutata no-canvas"></div>Valutazione</div>'+
																				'<div><input type="checkbox" value="valutazione"/></div>'+
																			'</div>'+
																			'<div class="checkbox-container">'+
																				'<div><div class="ICON-36 grey idonea no-canvas"></div>Idonea</div>'+
																				'<div><input type="checkbox" value="idonea"/></div>'+
																			'</div>'+
																			'<div class="checkbox-container">'+
																				'<div><div class="ICON-36 grey effettuata no-canvas"></div>Effettuata</div>'+
																				'<div><input type="checkbox" value="effettuata" /></div>'+
																			'</div>'+
																			
																		'</div>'+
																	
																		'<div class="FORM-field-row little">'+
																			
																				'<div class="FORM-field">'+
																					'<p class="FORM-label">Da - A</p>'+
																					'<p><input type="date" data-role="dateRange-from" placeholder="Dal"></p>'+
																				'</div>'+
																				'<div class="FORM-field">'+
																					'<p class="FORM-label">&nbsp; <!-- important --></p>'+
																					'<p><input type="date" data-role="dateRange-to" placeholder="Al"></p>'+
																				'</div>'+
																			
																		'</div>'+
																	'</div>'+

													
													
											'</div>'+
										'</div>'+
																
																
																
																
										'<div class="SEARCH-box uni" data-search-entity="unita">'+
											'<div class="SEARCH-box-header"><div class="ICON-47 unita onGreyCanvas"></div><div class="SEARCH-box-title unita">Unità</div></div>'+
											'<div class="SEARCH-box-item-container" >'+
												
												
																	'<div class="FORM-field-row little">'+
																		'<p class="FORM-label">Codice</p>'+
																		'<p><input type="search" placeholder="placeholder"></p>'+
																	'</div>'+
																
																	'<div class="FORM-field-row little">'+
																		'<p class="FORM-label">Stato</p>'+
																		
																		'<div class="checkbox-container">'+
																			'<div><div class="ICON-36 grey accettata no-canvas"></div>Accettata</div>'+
																			'<div><input type="checkbox" value="accettata" /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div><div class="ICON-36 grey manipolazione no-canvas"></div>Manipolata</div>'+
																			'<div><input type="checkbox" value="manipolata" /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div><div class="ICON-36 grey criopreservata no-canvas"></div>Criopres.</div>'+
																			'<div><input type="checkbox" value="criopreservata" /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div><div class="ICON-36 grey scongelamento no-canvas"></div>Scongelata</div>'+
																			'<div><input type="checkbox" value="scongelata" /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div><div class="ICON-36 grey richiesta no-canvas"></div>Richiesta</div>'+
																			'<div><input type="checkbox" value="richiesta"/></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div><div class="ICON-36 grey idonea no-canvas"></div>Idonea</div>'+
																			'<div><input type="checkbox" value="idonea" /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div><div class="ICON-36 grey rilascio_unita no-canvas"></div>Rilasciata</div>'+
																			'<div><input type="checkbox" value="rilasciata" /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div><div class="ICON-36 grey reinfusione no-canvas"></div>Reinfusa</div>'+
																			'<div><input type="checkbox" value="reinfusa" /></div>'+
																		'</div>'+
																		'<div class="checkbox-container">'+
																			'<div><div class="ICON-36 grey valutata no-canvas"></div>Valutata</div>'+
																			'<div><input type="checkbox" value="valutata"/></div>'+
																		'</div>'+
																		'<div class="FORM-field-row little">'+
																			'<div class="FORM-field-row little">'+
																				'<p class="FORM-label">Processing facility</p>'+
																				'<p><input style="width:120px" type="search" placeholder="placeholder"></p>'+
																			'</div>'+
																		'</div>'+
																
																		'<div class="FORM-field-row little">'+
																			
																				'<div class="FORM-field">'+
																					'<p class="FORM-label">Da - A</p>'+
																					'<p><input type="date" data-role="dateRange-from" placeholder="Dal"></p>'+
																				'</div>'+
																				'<div class="FORM-field">'+
																					'<p class="FORM-label">&nbsp; <!-- important --></p>'+
																					'<p><input type="date" data-role="dateRange-to" placeholder="Al"></p>'+
																				'</div>'+
																			
																		'</div>'+
																	'</div>'+
																	
															
											'</div>'+
										'</div>'+
																
															
																
																
										'<div class="SEARCH-tags-container">'+
											'<div class="raccolta">Stai cercando <b>Raccolta</b> con:</div>'+
											
										'</div>'+
										'<div class="MAIN-footer">'+
											'<div class="MAIN-footer-container">'+
												'<button type="button" class="BUTTON confirm_advanced_search_button">Cerca</button> '+
												'<button type="button" class="BUTTON clear_advanced_search_button">Rimuovi tutti</button> '+
												'<button type="button" class="BUTTON close_advanced_search_button">Annulla</button>'+
											'</div>'+
										'</div>'+
										
										
										
									'</div>';

	