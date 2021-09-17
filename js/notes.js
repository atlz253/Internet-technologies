let notes = document.querySelectorAll(".note");

notes.forEach(note => {
    note.onmousedown = (startPos) => {
        note.classList.add("note_hidden");

        document.onmousemove = (e) => {
            const colNum = Math.trunc(document.querySelector("#wrapper").offsetWidth / note.offsetWidth) - 1;
            console.log(colNum);

            if (note != notes.lastChild && e.screenX - startPos.screenX > 50)
            {
                note.nextSibling.after(note);
                startPos = e;
            }
            else if (note != notes.firstChild && e.screenX - startPos.screenX < -50)
            {
                note.previousSibling.before(note);
                startPos = e;
            }
            else if (e.screenY - startPos.screenY < -100)
            {

            }
        }

        document.onmouseup = () => {
            document.onmousemove = null;
            note.onmouseup = null;
            note.classList.remove("note_hidden");
        }
    }
});