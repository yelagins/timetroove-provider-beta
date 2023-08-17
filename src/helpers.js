const controllers = require("./controllers");

const addSpaceBeforeUppercase = (str) => {
	return str.replace(/([A-Z])/g, " $1");
};

export const getControllersNames = () => {
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

	return await controller.getData();
};

export const defaultState = {
	categories: [
		"2023-08-03",
		"2023-08-04",
		"2023-08-05",
		"2023-08-06",
		"2023-08-07",
		"2023-08-08",
		"2023-08-09",
		"2023-08-10",
		"2023-08-11",
		"2023-08-12",
		"2023-08-13",
		"2023-08-14",
		"2023-08-15",
		"2023-08-16",
	],
	series: [1, 1, 1, 1, 1, 2, 1, 5, 1, 2, 1, 1, 1, 1],
};

export const safeGet = async (path) => {
	try {
		const response = await fetch(path);

		if (!response.ok) {
			return {
				error: "[GET] " + response.statusText,
			};
		}

		return await response.json();
	} catch (error) {
		return {
			error: "[GET] " + error.message,
		};
	}
};

export const timestampToDate = (date, inverted = false) => {
	// TO DO: returns user timezone
	var date1 = new Date(date);
	date1.setDate(date1.getDate());

	const month = ("0" + (date1.getMonth() + 1)).slice(-2);
	const day = ("0" + date1.getDate()).slice(-2);

	if (inverted) return `${day}-${month}-${date1.getFullYear()}`;

	return `${date1.getFullYear()}-${month}-${day}`;
};