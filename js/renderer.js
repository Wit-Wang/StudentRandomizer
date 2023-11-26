// ./js/renderer.js

function move(elements, studentsList) {
	// 遍历节点列表函数
	for (let i = 0; i < elements.length; i++) {
		let element = elements[i];
		// 对每个元素进行操作，修改元素的内容
		let index = (startNum + i) % studentsList.length;
		if (element.innerText = studentsList[index] == ''){
			element.innerText = '!null';
		}else{
			element.innerText = studentsList[index];
		}
		
	}
}
let rolling = false
const currStatus = ["开始", "停"]
let startNum = 0;

window.addEventListener('DOMContentLoaded', async () => {
	const gElements = document.getElementsByClassName("studentName")
	const settings = document.getElementById('settings')
	settings.addEventListener('click', function () {
		window.settings.openWindow();
	})
	const btn = document.getElementById("btn")
	// 选择具有不同 ID 的多个元素
	const shadowEle = document.querySelectorAll('#s1, #s2, #s3');
	const greyEle = document.querySelectorAll('#s4');
	btn.addEventListener("click", function () {
		const intervalId = setInterval(() => {
			move(gElements, gStudentsList);
			startNum++
			if (startNum >= gStudentsList.length) {
				startNum = 0
			}
			// 在特定条件下停止循环
			if (!rolling) {
				clearInterval(intervalId);
			}
		}, 125);
		rolling = !rolling
		// 遍历选中的元素
		shadowEle.forEach(element => {
			if (rolling) {
				element.style.opacity = 1;
			} else {
				let opacity = 1;
				const fadeOut = setInterval(() => {
					opacity -= 0.01;
					element.style.opacity = opacity;
					if (opacity <= 0.3) {
						clearInterval(fadeOut);
					}
				}, 10);
			}
		});
		greyEle.forEach(element => {
			if (rolling) {
				let background = 255;
				element.style.backgroundColor = `rgb(${background},${background},${background})`;
			} else {
				let background = 255;
				const turnGrey = setInterval(() => {
					background -= 1;
					element.style.backgroundColor = `rgb(${background},${background},${background})`;
					if (background <= 235) {
						clearInterval(turnGrey);
					}
				}, 10);
			}
		});
		btn.innerText = currStatus[Number(rolling)]
	})
	
	const closebtn = document.getElementById('close');
	const minibtn = document.getElementById('minimize')

	closebtn.addEventListener('click', function (){
		window.thiswindow.closethis()
	})

	minibtn.addEventListener('click', function (){
		window.thiswindow.minimizethis()
	})

	// 向主进程请求共享变量的值
	gStudentsList = await window.aboutStudentsList.getList();

	settings.innerText = `总计\n共${gStudentsList.length}人`;
	move(gElements, gStudentsList);
	
	window.aboutStudentsList.updateList((event, value) => {
		gStudentsList = value;
		console.log(`changed student list to: ${value}`)
		settings.innerText = `共${gStudentsList.length}人`;
		move(gElements, gStudentsList);
		event.sender.send('changeStatus', gStudentsList)
	})
})
