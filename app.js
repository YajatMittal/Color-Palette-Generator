const colorPalette = document.querySelector(".color-palette-container");
const btn = document.querySelector("button");

function genColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generatePalette() {
    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(genColor());
    }
    updateDisplay(colors);
}

function updateDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");
    const colorTexts = document.querySelectorAll("p");

    colorBoxes.forEach((box, i) => {
        const hexColor = genColor().toUpperCase();
        colorBoxes[i].style.backgroundColor = hexColor;
        colorTexts[i].textContent = hexColor;
    })
}

const copyContent = async (text, icon) => {
    try {
      await navigator.clipboard.writeText(text);
      iconToggler(icon);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
}

function iconToggler(icon) {
    icon.classList.remove("fa-regular", "fa-copy");
    icon.classList.add("fa-solid", "fa-check", "green");

    setTimeout(() => {
        icon.classList.remove("fa-solid", "fa-check", "green");
        icon.classList.add("fa-regular", "fa-copy");
    }, 1000)
}

btn.addEventListener("click", generatePalette)

colorPalette.addEventListener("click", (event) => {
    if (event.target.classList.contains("color-box")) {
        const spanChildren = event.target.nextElementSibling.children;
        const hexColor = spanChildren[0].innerText;
        const icon = spanChildren[1];
        copyContent(hexColor, icon);
    } else if (event.target.tagName === "I") {
        const hexColor = event.target.previousElementSibling.innerText;
        const icon = event.target;
        copyContent(hexColor, icon);
    }
})
