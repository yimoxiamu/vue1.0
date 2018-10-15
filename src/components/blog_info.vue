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
  height: auto;
}
.titlebox{
  margin-top: 10px;
  height: 20px;
}
Pre{
  background:#eeeeee; 
  border:1px solid #cccccc; 
  padding:5px 10px
}
</style>



<template>
  <div v-if="blog_info != null">    
    <Row>
      <Col class="title" span="6"></Col>
      <Col class="title" span="12"><span>{{blog_info.blog_title}}</span></Col>
      <Col class="title" span="6"></Col>
    </Row> 
     <Row>
      <Col class="author" span="6"></Col>
      <Col class="author" span="12"><span >{{blog_info.create_by}}</span></Col>
      <Col class="author" span="6"></Col>
    </Row> 
    <Row>
      <Col class="description" span="3"></Col>
      <Col class="description" span="18"><span>{{blog_info.blog_description}}</span></Col>
      <Col class="description" span="3"></Col>
    </Row> 
    <Row>
      <Col class="text" span="3"></Col>
      <Col class="text" span="18"><div v-html="blog_info.blog_text"></div></Col>
      <Col class="text" span="3"></Col>
    </Row> 
    <Row>
      <Col class="titlebox" span="8" style="background-color:green" >asdas</Col>
      <Col class="titlebox" span="8" ></Col>
      <Col class="titlebox" span="8" style="background-color:green">asdas</Col>
    </Row> 

  </div>
</template>

<script>
export default {
  name: "editor",
  data() {
    return {
        id:null,
        blog_info:null,
        title_box:[]
    }
  },
  created(){
    this.id = this.$route.params.blogId;
    let url = this.$comjs.buildPath0('blog/blogInfo',this.$route.params.blogId);
    this.$http.get(url).then(response =>{
      if(response.data.code == 0){
      let data = response.data.data;
      this.blog_info = data.blogInfo;
      this.title_box = data.contextualInfo;
      }else{
        this.$Message.error(response.data.message);
      }
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