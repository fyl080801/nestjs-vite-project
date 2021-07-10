import { readonly, reactive } from 'vue';
import { UnwrapNestedRefs } from '@vue/reactivity';

const createState = <TState extends object>(init: TState) => {
  return reactive(init);
};

export const store = <TState extends object, TActions>(
  init: TState,
  factory: (state: UnwrapNestedRefs<TState>) => TActions,
) => {
  const state = createState(init);

  return () => readonly({ state, ...factory(state) });
};
