import { store } from '../base';
// import { RouteRecord } from 'vue-router';

export interface ITagView {
  // extends Partial<RouteRecord>
  path: string;
  title?: string;
  meta: any;
  query: any;
  fullPath: string;
}

export interface ITagsViewState {
  visitedViews: ITagView[];
  cachedViews: (string | undefined)[];
}

const addView = (state: ITagsViewState) => (view) => {
  addVisitedView(state)(view);
  addCachedView(state)(view);
};
const addVisitedView = (state: ITagsViewState) => (view) => {
  if (state.visitedViews.some((v) => v.path === view.path)) return;

  state.visitedViews.push(
    Object.assign({}, view, {
      title: view.meta.title || 'no-name',
    }),
  );
};
const addCachedView = (state: ITagsViewState) => (view) => {
  if (state.cachedViews.includes(view.name)) return;

  if (!view.meta.noCache) {
    state.cachedViews.push(view.name);
  }
};

const delView = (state: ITagsViewState) => (view) => {
  return new Promise((resolve) => {
    delVisitedView(state)(view);
    delCachedView(state)(view);
    resolve({
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews],
    });
  });
};
const delVisitedView = (state: ITagsViewState) => (view) => {
  return new Promise((resolve) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
    resolve([...state.visitedViews]);
  });
};
const delCachedView = (state: ITagsViewState) => (view) => {
  return new Promise((resolve) => {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
    resolve([...state.cachedViews]);
  });
};

const delOthersViews = (state: ITagsViewState) => (view) => {
  return new Promise((resolve) => {
    delOthersVisitedViews(state)(view);
    delOthersCachedViews(state)(view);
    resolve({
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews],
    });
  });
};
const delOthersVisitedViews = (state: ITagsViewState) => (view) => {
  return new Promise((resolve) => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path;
    });
    resolve([...state.visitedViews]);
  });
};
const delOthersCachedViews = (state: ITagsViewState) => (view) => {
  return new Promise((resolve) => {
    const index = state.cachedViews.indexOf(view.name);
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1);
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = [];
    }
    resolve([...state.cachedViews]);
  });
};

const delAllViews = (state: ITagsViewState) => () => {
  return new Promise((resolve) => {
    delAllVisitedViews(state)();
    delAllCachedViews(state)();
    resolve({
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews],
    });
  });
};
const delAllVisitedViews = (state: ITagsViewState) => () => {
  return new Promise((resolve) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter((tag) => tag.meta.affix);
    state.visitedViews = affixTags;
    resolve([...state.visitedViews]);
  });
};
const delAllCachedViews = (state: ITagsViewState) => () => {
  return new Promise((resolve) => {
    state.cachedViews = [];
    resolve([...state.cachedViews]);
  });
};

const updateVisitedView = (state: ITagsViewState) => (view) => {
  for (let v of state.visitedViews) {
    if (v.path === view.path) {
      v = Object.assign(v, view);
      break;
    }
  }
};

export const useTagsViewStore = store(
  {
    visitedViews: [],
    cachedViews: [],
  },
  (state) => ({
    addView: addView(state),
    addVisitedView: addVisitedView(state),
    addCachedView: addCachedView(state),
    delView: delView(state),
    delVisitedView: delVisitedView(state),
    delCachedView: delCachedView(state),
    delOthersViews: delOthersViews(state),
    delOthersVisitedViews: delOthersVisitedViews(state),
    delOthersCachedViews: delOthersCachedViews(state),
    delAllViews: delAllViews(state),
    delAllVisitedViews: delAllVisitedViews(state),
    delAllCachedViews: delAllCachedViews(state),
    updateVisitedView: updateVisitedView(state),
  }),
);
