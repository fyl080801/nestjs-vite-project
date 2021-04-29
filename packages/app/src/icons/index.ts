import { App } from 'vue';
import SvgIcon from '../components/SvgIcon/index.vue'; // svg component

export const useSvgIcon = (app: App<Element>) => {
  app.component('svg-icon', SvgIcon);
};

const req = import.meta.globEager('./svg/**/*.svg');

const requireAll = (requireContext) =>
  Object.keys(requireContext).map(requireContext);

requireAll(req);
