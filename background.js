// background.js

(function (chrome) {
  let isExtActive = false;

  chrome.action.onClicked.addListener((tab) => {
    isExtActive = !isExtActive;

    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ['contentScript.js'],
      },
      () => {
        chrome.tabs.sendMessage(tab.id, {
          action: isExtActive ? 'activate_extension' : 'deactivate_extension',
        });
      }
    );
  });
})(chrome);
