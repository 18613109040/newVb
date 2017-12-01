import md5 from './md5'
let width =window.screen.width
const utils={
  width:width,//屏幕宽度
  multiple:width <=375 ?2:3,  //用于计算屏幕高度减去底部高度
	expiration:1000*60*60*24*2,  //过期时间
	md5:md5,
    //通过class来查找元素
    getElementsClass(classnames){ 
        var classobj= new Array();//定义数组 
        var classint=0;//定义数组的下标 
        var tags=document.getElementsByTagName("*");//获取HTML的所有标签 
       for(var i in tags){//对标签进行遍历  
       if(tags[i].nodeType==1){//判断节点类型 
        if(tags[i].getAttribute("class") == classnames)//判断和需要CLASS名字相同的，并组成一个数组
          {  classobj[classint]=tags[i];  classint++;  }  }  }  
          return classobj;//返回组成的数组  
    }  ,
	// Javascript优化后的加减乘除（解决js浮点数计算bug） begin
  add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
  },
  sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
  },

  mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
  },

  div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
  },
   // Javascript优化后的加减乘除（解决js浮点数计算bug） end
}

module.exports = utils