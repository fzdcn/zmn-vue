/**
 * Created by Tome on 2018/1/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './user-info/index'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    userInfo,
  },
  strict: debug
})
