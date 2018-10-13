<template>
  <div id="app">
    <fieldset>
      <legend>URL Shortner</legend>

      <div class="input-field">
        <label>URL</label>
        <input type="text" v-model="input">
      </div>

      <div class="input-field">
        <label>Result</label>
        <textarea v-model="result"></textarea>
      </div>

      <div class="input-group">
        <button type="button" class="button" @click="shortenURL">Shorten</button>
        <button type="button" class="button button-success" @click="expandURL">Expand</button>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  computed: {
    input: {
      get () {
        return this.$store.state.input
      },
      set (value) {
        this.$store.commit('input', value)
      }
    },
      result() {
        return this.$store.getters.result;
      },
      trimmedUrl(){
        return this.input.trim();
      }
  },
  methods: {
    shortenURL(){
      this.$store.dispatch("getShortenedUrl", this.trimmedUrl);
    },
    expandURL(){
      this.$store.dispatch("getExpandedUrl", this.trimmedUrl);
    }  
  }

}
</script>


<style>

  body{
    display: flex;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }

  div {
    max-width: 768px;
    width: 100%;
  }

  input {
    margin-bottom: 3rem;
  }

</style>
