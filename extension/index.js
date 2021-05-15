'use strict';

module.exports = function (nodecg) {
	nodecg.Replicant('message', { defaultValue: {name: "", message: "", extra: {class: "", message: ""}}, persistent: false  });
	nodecg.Replicant('chatHistory', { defaultValue: [], persistent: false  });
	nodecg.Replicant('settings', { defaultValue: {
		theme: "boxed",
		font: "Arial, sans-serif",
		nameColour: "white",
		messageColour: "white",
		customCSS: "",
		fontSize: "24px",
		nameBackColour: "rgba(0,0,0,0.85)",
		messageBackColour: "rgba(0,0,0,0.7)",
		extraBackColour: "rgba(68, 44, 6, 0.8)",
		extraTextColour: "rgba(0,0,0,0.7)"
		}
	});

	nodecg.Replicant('test', { defaultValue: {name: "@MrTester", class: "message-wrap", message: "", change: false}, persistent: false});
	const router = nodecg.Router();
	const message = nodecg.Replicant('message');
	const chatHistory = nodecg.Replicant('chatHistory');

	chatHistory.on('change', v => {
		//Do not store really old messages
		if (chatHistory.value.length - 1 > 20 ) {
			var purge = chatHistory.value.length - 21;
			chatHistory.value.splice(0, purge);
		}
	});

	router.post('/log', (req, res) => {
			const name = req.body.name;
			const msg = req.body.message;
			const extra = req.body.extra;
			res.send("chat message will be added to log.");
			addMessage(name, msg, extra);
	});

	router.post('/history', (req, res) => {
		//req.body.forEach();
			const name = req.body.name;
			const msg = req.body.message;
			const extra = req.body.extra;
			res.send("Added message to chat history");
			chatHistory.value.push({name: name, message: msg, extra: extra});
	});

	nodecg.mount('/simple-chat', router); // The route '/my-bundle/customroute` is now available

	function addMessage(name, msg, extra) {
		message.value = {name: name, message: msg, extra: extra};
	}
};
