$(document).ready(function() {

    //按钮动画
    function btnOffanimate(myself) {
        var top = $('#nav_off').position().top
        if (top == -50) {
            $('#nav_off').animate({ top: '100px' }, 500)
            $('#nav_off').animate({ top: '20px' }, 800)
            $('#content').css('margin-left','250px' )
        } else if (myself.id == 'nav_off') {
            $('#nav_off').animate({ top: '-50px' })
            $('#content').css('margin-left','40px')
        }
    }


    //nav关闭
    $('#nav_off').click(function() {
        $('#navigation').animate({ width: '40px' }, 'slow')
        btnOffanimate(this)
        $('#nav_on').show(2000, 'linear')
        $('.nav-item').children('ul').slideUp(300)
        $('.nav-item>a').css({ background: "#34495e" })
    })
    //nav展开
    $('#nav_on').click(function() {
        $('#navigation').animate({ width: '250px' }, 'slow')
        $(this).hide()
        btnOffanimate(this)
    })


    // nav-item收缩展开
    $('.nav-item>a').on('click', function() {
        $('#navigation').animate({ width: '250px' }, 'slow')
        $('#nav_on').hide()
        btnOffanimate(this)
        if ($(this).next().css('display') == "none") {
            //展开未展开
            $('.nav-item').children('ul').slideUp(300)
            $('.nav-item>a').css({ background: "#34495e" })
            $(this).next('ul').slideDown(300)
            $(this).parent('li').addClass('nav-show').siblings('li').removeClass('nav-show')
            $(this).css({ background: "#2c3e50" })
        } else {
            //收缩已展开
            $(this).next('ul').slideUp(300)
            $('.nav-item.nav-show').removeClass('nav-show')
            $(this).css({ background: "#34495e" })
        }
    })



    //iframe跳转
    $('.nav-item li').click(function () {
        var pageName = $(this).find('span').text()
        
        if (pageName == '静态路由配置实验') {
            $('#content').find('iframe').attr('src','experiment.html')
        }else{
            $('#content').find('iframe').attr('src','myuser.html')
        }
    })



})