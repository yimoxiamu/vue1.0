<template>
    <div style="margin:20px">
        <form>
        <label >文章标题:</label>             
        <Input  placeholder="文章标题" v-model="formData.blog_title" style="width: 20%" />
        <label >文章简介:</label>
        <Input  placeholder="文章简介" v-model="formData.blog_description" style="width: 72%" /><br>
        <div style="height:20px"></div>
        <label>文章内容:</label>
            <textarea id="editor" name="editor1"></textarea>      
        </form>
        <div style="margin-top:20px">
            <Button type="success" @click="subMit()" style="float:right">提交</Button>
            <label style="margin-right:20px">文章类型:</label>
            <Select v-model="formData.blog_type" style="width:200px">
                <Option v-for="item in typeList" :value="item.id" :key="item.blog_type">{{ item.blog_type }}</Option>
            </Select>
            <Button style="margin-left:20px" @click="modal = true" type="primary">增加文章类型</Button>
        </div>

        <!-- 增加文章类型的modal -->
        <Modal
            title="增加文章类型"
            v-model="modal"
            class-name="vertical-center-modal"
            @on-ok="insertType()">
            <label style="margin-right:20px">请输入文章类型:</label>
            <Input  placeholder="请输入文章类型..." v-model="insert_type" style="width: 68%" />
        </Modal>
    </div>
</template>
<script>
import CKEDITOR from 'CKEDITOR';
export default {
    name : "pull_blog",
    data(){
        return{
            typeList : [],
            formData:{
                blog_type:0,
                blog_title:'',
                blog_description:'',
                blog_text:'',
            },
            insert_type:'',
            modal:false

        }
    },
    mounted(){
        this.ckInit();
        this.typeInit();
    },
    methods:{
        ckInit(){
            var myToolbar = [{
            name: 'document',
            items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates']
            },
            {
                name: 'clipboard',
                items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']
            },
            {
                name: 'editing',
                items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt']
            },
            {
                name: 'forms',
                items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField']
            },
            {
                name: 'basicstyles',
                items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
            },
            {
                name: 'paragraph',
                items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']
            },
            {
                name: 'links',
                items: ['Link', 'Unlink', 'Anchor']
            },
            {
                name: 'insert',
                items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']
            },
             {
                name: 'styles',
                items: ['Styles', 'Format', 'Font', 'FontSize']
            },
            {
                name: 'colors',
                items: ['TextColor', 'BGColor']
            },
            {
                name: 'tools',
                items: ['Maximize', 'ShowBlocks']
            }];
            CKEDITOR.replace( 'editor1',{
            filebrowserUploadUrl : "http://154.8.218.29:7000/img/upload",
            filebrowserBrowseUrl : '/#/img',
            language: 'zh-CN',
            height: 600,
            toolbar:myToolbar,
            });

        },
        typeInit(){
            this.$http.get("/type/typeList").then(res =>{
            const data = res.data.data;
            this.typeList = data;
            }).catch(error => {
                console.info(error);
            })
        },
        subMit(){
            const _form = this.formData;
            _form.blog_text = CKEDITOR.instances.editor.getData();
            const data = {
                'blog_text' : _form.blog_text,
                'blog_title' : _form.blog_title,
                'type_id' : _form.blog_type,
                'blog_description' : _form.blog_description
            };
            console.info(data);
            this.$http.put('/blog/pull',data).then(res =>{
                console.info(res);
            })
            .catch(err =>{
                console.info(err);
            })
            
        },
        insertType(){
            console.info(this.insert_type);
        }
    }
}
</script>
<style>
#cke_content{
width:90%;
}
</style>

