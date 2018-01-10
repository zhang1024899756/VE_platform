$(document).ready(function () {



    $('#taskbar').toggle(
    	function(){
    		$('#start_window').css('display','block')
    	},
    	function(){
    		$('#start_window').css('display','none')
    	}
    )

    $('#internet_icon').dbclick(function () {
    	// body...
    })


})