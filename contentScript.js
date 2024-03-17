// contentScript.js

const BORDER = '1px solid rgb(255, 0, 0)';

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'activate_extension') {
    // Your function goes here. For example, you can add the event listener:
    document.addEventListener('mouseover', mouseenterHandler);
  }
});

// Function to handle click events on the page
function handleClick(event) {
  // Prevent the default behavior of the event
  event.preventDefault();

  // Get the target element that was clicked
  const targetElement = event.target;

  // You can do whatever you want with the target element here
  console.log('You clicked on:', targetElement);
}

function handleHover(event) {
  // Prevent the default behavior of the event
  event.preventDefault();

  // Get the target element that was clicked
  const targetElement = event.target;

  // Add a border to the target element
  targetElement.style.border = BORDER;

  // You can do whatever you want with the target element here
  console.log('You hovered on:', targetElement);
}

// Add event listener for mouseenter event
function mouseenterHandler(event) {
  const elementToHighlight = event.target;

  if (!(elementToHighlight instanceof Element)) {
    console.log('Not an element', elementToHighlight);
    return;
  }

  // Check if the element already has a border
  const computedStyles = window.getComputedStyle(elementToHighlight);
  const existingBorder = computedStyles.getPropertyValue('border');

  // If the element doesn't have a border or it's not red, add a red border
  if (!existingBorder || existingBorder !== BORDER) {
    // Save the existing border
    elementToHighlight.dataset.existingBorder = existingBorder;

    // Add the red border
    elementToHighlight.style.border = BORDER;
    elementToHighlight.style.boxSizing = 'border-box';
  }
}

// Add event listener for mouseleave event
function mouseleaveHandler(event) {
  const elementToHighlight = event.target;

  if (!(elementToHighlight instanceof Element)) {
    console.log('Not an element', elementToHighlight);
    return;
  }

  const computedStyles = window.getComputedStyle(elementToHighlight);
  const existingBorder = computedStyles.getPropertyValue('border');
  const savedBorder = elementToHighlight.dataset?.existingBorder;

  if (existingBorder === BORDER) {
    elementToHighlight.style.border = savedBorder ?? 'none';
  }
  // Remove the dynamically added red border
  //elementToHighlight.style.border = 'none';
}

// Add an event listener to the document to listen for click events
document.addEventListener('click', handleClick);

document.addEventListener('mouseover', mouseenterHandler);
document.addEventListener('mouseout', mouseleaveHandler);
