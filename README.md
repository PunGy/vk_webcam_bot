# outbot
This is VK bot for sending messages and webcam capture and video. It's used by two people, `host` run this app on the computer, and `reciver` send requests
via bot and recieve results

## How to build

### Typescript
First of all, use **yarn install** for fetching dependencies

For building typescript just type **yarn build** or **yarn watch**

### C++
Go to *project_root/module/webcam_capture/* and run **make capture** for webcam screenshot, and **make video** for webcam video recording(**this requires opencv library!**)
#### Recieving webcam screenshot works only on linux

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

## ENV file
For working, it also should have the .env file

The example is:
```
API_URL=api.vk.com
SECRET_KEY=111 # group secret key
HOST_SECRET_KEY=111 # secret key of host. Required for saving video
API_VERSION=5.103 # Vk api version
GROUP_ID=111 # id of vk group where bot is locating
RECIVER_ID=111 # vk id of reciever
HOST_ID=111 # vk id of host
MODE=production # could be development or production
```
