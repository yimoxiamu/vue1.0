<style>
.title{
  height: 40px;
  margin-top: 20px;
}
.author{
  margin-top: 10px;
  height: 20px;
}
.description{
  margin-top: 10px;
  height: 40px;
}
.text{
  margin-top: 10px;
  height: 1000px;
}
.titlibox{
  margin-top: auto;
  height: 20px;
}
</style>



<template>
  <div>    
    <Row>
      <Col class="title" span="6">asdas</Col>
      <Col class="title" span="12" style="background-color:green">asdas</Col>
      <Col class="title" span="6">asdas</Col>
    </Row> 
     <Row>
      <Col class="author" span="6">asdas</Col>
      <Col class="author" span="12" style="background-color:green">asdas</Col>
      <Col class="author" span="6">asdas</Col>
    </Row> 
    <Row>
      <Col class="description" span="3">asdas</Col>
      <Col class="description" span="18" style="background-color:green">asdas</Col>
      <Col class="description" span="3">asdas</Col>
    </Row> 
    <Row>
      <Col class="text" span="3">asdas</Col>
      <Col class="text" span="18" style="background-color:green">asdas</Col>
      <Col class="text" span="3">asdas</Col>
    </Row> 
    <Row>
      <Col class="titlebox" span="8" style="background-color:green" >asdas</Col>
      <Col class="titlebox" span="8" >asdas</Col>
      <Col class="titlebox" span="8" style="background-color:green">asdas</Col>
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