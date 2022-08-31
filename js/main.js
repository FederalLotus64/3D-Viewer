window.onclick = (e) => {
    if (e.target == document.querySelector(".import")) {
        document.querySelector(".dropdown-import").classList.toggle("show");
        document.querySelector(".dropdown-tools").classList.remove("show");
    }

    if (e.target == document.querySelector(".tools")) {
        document.querySelector(".dropdown-tools").classList.toggle("show");
        document.querySelector(".dropdown-import").classList.remove("show");
    }
}