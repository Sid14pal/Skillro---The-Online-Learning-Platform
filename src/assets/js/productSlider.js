function productScroll() {
  let slider = document.getElementById("slider");
  let next = document.getElementsByClassName("pro-next");
  let prev = document.getElementsByClassName("pro-prev");
  let slide = document.getElementById("slide");

  let position = 0; // Current slider position
  let autoScrollInterval; // For auto-scrolling

  // Start auto-scroll
  function startAutoScroll() {
    stopAutoScroll(); // Clear any previous intervals
    autoScrollInterval = setInterval(() => {
      if (position < hiddenItems()) {
        position++;
      } else {
        position = 0; // Reset position for seamless loop
      }
      translateY(position);
    }, 5000); // Scroll every 5 seconds
  }

  // Stop auto-scroll
  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Handle manual controls
  for (let i = 0; i < next.length; i++) {
    prev[i].addEventListener("click", function () {
      stopAutoScroll(); // Stop auto-scroll when manually controlling
      if (position > 0) {
        position -= 1; // Move up
        translateY(position);
      }
      startAutoScroll(); // Restart auto-scroll after manual control
    });

    next[i].addEventListener("click", function () {
      stopAutoScroll(); // Stop auto-scroll when manually controlling
      if (position >= 0 && position < hiddenItems()) {
        position += 1; // Move down
        translateY(position);
      }
      startAutoScroll(); // Restart auto-scroll after manual control
    });
  }

  function hiddenItems() {
    // Calculate the number of hidden items
    let items = getCount(slide, false);
    let visibleItems = slider.offsetHeight / 250; // Adjust for item height
    return items - Math.ceil(visibleItems);
  }

  function translateY(position) {
    // Move items vertically
    slide.style.top = position * -250 + "px";
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

  // Start auto-scroll on initialization
  startAutoScroll();

  // Pause auto-scroll on hover and resume on mouse leave
  slider.addEventListener("mouseenter", stopAutoScroll);
  slider.addEventListener("mouseleave", startAutoScroll);
}
