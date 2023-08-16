const controllers = require("./controllers");

const addSpaceBeforeUppercase = (str) => {
	return str.replace(/([A-Z])/g, " $1");
};

const getControllersNames = () => {
	let files = Object.keys(controllers);

	return files.map((item) => {
		return addSpaceBeforeUppercase(item.replace(".js", "")).substr(1);
	});
};

const promptToName = (inputString) => {
	const words = inputString.split(" ");
	const camelCasedWords = words.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});

	return camelCasedWords.join("");
};

export const promptToNames = (prompt) => {
	if (typeof prompt !== "string") return [];

	let names = getControllersNames();

	if (prompt) {
		names = names.filter(
			(item) => item.toLowerCase().indexOf(prompt) !== -1
		);
	}

	return names.map((text) => {
		return {
			text,
		};
	});
};

export const promptToData = async (prompt) => {
	const controllerName = promptToName(prompt);
	const controller = controllers[controllerName];

	if (!controller) {
		return {
			error: "data not found",
		};
	}

    return await controller();
};
