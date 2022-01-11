# DKB Timestamp Viewer
Show full timestamps (hours, minutes, seconds) of booking dates in the new DKB online banking

## Installation instructions
1. Download the Tampermonkey Extension for Chrome or Firefox
2. In the Tampermonkey Extension click on the "+" button to create a new user script
3. Paste the content of dkb-timestamp-viewer.js into the Tampermonkey UserScript window and save it
4. Open https://banking.beta.dkb.de/login and login with your banking credentials. You should now be able to see the exact time of transactions (booking date)

Note: This does only work for current accounts & savings accounts - not for Visa cards.

This is how it normally looks:

![image](https://user-images.githubusercontent.com/25418360/148960418-7e28aecf-4820-4e0f-9a99-a6789ebef7dc.png)

And this is how it looks with the Tampermonkey Script:

![image](https://user-images.githubusercontent.com/25418360/148960216-6c3d96b8-ee76-4b79-aa0c-cb03d7722acc.png)
