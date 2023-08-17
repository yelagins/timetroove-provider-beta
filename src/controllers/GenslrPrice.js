import { defaultState, safeGet, timestampToDate } from "../helpers";

let coingecoApi =
	"https://api.coingecko.com/api/v3/coins/good-gensler/market_chart?vs_currency=usd&days=14&interval=daily";
let minute = 1000 * 60;
let state = {};

export default {
	run: async (controller) => {
		state = defaultState;

        // RUN FETCHING every 10 minutes
		while (true) {
			console.log(controller, ": fetch data from coingeco");

			const result = await safeGet(coingecoApi);
			if (result && result.prices) {
				const categories = result.prices.map((item) => {
					return timestampToDate(item[0]);
				});
				const series = result.prices.map((item) => {
					return item[1];
				});
				state = {
					categories,
					series,
				};

                console.log("set state for:", controller, state )
			} else {
				state = defaultState;
			}

			await new Promise((resolve) => setTimeout(resolve, minute * 10)); //wait for 10 minutes
		}
	},

	getData: async () => {
		return state;
	},
};
