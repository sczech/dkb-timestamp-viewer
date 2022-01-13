# DKB Timestamp Viewer
Display full timestamps of booking dates in the new DKB online banking (Overview page: HH:MM / Detail Page: HH:MM:SS).

## Installation instructions
1. Download the Tampermonkey Extension for Chrome or Firefox
2. In the Tampermonkey Extension click on the "+" button to create a new user script
3. Paste the content of dkb-timestamp-viewer.js into the Tampermonkey UserScript window and save it
4. Open https://banking.beta.dkb.de/login and login with your banking credentials. You should now be able to see the exact time of your transactions.

Note: The Script only works for current accounts & savings accounts - not for Visa Credit accounts.

**Disclaimer: This is just a quick and dirty implementation and there are probably better ways to do this. Feel free to send me a pull request if you want to contribute!**

## Screenshots

This is how the web banking normally looks:

![Screenshot 2022-01-13 171340](https://user-images.githubusercontent.com/25418360/149367576-bc71833b-4ef0-4264-8e36-e24d3dc79ecf.png)
![Screenshot 2022-01-13 171952](https://user-images.githubusercontent.com/25418360/149368569-985f33a2-238f-4c58-b47e-5f327ce1f1d1.png)


And this is how it looks with the Script running:

![Screenshot 2022-01-13 170035](https://user-images.githubusercontent.com/25418360/149367613-17b62464-c10e-45e1-bac3-ec7c76cc6f67.png)
![Screenshot 2022-01-13 172042](https://user-images.githubusercontent.com/25418360/149368610-1e91b35a-ef4c-4b7e-9bcb-333edf9afebb.png)
