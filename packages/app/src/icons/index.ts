import { App } from 'vue';
import SvgIcon from '../components/SvgIcon/index.vue'; // svg component

export const useSvgIcon = (app: App<Element>) => {
  app.component('svg-icon', SvgIcon);
};

const req = import.meta.glob('./svg/**/*.svg');

const requireAll = (requireContext: { [key: string]: any }) => {
  return Object.keys(requireContext).map((key) => requireContext[key]());
};

requireAll(req);
