function UIalert(title,text){
		var $alert = $('<div title="'+title+'"><p><span class="ui-icon ui-icon-info" style="float:left; margin:0 7px 20px 0;"></span>'+text+'</p></div>');
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
	}