// ==UserScript==
// @name         DKB Timestamp Viewer
// @namespace    https://github.com/sczech
// @version      0.1
// @description  Shows DKB transaction timestamps in Web UI (booking date)
// @author       Simon Czech
// @match        https://banking.beta.dkb.de/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==

/* globals jQuery, $, waitForKeyElements */

//observe for url changes
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
  }
}).observe(document, {subtree: true, childList: true});

//when URL changes do...
function onUrlChange() {
    $(document).ready(function() {
        //Check if we are on a account transaction page
        const url_regex = new RegExp("https://banking.beta.dkb.de/account/(.+)/trx/(.+)");
        if (url_regex.test(location.href)) {
            //define RegEx to filter timestamp from URL
            const time_regex = new RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{2}");
            //retreive timestamp from url and make it more readable (replace dots with colons)
            let time = location.href.match(time_regex)[0].replaceAll('.', ':');
            //get already existing date information from div
            let date = document.getElementById("main-container").children.item(0).children.item(1).children.item(0).children.item(0).children.item(0).children.item(0).children.item(1).children.item(0).children.item(0).children.item(0).children.item(1).innerHTML;
            //make a new string from website data and newly retreived timestamp
            let datetime = date + " " + time;

            //write new string to div
            document.getElementById("main-container").children.item(0).children.item(1).children.item(0).children.item(0).children.item(0).children.item(0).children.item(1).children.item(0).children.item(0).children.item(0).children.item(1).innerHTML = datetime;
        }

    })
}
