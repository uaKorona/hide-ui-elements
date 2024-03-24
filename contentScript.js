// contentScript.js
(function (chrome) {
  const OUTLINE = 'rgb(255, 0, 0) double 2px';

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'activate_extension') {
      activateExtension();
      return;
    }
    if (request.action === 'deactivate_extension') {
      inactivateExtension();
      return;
    }

    console.log('Opps! Unknown action:', request.action);
  });

  function isTargetNotElement(element) {
    return !(element instanceof Element);
  }

  function getOutline(element) {
    const computedStyles = window.getComputedStyle(element);
    return computedStyles.getPropertyValue('outline');
  }

  // Function to handle click events on the page
  function handleClick(event) {
    // Prevent the default behavior of the event
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    // Get the target element that was clicked
    const targetElement = event.target;

    if (isTargetNotElement(targetElement)) {
      return;
    }

    // You can do whatever you want with the target element here
    targetElement.style.display = 'none';
  }

  // Add event listener for mouseenter event
  function mouseenterHandler(event) {
    const elementToHighlight = event.target;

    if (isTargetNotElement(elementToHighlight)) {
      return;
    }

    // Check if the element already has a outline
    const existingOutline = getOutline(elementToHighlight);

    // If the element doesn't have a outline or it's not red, add a red outline
    if (!existingOutline || existingOutline !== OUTLINE) {
      // Save the existing outline
      elementToHighlight.dataset.existingOutline = existingOutline;

      // Add the red outline
      elementToHighlight.style.outline = OUTLINE;
    }
  }

  function mouseleaveHandler(event) {
    const elementToHighlight = event.target;

    if (isTargetNotElement(elementToHighlight)) {
      return;
    }

    const existingOutline = getOutline(elementToHighlight);
    const savedOutline = elementToHighlight.dataset?.existingOutline;

    if (existingOutline === OUTLINE) {
      // Remove outline was set  by the our extension
      elementToHighlight.style.outline = savedOutline ?? 'none';
    }
  }

  function activateExtension() {
    document.addEventListener('click', handleClick);
    document.addEventListener('mouseover', mouseenterHandler);
    document.addEventListener('mouseout', mouseleaveHandler);
  }

  function inactivateExtension() {
    document.removeEventListener('click', handleClick);
    document.removeEventListener('mouseover', mouseenterHandler);
    document.removeEventListener('mouseout', mouseleaveHandler);
  }
})(chrome);
