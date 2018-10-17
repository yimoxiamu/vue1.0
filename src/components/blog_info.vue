<style>

</style>



<template>
  <div v-if="blog_info != null"> 
    <Row>
      <Col class="headBox" span="2"></Col>
      <Col class="headBox" span="20">
          <Card class="head-card">
          </Card>
      </Col>
      <Col class="headBox" span="2"></Col>
    </Row>    
    <Row>
      <Col class="title" span="6"></Col>
      <Col class="title" span="12"><p style="font-size: 30px;">{{blog_info.blog_title}}</p></Col>
      <Col class="title" span="6"></Col>
    </Row> 
     <Row>
      <Col class="author" span="6"></Col>
      <Col class="author" span="12" style="font-size: 20px;"><p >{{blog_info.create_by}}</p></Col>
      <Col class="author" span="6"></Col>
    </Row> 
    <Row>
      <Col class="description" span="3"></Col>
      <Col class="description desmain " span="18"><p>{{blog_info.blog_description}}</p></Col>
      <Col class="description" span="3"></Col>
    </Row> 
    <Row>
      <Col class="text" span="3"></Col>
      <Col class="text" span="18"><div v-html="blog_info.blog_text"></div></Col>
      <Col class="text" span="3"></Col>
    </Row> 
    <Row v-if="title_box != null">
      <Col class="titlebox" span="3" ></Col>
      <Col class="titlebox" span="18" > 
        <a><p @click="doRout($event)" :data-id = "title_box[0].id" style="float:left">上一篇：{{title_box[0].blog_title}}</p> </a>
        <a><p @click="doRout($event)" style="float:right"  :data-id = "title_box[1].id">下一篇：{{title_box[1].blog_title}}</p></a>
      </Col>
      <Col class="titlebox" span="3" ></Col>
    </Row> 
    <Row v-if="title_box == null">
      <Col class="titlebox" span="3" ></Col>
      <Col class="titlebox" span="18">
        <a><p @click="doRout($event)" :data-id = "last_id" style="float:left"> 上一篇：{{last_title}}</p></a> 
        <a><p @click="doRout($event)" style="float:right" :data-id = "next_id">下一篇：{{next_title}}</p></a>
        </Col>
      <Col class="titlebox" span="3" ></Col>
    </Row> 

  </div>
</template>

<script>
import Css from '../../static/css/blogInfo.css';
export default {
  name: "editor",
  data() {
    return {
        id:null,
        blog_info:null,
        title_box:null,
        next_title:null,
        next_id:null,
        last_title:null,
        last_id:null
    }
  },
  created(){
    this.id = this.$route.params.blogId;
    this.init(this.id);
  },
  mounted(){
  },
  methods:{
    doRout(e){
      var id = e.target.dataset.id;
      if( id == "null"){
        return;
      }
      this.$router.push({name:'info',params :{blogId:id}});
      this.id = this.$route.params.blogId;
      this.init(this.id);
    },
    //初始化文章详情
    init(id){
      let url = this.$comjs.buildPath0('blog/blogInfo',this.$route.params.blogId);
      this.$http.get(url).then(response =>{
      if(response.data.code == 0){
      let data = response.data.data;
      this.blog_info = data.blogInfo;
      if(data.contextualInfo.length == 2){
          this.title_box = data.contextualInfo;
      }else{
          if(data.contextualInfo[0].id < this.id){
            this.last_title = data.contextualInfo[0].blog_title;
            this.next_title = "没有啦！";
            this.last_id = data.contextualInfo[0].id;
            this.next_id = "null";
          }else{
            this.next_title = data.contextualInfo[0].blog_title;
            this.last_title = "没有啦！";
            this.next_id = data.contextualInfo[0].id;
            this.last_id = "null";
          }
      }
      
      }else{
        this.$Message.error(response.data.message);
      }
    }).catch(error => {
      console.info(error)
    })
  }
  },

};
</script>
<style>
</style>