	"use strict";

	var ShowPictrue = function () {
			LocalContractStorage.defineMapProperty(this, "itemsArr")
			LocalContractStorage.defineMapProperty(this, "itemsObj")
	};

	ShowPictrue.prototype = {
			init: function () {
					// [{timestamp:12345,picArr:["xx","xx"],advers:"广告"},{}]
					var times = +new Date();
					var aa = [{timestamp:times,data:"这是一个测试"}]
					var bb = {
							picArr :[],
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
						var lastTime = items[items.length-1].timestamp;
						var datas = +new Date();
						if(lastTime+2*60*60*1000<datas){
							timer = datas
						}else{
							timer = lastTime + 2*60*60*1000;
						}
						items.push({timestamp:timer,data:advers})
					}else{
						timer = +new Date()
						items.push({timestamp:timer,data:advers})
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
					var j = 0;
					if (len>=3){
						for(var i =1;i<=len-1;i++){
							if(timesNow>=items[i-1].timestamp && timesNow<items[i].timestamp){
									timeStamp = items[i-1].timestamp;
									j = i
									break;
							}
							if(timesNow>=items[len-1].timestamp){
								timeStamp = items[len-1].timestamp
								j = len-1
							}
						}
					}else if(len == 2){
						if (timesNow>=items[0].timestamp&&timesNow<items[1].timestamp){
							timeStamp = items[0].timestamp
							j = 0
						}else{
							timeStamp = items[1].timestamp
							j = 1
						}
					}else if(len==1){
						timeStamp = items[0].timestamp
					}else{
						timeStamp = items[0].timestamp
					}
					// 拿到了时间戳，去查找图片
					timeStamp = timeStamp + "";
					var objStr = this.itemsObj.get(timeStamp);
					objStr = JSON.parse(objStr)
					var resutlt = {}
					resutlt.obj = objStr // 得到要展示的对象
					var aa = [];
					for(var k=j;k<len;k++){
						aa.push(items[k])
					}
					resutlt.todo = aa  // 得到要做的对象
					return JSON.stringify(resutlt)
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