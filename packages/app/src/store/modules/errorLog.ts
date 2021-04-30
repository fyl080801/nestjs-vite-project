import { reactive, readonly } from 'vue';

interface IErrorLog {
  err: Error;
  vm: any;
  info: string;
  url: string;
}

export interface IErrorLogState {
  logs: IErrorLog[];
}

const addErrorLog = (state: IErrorLogState) => (log: IErrorLog) => {
  state.logs.push(log);
};

const clearErrorLog = (state: IErrorLogState) => () => {
  state.logs.splice(0);
};

const createState = (): IErrorLogState => {
  return reactive({ logs: [] });
};

const createActions = (state: IErrorLogState) => {
  return {
    addErrorLog: addErrorLog(state),
    clearErrorLog: clearErrorLog(state),
  };
};

const state = createState();
const actions = createActions(state);

export const useErrorLogStore = () => {
  return readonly({ state, ...actions });
};
