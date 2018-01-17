$(document).ready(function () {



    $('#startmenu').toggle(
    	function(){
    		$('#start_window').css('display','block')
    	},
    	function(){
    		$('#start_window').css('display','none')
    	}
    )

    $('#internet_icon').dblclick(function () {
        var options = {
            appendTo: "#interface",
            width: 300,
            height: 410,
            minimizable: true,
            minimized: false,
            resizable: false,
            closable: true,
            autoOpen: true,
            closeOnEscape: true,
            title: 'ipv4设置'
        }
        var setIpwindow = $('<div>')
        setIpwindow.attr('id','ipv4_window')
        setIpwindow.window(options)
        setIpwindow.load('../src/winpage/ip.html')

    })

    function showOrderwindow() {
        var options = {
            appendTo: "#interface",
            minimizable: true,
            minimized: false,
            closable: true,
            resizable: true,
            width: 700,
            height: 410,
            title: 'MINGW64:/c/Users/zhangxinyu/Desktop/cmd.exe'
        }
        var setwindow = $('<div>')
        setwindow.attr('id','cmd_window')
        setwindow.css('background','black')
        setwindow.window(options)
        setwindow.load('../src/winpage/cmd.html')
    }

    $('#start_window li').click(function () {       
        var t = $(this).text()
        if (t == '注销（退出设置）') {
            $('#interface').empty().css('display','none')
        }
        if (t == '运行') {
            showOrderwindow()
        }
    })


})