import variables from '../../styles/element-variables.scss';
import defaultSettings from '../../settings';
import { reactive, readonly } from 'vue';

export interface ISettingsState {
  theme: string;
  fixedHeader: boolean;
  showSettings: boolean;
  showTagsView: boolean;
  showSidebarLogo: boolean;
  sidebarTextTheme: boolean;
}

const changeSetting = (state: ISettingsState) => (
  key: string,
  value: string | boolean,
) => {
  if (state.hasOwnProperty(key)) {
    state[key] = value;
  }
};

const createState = (): ISettingsState => {
  return reactive({
    fixedHeader: defaultSettings.fixedHeader,
    showSettings: defaultSettings.showSettings,
    showSidebarLogo: defaultSettings.showSidebarLogo,
    showTagsView: defaultSettings.showTagsView,
    sidebarTextTheme: defaultSettings.sidebarTextTheme,
    theme: variables.theme,
  });
};

const createActions = (state) => {
  return {
    changeSetting: changeSetting(state),
  };
};

const state = createState();
const actions = createActions(state);

export const useSettingsStore = () => {
  return readonly({ state, ...actions });
};
