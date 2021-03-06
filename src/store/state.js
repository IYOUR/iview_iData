
export default {

    //省份列表
    provinceList: [],

    //城市列表
    cityList: [],

    //集团列表
    companyList: [],

    //车场列表
    parkList: [],

    //查询结果
    queryResult: {},

    //实时查询结果
    currentResult: {
        allResult: {},
        dateResult: {}
    },

    //查询参数
    queryData: {
        province: '',
        park_code: '',
        city: '',
        date: [],
        company: ''
    },
    queryParam: {},

    //排行数据
    rankData: {},
    
    situationData: [
        {
            title:'昨日车位数量',
            num: '00000',
            lastDay:['00',{val:'00',state:'no',icon:''}],	
            lastWeek:['00',{val:'00',state:'no',icon:''}],
            lastMonth:['00',{val:'00',state:'no',icon:''}]
        },
        {
            title:'昨日停车场数量',
            num: '00000',
            lastDay:['00',{val:'00',state:'no',icon:''}],	
            lastWeek:['00',{val:'00',state:'no',icon:''}],
            lastMonth:['00',{val:'00',state:'no',icon:''}]
        },
        {
            title:'昨日完成停车辆数',
            num: '00000',
            lastDay:['00',{val:'00',state:'no',icon:''}],	
            lastWeek:['00',{val:'00',state:'no',icon:''}],
            lastMonth:['00',{val:'00',state:'no',icon:''}]
        },
        {
            title:'昨日总收入(元)',
            num: '00000',
            lastDay:['00',{val:'00',state:'no',icon:''}],	
            lastWeek:['00',{val:'00',state:'no',icon:''}],
            lastMonth:['00',{val:'00',state:'no',icon:''}]
        },		
        {
            title:'昨日平均每辆车付费(元)',
            num: '00000',
            lastDay:['00',{val:'00',state:'no',icon:''}],	
            lastWeek:['00',{val:'00',state:'no',icon:''}],
            lastMonth:['00',{val:'00',state:'no',icon:''}]
        }															
    ],
    situationTabs:{
        tabOption:[
            {label:'完成停车数量',id:'dedup_finish',hint:'一天之内至少完成一次停车的车辆数量（去重统计）'},
            {label:'完成停车次数',id:'finish',hint:'一天之内完成停车的总次数'},
            {label:'总收入',id:'charge',hint:'一天之内的付费金额'},
            {label:'平均每辆车付费',id:'averageCharge',hint:'总收入/完成停车数量'},
            {label:'平均每次停车付费',id:'eachCharge',hint:'总收入/完成停车次数'},
            {label:'车位数量',id:'space',hint:'可使用车位的总数量'},
            {label:'停车场数量',id:'parks',hint:'筛选条件下的停车场总数量'}
        ],
        tabChartsData:{}
    },  

    situationTable: {
        columns: [
            {
                title: '日期',
                key: 'date'
            },
            {
                title: '完成停车数量',
                key: 'dedup_finish'
            },
            {
                title: '完成停车次数',
                key: 'finish'
            },
            {
                title: '总收入(元)',
                key: 'charge'
            },
            {
                title: '平均每辆车付费(元)',
                key: 'averageCharge' 
            },
            {
                title: '平均每次停车付费(元)',
                key: 'eachCharge'
            },
            {
                title: '车位数量',
                key: 'space'
            },
            {
                title: '停车场数量',
                key: 'parks'
            }																				
        ],
        data: []
    },    


    //实时数据
    realTimeTabs:{
        tabOption:[
            {label:'实时进车次数',id:'currentIns',hint:'截止当前时间点，实时进车次数'}, 
            {label:'实时出车次数',id:'currentOuts',hint:'截止当前时间点，实时出车次数'},
            {label:'实时停放数量',id:'currentInparks',hint:'当前时间点，实时停车数量'},
            {label:'实时车位使用率',id:'currentRatio',hint:'当前时间点，在停车辆总数/车位数量'},
            {label:'实时收入',id:'currentCharge',hint:'截止当前时间点，实时收入金额'},
            {label:'实时新增车辆数',id:'currentAdd',hint:'截止当前时间点，首次使用艾润停车服务的总车辆数'},
        ],
        tabChartsData:{}
    },   
    realTimeSituation: [
        {
            title:'实时进车总次数',
            num: '00000',
            lastDay:['00',{val:'00',state:'no',icon:''}],	

        },
        {
            title:'实时出车总次数',
            num: '00000',
            lastDay:['00',{val:'00',state:'no',icon:''}],	

        },
        {
            title:'实时停放数量',
            num: '00000',
            lastDay:['00',{val:'00',state:'no',icon:''}],	

        },
        {
            title:'实时总收入(元)',
            num: '00000',
            lastDay:['00',{val:'00',state:'no',icon:''}],	

        },
        {
            title:'实时新增总车辆数',
            num: '00000',
            lastDay:['00',{val:'00',state:'no',icon:''}],
        }	        	        															
    ],  
    realTimeTable: {
        columns: [
            {
                title: '时间',
                key: 'date'
            },
            {
                title: '进车次数',
                key: 'ins'
            },
            {
                title: '出车次数',
                key: 'outs'
            },
            {
                title: '停放数量',
                key: 'in_parks' 
            },
            {
                title: '车位使用率',
                key: 'space_ratio'
            },
            {
                title: '收入(元)',
                key: 'charge'
            },
            {
                title: '新增车辆数',
                key: 'new'
            }																				
        ],
        data: []
    }, 

    //停车数据详情
    parkDetailData: {
        tableSection: [],
        carTypeInfo:[]        
    },
    parkDetailTabs:{
        tabOption:[
            {label:'进场车数量',id:'dedup_ins',hint:'按天统计进场车辆总数（去重）'},
            {label:'进场车次数',id:'ins',hint:'按天统计进场车辆总次数'},
            {label:'出场车数量',id:'dedup_outs',hint:'按天统计出场车辆总数（去重）'},
            {label:'出场车次数',id:'outs',hint:'按天统计出场车辆总次数'},
            {label:'过夜车数量',id:'pass_nights',hint:'当天进入停车场，但是在0点之前未出场的车辆总数'},
            {label:'车位使用率',id:'space_ratio',hint:'当天实时车位使用率的平均值'},
            {label:'平均停车时长',id:'parking_duration',hint:'按天统计停车场内所有完成停车车辆在停车场所停的平均时间'},
            {label:'单位小时进出车辆数',id:'outsHour',hint:'一天总的(进车数量+出车数量)/24'},
            {label:'新增车辆数',id:'increased',hint:'按天统计首次使用艾润停车服务的车辆总数'},
        ],
        tabChartsData:{}
    },  
    parkDetailTable: {
        columns: [
            {
                title: '时间',
                key: 'date'
            },
            {
                title: '进场车数量',
                key: 'dedup_ins'
            },
            {
                title: '出场车数量',
                key: 'dedup_outs'
            },
            {
                title: '过夜车数量',
                key: 'pass_nights'
            },
            {
                title: '车位使用率最高值',
                key: 'maxRatio' 
            },
            {
                title: '车位使用率最低值',
                key: 'minRatio'
            },
            {
                title: '车位使用率平均值',
                key: 'space_ratio'
            },
            {
                title: '平均停车时长(分钟)',
                key: 'averageTime'
            },
            {
                title: '单位小时进出车辆数',
                key: 'inOutPerhour'
            },
            {
                title: '新增车辆数',
                key: 'increased'
            }	            	            																				
        ],
        data: []
    },                      



    //支付数据详情
    paymentDetailData: {
        tableSection: [],
        paySection:[]
    },
    paymentDetailTabs:{
        tabOption:[
            {label:'总收入',id:'charge',hint:'一天之内的付费金额'},
            {label:'平均每次付费',id:'eachTimesPay',hint:'总收入/完成停车数量'},
            {label:'平均每车付费',id:'eachCarPay',hint:'总收入/完成停车次数'},
            // {label:'未支付用户比',id:'notPay',hint:'当天出场车辆中，未付费的车辆占比'},
            {label:'车位平均价值',id:'spaceWorth',hint:'总收入/车位数'},
        ],
        tabChartsData:{}
    },
    paymentWayTabs:{
        tabOption:[
            {label:'微信',id:'weixin'},
            {label:'支付宝',id:'alipay'},
            {label:'银联',id:'uniopay'},
            {label:'现金',id:'cash'},
            {label:'停车王钱包',id:'wallet'},
            {label:'其他',id:'unkown'}
        ],
        tabChartsData:{}
    },    
    paymentDetailTable: {
        columns: [
            {
                title: '日期',
                key: 'date'
            },
            {
                title: '总收入(元)',
                key: 'charge'
            },
            {
                title: '平均每次付费(元)',
                key: 'eachTimesPay'
            },
            {
                title: '平均每车付费(元)',
                key: 'eachCarPay'
            },
            {
                title: '车位平均价值(元)',
                key: 'spaceWorth'
            },
            {
                title: '平均停车时长(分钟)',
                key: 'averageTime'
            },
            {
                title: '单位小时进出车辆数',
                key: 'inOutPerhour'
            }            	            																				
        ],
        data: []
    }, 
    
    
    //app更新配置
    showAddPlan: false,
    updatePlan: [],
    planId: [],
    editConfigData: {
        state: false,
        val: {}
    },
    configEditTime:'',
    previewInfo: {
        state: false,
        val: {
            app_type:'',
            versionname:'',
            versioncode:'',
            version_max:'',
            version_min:'',
            md5:'',
            product_line:'',
            update_type:'',
            popup_type:'',
            network_type:'',
            update_content:'',
            filename: ''            
        }
    },
    confirmEdit: false,

    //性能监控
    networkResultData:{
        dayData:[],
        rangeData:[],
    },

    //在线支付监控
    onlinePayData:{
        dayData:[],
        rangeData:[],
    },

    //数据仓库
    userCenter_list:[],
    parkCenter_list:[],
};
