import { defaultState } from "../helpers";

let state = {};

export default {
	run: async (controller) => {
        state = defaultState;
	},

	getData: async () => {
		return state;
	},
};
