const socket = io();

function removeChilds(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

socket.on("menu", (msg) => {
  let menuList = document.querySelector(".menu_list");
  removeChilds(menuList);
  
  for (const el of msg) {
    let box = document.createElement("div");
    box.classList.add("box");

    let title = document.createElement("h3");
    title.classList.add("title", "is-4");
    title.innerHTML = el.title;

    let descriptionBlock = document.createElement("div");
    descriptionBlock.classList.add("block");
    let descriptionContent = document.createElement("p");
    descriptionContent.classList.add("content");
    descriptionContent.innerHTML = el.description;
    descriptionBlock.appendChild(descriptionContent);

    let additionalBlock = document.createElement("div");
    additionalBlock.classList.add("block");
    let additionalSubtitle = document.createElement("p");
    additionalSubtitle.classList.add("subtitle", "is-6");
    additionalSubtitle.innerHTML = "Additional";
    let additionalContent = document.createElement("p");
    additionalContent.classList.add("content");
    additionalContent.innerHTML = el.additional;
    additionalBlock.appendChild(additionalSubtitle);
    additionalBlock.appendChild(additionalContent);

    box.appendChild(title);
    box.appendChild(descriptionBlock);
    box.appendChild(document.createElement("hr"));
    box.appendChild(additionalBlock);
    menuList.appendChild(box);
  }
});
