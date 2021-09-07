let allKeys = document.querySelectorAll(".keys > div");

allKeys.forEach((key) => {
  let keyControl = document.createElement("p");
  keyControl.className = "key_control";
  let keyControlText = document.createTextNode(
    key.getAttribute("data-key").toUpperCase()
  );
  keyControl.append(keyControlText);
  key.append(keyControl);
});

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
  // if (e.repeat) return;
  allKeys.forEach((key) => {
    let audio = key.children[0];
    if (
      e.key === key.getAttribute("data-key") ||
      e.key === key.getAttribute("data-key").toUpperCase()
    ) {
      audio.currentTime = 0;
      audio.play();
      animateKey(key);
    }
  });
}

allKeys.forEach((key) => {
  key.addEventListener("touchstart", playNoteOnTouch);
});
function playNoteOnTouch(e) {
  let audio = this.children[0];
  audio.currentTime = 0;
  audio.play();
  animateKey(this);
}

// Add class to style note when stroke
function animateKey(key) {
  key.classList.add("press");
  key.addEventListener("transitionend", () => {
    key.classList.remove("press");
  });
}

// CHANGING THE OCTAVE OF THE NOTES

let incOctave = document.querySelector("#incOctave");
let decOctave = document.querySelector("#decOctave");
let minOct = 3;
let maxOct = 5;
let octaveNumber = document.querySelector(".octave_number");

incOctave.addEventListener("click", () => {
  octaveNumber.textContent++;
  if (octaveNumber.textContent > maxOct) {
    octaveNumber.textContent--;
  }
  if (octaveNumber.textContent == maxOct) {
    incOctave.disabled = true;
  }
  if (octaveNumber.textContent > minOct) {
    decOctave.disabled = false;
  }
  allKeys.forEach((key) => {
    changeAudioSrc(key);
  });
});

decOctave.addEventListener("click", () => {
  octaveNumber.textContent--;
  if (octaveNumber.textContent < minOct) {
    octaveNumber.textContent++;
  }
  if (octaveNumber.textContent == minOct) {
    decOctave.disabled = true;
  }
  if (octaveNumber.textContent < maxOct) {
    incOctave.disabled = false;
  }
  allKeys.forEach((key) => {
    changeAudioSrc(key);
  });
});

/// Every note audio has a digit attached to the note to signify the type octave it is in
/// Had to loop through the src of the audio from behind to change that numeric character
/// to the user's preferred octave
function changeAudioSrc(audioParent) {
  let noteSound = audioParent.children[0];
  let noteSoundArr = noteSound.src.split("");
  for (let i = noteSoundArr.length - 2; i >= 0; i--) {
    if (!isNaN(noteSoundArr[i])) {
      noteSoundArr[i] = octaveNumber.textContent;
      break;
    }
  }

  noteSound.src = noteSoundArr.join("");
}
