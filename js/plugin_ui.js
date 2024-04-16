var colors = {
    "-1":"#3a6ad6",
    "0":"#ffeb3c",
    "1":"#ff8b66"
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

        // Check if the result is an object before proceeding
        if (typeof result !== 'object') {
            console.error("Invalid result data type:xx", typeof result);
            return;
        }

        for (var key in result) {
            if (result.hasOwnProperty(key)) {
                var newFeature = document.createElement("li");
                newFeature.textContent = key;
                newFeature.style.backgroundColor = colors[result[key]] || '#ffffff'; // Default to white if color not found
                featureList.appendChild(newFeature);
            }
        }
    });
});
