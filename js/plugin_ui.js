var colors = {
    "-1":"#3a6ad6",
    "0":"#FFAA01",
    "1":"#ff0101"
};
var featureList = document.getElementById("features");

chrome.tabs.query({ currentWindow: true, active: true }, function(tabs){
    chrome.storage.local.get(['results'], function(items) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            return;
        }

        var result = items.results ? items.results[tabs[0].id] : undefined;
        if (!result) {
            console.error("Results for current tab not found.");
            return;
        }
        if (typeof result !== 'object') {
            console.error("Invalid result data type:xx", typeof result);
            return;
        }

        for (var key in result) {
            if (result.hasOwnProperty(key)) {
                var newFeature = document.createElement("li");
                newFeature.textContent = key;
                newFeature.style.backgroundColor = colors[result[key]] || '#ffffff';
                featureList.appendChild(newFeature);
            }
        }
    });
});
