const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { promptToNames, promptToData } = require("./helpers");

const app = express();
const port = 3002;

app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/getOptions", async (request, response) => {
	console.log("\x1b[33m%s\x1b[0m", `[ GET OPTIONS ]`, request.body);

	response.send(promptToNames(request.body.prompt));
	return;
});

app.post("/getData", async (request, response) => {
	console.log("\x1b[35m%s\x1b[0m", `[ GET DATA ]`, request.body);

	response.send(await promptToData(request.body.prompt));
	return;
});

app.listen(port, (err) => {
	if (err) {
		console.log("\x1b[41m%s\x1b[0m", `[ ERROR ]`, "something bad happened");
		return;
	}
	console.log("\x1b[32m%s\x1b[0m", `[ SERVER STARTED ]`, `on ${port} port`);
});
