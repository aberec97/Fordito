<template>
  <div id="app">
    <input v-model="english" placeholder="word in english">
    <br>
    <input v-model="hungarian" placeholder="word in hungarian">
    <br>
    <button @click="insert(english, hungarian)"> Uj szo beszurasa </button>
    <br>
    <label>Szo forditasa: </label>
    <input v-model="word2Translate" placeholder="word to translate">
    <br>
    <button @click="forditas(word2Translate)"> Forditas </button>
    <p v-bind:class="{error : error}">{{translatedWord}}</p>
  </div>
</template>

<script>
export default {
  
  name: 'app',
  data() {
    return {
      english: '',
      hungarian: '',
      word2Translate: '',
      translatedWord: '',
      error: false
    }
  },
  methods: {
    forditas(szo){
      this
        .axios
        .post('http://localhost:8082/fordit',{szo})
        .then( resp => {
          if(resp.data == '404'){
            this.translatedWord = 'Nincs ilyen szo az adatbazisban!'
            this.error = true;
            return
          }
          this.error = false;
          this.translatedWord = resp.data
        })
    },
    insert(angol, magyar){
      this.axios.post('http://localhost:8082/insert',{angol, magyar})
      .then( () => { 
        this.error = false;
        this.translatedWord = '';
      })
    }
  }
}
</script>

<style scoped>
 .error {
   color: red;
 }
</style>
