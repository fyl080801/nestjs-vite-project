import { logout, getInfo } from '../../api/user';
// import { getToken, setToken, removeToken } from '../../utils/auth';
import router, { resetRouter } from '../../router';
import { useTagsViewStore } from './tagsView';
import { usePermissionStore } from './permission';
import { reactive, readonly } from 'vue';

export interface IUserState {
  // token: string;
  name: string;
  avatar: string;
  introduction: string;
  roles: string[];
  email: string;
}

// const login = (state) => (userInfo) => {
//   const { username, password } = userInfo;
//   return new Promise((resolve, reject) => {
//     // login({ username: username.trim(), password: password })
//     //   .then((response) => {
//     //     const { data } = response;
//     //     commit('SET_TOKEN', data.token);
//     //     setToken(data.token);
//     //     resolve(true);
//     //   })
//     //   .catch((error) => {
//     //     reject(error);
//     //   });
//   });
// };

const { delAllViews } = useTagsViewStore();
const { generateRoutes } = usePermissionStore();

// get user info
const getUserInfo = (state: IUserState) => async () => {
  const { data } = await getInfo();

  if (!data) {
    throw new Error('Verification failed, please Login again.');
  }

  const { roles, name, avatar, introduction } = data;

  // roles must be a non-empty array
  if (!roles || roles.length <= 0) {
    throw new Error('getInfo: roles must be a non-null array!');
  }

  state.roles = roles;
  state.name = name;
  state.avatar = avatar;
  state.introduction = introduction;
  return data;
};

// user logout
const userLogout = (state: IUserState) => async () => {
  await logout();

  // commit('SET_TOKEN', '');
  state.roles = [];
  // removeToken();
  resetRouter();

  // reset visited views and cached views
  // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
  delAllViews();
};

//   // remove token
//   resetToken({ commit }) {
//     return new Promise((resolve) => {
//       commit('SET_TOKEN', '');
//       commit('SET_ROLES', []);
//       removeToken();
//       resolve(true);
//     });
//   },

//   // dynamically modify permissions
const changeRoles = (state: IUserState) => async () => {
  // const token = role + '-token';

  // commit('SET_TOKEN', token);
  // setToken(token);

  const { roles } = await getUserInfo(state)();

  // resetRouter();

  // generate accessible routes map based on roles
  const accessRoutes = await generateRoutes(roles);
  // dynamically add accessible routes
  accessRoutes.forEach((r) => router.addRoute(r));

  // reset visited views and cached views
  delAllViews();
};

const createState = (): IUserState => {
  return reactive({
    // token: getToken() || '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    email: '',
  });
};

const createActions = (state) => {
  return {
    getUserInfo: getUserInfo(state),
    userLogout: userLogout(state),
    changeRoles: changeRoles(state),
  };
};

const state = createState();
const actions = createActions(state);

export const useUserStore = () => {
  return readonly({ state, ...actions });
};
