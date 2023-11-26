// ./js/settingsRenderer.js

window.addEventListener('DOMContentLoaded', async () => {
    const input = document.getElementById('input');
    //向主程序请求初始值
    let gStudentsList = await window.aboutStudentsList.getList();
    input.value = gStudentsList.toString();
  
    const confirmbtn = document.getElementById('confirm');
    const cancelbtn = document.getElementById('cancel');
  
    input.addEventListener('input', function () {
      if (input.value !== gStudentsList.toString()) {
        confirmbtn.disabled = false;
      } else {
        confirmbtn.disabled = true;
      }
    });
  
    confirmbtn.addEventListener('click', function (event) {
      if (input.value === gStudentsList.toString()) {
        event.preventDefault();
        return;
      }
      window.settings.confirm(input.value.toString());
    });
  
    cancelbtn.addEventListener('click', function () {
      window.settings.cancel();
    });
  });