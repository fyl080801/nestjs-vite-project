import { store } from '../base';

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

export const useErrorLogStore = store({ logs: [] }, (state) => ({
  addErrorLog: addErrorLog(state),
  clearErrorLog: clearErrorLog(state),
}));
