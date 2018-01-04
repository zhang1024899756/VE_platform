

var s_user = 'admin'
var s_password = '123456'



function checkUser(){
   var userid = document.getElementById("userid").value;
   var password = document.getElementById("userpassid").value;
   if(userid == ""  ){
     alert("用户名不能为空");
     return false;
   }
   if(password == ""  ){
     alert("密码不能为空");
     return false;
   }if ((userid == s_user)&&(password == s_password) ) {
     return true;
   }else{
     alert("用户名或者密码错误！");
     return false;
   }
}