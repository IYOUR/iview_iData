<style scoped>
    .planTable{
        border: 1px solid #dddee1;
        border-collapse: separate;   
        border-radius: 4px; 
        padding: 5px;
        width: 100%; 
        min-height:32px;
        margin-bottom: 15px;  
        white-space: nowrap;  
        text-align: left;
    }
    .planTable tr{  
        border: 1px solid #dddee1;
    }
    .planTable td{  
        line-height: normal;  
    }
    .planTable .area{  
        max-width: 200px;  
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .planTable .user{  
        max-width: 200px;  
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .planTable .edit{  
        color: #2b85e4;
        cursor: pointer;
    }
    .planTable .delete{  
        color: #ed3f14;
        cursor: pointer;
    }
    .layoutBetween {
        padding-top: 20px;
    } 
    .filename{
        line-height: 32px;
        white-space: nowrap;
    }
    .planPop{
        max-width: 300px;
        white-space: normal;
        word-break: break-all;
        max-height: 250px;
        overflow-y: scroll;
    }
    .planPop::-webkit-scrollbar {
        display: none;
    }
    .ivu-form-item-content{
        line-height: inherit;
    }   
    .appPackge{
        width:100px;
    }    
</style>
<template>
    <div>
        <Form label-position="right" :label-width="120">
            <Row>
                <Col span="5" offset="1">
                    <Form-item label="更新包:">
                        <Upload v-show="!upState.BtnDisabled" action="api/app/uploadfile" :format="appFormat" :headers="uploadHeaders"
                        name="upload" :on-format-error="appFormatError" :before-upload="beforeUpload"
                         :on-success="UploadSuccess" :on-error="uploadError" :show-upload-list="uploadList">
                            <Button @click="choicePackge('0')" class="appPackge" size="large" icon="social-android" :type="(info.app_type=='0'?'primary':'ghost')" :loading="upState.Btnloading">{{upState.BtnText}}</Button>
                        </Upload>
                        <Button class="appPackge" v-show="upState.BtnDisabled" type="ghost" size="large" :loading="upState.Btnloading">{{upState.BtnText}}</Button>
                    </Form-item>
                </Col>
                <Col span="3" offset="1">
                    <Button @click="choicePackge('1')" class="appPackge" type="ghost" size="large" icon="social-apple" :type="(info.app_type=='1'?'primary':'ghost')">IOS</Button>
                </Col>                
                <Col span="2">
                    <span class="filename">{{info.filename}}</span>
                </Col>
            </Row>
            <Row>
                <Col span="9" offset="1">
                    <Form-item label="版本名称:">
                        <Input v-model="info.versionname" :disabled="info.app_type=='0'"></Input>
                    </Form-item>
                    <Form-item label="版本号:">
                        <Input v-model="info.versioncode" :disabled="info.app_type=='0'"></Input>
                    </Form-item>
                    <Form-item label="覆盖版本号上限:">
                        <Input v-model="info.version_max" :number="isNumber" @on-change="numAbsolute('max')" :maxlength="(md5length-22)" style="float: left;"></Input>
                        <Tooltip placement="top" style="position:absolute;font-size:16px;margin-left:20px;">
                            <Icon type="ios-help-outline"></Icon>
                            <div slot="content">
                                <p>版本号填写格式:</p>
                                <p><i>2.3.1=20301</i></p>
                            </div>                            
                        </Tooltip>
                    </Form-item>
                    <Form-item label="覆盖版本号下限:">
                        <Input v-model="info.version_min" :number="isNumber" @on-change="numAbsolute('min')" :maxlength="(md5length-22)"></Input>
                    </Form-item>
                </Col>
                <Col span="9" offset="1">
                    <Form-item label="MD5值:">
                        <Input v-model="info.md5" :maxlength="md5length" @on-change="lowerCase" :disabled="info.app_type=='1'"></Input>
                    </Form-item> 
                    <Form-item label="产品线:">
                        <Input v-model="info.product_line" :disabled="info.app_type=='0'" style="float: left;"></Input>
                        <Tooltip placement="top" style="position:absolute;font-size:16px;margin-left:20px;">
                            <Icon type="ios-help-outline"></Icon>
                            <div slot="content">
                                <p>产品线填写格式:</p>
                                <p><i>iop,kop或ecp</i></p>
                            </div>                            
                        </Tooltip>                        
                    </Form-item>
                    <Form-item label="推荐策略:" style="margin-bottom: 0px;">
                        <Radio-group v-model="info.update_type" @on-change="selectUpType">
                            <Radio label="0">推荐更新</Radio>
                            <Radio :disabled="info.app_type=='1'" label="1">强制更新</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="弹窗策略:" style="margin-bottom: 0px;">
                        <Radio-group v-model="info.popup_type">
                            <Radio label="0">每次启动弹窗</Radio>
                            <Radio :disabled="update_type" label="1">每天弹窗一次</Radio>
                            <Radio :disabled="!update_type" label="2">不弹窗</Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="推荐网络环境:" style="margin-bottom: 0px;">
                        <Radio-group v-model="info.network_type">
                            <Radio label="0">移动网络</Radio>
                            <Radio label="1">WIFI</Radio>
                            <Radio label="2">移动网络和WIFI</Radio>
                        </Radio-group>
                    </Form-item>                    
                </Col>
                <Col span="4">
                    <p style="height:32px;">
                        <a style="line-height:32px;margin-left:20px;" href="http://parkingwangupgrade-1253776691.file.myqcloud.com/Hash.exe">校验工具下载</a>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col span="20" offset="1">
                    <Form-item class="planForm" label="更新计划:">
                        <table class="planTable">
                            <tr v-for="(item, index) in updatePlanSort" :key="index">
                                <td class="time">{{item.time}}</td>
                                <td>
                                    <Tooltip placement="top">
                                        <p class="area">向{{item.areaStr}}</p>
                                        <div class="planPop" slot="content">
                                            <p>{{item.areaStr}}</p>
                                        </div>
                                    </Tooltip>
                                </td>
                                <td>的用户:</td>
                                <td>
                                    <Tooltip placement="top">
                                        <p class="area">{{item.user}}</p>
                                        <div class="planPop" slot="content">
                                            <p>{{item.user}}</p>
                                        </div>
                                    </Tooltip>
                                </td>
                                <td>推荐更新</td>
                                <td><span class="edit" @click="editPlan({idx:index,val:item,id:item.id})">修改</span></td>
                                <td><span class="delete" @click="deletePlan({idx:index,id:item.id})">删除</span></td>
                            </tr>															
                        </table>		
                        <Button @click="addPlan" type="primary" icon="plus-round">添加更新计划</Button>
                    </Form-item>
                </Col>
            </Row>
            <transition name="fade">
                <update-plan v-show="showAddPlan" :change-plan="changePlan"></update-plan>
            </transition>
            <Row class="layoutBetween"> 
                <Col span="9" offset="1">            
                    <Form-item label="更新内容:" prop="update_content">
                        <Input v-model.trim="info.update_content" :maxlength="contentlength" @on-blur="processtext" placeholder="45字以内" type="textarea" :autosize="{minRows: 3,minRows: 6}"></Input>
                    </Form-item>     
                    <Form-item>
                        <Button type="primary" @click="submit">提交</Button>
                        <Button type="ghost" @click="preview" style="margin-left: 15px">预览</Button>
                    </Form-item>    
                </Col>
            </Row>                     
        </Form>
    </div>
</template>
<script>
import {mapState, mapActions, mapGetters} from 'vuex';
import * as operationService from '../../../../api/operation';
import CONSTANT from '../../../../commons/utils/code';
import updatePlan from './updatePlan.vue'
import DateFormat from '../../../../commons/utils/formatDate';
import Vue from 'vue'
export default {
    data () {
        return {           
            info:{
                app_type:'',
                versionname:'',
                versioncode:'',
                version_max:'',
                version_min:'',
                md5:'',
                product_line:'',
                update_type:'0',
                popup_type:'',
                network_type:'',
                update_content:'',
                filename: '',
                filesize:'',
                url:'',
            },
            textContent: '',
            iTime: null,  
            textAreaState: false,
            appFormat: ['apk'],
            appMD5: '',
            contentlength: 45,
            md5length: 32,
            isNumber: true,
            changePlan: {},
            uploadList: false,
            upState:{
                BtnText:'Android',
                Btnloading:false, 
                BtnDisabled:false
            },
        }
    },
    computed: {	
        ...mapState({
            showAddPlan: 'showAddPlan',
            updatePlan: 'updatePlan',
            planId: 'planId',
            editConfigData: 'editConfigData',
            confirmEdit: 'confirmEdit',
        }),
        uploadHeaders () {
            return {token:sessionStorage.getItem('token')};
        },
        updatePlanSort () {
            return this.updatePlan.sort((first,second)=>{
                return DateFormat.compareDate(DateFormat.formatToDate(first.time),DateFormat.formatToDate(second.time))
            })
        },
        update_type () {
            return Boolean(parseInt(this.info.update_type));
        },	        
    },  
    watch: {
        'editConfigData.val':{
            deep:true,
            handler:function(newVal,oldVal){
                if(this.editConfigData.state) {
                    this.SetEditConfig(newVal);
                    this.getUpdatePlan(newVal.id)
                }
                else {
                    this.reset('submit');
                }
            },
        },
        'confirmEdit':{
            handler:function(newVal,oldVal) {
                if(newVal) {
                    this.submit();
                }
            } 
        }
    },            
    methods:{   
        choicePackge (type) {
            this.reset('switch')
            this.info.app_type=type;
            
        },
        beforeUpload () {
            this.upState = {
                BtnText:'上传中',
                Btnloading:true,
                BtnDisabled:true                
            }            
        },       
        UploadSuccess (res, file) {
            this.upState = {
                BtnText:'Android',
                Btnloading:false,   
                BtnDisabled:false            
            }            
            if(res.message!=='ok' && res.data.upload2CDN!=='ok'){
               this.$Message.warning(res.message); 
               return
            }
            this.info.versionname = res.data.versionname;
            this.appMD5 = res.data.md5;
            this.info.versioncode = res.data.versioncode;
            this.info.filename = res.data.filename;
            this.info.filesize = res.data.filesize;
            this.info.product_line = res.data.packagename;
            this.info.url = res.data.url;
        },
        upProgress (event, file, fileList) {
            console.log(file)
        },
        //文件上传失败
        uploadError (error) {
            this.upState = {
                BtnText:'Android',
                Btnloading:false,   
                BtnDisabled:false            
            }               
            this.$Message.warning('上传失败，请重试！');
        },
        appFormatError (res,file) {
            this.$Message.warning('请上传apk文件！');
            this.upState = {
                BtnText:'Android',
                Btnloading:false,   
                BtnDisabled:false            
            }  
        },
        submit () {
            if(!this.checkInfo()){
                return
            }
            this.processtext();
            this.info.app_type = parseInt(this.info.app_type);
            this.info.versioncode = parseInt(this.info.versioncode);
            this.info.version_max = parseInt(this.info.version_max);
            this.info.version_min = parseInt(this.info.version_min);
            this.info.md5 = this.info.md5;
            this.info.update_type = parseInt(this.info.update_type);
            this.info.popup_type = parseInt(this.info.popup_type);
            this.info.network_type = parseInt(this.info.network_type);
            this.info.filesize = (this.info.app_type==='0')?parseInt(this.info.filesize):0;
            //判断提交状态为编辑或添加
            if(this.editConfigData.state){
                this.updateAppConfig({id:this.editConfigData.val.id,val:this.info});  
            }
            else {
                this.setAppConfig(this.info);  
            }
                    
        },
        checkInfo () {
            if(this.info.app_type.length == 0){
                this.$Message.warning('请填写完整信息！');
                return false
            }
            if(this.info.app_type=='0'){
                for(let item in this.info) {
                    if(this.info[item].length == 0){
                        this.$Message.warning('请填写完整信息！');
                        this.$store.commit('SET_CONFIRM_EDIT',false);
                        return false
                    }
                }
                if(this.info.md5 !== this.appMD5){
                    this.$Message.warning('填写MD5值与上传App的MD5值不一致！');
                    this.$store.commit('SET_CONFIRM_EDIT',false);
                    return false              
                }
            }
            if(this.info.app_type=='1'){
                for(let item in this.info) {
                    if(this.info[item].length == 0 && item!='md5' && item!='filename' && item!='url'){
                        this.$Message.warning('请填写完整信息！');
                        this.$store.commit('SET_CONFIRM_EDIT',false);
                        return false
                    }
                }  
            }
            return true
        },
        SetEditConfig (value) {
            this.upState.BtnText = 'Android';
            this.appMD5 = value.md5;
            this.info = {
                app_type: value.app_type,
                versionname: value.versionname,
                versioncode: value.versioncode,
                version_max: value.version_max,
                version_min: value.version_min,
                md5: value.md5,
                filesize: value.filesize,
                product_line: value.product_line,
                update_type: value.update_type,
                popup_type: value.popup_type,
                network_type: value.network_type,
                update_content: value.update_content,
                filename: value.filename,
                url: value.url,
            } 
        },      
        //添加配置信息  
        setAppConfig (params) {
            let param = {info:JSON.stringify(this.info),plan_ids:this.planId.join(',')}
            return operationService.setAppConfig(param).then(res => {
                if(res.status ==200 && res.data.message=='ok'){
                    this.$Message.success('提交成功');
                    this.reset('submit');
                } else{
                    this.$Message.error(res.data.message);
                }
            });
        }, 
        //更新配置信息
        updateAppConfig (params) {
            let param = {id:params.id,val:{info:JSON.stringify(this.info)}}
            return operationService.updateAppConfig(param).then(res => {
                if(res.status ==200 && res.data.message=='ok'){
                    this.$Message.success('提交成功');
                    this.reset('submit');
                } else{
                    this.$Message.error(res.data.message);
                }
            });
        },   
        // 获取更新计划信息 
        getUpdatePlan (params) {
            let param = {app_info_id:params};
            return operationService.getUpdatePlan(param).then(res => {
                if(res.status ==200 && res.data.message=='ok'){
                    this.showEditPlan(res.data.data)
                } else{
                    this.$Message.error(res.data.message);
                }
            });
        },     
        //展示编辑状态下的更新计划
        showEditPlan (data) {
            let plan = [];
            for(let item in data) {
                this.getAreaName(data[item].region).then((res)=>{
                    let singePlan={},arrStr = [];
                    singePlan.id = data[item].id;
                    singePlan.time = data[item].time;
                    singePlan.user = (data[item].white_list=='')?'全部':data[item].white_list;
                    singePlan.area = res;
                    for(let item in res){
                        arrStr.push(res[item].label);
                        if(res[item].value == '100000'){
                            arrStr=['全国']; 
                        }                        
                    }
                    singePlan.areaStr = arrStr.join(',');
                    plan.push(singePlan)
                    this.$store.commit('SET_ADDPLAN_ADD',plan);
                });
            }
           
        },
        //根据地区value值获取对应名称        
        getAreaName (params) {
            let param = {ids:params};
            return operationService.getAreaName(param).then(res => {
                if(res.status ==200 && res.data.message=='ok'){
                    return res.data.data;          
                } 
                else{
                    this.$Message.error(res.data.message);
                }
            });
        },                             
        sendDeletePlan (params) {
            return operationService.deletePlan(params).then(res => {
                if(res.status ==200 && res.data.message=='ok'){
                    return res;
                } else{
                    this.$Message.error(res.data.message);
                }
            });              
        }, 
        //重置
        reset (type) {
            this.info = {
                app_type: this.info.app_type,
                versionname:'',
                versioncode:'',
                version_max:'',
                version_min:'',
                md5:'',
                product_line:'',
                update_type:'0',
                popup_type:'',
                network_type:'',
                //update_content:'',
                filename: ''
            };
            if(type=='submit'){
                this.editConfigData.state = false;
                this.$store.commit('SET_EDIT_CONFIG_DATA',this.editConfigData);                   
                this.$store.commit('SET_CONFIG_CONFIG_TIME',new Date());
                this.$store.commit('SET_ADDPLAN_ADD',[]);       
                this.$store.commit('SET_PLAN_ID',[]);   
                this.info.update_content = '';              
            }
            this.$store.commit('SET_ADDPLAN_SHOW',false);
            this.$store.commit('SET_CONFIRM_EDIT',false); 
            this.$store.commit('SET_PREVIEW_STATE',{state:false,val:{}});                  
        },
        //预览
        preview () {
            if(this.checkInfo()){
                this.$store.commit('SET_PREVIEW_STATE',{state:true,val:this.info});
            }
        },
        addPlan () {
            this.$store.commit('SET_ADDPLAN_SHOW',true);
        },
        // 修改计划
        editPlan (value) {
            let option = Object.assign({}, value.val),arr=[];
            for(let idx in option.area){
                if(option.area[0].value == '100000'){
                   option.area[0].label = '全国';
                } 
                arr.push(JSON.stringify(option.area[idx]))
            }
            option.user = (option.user=='全部')?'':option.user;
            option.area = arr;
            this.changePlan = {idx:value.idx,val:option,id:value.id};
            this.$store.commit('SET_ADDPLAN_SHOW',true);
        },
        // 删除计划
        deletePlan (value) {
            this.$Modal.confirm({
                title: '确认删除',
                content: '<p>确认要删除此条更新计划么?</p>',
                onOk: () => {
                    this.sendDeletePlan(value.id).then((res)=>{
                        if(res.status ==200 && res.data.message=='ok'){
                            this.updatePlan.splice(value.idx, 1);
                            for(let i in this.planId){
                                if(value.id == this.planId[i]){
                                    this.planId.splice(i, 1);
                                }
                            }
                            this.$store.commit('SET_PLAN_ID',this.planId);
                            this.$store.commit('SET_ADDPLAN_ADD',this.updatePlan);
                        } else{
                            this.$Message.error(res.data.message);
                        }
                    })                    
                },
                onCancel: () => {
                    return
                }
            }); 
        },
        //选择推荐策略
        selectUpType () {
            this.info.popup_type = '';
        },
        //处理更新内容 每十五字自动换行
        processtext () {  
                if(!this.info.update_content){
                    return ""
                }
                let textArr = this.info.update_content.replace(/(\r\n|\n|\r)/gm,'\r\n').split('\r\n');
                let strInsert = (str)=>{
                    let arr = str.split('');
                    const arrCopy = str.split('');
                    for(let i in arrCopy){
                        if((i%15==0)&&i>0){
                            if(i==15){arr.splice(15,0,'\r\n');}   
                            if(i==30){arr.splice(31,0,'\r\n');}
                            if(i==45){arr.splice(46,0,'\r\n');}                                                  
                        }
                    }
                    return arr.join('')
                }
                for(let i in textArr){
                    if(textArr[i].length>15){
                        textArr[i] = strInsert(textArr[i])
                    }
                }
                this.info.update_content = textArr.join('\r\n');
        },
        //转为小写
        lowerCase () {
            this.info.md5 = this.info.md5.toLowerCase();
        },
        //转为绝对值
        numAbsolute (type) {
            if (type=='max' && this.info.version_max<0) {
                this.info.version_max = Math.abs(this.info.version_max);
            }
            if (type=='min'&& this.info.version_min<0) {
                this.info.version_min = Math.abs(this.info.version_min);
            }            
        },
    },
    components: {
        'update-plan': updatePlan,
    }                
}
</script>