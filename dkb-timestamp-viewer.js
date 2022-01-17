// ==UserScript==
// @name         DKB Timestamp Viewer
// @namespace    https://github.com/sczech
// @version      0.3
// @description  Shows DKB transaction timestamps in Web UI
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
function onUrlChange()
{
    $(document).ready(function()
    {
        //Check if we are on a account transaction page
        const url_regex_detail = new RegExp("^https://banking.beta.dkb.de/account/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/trx/(.+)");
        if (url_regex_detail.test(location.href))
        {
            //define RegEx to filter timestamp from URL
            const time_regex = new RegExp("[0-9]{2}[.][0-9]{2}[.][0-9]{2}");
            //retreive timestamp from url and make it more readable (replace dots with colons)
            let time = location.href.match(time_regex)[0].replaceAll('.', ':');
            //define booking date div
            const booking_date_div = document.getElementById("main-container").children.item(0).children.item(1).children.item(0).children.item(0).children.item(0).children.item(0).children.item(1).children.item(0).children.item(0).children.item(1).children.item(1)
            //get already existing date information from div
            let date = booking_date_div.innerHTML;
            //make a new string from website data and newly retreived timestamp
            let datetime = date + " " + time;

            //write new string to div
            booking_date_div.innerHTML = datetime;
        }

        //Check if we are on the account transaction overview page
        const url_regex_overview = new RegExp("^https://banking.beta.dkb.de/account/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$");
        if (url_regex_overview.test(location.href))
        {
            //map tx list to var
            const transaction_list = document.getElementById("main-container").children.item(0).children.item(2).children.item(2).children.item(1).children.item(1)

            //iterate through tx list
            for (let tx_section of transaction_list.children)
            {
                for (let tx_div of tx_section.children)
                {
                    //make sure headers stay untouched
                    if (tx_div.tagName != "HEADER")
                    {
                        //define needed vars
                        const tx_href = tx_div.children.item(0).href;
                        const tx_subtitle = tx_div.children.item(0).children.item(0).children.item(0).children.item(1).children.item(0).children.item(1).children.item(0);

                        //define RegEx to filter timestamp from URL
                        const time_regex = new RegExp("[0-9]{4}[-][0-9]{2}[-][0-9]{2}[-][0-9]{2}[.][0-9]{2}[.][0-9]{2}");
                        //retreive timestamp from url and make it an array
                        let time = tx_href.match(time_regex)[0].replaceAll('.', '-');
                        let time_array = time.split("-");

                        //split the subtitle string into an array to edit it
                        let tx_subtitle_array = tx_subtitle.innerHTML.split("•");

                        if (tx_subtitle_array[0] === "Vorgemerkt")
                        {
                            const tx_subtitle_pending = tx_div.children.item(0).children.item(0).children.item(0).children.item(1).children.item(0).children.item(1).children.item(1).children.item(0);
                            tx_subtitle_pending.innerHTML = "• " + time_array[2] + "." + time_array[1] + "." + time_array[0].slice(2) + " " + time_array[3] + ":" + time_array[4] + " ";
                        }
                        else
                        {
                            //add the time to the first part of the text
                            tx_subtitle_array[0] = time_array[2] + "." + time_array[1] + "." + time_array[0].slice(2) + " " + time_array[3] + ":" + time_array[4] + " ";
                            //join the text back together to a string and assign the value
                            tx_subtitle.innerHTML = tx_subtitle_array.join("•");
                        }

                    }
                }
            }
        }
    })
}
