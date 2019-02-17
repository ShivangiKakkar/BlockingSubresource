const facebook_domains = [
  "facebook.com", "www.facebook.com", "fb.com", "fbcdn.net", "fbsbx.com",
  "instagram.com", "www.instagram.com",
  "messenger.com", "www.messenger.com",
  "whatsapp.com", "www.whatsapp.com", "web.whatsapp.com", "cdn.whatsapp.net", "www-cdn.whatsapp.net",
  "atdmt.com",
  "onavo.com"
];

function isFacebookDomain(url) {
  hostname = new URL(url).hostname;
  for (let facebookDomain of facebook_domains) {
    if(facebookDomain.includes(hostname) || (url.hostname === facebookDomain || url.hostname === new RegExp (`^(.*\\.)?${facebookDomain}$`).test(hostname.host))) {
      return true;
    } else{
      return false;
    }
  }
}

async function blockRequestHandler (webRequest) {
  console.log(webRequest);
  const tab = await browser.tabs.get(webRequest.tabId);
  tabUrl = tab.url; 
  if (isFacebookDomain(tabUrl) || !isFacebookDomain(webRequest.url)){
    return {};
  }
  return {cancel: true};
}

browser.webRequest.onBeforeRequest.addListener(
  blockRequestHandler,
  {urls: ["<all_urls>"]},
  ["blocking"]);
