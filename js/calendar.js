/*书写日历插件*/
;(function($){
	$.fn.calendar=function(opt){
		//扩展参数
		var opt=$.extend({},{
			sTime:new Date(),//第一个月日期
			size:3//月份个数
		},opt)
		//遍历对象实现日历功能
		$('#main').each(function(){
			var main=$(this),y=opt.sTime.getFullYear(),m=opt.sTime.getMonth()+1;
			
			for(var i=0;i<opt.size;i++){
				var	html="<div class='box'><h2>"+y+"年"+addZero(m+i)+"月</h2><ol><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ol>";
				//console.log(html);
				html+=createTable(main,y,m+i);
				
				main.append(html);//创建的日历追加到main盒子中
			}	
			
		})
	}
	function createTable(main,y,m){
		//计算显示的天数(td个数)=(获取当月天数+上个月显示的天数)/7;
		var days=getDays(y,m),//获取当月天数
			pDays=new Date(y,m-1,1).getDay(),//上个月显示的天数=当前月的第一天对应的星期//console.log(pDays);

			rows=Math.ceil((days+pDays)/7),
			today=new Date(),//系统时间
			tMonth=today.getMonth()+1;//系统今天对应的月数
			//alert(tMonth);
			tDate=today.getDate();//系统今天号数
			passDays=getDays(y,m-1);//上个月的总天数
			str="<table id='tab"+m+"'>";
			//console.log(rows);
			for(var i=0;i<rows;i++){				
				str+="<tr>";				
				for(var j=1;j<=7;j++){
					var d=(j+i*7)-pDays;
					if(d<1){//此时每个td中是从1累加最后判断此时td中的数与上月显示的天数差值结果与1的大小，若<1显示上个月日期数，否则从1开始显示本月日期
						str+="<td class='prev'><small>"+(passDays+d)+"</small></td>";
					}else if(d<=days){
						if(tMonth==m&&d<tDate){
							str+="<td class='pass'><small>"+d+"</small></td>";
						}else{
							str+="<td><small>"+d+"</small></td>";
						}
					}
				}
				str+="</tr>";
			}
			str+="</table></div>";//console.log(str);
			return str;

	}
	function getDays(y,m){
		if(m==1||m==3||m==5||m==7||m==8||m==10||m==12){
			return 31;
		}else if(m==4||m==6||m==9||m==11){
			return 30;
		}else{
			if(y%400==0 || y%4==0 && y%100!=0){
				return 29;
			}else{
				return 28;
			}
		}
	}
})(Zepto)