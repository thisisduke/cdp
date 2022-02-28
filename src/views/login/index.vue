<template>
  <div class="login-container">
    <Form 
      class="user-layout-login" 
      :label-col="labelCol" 
      :wrapper-col="wrapperCol" 
      :model="formState">
      <Tabs
          :activeKey="customActiveKey"
          :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        >
        <TabPane key="account" tab="账号密码登录">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px;"
            message="账户或密码错误（admin/123456 )"/>

          <FormItem v-bind="validateInfos.username">
            <Input 
              size="large"
              type="text"
              v-model:value="formState.username" 
              placeholder="请输入账号">
              <template #prefix>
                <UserOutlined type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </Input>
          </FormItem>
          <FormItem v-bind="validateInfos.password">
            <Input 
              size="large"
              v-model:value="formState.password" 
              type="password" 
              placeholder="请输入密码" 
              @keyup.enter="onSubmit">
              <template #prefix>
                <LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
              </template>
            </Input>
          </FormItem>
        </TabPane>
      </Tabs>
      <FormItem>
        <Checkbox>自动登录</Checkbox>
        <a
          class="forge-password"
          style="float: right;"
        >
          忘记密码
        </a>
      </FormItem>
      <FormItem>
        <Button class="login-button" :loading="loading" type="primary" @click.prevent="onSubmit">确定</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, toRaw, UnwrapRef, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { Form, notification, Input, Button, Tabs, TabPane, Checkbox } from "ant-design-vue";
import { timeFix } from '@/utils/util'
import { encode } from '@/utils/rsa'
import { useStore } from 'vuex';


const useForm = Form.useForm;
const FormItem = Form.Item;

interface IFormState {
  username: string;
  password: string;
}

export default defineComponent({
  components: {
    Form,
    FormItem,
    Input,
    Button,
    Tabs,
    TabPane,
    Checkbox,
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const router = useRouter();
    const customActiveKey = ref('account')
    const store = useStore()
    
    const state = reactive({
      loading: false,
      isLoginError: false,
    })

    const formState: UnwrapRef<IFormState> = reactive({
      username: "",
      password: "",
    });

    const rulesRef = reactive({
      username: [
        {

          required: true,
          message: "请输入帐户名或邮箱地址",
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: 'blur'
        }
      ],
    })

    const { validate, validateInfos } = useForm(formState, rulesRef);

    const Login = (formState:UnwrapRef<IFormState>) =>  store.dispatch('user/Login', formState)
    
    const onSubmit = () => {
      validate()
        .then(() => {
          const loginParams:IFormState  = toRaw(formState)
          loginParams.password = encode(formState.password) as string
          
          try {
            state.loading = true
            Login(loginParams)
              .then((res) => {
                router.push({ path: '/dmp/project' })
                setTimeout(() => {
                  notification['success']({
                    message: '欢迎',
                    description: `${timeFix()}，欢迎回来`
                  });
                }, 1000)
                state.isLoginError = false
                state.loading = false
              })
              .catch(err => {
                notification['error']({
                  message: '错误',
                  description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
                  duration: 4
                })
                state.isLoginError = true
                state.loading = false
              })
          } catch (error) {}
        })
        .catch((error: ValidateErrorEntity) => {
          console.log("error", error);
        });
    };
    return {
      customActiveKey,
      formState,
      ...toRefs(state),
      labelCol: { span: 0 },
      wrapperCol: { span: 24 },
      validateInfos,
      onSubmit,
    };
  },
  
});
</script>

<style lang="scss" scoped>
.login-container{
  max-width: 368px;
  width: 98%;
  .user-layout-login {
    label {
      font-size: 14px;
    }

    

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

  
  }
}
</style>
