import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { NotesAPI } from '../plugins/axios.js'

const store = new Vuex.Store({
  state: {
    notes: [],
  },
  mutations: {
    SET_NOTES(state, values) {
      state.notes = values;
    },
  },
  actions: {
    async getNotes({commit}) {
      let res = await NotesAPI.get();
      let notes = res?.data?.data;
      commit('SET_NOTES', notes);
    },
    async getCurrentNote({commit}, id) {
      let res = await NotesAPI.get(`/${id}`);
      let note = res?.data?.data;
      return note;
    },
    async createNote() {
      let data = {title: 'Новая заметка'};
      let res = await NotesAPI.post('', data);
    },
    async deleteNote({}, id) {
      let res = await NotesAPI.delete(`/${id}`);
    },
    async updateNote({}, data) {
      let res = await NotesAPI.put(`/${data.id}`, data);
    }
  },
});

export default store;
