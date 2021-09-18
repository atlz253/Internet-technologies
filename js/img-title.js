document.querySelectorAll("img").forEach(img => {
    if (img.hasAttribute("title"))
    {
        let title = document.createElement("h3");
        title.className = "img-title text-center text-light text-shadow";
        title.innerHTML = img.getAttribute("title");

        img.after(title);
    }
});