<style>
p{
    margin: 0px
}
.index{
    position:relative;
}
.blogList{
    height: 120px;
    position:relative;
    margin-top:10px;
}
.card{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
    width:90%;
    height:100%;
    background-color: #e8eaec;
}
.pageBox{
    display:flex
}
.page{
    margin: auto;
    margin-top: 10px;
}
.ivu-card-body{
    margin: 0px
}
.auth{
    float:left;
    margin-left:5px;
    margin-top:5px;
}
.create_time{
    width:100px;
    float:right;
}
.discription{
    width:100%;
    float:left;
    margin-top:10px;
}
.like_count{
    float:right;
    margin-right:30px;
}
.read_count{
    float:right;
    margin-right:10px;
}
.comment_count{
    float:right;
    margin-right:10px;
}
.head{
    height: 80px;
    position:relative;
    margin-top:10px;
}
.head-card{
    position:absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
    width:90%;
    height:100%;
    background-color: #5cadff;
}
.type{
    float:left;
    margin-left:15px;
    margin-top:5px;
}
</style>
<template>
    <div>
        <div class="head">
            <Card class="head-card">
            </Card>
        </div>
        <div class="blogList" v-for="item in items">
            <Card class="card">
                <div style="width:100%;height:20px">
                    <span class="title"><a @click="doRout($event)" :data-id="item.id">{{ item.blog_title }}</a></span><span class="create_time">{{ item.create_time }}</span>
                </div>
                <div >
                    <span class="auth"><Icon type="md-color-filter" />{{item.blog_auth}}</span>
                    <span class="type"><Icon type="ios-backspace-outline" />{{item.blog_type}}</span>
                </div>
                <div style="width:100%;height:40px" >
                    <span class="discription">{{ item.blog_description }}</span>
                </div>               
                <div style="width:100%;height:20px">
                    <span class="like_count" ><Icon @click="addLike($event)" type="ios-thumbs-up-outline"   :data-id="item.id" style="cursor:pointer;" /><span>{{ item.like_count }}</span></span>
                    <span class="comment_count" v-if="item.comment_count != null"><Icon type="ios-chatbubbles-outline" />{{ item.comment_count }}</span>
                    <span class="comment_count" v-else><Icon type="ios-chatbubbles-outline" />0</span>
                    <span class="read_count"><Icon type="ios-map-outline" />{{ item.read_count }}</span>
                </div>
            </Card>
        </div>
        <div class="pageBox">
            <Page class="page" :total="total" show-total :page-size='pageSize'  @on-change="onChangeNum"/>
        </div>
    </div>
</template>
<script>
export default {
    name:'home',
    data (){
        return{
            total:null,
            items:null,
            pageNum:1,
            pageSize:5
        }
    },
    created:function(){
        let url = this.$comjs.buildPath("/blog/blogList",this.pageNum,this.pageSize);
        this.$http.get(url).then(response =>{
            const _data = response.data.data;
            this.total = _data.total;
            this.items = _data.items;
        }).catch(error => {
            console.info(error);
        })
    },methods:{
        onChangeNum(curpage){
            let url = this.$comjs.buildPath("/blog/blogList",curpage,this.pageSize);
            this.$http.get(url).then(response=>{
                const _data = response.data.data;
                this.total = _data.total;
                this.items = _data.items;
            }).catch(error =>{
                console.info(error);
            })
        },
        doRout(e){
            const id = e.target.dataset.id;
            // this.$router.push({path:"/info/"+id});
            
            this.$router.push({name:'info',params :{blogId:id}});
        },
        addRead(e){
            const uuid = e.dataset.id;
        },
        addLike(e){
            console.info("123");
            var likeList = localStorage.getItem('likeBlog');
            var uuid = e.target.dataset.id;
            if(likeList == null || likeList.indexOf(uuid) == -1){
                const next = e.currentTarget.nextElementSibling;
                next.innerHTML = Number(next.innerHTML)+1;
                likeList = likeList +","+uuid;
                localStorage.setItem('likeBlog',likeList);
                //更改库中数据
                this.$http.post("/blog/addLike",{"uuid":uuid,"likeCount":next.innerHTML}).then(response =>{
                    console.info(response);
                }).catch(error => {
                    console.info(error);
                })
            }
        }
    }
}
</script>
