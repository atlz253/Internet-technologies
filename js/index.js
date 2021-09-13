document.querySelectorAll("img").forEach(img => {
    img.onclick = () => {
        let modal = document.querySelector("#modal-img>.modal-dialog>.modal-content>.modal-body");
        while (modal.firstChild) {
            modal.removeChild(modal.firstChild);
        }
        modal.appendChild(img.cloneNode());
        
        let title = document.querySelector("#modal-img>.modal-dialog>.modal-content>.modal-header>.modal-title");
        title.textContent = img.alt;
    }
});