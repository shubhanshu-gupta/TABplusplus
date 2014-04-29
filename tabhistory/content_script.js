

chrome.extension.sendRequest({
    request: {
        op: "pageLoadStarted", 
        url: document.location.href, 
        referrer: document.referrer
    }
}); 