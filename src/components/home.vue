<style>

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
                    <span v-if="ifHasItem(likeList,item.id) == false" class="like_count" >
                        <Icon  @click="addLike($event)" type="ios-thumbs-up-outline"   :data-id="item.id" style="cursor:pointer;" /><span>{{ item.like_count }}</span>
                    </span>
                    <span v-else class="like_count" >
                        <Icon  @click="addLike($event)" type="ios-thumbs-up"   :data-id="item.id" style="cursor:pointer;" /><span>{{ item.like_count }}</span>
                    </span>
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
import Css from '../../static/css/blogList.css';
export default {
    name:'home',
    data (){
        return{
            total:null,
            items:null,
            pageNum:1,
            pageSize:5,
            likeList : [],
        }
    },
    created:function(){
        this.likeList = localStorage.getItem('likeBlog') == null ? '9999999,9999999'.split(','):localStorage.getItem('likeBlog').split(',');
        let url = this.$comjs.buildPath("/blog/list",this.pageNum,this.pageSize);
        this.$http.get(url).then(response =>{
            const _data = response.data.data;
            this.total = _data.total;
            this.items = _data.items;
        }).catch(error => {
            console.info(error);
        })
    },methods:{
        onChangeNum(curpage){
            let url = this.$comjs.buildPath("/blog/list",curpage,this.pageSize);
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
        addLike(e){
            var likeLists = localStorage.getItem('likeBlog') == null ? "99999999,99999999":localStorage.getItem('likeBlog');
            var id = e.target.dataset.id;
            const Likes = likeLists.split(',');
            if(this.ifHasItem(Likes,id)){
                return false;
            }
            const next = e.currentTarget.nextElementSibling;
            next.innerHTML = Number(next.innerHTML)+1;
            likeLists = likeLists +","+id;
            localStorage.setItem('likeBlog',likeLists);
            //更改库中数据
            this.$http.post('/blog/addLike',{"id":id}).then(response =>{
                // console.info(response);
            }).catch(error => {
                // console.info(error);
            })
            this.likeList = likeLists.split(',');
        },
        ifHasItem(items,it){
            let key = false;
            items.forEach(item =>{
                if(item == it){
                    key = true;
                }
            })
            return key;
        }
    }
}
</script>
