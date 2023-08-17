const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const controllers = require("./controllers");
const { promptToNames, promptToData, getContr, getControllersNames } = require("./helpers");

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

    const names = Object.keys(controllers);
    for (const controller of names) {
        console.log("\x1b[36m%s\x1b[0m", `[ RUN CONTROLLER ]`, controller);
        try {
            controllers[controller].run(controller);
        } catch (error) {
            console.log("\x1b[41m%s\x1b[0m", `[ RUN CONTROLLER ERROR ]`, error.message);
        }
    }
});
