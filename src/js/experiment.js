$(document).ready(function () {
    //判断浏览器是否为chrome
    // var browser = navigator.userAgent.toLowerCase().indexOf("chrome")
    // if (browser == -1) {
    //     $('html,body').css('overflow','hidden')
    //     $('#wrap').addClass('hide-scroll')
    // }
    
    //初始化拓扑绘画框架
    var canvas = document.getElementById("line-cvs")
    var stage = new JTopo.Stage(canvas)
    var scene = new JTopo.Scene(stage)




    var currentNode = null     //当前节点
    var nodeArr = new Array()   //所有节点
    var beginNode = null        //起始节点
    var tempUrl = ''          //临时路径容器
    
    

    //定义两个临时节点，一条临时线段
    var tempNodeA = new JTopo.Node('tempA')
    tempNodeA.setSize(1, 1)
            
    var tempNodeZ = new JTopo.Node('tempZ')
    tempNodeZ.setSize(1, 1)
            
    var link = new JTopo.Link(tempNodeA, tempNodeZ)

    /*在link原型上封装一个添加节点方法用来显示删除连线按钮*/
    JTopo.Link.prototype.addcenternode = function(thisL) {
        this.cnode = new JTopo.CircleNode('X')
        this.cnode.radius = 5
        this.cnode.fillColor = '0,0,0'
        this.cnode.textPosition = 'Middle_Center'
        scene.add(this.cnode)
        this.cnode.addEventListener('click',function () {
            scene.remove(thisL)
            scene.remove(this)
        })
    }

    

    //添加组件函数
    function node(name,x, y) {
        var node = new JTopo.Node(name)
        if (name == '计算机') {
             tempUrl = '../source/img/PC_close.png'
             node.setImage(tempUrl,true)
         }if (name == '路由器') {
             tempUrl = '../source/img/router_close.png'
             node.setImage(tempUrl,true)
         }if (name == '交换机') {
             tempUrl = '../source/img/switches_close.png'
             node.setImage(tempUrl,true)
         }
        node.setLocation(x, y)
        scene.add(node)
        //添加鼠标松开监听
        node.addEventListener('mouseup', function(event){
            currentNode = this
            handler(event)
        })
        return node
    }
    
    //右键函数
    function handler(event) {
        //console.log('X:'+event.pageX + ' ' + 'Y:' + event.pageY)

        if (event.button == 2) { // 右键
            if (currentNode._status == "open") {
                $("#contextmenu").children().children().first().text('关机')
            }else{
                $("#contextmenu").children().children().first().text('开机')
            }
            // 当前位置弹出菜单（div）
            $("#contextmenu").css({
                top: event.pageY - 50,
                left: event.pageX + 10
            }).show();
        }
    }
    
	//求差值函数
	// function diff(a,b){
	// 	var sum = a - b
	// 	if(sum <= 0){sum *= -1}
	// 	return sum
	// }

    
    stage.click(function(event){
        if(event.button == 0){// 右键

            // 关闭弹出菜单（div）
            $("#contextmenu").hide();
        }
    })

    //右键菜单处理    
    $("#contextmenu a").click(function(){
        var text = $(this).text()
        if (text == '关机') {
             if (currentNode.text == '计算机') {
                 tempUrl = '../source/img/PC_close.png'
                 currentNode.setImage(tempUrl)
             }if (currentNode.text == '路由器') {
                 tempUrl = '../source/img/router_close.png'
                 currentNode.setImage(tempUrl)
             }if (currentNode.text == '交换机') {
                 tempUrl = '../source/img/switches_close.png'
                 currentNode.setImage(tempUrl)
             }
            //currentNode.fillColor = '22,124,255'
            currentNode._status = "close"
        }
        if (text == '开机') {
             if (currentNode.text == '计算机') {
                 tempUrl = '../source/img/PC_open.png'
                 currentNode.setImage(tempUrl)
             }if (currentNode.text == '路由器') {
                 tempUrl = '../source/img/router_open.png'
                 currentNode.setImage(tempUrl)
             }if (currentNode.text == '交换机') {
                 tempUrl = '../source/img/switches_open.png'
                 currentNode.setImage(tempUrl)
             }
			//currentNode.fillColor = '0, 0, 255'
            currentNode._status = "open"
        }
        if (text == '连接设备') {
            if (beginNode == null) {
                beginNode = currentNode
                scene.add(link);
                tempNodeA.setLocation(currentNode.x, currentNode.y)
                tempNodeZ.setLocation(currentNode.x, currentNode.y)
				//$(this).text('断开连接')
            }
        }
		/*if(text == '断开连接'){
			//var link = findElements(function(e){return e.nodeZ == currentNode })
			
			//console.log(elem)
			//scene.remove(currentNode.inLinks[0])
			$(this).text('连接设备')
		}*/
        if (text == '设置' && currentNode._status == "open") {
            $('#interface').css('display','block').load('interface.html')
        }
        if (text == '移除设备') {
            nodeArr.splice(currentNode._id,1)
            scene.remove(currentNode)
            currentNode = null
        }
        $("#contextmenu").hide()
    })

    //鼠标按键松开时
    scene.mouseup(function(e) {
        //松开的是右键时
        if (e.button == 2) {   
            //销毁场景中的临时线段
            scene.remove(link)
            return;
        }
        if (e.target != null && e.target instanceof JTopo.Node) {
            if (beginNode !== e.target) {
                var endNode = e.target
                var l = new JTopo.Link(beginNode,endNode)
                scene.add(l)
                beginNode = null
                scene.remove(link)
            } else {
                beginNode = null
            }
        } else {
            scene.remove(link)
        }
    })

    scene.mousedown(function(e) {
         if (e.target == null || e.target === beginNode || e.target === link) {
             scene.remove(link)
         }
     })

     scene.mousemove(function(e) {
         tempNodeZ.setLocation(e.x, e.y)
     })
     
     /*双击删除连线*/
    scene.dbclick(function (e) {
        var thisL = e.target
        if (thisL.elementType == 'link') {
            thisL.addcenternode(thisL)
            thisL.paintPath=function(a, b) {
                if(this.cnode){
                    this.cnode.cx=this.nodeA.cx+(this.nodeZ.cx-this.nodeA.cx)/2;
                    this.cnode.cy=this.nodeA.cy+(this.nodeZ.cy-this.nodeA.cy)/2;
                }
                if (this.nodeA === this.nodeZ) return void this.paintLoop(a);
                a.beginPath(),
                        a.moveTo(b[0].x, b[0].y);
                for (var c = 1; c < b.length; c++) {

                    null == this.dashedPattern ? (
                            (null==this.PointPathColor?a.lineTo(b[c].x, b[c].y):a.JtopoDrawPointPath(b[c - 1].x, b[c - 1].y, b[c].x, b[c].y, a.strokeStyle,this.PointPathColor))
                    ) : a.JTopoDashedLineTo(b[c - 1].x, b[c - 1].y, b[c].x, b[c].y, this.dashedPattern)
                };
                if (a.stroke(), a.closePath(), null != this.arrowsRadius) {
                    var d = b[b.length - 2],
                            e = b[b.length - 1];
                    this.paintArrow(a, d, e)
                }
            }
            thisL.click(function () {
                if (this.cnode) {
                    scene.remove(this.cnode)
                }
            })
        }
    })
  

    //开始实验按钮
    $('#platform-btn').click(function () {
    	$('.mask').hide('fast')
    	$('#finish').css('left','30px')
    	$('#navigation').animate({ width: '40px' }, 'slow')
    })

    //双击添加组件
    $('.li-item').dblclick(function () {
    	var ifoff = $('.mask').css('display')
    	if (ifoff == 'none') {
	    	var imgName = $(this).find('img').attr('name')
            var _node = node(imgName,100,100)
            nodeArr.push(_node._id)
	    }else{
	    	$('#platform-btn').animate({opacity: '.8'},300)
	    	$('#platform-btn').animate({opacity: '1'},300)
	    	$('#platform-btn').animate({opacity: '.8'},300)
	    	$('#platform-btn').animate({opacity: '1'},300)
	    }
    })

})