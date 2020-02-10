# London Tube Status Bot
A simple bot which checks London tube statuses and sends messages to Telegram if distruption starts on a given line at certain times.

## Required environment variables
* TELEGRAM_BOT_KEY
* TELEGRAM_CHAT_ID
* TUBE_LINES - comma delimited list of lines to check (i.e. bakerloo,jubilee)

## How it works
The bot will constantly poll tfl api (once per minute) and look at the line statues, if it spots disruption it will work out if it needs to send that disruption to Telegram based on the rules (lines, times).

It will then store the line statuses and whether it sent the Telegram notification, thus this will also be checked to see if it needs to send it in the first place (because it doesn't want to keep sending a disruption message every minute).

Basically this stored data is what status the bot has most recently sent, thus if the API returns different then the bot will fire.
