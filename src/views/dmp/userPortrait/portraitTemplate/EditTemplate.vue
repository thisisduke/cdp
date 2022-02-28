<template>
    <Modal
        v-model:visible="modalVisible"
        :title="type == 'create' ? '新增' : '编辑'"
        ok-text="确认"
        cancel-text="取消"
        @ok="onSubmit"
    >
        <Form 
            :label-col="labelCol" 
            :wrapper-col="wrapperCol" 
            :model="formState">
            <FormItem label='业务线' v-bind="validateInfos.businessName">
                <Select
                    v-model:value="formState.businessName" 
                    placeholder="请选择业务线"
                >
                    <Option v-for="item in labelBusinessList" :key="item.id">{{item.nameCn}}</Option>
                </Select>
            </FormItem>
            <FormItem label='项目名称' v-bind="validateInfos.name">
                <Input 
                    type="text"
                    v-model:value="formState.name" 
                    placeholder="请输入项目名称">
                </Input>
            </FormItem>
            <FormItem label='项目描述' v-bind="validateInfos.desc">
                <Input 
                    type="text"
                    v-model:value="formState.desc" 
                    placeholder="请输入项目描述">
                </Input>
            </FormItem>
        </Form>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, UnwrapRef, onMounted, reactive, inject } from "vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { Modal, Form, Select, Input, Button  } from 'ant-design-vue';
import { create, update } from '@/api/project/project'
import { getLabelBusinessList } from '@/api/label/dropdown'

const useForm = Form.useForm;
const FormItem = Form.Item
const Option = Select.Option

interface IFormState {
  businessName: string | undefined;
  name: string;
  desc: string;
}

export default defineComponent({
    components:{
        Modal,
        Form,
        FormItem,
        Select,
        Option,
        Input,
        Button,
    },
    setup(props) {
        const type = inject<Ref<string>>('type')
        console.log('type',type)
        const modalVisible = inject<Ref<boolean>>('visible')
        const labelBusinessList = ref([])
        const formState = reactive({
            businessName: undefined,
            name: "",
            desc: "",
        });

        onMounted(() => {
            getData()
        })

        const getData = () =>{
            getLabelBusinessList()
                .then((res:any) => {
                    labelBusinessList.value = res.result
                })
        }

        const rulesRef = reactive({
            businessName: [
                {
                    required: true,
                    message: "请选择业务线",
                }
            ],
            name: [
                {
                required: true,
                message: "请输入项目名称",
                trigger: 'blur'
                }
            ],
            desc: [
                {
                required: true,
                message: "请输入项目描述",
                trigger: 'blur'
                }
            ],
        })

        const { validate, validateInfos } = useForm(formState, rulesRef);

        const onSubmit = () => {
            validate()
                .then(() => {
                    console.log('提交')
                })
                .catch((error: ValidateErrorEntity) => {
                    console.log("error", error);
                });
            
        }
        return {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },

            type,
            labelBusinessList,
            modalVisible,
            formState,
            validateInfos,
            onSubmit,
        }
    }
})
</script>
<style lang="scss" scoped>

</style>