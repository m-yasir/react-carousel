import { useEffect } from "react";

/**
 * @description Log for react states.
 */
function useLog<T>(state: T, key?: string) {
	useEffect(() => {
		console.log("STATE UPDATED:");
		console.log({ [key ?? "state"]: state });
	}, [state, key]);
}

export default useLog;
