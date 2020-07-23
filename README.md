# outbot
This is VK bot for sending messages and webcam capture and video. It's used by two people, and 

## How to build

### Typescript
First of all, use **yarn install** for fetching dependencies

For building typescript just type **yarn build** or **yarn watch**

### C++
Go to *project_root/module/webcam_capture/* and run **make capture** for webcam screenshot, and **make video** for webcam video recording(**this requires opencv library!**)

## How to run
First of all, bot will not work without real variables in .env

This bot used longpoll API, so you may try to setup https://vk.com/dev/bots_longpoll.

Variables for working example:
* **GROUP_ID** - id of chat bot group
* **RECIVER_ID** - Reciever id
* **HOST_ID** - Sender id (who run chatbot with webcam)
* **SECRET_KEY** - Group secret key
* **HOST_SECRET_KEY** - Sender secret key (This is necessary to save the photo before sending)

After setup:

* **yarn serve** - start bot
* **yarn silent_serve** - start bot without notice to the reciever
* **yarn cli** - start cli, which used for sending some responses to sender without using bot
