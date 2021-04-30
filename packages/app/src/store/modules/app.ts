import Cookies from 'js-cookie';
import { reactive, readonly } from 'vue';

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  language?: string;
  size: string;
}

const init: IAppState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus')
      ? !!+Cookies.get('sidebarStatus')
      : true,
    withoutAnimation: false,
  },
  device: DeviceType.Desktop,
  size: Cookies.get('size') || 'medium',
};

const toggleSideBar = (state: IAppState) => () => {
  state.sidebar.opened = !state.sidebar.opened;
  state.sidebar.withoutAnimation = false;
  if (state.sidebar.opened) {
    Cookies.set('sidebarStatus', '1');
  } else {
    Cookies.set('sidebarStatus', '0');
  }
};

const closeSideBar = (state: IAppState) => (withoutAnimation: boolean) => {
  Cookies.set('sidebarStatus', '0');
  state.sidebar.opened = false;
  state.sidebar.withoutAnimation = withoutAnimation;
};

const toggleDevice = (state: IAppState) => (device: DeviceType) => {
  state.device = device;
};

const setSize = (state: IAppState) => (size: string) => {
  state.size = size;
  Cookies.set('size', size);
};

const createState = (): IAppState => {
  return reactive(init);
};

const createActions = (state) => {
  return {
    toggleSideBar: toggleSideBar(state),
    closeSideBar: closeSideBar(state),
    toggleDevice: toggleDevice(state),
    setSize: setSize(state),
  };
};

const state = createState();
const actions = createActions(state);

export const useAppStore = () => {
  return readonly({ state, ...actions });
};
