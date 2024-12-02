function productScroll() {
  let slider = document.getElementById("slider");
  let next = document.getElementsByClassName("pro-next");
  let prev = document.getElementsByClassName("pro-prev");
  let slide = document.getElementById("slide");

  let position = 0; // Current slider position

  for (let i = 0; i < next.length; i++) {
    prev[i].addEventListener("click", function () {
      if (position > 0) {
        position -= 1; // Move up
        translateY(position); // Apply translation
      }
    });

    next[i].addEventListener("click", function () {
      if (position >= 0 && position < hiddenItems()) {
        position += 1; // Move down
        translateY(position); // Apply translation
      }
    });
  }

  function hiddenItems() {
    // Calculate the number of hidden items
    let items = getCount(slide, false);
    let visibleItems = slider.offsetHeight / 210; // Adjust for item height
    return items - Math.ceil(visibleItems);
  }

  function translateY(position) {
    // Move items vertically
    slide.style.top = position * -210 + "px";
  }

  function getCount(parent, getChildrensChildren) {
    // Count number of items
    let relevantChildren = 0;
    let children = parent.childNodes.length;
    for (let i = 0; i < children; i++) {
      if (parent.childNodes[i].nodeType !== 3) {
        if (getChildrensChildren)
          relevantChildren += getCount(parent.childNodes[i], true);
        relevantChildren++;
      }
    }
    return relevantChildren;
  }
}
