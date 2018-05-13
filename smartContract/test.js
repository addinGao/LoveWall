"use strict";

var ShowPictrue = function () {
		LocalContractStorage.defineMapProperty(this, "itemsArr")
		LocalContractStorage.defineMapProperty(this, "itemsObj")
};

ShowPictrue.prototype = {
		init: function () {
				// [{timestamp:12345,picArr:["xx","xx"],advers:"广告"},{}]
				var times = +new Date();
				var aa = [times]
				var bb = {
						picArr :[
							"https://img3.doubanio.com/view/photo/l/public/p1988314656.webp",
								"https://img3.doubanio.com/view/photo/l/public/p2000760805.webp",
								"https://img1.doubanio.com/view/photo/l/public/p2000759878.webp",
								"https://img3.doubanio.com/view/photo/l/public/p1988314725.webp",
								"https://img3.doubanio.com/view/photo/l/public/p1988314623.webp",
								"https://img3.doubanio.com/view/photo/l/public/p1988314696.webp",
								"https://img1.doubanio.com/view/photo/l/public/p2000757929.webp"
						],
						advers:"这是一个测试"
					}
				var aas = JSON.stringify(aa)
				var bbs = JSON.stringify(bb)
				this.itemsArr.set("items",aas)
				times = times +''
				this.itemsObj.set(times,bbs)
		},

		add: function (advers,pic1,pic2,pic3,pic4,pic5,pic6,pic7) {
				// 获取所有队列,然后添加
				var items = this.itemsArr.get("items");
				items = JSON.parse(items);
				var timer = 0;
				if(items.length>=1){
					// 拿到最后一个时间
					var lastTime = items[items.length-1];
					var datas = +new Date();
					if(lastTime+1*60*1000<datas){
						timer = datas
					}else{
						timer = lastTime + 1*60*1000;
					}
					items.push(timer)
				}else{
					timer = +new Date()
					items.push(timer)
				}
				var arr = JSON.stringify(items)
				this.itemsArr.set("items",arr)

				// 添加到itemsObj
				var picArr = []
				picArr.push(pic1)
				picArr.push(pic2)
				picArr.push(pic3)
				picArr.push(pic4)
				picArr.push(pic5)
				picArr.push(pic6)
				picArr.push(pic7)
				var obj={};
				obj.picArr = picArr;
				obj.advers = advers;
				obj.timestamp = timer;
				var objStr = JSON.stringify(obj);
				timer = timer+"";
				this.itemsObj.set(timer,objStr);
		},

		get: function () {
				// 获取时间数组
				var items = this.itemsArr.get("items");
				items = JSON.parse(items);
				// 遍历找出当前要播放的照片对应的时间
				var timesNow = +new Date();
				var len = items.length;
				var timeStamp = "没有";
				if (len>=3){
					for(var i =1;i<=len-1;i++){
						if(timesNow>=items[i-1] && timesNow<items[i]){
								timeStamp = items[i-1];
								break;
						}
						if(timesNow>=items[len-1]){
							timeStamp = items[len-1]
						}
					}
				}else if(len == 2){
					if (timesNow>=items[0]&&timesNow<items[1]){
						timeStamp = items[0]
					}else{
						timeStamp = items[1]
					}
				}else if(len==1){
					timeStamp = items[0]
				}else{
					timeStamp = items[0]
				}
				// 拿到了时间戳，去查找图片
				timeStamp = timeStamp + "";
				var objStr = this.itemsObj.get(timeStamp);
				return objStr
		},
		test:function(){
			var arr = JSON.parse(this.itemsArr.get("items"))
			var str = []
			for(var i =0;i<arr.length;i++){
				str.push(this.itemsObj.get(arr[i]+''))
			}
			return JSON.stringify(str)
		}
};
module.exports = ShowPictrue;