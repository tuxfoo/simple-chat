# simple-chat
A simple chat overlay for nodecg

simple-chat on its own is just for rendering chat and configuring it's appearance, you need to connect it to a chat service for which ever streaming service you are using, the best option to create another bundle that connects to this one.

Currently there is a connector for the following streaming services.
* Odysee https://github.com/tuxfoo/odysee-simple-alerts-connector

# simple-chat has a rest API
We can use extra to assign a unique CSS class to a message and assign a secondary message.
The secondary message can be used to do things like show moderator badges, show tips of LBC on Odysee or bits on Twitch.

### curl
```
curl -X POST -H "Content-Type:application/json" http://localhost:9090/simple-chat/log -d '{"name":"@phil", "message":"Hi", "extra": {"class": "tipmsg", "message": "Tipped 10 LBC"}}' &&
curl -X POST -H "Content-Type:application/json" http://localhost:9090/simple-chat/log -d '{"name":"@bob", "message":"that is cool", "extra": {"class": "message-wrap", "message": ""}}' &&
curl -X POST -H "Content-Type:application/json" http://localhost:9090/simple-chat/log -d '{"name":"@phil", "message":"I am good, thankyou", "extra": {"class": "message-wrap", "message": ""}}' &&
curl -X POST -H "Content-Type:application/json" http://localhost:9090/simple-chat/log -d '{"name":"@someone", "message":"TEST TEST TEST", "extra": {"class": "message-wrap", "message": ""}}'
```

### Preload chat history

simple-chat has an array for storing chat history (not persistent) so that chat can be preloaded. You can add a message to history using the rest api.

```
curl -X POST -H "Content-Type:application/json" http://localhost:9090/simple-chat/history -d '{"name":"@someone", "message":"TEST TEST TEST", "extra": {"class": "message-wrap", "message": ""}}'
```
## Preview of chat in action on right of stream.
![preview 1](https://github.com/tuxfoo/simple-chat/blob/main/preview.jpg?raw=true)
