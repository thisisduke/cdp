<template>
  <div style="padding: 24px;background:#fff">
    <Form
    labelAlign="left"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    >
      <Row justify="end">
        <Col :span="6">
          <FormItem label="项目名称">
            <Input 
              @blur="searchInput"
              :allowClear="true"
            />
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="项目描述">
            <Input 
              @change="searchDesc"
              :allowClear="true"
            />
          </FormItem>
        </Col>
        <Col :span="6">
          <Space size="middle">
            <Button  @click="handleSearch" type="primary" >查询</Button>
          </Space>
        </Col>
        <Col :span="6">
          <Button @click="handleCreate" type="primary" style="float:right">新增项目</Button>
        </Col>
        
      </Row>
    </Form>
      
    <Table
      :rowKey="(record,index)=>{return index}"
      :loading="loading"
      :dataSource="dataSource" 
      :columns="columns"
      :pagination="pagination"
      @change="handleChange"
    >
        <template #isDefault="{ record }">
        <Tag :key="record.isDefault" :color="record.isDefault === 1 ? 'green' : 'volcano'">
          {{ record.isDefault === 1 ? '是' : '否' }}
        </Tag>
      </template>
        <template #isDefault="{ record }">
            <Tag :key="record.isDefault" :color="record.isDefault === 1 ? 'green' : 'volcano'">
            {{ record.isDefault === 1 ? '是' : '否' }}
            </Tag>
        </template>
        <template #action="{ record }">
            <a @click="handleEdit(record, index)">编辑</a>
            <Divider type="vertical" />
            <span>
                <Popconfirm
                    placement="topRight" 
                    title="确认删除？" 
                    @confirm="() => sysDictTypeDelete(record)"
                    okText="确认"
                    cancelText="取消"
                >
                    <a>删除</a>
                </Popconfirm>
            </span>
            <Divider type="vertical" />
            <span>
                <Popconfirm 
                    title="确认设置为默认模板？" 
                    @confirm="() => setDefaultTemplate(record)"
                    okText="确认"
                    cancelText="取消"
                >
                    <a>设置默认模板</a>
                </Popconfirm>
            </span>
        </template>
    </Table>

    <ProjectItem />
  </div> 
</template>

<script lang="ts">
import { defineComponent, ref, computed, toRaw, reactive, provide, onMounted } from "vue";
import { Table, Form, Input, Button, Space, Row, Col, Tag, Divider, Popconfirm } from 'ant-design-vue';
import { columns } from './tableConfig';
import { getList } from '@/api/project/project'

import ProjectItem from './EditTemplate.vue'

const FormItem = Form.Item

interface IState {
    pageAbout:Record<string, unknown>,
}

interface IParameter {
    pageNo:number,
    pageSize:number,
    name?:string,
    desc?:string,
}


export default defineComponent({
    components:{
        Table,
        Form,
        FormItem,
        Input,
        Button,
        Space,
        Row,
        Col,
        Tag,
        Divider,
        Popconfirm,
        ProjectItem
    },
    setup() {
        const dataSource = ref([])
        const loading = ref(false)

        const type = ref('create')
        provide('type',type)

        const visible = ref(false)
        provide('visible',visible)

        const projectInfo = ref({})
        provide('projectInfo',projectInfo)

        const formRef = ref();
        const parameter:IParameter = reactive({
            pageNo:1,
            pageSize:10,
        })

        const state:IState = reactive({
            pageAbout:{},
        })
        

        onMounted(() => {
            getData(parameter)
        })

        const getData = (record: IParameter) =>{
            
            getList(record).then((REs:any)=>{
            if(REs.status == 200){
                dataSource.value = REs.result.data
            }
            })
        }

        //分页
        const pagination = computed(() => ({
            total: toRaw(state.pageAbout).total,
            current: toRaw(state.pageAbout).current_page,
            pageSize: 10,
        }));

        const searchInput = (e:any) =>{
            parameter.name = e.target.value
        }

        const searchDesc = (e:any) =>{
            parameter.desc = e.target.value
        }
        
        const handleSearch = () =>{
            getData(parameter)
        }
        
        const handleChange = (record: Record<string, number>) => {
            console.log('record',record)
            
        };

        const handleCreate = ()=>{
            type.value = 'create' 
            visible.value = true
        }

        //编辑
        const handleEdit = (record: Record<string, number>) =>{
            type.value = 'edit' 
            visible.value = true
            projectInfo.value = record
        } 


        //删除
        const sysDictTypeDelete = (record: Record<string, number>) =>{
            console.log('sysDictTypeDelete-record',record)
        } 
      
        //设置默认模版
        const setDefaultTemplate = (record: Record<string, number>) =>{
            console.log('setDefaultTemplate',record)
        } 

      return {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },

        type,
        dataSource,
        columns,
        loading,
        pagination,

        searchInput,
        searchDesc,

        handleSearch,
        handleChange,
        handleCreate,

        handleEdit,
        sysDictTypeDelete,
        setDefaultTemplate,
      };
    },
});
</script>
<style lang="scss" scoped>

</style>