function addZero(m){
	if(m<10){
		return "0"+m;
	}else{
		return m;
	}
}
//获取地址栏的参数1，全部信息
function getArgument(){
	//获取所有信息location.href,
	//获取通过href传的参数参数信息location.search,
	//获取通过href传的参数信息location.search,
	//获取通过锚点链接传的参数location.hash,此处需要
	var str1=location.search;//将获取的参数去掉？
		if(!str1){return false;}
		var str=location.search.substr(1),
		obj={},
		arr=str.split('&');//入住离店["date_in=2016-07-23", "date_out=2016-07-26"]				
		//console.log(arr);
		arr.forEach(function(ele,i){
			var re=ele.split('=');
			obj[re[0]]=re[1];
		})
		//console.log(obj);	
		return obj;
}
//获取地址栏的参数1，单个信息调用是传参(传参)eg:date_out
/*function getArgument(name){
	var str=location.search.substr(1),//将获取的参数去掉？
		obj={},//console.log(str);//date_in=2016-07-23&date_out=2016-07-26
		reg=new RegExp("(^|&)"+name+"=([^&]+)"),
		arr=reg.exec(str);
		obj[name]=arr[2];
		console.log(obj)
}*/
function removeZero(num){
	//console.log(num.charAt(0))
	if(num.charAt(0)==0){
		return num.charAt(1);
	}else{
		return num;
	}
}