let notes = Array.from(document.querySelectorAll(".note"));

for (let i = 0; i < notes.length; i++) {
    let note = notes[i];

    note.onmousedown = (startPos) => {
        note.classList.add("note_hidden");

        document.onmousemove = (e) => {
            let newPosX = e.screenX - startPos.screenX;
            let newPosY = e.screenY - startPos.screenY;

            if (note != notes[notes.length - 1] && newPosX > 100) {
                notes[i + 1].after(note);
                startPos = e;

                notes[i] = notes[i + 1];
                notes[++i] = note;
            }
            else if (note != notes[0] && newPosX < -100) {
                notes[i - 1].before(note);
                
                startPos = e;

                notes[i] = notes[i - 1];
                notes[--i] = note;
            }
            else if (newPosY > 100)
            {
                let colNum = Math.trunc(document.querySelector("#wrapper").offsetWidth / note.clientWidth);

                console.log(colNum);
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null;
            note.onmouseup = null;
            note.classList.remove("note_hidden");
        }
    }
}