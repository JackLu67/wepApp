//序列化
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (this.value != "" && this.value != null) {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            }
            else {
                o[this.name] = this.value || '';
            }
        }

    });
    return o;
}

// form表单赋值
$.fn.myFormAssignment = function (data) {
  return this.each(function () {
      var formElem, name;
      if (data == null) { this.reset(); return; }
      for (var i = 0; i < this.length; i++) {
          formElem = this.elements[i];
          //checkbox的name可能是name[]数组形式
          name = (formElem.type == "checkbox") ? formElem.name.replace(/(.+)\[\]$/, "$1") : formElem.name;
          if (data[name] == undefined) continue;
          switch (formElem.type) {
              case "checkbox":
                  if (data[name] == "") {
                      formElem.checked = false;
                  } else {
                      //数组查找元素
                      if (data[name].indexOf(formElem.value) > -1) {
                          formElem.checked = true;
                      } else {
                          formElem.checked = false;
                      }
                  }
                  break;
              case "radio":
                  if (data[name] == "") {
                      formElem.checked = false;
                  } else if (formElem.value == data[name]) {
                      formElem.checked = true;
                  }
                  break;
              case "button": break;
              default: formElem.value = data[name];
          }
      }
  });
};

$.validate = function(data) {
    var obj = data;
    var regName =/^[\u4e00-\u9fa5]{2,4}$/;  //验证姓名
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  //验证身份证
    var regPhone=/^[1][3,4,5,7,8][0-9]{9}$/; //验证电话号码
    var regPass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/; // 验证密码
    var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //验证邮箱
    $('input').keyup(function(){
      $('input').css('borderColor','#ccc');
    })
    for(var i in obj) {
        if(i == 'idCardNumber'){
          if(!obj[i]){
            should(i);
            return false;
          }else if(!regIdNo.test(obj[i])){
            layer.msg('身份证填写不规范', {icon: 5,anim: 6,time: 2000,shade : [0.5 , '#000' , true]});
            $('input[name='+i+']').css('borderColor','red');
            $('input[name='+i+']').focus();
            return false;  
          }
        }else if(i == 'userName'){
          if(!obj[i]){
            should(i);
            return false;
          }else if(!regName.test(obj[i])){
            layer.msg('请输入真实姓名', {icon: 5,anim: 6,time: 2000,shade : [0.5 , '#000' , true]});
            $('input[name='+i+']').css('borderColor','red');
            $('input[name='+i+']').focus();
            return false;  
          }
        }else if(i == 'phoneNumber'){
          if(!obj[i]){
            should(i);
            return false;
          }else if(!regPhone.test(obj[i])){
            layer.msg('请输入正确电话号码', {icon: 5,anim: 6,time: 2000,shade : [0.5 , '#000' , true]});
            $('input[name='+i+']').css('borderColor','red');
            $('input[name='+i+']').focus();
            return false;  
          }
        }else if(i == 'password'){
          if(!obj[i]){
            should(i);
            return false;
          }else if(!regPass.test(obj[i])){
            layer.msg('请输入正确的密码', {icon: 5,anim: 6,time: 2000,shade : [0.5 , '#000' , true]});
            $('input[name='+i+']').css('borderColor','red');
            $('input[name='+i+']').focus();
            return false;  
          }
        }else {
          if(!obj[i]){
            should(i);
            return false;
          }else if(!regEmail.test(obj[i])){
            layer.msg('请输入正确的邮箱', {icon: 5,anim: 6,time: 2000,shade : [0.5 , '#000' , true]});
            $('input[name='+i+']').css('borderColor','red');
            $('input[name='+i+']').focus();
            return false;  
          }
        }
      }
      return true;
  }
  
  function should(i){
    layer.msg('必填项不能为空', {icon: 5,anim: 6,time: 2000,shade : [0.5 , '#000' , true]});
    $('input[name='+i+']').css('borderColor','red');
    $('input[name='+i+']').focus();
  }