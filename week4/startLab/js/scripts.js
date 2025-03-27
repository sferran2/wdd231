document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openButton");
    const closeBtn = document.getElementById("closeButton");
    const dialog = document.getElementById("dialogBox");
  
    openBtn.addEventListener("click", () => {
      dialog.showModal();
    });

    closeBtn.addEventListener("click", () => {
      dialog.close();
    });

    const openButton1 = document.getElementById("openButton1");
    const openButton2 = document.getElementById("openButton2");
    const openButton3 = document.getElementById("openButton3");
    const closeButton2 = document.getElementById("closeButton2");
    const dialog2 = document.getElementById("dialogBox2");
    const dialogBoxText = document.querySelector("#dialogBox2 div")

    openButton1.addEventListener("click", () => {
      dialog2.showModal();
      dialogBoxText.innerHTML = "One Apple contains 95 calories"
    });

    openButton2.addEventListener("click", () => {
      dialog2.showModal();
      dialogBoxText.innerHTML = "One Orange contains 35 calories"
    });

    openButton3.addEventListener("click", () => {
      dialog2.showModal();
      dialogBoxText.innerHTML = "One Banana contains 100 calories"
    });
  
    closeButton2.addEventListener("click", () => {
      dialog2.close();
    });
  });
