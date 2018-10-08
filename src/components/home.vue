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
.insert_time{
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
                    <span class="title"><a @click="doRout($event)" :data-id="item.blog_uuid">{{ item.blog_title }}</a></span><span class="insert_time">{{ item.insert_time }}</span>
                </div>
                <div >
                    <span class="auth"><Icon type="md-color-filter" />{{item.blog_auth}}</span>
                    <span class="type"><Icon type="ios-backspace-outline" />{{item.blog_type}}</span>
                </div>
                <div style="width:100%;height:40px" >
                    <span class="discription">{{ item.blog_description }}</span>
                </div>               
                <div style="width:100%;height:20px">
                    <span class="like_count" ><Icon @click="addLike($event)" type="ios-thumbs-up-outline"   :data-id="item.blog_uuid" style="cursor:pointer;" /><span>{{ item.like_count }}</span></span>
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
import Qs from 'qs';
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
        const data = {
            pageNum : this.pageNum,
            pageSize : this.pageSize
        }
        this.$http.post("/blog/blogList",data).then(response =>{
            const _data = response.data.data;
            this.total = _data.total;
            this.items = _data.items;
        }).catch(error => {
            console.info(error);
        })
    },methods:{
        onChangeNum(curpage){
            const data = {
                pageNum : curpage,
                pageSize : this.pageSize
            }
            this.$http.post("/blog/blogList",data).then(response=>{
                const _data = response.data.data;
                this.total = _data.total;
                this.items = _data.items;
            }).catch(error =>{
                console.info(error);
            })
        },
        doRout(e){
            const id = e.target.dataset.id;
            this.$router.push('/info/'+id);
        },
        addRead(e){
            const uuid = e.dataset.id;
        },
        addLike(e){
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
