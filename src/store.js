import Vue from 'vue'
import Vuex from 'vuex'

// const API_KEY = 'AIzaSyDaRxLJJ6ImE4Bv9PDBo9JO9O51pbjL4Vo';
const API_KEY = 'AIzaSyCKrzmwfMEpDrX2PvzFHYz4cNjRNEh7oWY';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    input: "",
    result: ""
  },
  mutations: {
    input(state, url){
      state.input = url;  
    },
    result(state, url){
      state.result = url;  
    }
  },
  actions: {

    async getShortenedUrl({commit}, inputUrl){
      try{
        const url = `https://www.googleapis.com/urlshortener/v1/url?key=${API_KEY}`;
        let response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({longUrl: inputUrl})
        });
        
        if(response.ok) {
          let jsonResponse = await response.json();
          let result = jsonResponse.id;
          commit("result", result);
        }
      } catch (error) {
        console.log(error);
      } 
    },
    async getExpandedUrl({commit}, inputUrl){
      try{
        const url = `https://www.googleapis.com/urlshortener/v1/url?key=${API_KEY}&shortUrl=${inputUrl}`;
        let response = await fetch(url);
        
        if(response.ok) {
          let jsonResponse = await response.json();
          let result = jsonResponse.longUrl;
          commit("result", result);
        }
      } catch (error) {
        console.log(error);
      } 
    }
  },
  getters: {
    input(state) {
      return state.input;
    },
    result(state) {
      return state.result;
    }  
  }
})
