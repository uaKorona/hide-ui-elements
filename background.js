chrome.action.onClicked.addListener(function (tab) {
  // Your function goes here. For example, you can send a message to the content script:
  chrome.tabs.sendMessage(tab.id, { action: 'activate_extension' });
});
