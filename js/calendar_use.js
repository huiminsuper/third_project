/*使用日历插件*/
;(function($){
	init();
	function init(){
		//1,使用插件显示日历
		$('#main').calendar({
			sTime:new Date(),//第一个月的日期
			size:3,//月份个数
		})
		//2,显示入住离店日期调用函数
		showRuZhu();
		//3,点击单元格显示入住离店时间
		changeTime();
	}
	function showRuZhu(){
		var obj=getArgument(),//获取参数//console.log(obj);
			inTime=obj.date_in.split('-'),//入住时间
			inY=inTime[0],//入住年
			inM=removeZero(inTime[1]),//入住月，去零
			inD=removeZero(inTime[2]),//入住日，去零
			outTime=obj.date_out.split('-'),//离店时间
			outY=outTime[0],//离店年
			outM=removeZero(outTime[1]),//离店月，去零
			outD=removeZero(outTime[2]);//离店日，去零
			//console.log(inY+" "+inM+" "+inD);
			//console.log(outY+" "+outM+" "+outD);
			//判断是同月还是跨月(即判断inM，outM是否相等)
			if(inM==outM){//同月
				var tds=$('#tab'+inM).find('td').not('.prev,.pass');//找到对应月分的td单元格获取其中内容(字符串类型)*1转为数字
				//使用filter过滤单元格
				//console.log(tds);
				//console.log(inD)
				//console.log(outD)
				/*tds.each(function(){
					var txt=$(this).text();
					if(txt>=inD&&txt<=outD){
						$(this).addClass('in')
					}
				})*/
				tds.filter(function(){
					var txt=$(this).text()*1;
					//console.log(txt);					
					if(txt>=inD && txt<=outD){						
						return $(this);						
					}
				}).addClass('in')

			}else{//跨月，不同月
				var intds=$('#tab'+inM).find('td').not('.prev,.pass'),
					outds=$('#tab'+outM).find('td').not('.prev');
					console.log(intds);
					intds.filter(function(){
						var txt=$(this).text()*1;//console.log(txt);
						if(txt>=inD){
							return $(this);
						}					
					}).addClass('in');
					outds.filter(function(){
						var txt=$(this).text()*1;//console.log(txt);
						if(txt<=outD){
							return $(this)
						}
					}).addClass('in');
			}
			//给入住当天和离店当天添加对应入住和离店
			$('.in').first().append('<span>入住</span>');
			$('.in').last().append('<b>离店</b>');
	}
	//点击后更改时间函数
	function changeTime(){
		//为main绑定单击事件
		var isClick=false;//第一次点击
		$('#main').on('tap','td',function(){
			if(!isClick){//第一次点击
				//将点击的td中的文字删除，然后去掉样式
				$('.in').find('span,b').remove();//去文字
				$('.in').removeClass('in');//去样式
				$(this).addClass('in').append('<span>入住</span>');
				isClick=true;
			}else{//第二次点击
				$(this).addClass('in').append('<b>离店</b>');
				isClick=false;
			
			//获取入住离店时间将其作为地址栏参数传入首页
			var In=$('.in').first().find('small'),//获取入住年月日
				InD=addZero(In.text()*1),
				reg=/[\u4e00-\u9fa5]/g,		
				InYM=In.parents('.box').find('h2').text().replace(reg,'-'),
				endInTime=InYM+InD,
				Out=$('.in').last().find('small'),//获取离店年月日
				OutD=addZero(Out.text()*1),	
				OutYM=Out.parents('.box').find('h2').text().replace(reg,'-'),
				endOutTime=OutYM+OutD,
				sub=(new Date(endOutTime)*1-new Date(endInTime)*1)/86400000;
				//判断是否超过15天
				console.log(sub);
				if(sub>15){
					alert('不能超过15天');
					return false;
				}
				location.href='calender.html?date_in='+endInTime+'&date_out='+endOutTime;

			}
		})
	}
})(Zepto)