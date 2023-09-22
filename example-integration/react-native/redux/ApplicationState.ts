import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { State } from "./index";

export type ApplicationState = {
	counter: number,
};

export const INITIAL_STATE: ApplicationState = {
	counter: 0,
};

const applicationStateSlice = createSlice({
	name: "ApplicationState",
	initialState: INITIAL_STATE,
	reducers: {
		incrementCounter: (state) => {
			state.counter++;
		},
		decrementCounter: (state) => {
			state.counter--;
		},
		setCounter: (state, { payload }: PayloadAction<number>) => {
			state.counter = payload;
		}
	}
});

export const { incrementCounter, decrementCounter, setCounter } = applicationStateSlice.actions;
export const ApplicationStateActions = applicationStateSlice.actions;
export default applicationStateSlice.reducer;

// Selector

// Hooks

export const useCount = () => useSelector<State>((state) => state.ApplicationState.counter) as number;

