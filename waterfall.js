/** 
	creator: xiexy
	date: 20210118
	use example：
	(class1: for mainbody dom,class2: fro boxdom)
	1.waterfall.initDom(class1);//use before window.onload
	2.waterfall.waterfall(class1,class2);//use after window.onload
	3.waterfall.checkScrollSlide();//use when dindow.onscroll
 */
var waterfall = {
	//初始化瀑布流dom
	"initDom": function (parent) {
		var oParent = document.getElementById(parent);
		var tepmdom = '';
		for (let i = 0; i < dataInt.data.length; i++) {
			tepmdom += '<div class="box">' +
				'<div class="pic">' +
				'<img src="' + dataInt.data[i].src + '">' +
				'</div>' +
				'</div>';
		}
		oParent.innerHTML = tepmdom;
	},
	"waterfall": function (parent, box) {
		//获取main下所有class为box的元素
		var oParent = document.getElementById(parent);
		var oBoxs = waterfall.getByClass(oParent, box);
		//获取列数
		var oBoxW = oBoxs[0].offsetWidth;
		// console.log(document.documentElement.clientWidth)
		var cols = parseInt(screen.availWidth / oBoxW);
		oParent.style.cssText = "width:" + oBoxW * cols + "px;margin:0 auto"
		var hArr = []; //存放每列图片高度
		for (let i = 0; i < oBoxs.length; i++) {
			if (i < cols) {
				hArr.push(oBoxs[i].offsetHeight)
			} else {
				var minH = Math.min.apply(null, hArr);
				var index = waterfall.getMinhIndex(hArr, minH);
				oBoxs[i].style.position = 'absolute';
				oBoxs[i].style.top = minH + 'px';
				oBoxs[i].style.left = oBoxW * index + 'px';
				hArr[index] += oBoxs[i].offsetHeight;
			}
		}
	},
	//根据class获取元素
	"getByClass": function (parent, clsName) {
		var boxArr = [];
		var oElements = parent.getElementsByTagName('*');
		for (let item of oElements) {
			if (item.className == clsName) {
				boxArr.push(item)
			}
		}
		return boxArr;
	},
	"getMinhIndex": function (arr, val) {
		for (var i in arr) {
			if (arr[i] == val)
				return i;
		}
	},
	//检测是否具备滚动加载数据块的条件
	"checkScrollSlide": function() {
		var oParent = document.getElementById('main');
		var oBoxs = waterfall.getByClass(oParent, 'box');
		var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + parseInt(oBoxs[oBoxs.length - 1].offsetHeight);
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var totalH = scrollTop + document.documentElement.clientHeight;
		return (lastBoxH <= totalH) ? true : false;
	}
}