import { useEffect } from "react";

// Simple log for react states
function useLog<T>(state: T, key?: string) {
	useEffect(() => {
		console.log("STATE UPDATED:");
		console.log({ [key ?? "state"]: state });
	}, [state, key]);
}

export default useLog;
