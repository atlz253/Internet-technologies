document.querySelectorAll(".note").forEach(note => {
    let move = (e) => {
        note.style.left = e.pageX - note.offsetWidth / 2 + 'px';
        note.style.top = e.pageY - note.offsetHeight / 2 + 'px';
    }

    note.onmousedown = (e) => {
        note.style.position = "absolute";
        note.style.zIndex = 100;

        move(e)

        document.body.appendChild(note);

        document.onmousemove = (e) => move(e);

        note.onmouseup = () => {
            document.onmousemove = null;
            note.onmouseup = null;

            document.querySelectorAll(".note").forEach(n => {
                console.log(n);
            });
        }
    }
});