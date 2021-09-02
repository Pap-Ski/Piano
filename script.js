let allKeys = document.querySelectorAll(".keys > div");

allKeys.forEach((key) => key.addEventListener("click", playNoteOnClick));

function playNoteOnClick(e) {
  let audio = this.children[0];
  audio.currentTime = 0;
  audio.play();

  animateKey(this);
}

document.addEventListener("keydown", playNoteOnKeyDown);
function playNoteOnKeyDown(e) {
  if (e.repeat) return;
  allKeys.forEach((key) => {
    let audio = key.children[0];

    if (e.key === key.getAttribute("data-key")) {
      audio.currentTime = 0;
      audio.play();
      animateKey(key);
    }
  });
}

function animateKey(key) {
  key.classList.add("press");
  key.addEventListener("transitionend", () => {
    key.classList.remove("press");
  });
}
