;(function($){
	//显示默认入住离店时间调用函数
	init();
	
	function init(){
		//显示默认入住离店离店时间
		getDefault();
		//点击显示日历页调用函数
		showcalendar();
	}
	function getDefault(){
		//设置默认入住离店时间
		var argument=getArgument();//获取点击后的参数中的入住离店日期
			if(argument){
			var inTime=argument.date_in,//点击后的入住时间
				outTime=argument.date_out,//点击后离店时间
				t=new Date(inTime),
				t2=new Date(outTime);
				Tin=t.getDate(),Tout=t2.getDate(),
				sub2=Tout-Tin;
				if(sub2==0){
					$('#count').text(1)
				}else{
					$('#count').text(sub2);
				}
				
			console.log(Tin+" "+Tout)
			}else{
				inTime=_setTime(),//入住时间2017-07-22
				outTime=_setTime(2);//离店时间
			}
			$('#date_in').text(inTime);
			$('#date_out').text(outTime);
		//对应的今明后天或星期
		var inchange=change(inTime),
			outchange=change(outTime);
			$('#week_in').text(inchange);
			$('#week_out').text(outchange);	
	}
	//设置默认时间
	function _setTime(n){
		var n=n||0,
			today=new Date(),//系统时间
			newDate=new Date(today.getFullYear(),(today.getMonth()+1),(today.getDate()+n));
			//alert(newDate.getFullYear()+'-'+addZero(newDate.getMonth())+'-'+addZero(newDate.getDate()))
			return newDate.getFullYear()+'-'+addZero(newDate.getMonth())+'-'+addZero(newDate.getDate());
	}
	//设置对应星期
	function change(t){
		
		//传入的试驾与系统时间天数相减差值=0 今天，1 明天，2 后天，>2显示星期
		var arr=['日','一','二','三','四','五','六'],
			step=24*60*60*1000,//一天的毫秒数
			txt="",//存储今，明，后天
			today=new Date(),//系统时间
			t=new Date(t),//入住离店时间转成时间对象(毫秒)
			num=t.getDay(),//入住离店的星期	
			sub=Math.abs(Math.ceil((t*1-today.getTime()*1)/step));//差值(毫秒)		
			
			if(sub==0){//判断如果当天居住当天离店时显示1晚
				$('#count').text(1);
			}
			//判断sub的值
			//console.log(sub);
			switch(sub){
				case 0:return txt="今天";break;
				case 1:return txt="明天";break;
				case 2:return txt="后天";break;
				default:return txt="星期"+arr[num];break;
			}
	}
	//显示日历页
	function showcalendar(){
		//点击a标签显示日历页
		$('#show').on('click',function(){
			//显示日历页的同时需要把入住离店时间传到日历页以便日历页用，通过url地址传入住离店时间(date_in,date_out);
			var inTime=$('#date_in').text(),
				outTime=$('#date_out').text(),
				url="calendar-rili.html?date_in="+inTime+"&date_out="+outTime;
			//alert(inTime+" "+outTime);
			$(this).attr('href',url);
		})
	}

})(Zepto)