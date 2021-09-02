let allKeys = document.querySelectorAll(".keys > div");

allKeys.forEach((key) => key.addEventListener("click", playNoteOnClick));

// Play note when note is clicked
function playNoteOnClick(e) {
  let audio = this.children[0];
  audio.currentTime = 0;
  audio.play();

  animateKey(this);
}

// Play note when key is pushed down
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

// Add class to style note when stroke
function animateKey(key) {
  key.classList.add("press");
  key.addEventListener("transitionend", () => {
    key.classList.remove("press");
  });
}

// CHANGING THE OCTAVE OF THE NOTES
/// Done by changing the numeric character in the audio src string with the user's preference
let incOctave = document.querySelector("#incOctave");
let decOctave = document.querySelector("#decOctave");
let minOct = 3;
let maxOct = 5;
let octaveNumber = document.querySelector(".octave_number");

// TO BE DONE LATER 👇🏽

// incOctave.addEventListener("click", () => {
//   octaveNumber.textContent++;
//   allKeys.forEach((key) => {
//     let noteSound = key.children[0].children[0];
//     let noteSoundArr = noteSound.src.split("");
//     // noteSound.src.replace(
//     //   `${noteSound.src.substr(-5, 1)}`,
//     //   `${octaveNumber.textContent}`
//     // );
//     // console.log(octaveNumber.textContent);
//     console.log(noteSoundArr.search("5"));
//   });
// });
