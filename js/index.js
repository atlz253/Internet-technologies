document.querySelectorAll("img").forEach(img => {
    if (img.hasAttribute("title"))
    {
        let title = document.createElement("h3");
        title.className = "img-title text-center text-light text-shadow";
        title.innerHTML = img.getAttribute("title");

        img.after(title);
    }
    
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