<template>
    <Row>
        <Col class="login_box" span="4"></Col>
        <Col class="login_box login_main" span="6">
            <div class="logo_box">
                <img class="logo_img" src="../../static/img/log.png"><br>
                <p v-if="login" class="logo_text" style="">隐约雷鸣 阴霾天空 即使天无雨 我亦留此地</p>
                <p v-else class="logo_text" style="">隐约雷鸣 阴霾天空 但盼风雨来 能留你在此</p>
            </div>
            <div class="form_box" style="">
                <!--邮箱登录框-->
                <div v-if="login && useEmail" style="width:80%;margin:0 auto;">
                    <Input v-model="loginForm.user_email" type="text" placeholder="请输入邮箱地址..." />
                    <Input v-model="loginForm.pass_word" type="password" style="margin-top:30px;" placeholder="请输入密码..." />
                    <p style="font-size:10px;margin-top:1.8%;margin-left:10px;"><a @click="changeEmail()">用户名登录</a></p>
                    <Button style="margin-top:7.2%;width:100%" type="primary" @click="doLogin()">登录</Button>
                </div>
                <!--用户名登录框-->
                <div v-else-if="login && !useEmail" style="width:80%;margin:0 auto;">
                    <Input  v-model="loginForm.user_name" type="text" placeholder="请输入用户名..."/>
                    <Input  v-model="loginForm.pass_word" type="password" style="margin-top:30px;" placeholder="请输入密码..." />
                    <p style="font-size:10px;margin-top:1.8%;margin-left:10px;"><a @click="changeEmail()">邮箱登录</a></p>
                    <Button style="margin-top:7.2%;width:100%" type="primary" @click="doLogin()">登录</Button>
                </div>
                <!--注册框-->
                <div v-else-if="!login" style="width:80%;margin:0 auto;">
                    <Input  v-model="registForm.user_name" type="text" placeholder="请输入用户名..." />
                    <Input  v-model="registForm.pass_word" type="password" style="margin-top:30px;" placeholder="请输入密码..." />
                    <p style="font-size:10px;margin-top:1.8%;margin-left:10px;">祝你有个好心情～</p>
                    <Button style="margin-top:7.2%;width:100%" type="primary" @click="doRegist()">注册</Button>
                </div>
            </div>
            <div class="text_box">
                <p style="width:100%;height:5px"></p>
                <p v-if="login" style="margin-top:10px">没有账号？<a @click="change()">注册</a>,<a @click="doRout('/index')">或者直接直接浏览。</a></p>
                <p v-else style="margin-top:10px">已有账号？<a @click="change()">登录</a></p>
            </div>
        </Col>
        <Col class="login_box" span="14"></Col>
    </Row>
    
</template>

<script>
import Css from '../../static/css/login.css';
export default {
    data(){
        return{
            login:true,
            useEmail:false,
            loginForm:{
                user_name:null,
                pass_word:null,
                user_email:null
            },
            registForm:{
                user_name:null,
                pass_word:null
            },
            imgUrl:''
        }
    },
    methods:{
        change(){
            this.clearn();
            this.login = !this.login;
        },
        changeEmail(){
            this.clearn();
            this.useEmail = !this.useEmail;
        },
        doLogin(){
        },
        doRegist(){
            let User = this.registForm;
            this.$http.post('/login/doRegist',{'user_name':User.user_name,'pass_word':User.pass_word})
            .then(res =>{
                let data = res.data;
                console.info(data);
                if(data.code == 0){

                }else{
                    this.$Message.error(data.message);
                }
            })
            .catch(error =>{
                console.info(error);
            })
        },
        clearn(){
            this.loginForm.user_name = null;
            this.loginForm.pass_word = null;
            this.loginForm.user_email = null;
            this.registForm.user_name = null;
            this.registForm.pass_word = null;
        },
        doRout(path){
            this.$router.push(path);
        }
    },
    deactivated(){
        this.$destroy();
    }
}
</script>

<style>

</style>
