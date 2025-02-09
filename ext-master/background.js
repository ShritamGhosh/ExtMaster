chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url && tab.url.includes("youtube.com")) {
      chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        func: () => {
          if (document.visibilityState === "visible") {
            document.querySelector("video")?.play();
          }
        }
      });
    }
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com") && changeInfo.status === "complete") {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          document.addEventListener("visibilitychange", () => {
            const video = document.querySelector("video");
            if (document.visibilityState === "hidden") {
              video?.pause();
            } else if (document.visibilityState === "visible") {
              video?.play();
            }
          });
        }
      });
    }
  });
  