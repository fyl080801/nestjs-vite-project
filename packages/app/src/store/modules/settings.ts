import variables from '../../styles/element-variables.scss';
import defaultSettings from '../../settings';
import { store } from '../base';

export interface ISettingsState {
  theme: string;
  fixedHeader: boolean;
  showSettings: boolean;
  showTagsView: boolean;
  showSidebarLogo: boolean;
  sidebarTextTheme: boolean;
}

const changeSetting =
  (state: ISettingsState) => (key: string, value: string | boolean) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  };

export const useSettingsStore = store(
  {
    fixedHeader: defaultSettings.fixedHeader,
    showSettings: defaultSettings.showSettings,
    showSidebarLogo: defaultSettings.showSidebarLogo,
    showTagsView: defaultSettings.showTagsView,
    sidebarTextTheme: defaultSettings.sidebarTextTheme,
    theme: variables.theme,
  },
  (state) => ({ changeSetting: changeSetting(state) }),
);
