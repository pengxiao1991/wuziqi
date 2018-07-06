<style>
@import url(./resource/css/public.css);
 html,body,#app {
    margin: 0%;
    width: 100%;
    height: 100%;
  }
</style>


<template lang="html">
  <div id="app">
      <router-view></router-view>
</div>
</template>


<script>

import {mapState} from 'vuex'
export default {
  components:{

  },
  methods:{
  },
  computed:mapState(['progress']),

  mounted(){
  }
}
</script>
