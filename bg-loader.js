var results = {};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    results[sender.tab.id]=request;
    chrome.storage.local.set({'results': results});
    sendResponse({received: "result"});
  });