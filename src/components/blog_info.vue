<template>
    <div>
        <span>{{id}}</span>
    </div>   
</template>
<script>
export default {
  name: "editor",
  data() {
    return {
        id:null
    }
  },
  created(){
    this.id = this.$route.params.blogId;
    let url = this.$comjs.buildPath0('blog/blogInfo',this.$route.params.blogId);
    this.$http.get(url).then(response =>{
      console.info(response)
    }).catch(error => {
      console.info(error)
    })
  },
  mounted(){
  }
};
</script>
<style>
</style>