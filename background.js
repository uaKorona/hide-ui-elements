// background.js

(function (chrome) {
  const TEXT_ON = 'ON';
  const TEXT_OFF = '';
  let isExtActive = false;

  chrome.action.onClicked.addListener((tab) => {
    isExtActive = !isExtActive;

    chrome.action.setBadgeText(
      {
        text: isExtActive ? TEXT_ON : TEXT_OFF,
      },
      () => {}
    );

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
