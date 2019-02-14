

const facebook_domains = [
  "facebook.com", "www.facebook.com", "fb.com", "fbcdn.net", "fbsbx.com",
  "instagram.com", "www.instagram.com",
  "messenger.com", "www.messenger.com",
  "whatsapp.com", "www.whatsapp.com", "web.whatsapp.com", "cdn.whatsapp.net", "www-cdn.whatsapp.net",
  "atdmt.com",
  "onavo.com"
];

function isFacebookDomain(url) {
  hostname = new url(url).hostname;

  if (url.hostname === facebook_domains) {
    console.log("Donot Block:" + url);
    return true;
  } else if (url.hostname === new regex (/(^|[.])facebook.com/.test("b.facebook.com"))){ 
    console.log("Donot Block:" + url);
    return true;
  } else {
    console.log("Block:" + url);
    return false;
  }
}

async function blockRequestHandler () {
  tabUrl = await browser.tabs.get(webRequest.tabid).url; //stuck here 
  if (isFacebookDomain(tabUrl) || !isFacebookDomain(webRequest.url)){
    return {};
  }
  return {cancel: true};
}

browser.webRequest.onBeforeRequest.addListener(
  blockRequestHandler,
  {urls: ["<all_urls>"]},
  ["blocking"]
);
