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
	
function UIconfirm(){
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
}

function UIgenericOverlay(content){
	var $content = $("#full_search");
		$content.dialog({
			modal:true,
			title : "Ricerca avanzata",
			minWidth: 1000,
			minHeight: 600,
			show: "fade",
			hide: "fade",
			draggable: false,
			resizable : false,
			
		});
		$content.dialog( "open" );
		return false;
}
