import { reactive, readonly } from 'vue';
import { asyncRoutes, constantRoutes } from '../../router';

export interface IPermissionState {
  routes: any[];
  dynamicRoutes: any[];
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach((route) => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const generateRoutes = (state: IPermissionState) => (roles: any[]) => {
  let accessedRoutes: any[];
  if (roles.includes('admin')) {
    accessedRoutes = asyncRoutes || [];
  } else {
    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
  }
  state.dynamicRoutes = accessedRoutes as any;
  state.routes = constantRoutes.concat(accessedRoutes) as any;

  return accessedRoutes;
};

const createState = (): IPermissionState => {
  return reactive({
    routes: [],
    dynamicRoutes: [],
  });
};

const createActions = (state: IPermissionState) => {
  return {
    generateRoutes: generateRoutes(state),
  };
};

const state = createState();
const actions = createActions(state);

export const usePermissionStore = () => {
  return readonly({ state, ...actions });
};
