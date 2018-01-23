/**
 * Created by Tome on 2018/1/22.
 */
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';
const state = {
  user: JSON.parse(window.localStorage.getItem('user')),
  accessToken: window.localStorage.getItem('accessToken'),
  loginRedirect: window.sessionStorage.getItem('loginRedirect'),
  pageLoading: false
};

export default {
  state,
  actions,
  getters,
  mutations
}
