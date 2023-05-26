<img src="https://cdn.discordapp.com/attachments/142745451207065600/1111578649209090148/image.png" alt="Clip-Castle Banner" />

# Clip-Castle

### Table of contents
- [Clip-Castle](#Clip-Castle)
  - [About](#About)
  - [Technologies](#Technologies)
  - [Current features](#Current-features)
  - [Current focus](#Current-focus)
  - [Setup](#Setup)
    - [Basics](#The-basics)
    - [Firebase](#Setup-Firebase)
    - [Starting](#Starting-the-Project)
    - [Issues](#Issues)
  - [Screenshots](#Screenshots)
    - [Main Page](#Main-Page)
    - [Upload Page](#Upload-Page)
    - [Profile Page](#Profile-Page)

## About 

  Clip Castle is a video sharing platform focused on making it easier to share gaming clips within my friend group. We previously used other sites to upload and share our clips with one another but limitations like filesize, length and resolution made it quite frustrating at time. 
  All of this paired with auto deletion making it almost impossible to look back at older clips made me take things into my own hands. <br/>
  <br/>
  Clip Castle is currently still under development and is likely to stay as a private app unless there is enough public interest to possibly fund potential costs.  

## Technologies

 - NPM 9.6.2
 - Vite 4.2.0
 - React 18.0.28
 - Firebase 9.19.1

## Current features
  - Registration and Login via Email & Password or Google account.
  - Setting of display name and avatar.
  - Ability to upload videos with an easy to use interface with drag and drop capability.
  - Clips can be given a Title, Tags and a category.
  - Users can view clips from other users. 
  - Profile page with basic user info and list of the users clips.

## Current focus
  - Improving modularity and future proofing.
  - Video conversion and compression to safe on storage without losing quality.
  - Evaluating possiblity of public release.

## Setup

### The basics
  1. Clone the project.
  2. run `npm i` to install dependencies.
  3. Open up the `example.env` in the root. 
 
 <br/>

### Setup firebase
To have your own version of this project running locally we will have to do some setup for firebase. 
  1. Create your own firebase project at <a target="_blank" href="https://console.firebase.google.com">console.firebase.google.com<a>
  2. Once you're done creating the project you should see a banner like the one below. 
      <img height=250 src="https://cdn.discordapp.com/attachments/142745451207065600/1111587259196649542/image.png" />
  3. Select the web option to add a new web app to the project.
  4. Provide a name for the app and press register app.</br>
      <img src="https://cdn.discordapp.com/attachments/142745451207065600/1111587364108783667/image.png" />
  5. Now you should see a quick guide on how to add the firebase SDK to your project. Take note of the firebaseConfig object, this holds all the info we need to connect to our newly created app. 
    <img height=800 src="https://cdn.discordapp.com/attachments/142745451207065600/1111586934687535135/image.png" />
  6. Let's open the `example.env` file in the root of our project and set the values from the firebaseConfig to their corresponding variables in the `example.env` file. When we are done with this our `example.env` should looks something like this.
    <img src="https://cdn.discordapp.com/attachments/142745451207065600/1111591126386880624/image.png" /> 
  7. **IMPORTANT:** Make sure to rename the `example.env` file to `.env` otherwise our code won't be able to find and read it.
  
   <br/>
  
  ### Starting the Project
  
  1. Make sure you ran `npm i` 
  2. Run `npm run dev` 
  3. Once the app is up you will see a link in the terminal that brings you to the local address it's running on. 
    <img src="https://cdn.discordapp.com/attachments/142745451207065600/1111596930158579722/image.png" />
  
   <br/>
  
  ### Issues
  If you encontered any issues feel free to open an issue report or send me an e-mail to: <a href="mailto: michaelpope97@gmail.com" />michaelpope97@gmail.com</a>
  
  ## Screenshots
  Note: This app is still under active development, these screenshot reflect the current state and are not indicative of the final product and are subject to change.
  
  ### Main Page
  <img src="https://cdn.discordapp.com/attachments/142745451207065600/1111606906092531732/image.png" />
  
  ### Upload Page 
  <img src="https://cdn.discordapp.com/attachments/142745451207065600/1111606980633706516/image.png" />
  
  ### Profile Page
  <img src="https://cdn.discordapp.com/attachments/142745451207065600/1111607029111455826/image.png" />
