import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {State} from './index';

export type ViewType = {view: 'list' | 'detail' | 'dependent'; icon: string};

export const VIEWS: ViewType[] = [
  {view: 'list', icon: 'format-list-bulleted'},
  {view: 'detail', icon: 'home'},
  {view: 'dependent', icon: 'link-variant'},
];

export type Meteorites = Meteorite[];

export type Meteorite = {
  name: string;
  id: string;
  nametype: Nametype;
  recclass: string;
  mass?: string;
  fall: Fall;
  year?: Date;
  reclat?: string;
  reclong?: string;
  geolocation?: Geolocation;
  ':@computed_region_cbhk_fwbd'?: string;
  ':@computed_region_nnqa_25f4'?: string;
};

export enum Fall {
  Fell = 'Fell',
  Found = 'Found',
}

export type Geolocation = {
  type: Type;
  coordinates: number[];
};

export enum Type {
  Point = 'Point',
}

export enum Nametype {
  Valid = 'Valid',
}

const LARGE_DATA: Meteorites = require('./meteorites.json');

export type ApplicationState = {
  counter: number;
  largeData: Meteorites[];
};

export const INITIAL_STATE: ApplicationState = {
  counter: 0,
  largeData: [LARGE_DATA],
};

const applicationStateSlice = createSlice({
  name: 'ApplicationState',
  initialState: INITIAL_STATE,
  reducers: {
    incrementCounter: state => {
      state.counter++;
    },
    decrementCounter: state => {
      state.counter--;
    },
    setCounter: (state, {payload}: PayloadAction<number>) => {
      state.counter = payload;
    },
    appendLargeData: state => {
      state.largeData.push({...LARGE_DATA});
    },
    applyNestedChange: ({largeData}) => {
      if (largeData.length === 0) return;
      for (let i = 0; i < largeData.length; i++) {
        const data = largeData[i];
        const randomIndex = Math.floor(Math.random() * largeData.length);
        data[randomIndex].name += ' - edited';
        data[randomIndex].year = new Date();
        data[randomIndex].fall = Fall.Found;
      }
    },
    removeLargeData: state => {
      state.largeData = [];
    },
  },
});

export const {
  incrementCounter,
  decrementCounter,
  setCounter,
  appendLargeData,
  removeLargeData,
  applyNestedChange,
} = applicationStateSlice.actions;
export const ApplicationStateActions = applicationStateSlice.actions;
export default applicationStateSlice.reducer;

// Selector

// Hooks

export const useCount = () =>
  useSelector<State>(state => state.ApplicationState.counter) as number;
