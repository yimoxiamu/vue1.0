<style>
.title{
  height: 40px;
  margin-top: 20px;
}
.author{
  margin-top: 10px;
  height: 20px;
}
</style>



<template>
  <div>    
    <Row>
      <Col class="title" span="6">asdas</Col>
      <Col class="title" span="12" style="background-color:red">asdas</Col>
      <Col class="title" span="6">asdas</Col>
    </Row> 
     <Row>
      <Col class="author" span="6">asdas</Col>
      <Col class="author" span="12" style="background-color:red">asdas</Col>
      <Col class="author" span="6">asdas</Col>
    </Row> 
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