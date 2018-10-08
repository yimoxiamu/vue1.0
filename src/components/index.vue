<template>
    <Layout style="height:930px">
        <Header>
        <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1" to="/">
            <Icon type="ios-paper" />
            首页
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people" />
            用户管理
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats" />
                统计分析
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-construct" />
            综合设置
        </MenuItem>
        <Avatar style="float:right;margin-top:15px" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
        <br>
        
    </Menu>   
        </Header>
        <Layout>
            <Sider hide-trigger width="150" style="background-color:#DDDDDD;"></Sider>
            <Content style="height:80%"><router-view></router-view></Content>
            <Sider hide-trigger width="250" style="background-color:#DDDDDD"></Sider>
        </Layout>
        <Footer style="background-color:#1F1F1F;display:flex">
            <span style="margin:auto">这是足部</span>
        </Footer>
    </Layout>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'dark'
            }
        }
    }
</script>