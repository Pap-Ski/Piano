let allKeys = document.querySelectorAll(".keys > div");

allKeys.forEach((key) => key.addEventListener("mouseover", playNote));

function playNote(e) {
  let audio = this.children[0];
  audio.currentTime = 0;
  audio.play();
}
