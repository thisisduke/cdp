<template>
  <Header class="layout-header-box">
    <div class="logo">
        <img src="@/assets/logo.png"/>
        <span class="title">CDP</span>
    </div>
    <Menu
        theme="dark"
        mode="horizontal"
        class="head-menu"
        v-model:selectedKeys="selectedKeys">
        <Item 
          v-for="item in applicationList" 
          :key="item.id"
          @click="clickMenuItem(item.id)">
          {{ item.title }}
        </Item>
        
    </Menu>
    <div class="head-user">
      <Dropdown placement="bottomLeft">
        <div class="ant-dropdown-link">
          <Avatar 
          :size="28"
          src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
          />
          <span class="username">{{name}}</span>
        </div>
        <template #overlay>
          <Menu @click="clickLogout">
            <Item key="out"> 退出登录 </Item>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </Header>
</template>
<script lang="ts">
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, VNodeChild, computed, Ref, ref, inject } from "vue";
import { useRouter } from "vue-router";
import { message, Layout, Avatar, Affix, Dropdown, Menu, Select  } from "ant-design-vue";
import { sysRouter, dashboardRouter, dmpRouter } from '@/router/config'
import { useStore } from 'vuex';
const { Header } = Layout

interface MenuInfo {
  key: string;
  keyPath: string[];
  item: VNodeChild;
  domEvent: MouseEvent;
}

const { Item } = Menu;
const { Option } = Select

export default defineComponent({
  components: {
    Header,
    Avatar,
    Affix,
    Dropdown,
    Menu,
    Item,
    Select,
    Option,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DownOutlined,
  },
  props:{
    change:Function,
    asider:Function,
  },
  setup(props,{emit}) {
    const router = useRouter();
    const store = useStore()
    const selectedKeys = ref(['16'])
    const name = computed(()=>store.state.user.info.name)
    const applicationList = computed( () => store.state.application.applicationList )

    

    /**
     * 应用搜索框变更
     */
    const clickMenuItem = (value:any) =>{

      let routePath:string = ''
      switch (value) {
        case 1:
          routePath = 'sysUser' 
          break;
        case 2:
          routePath = 'dashboard_analysis' 
          break;
        case 16:
          routePath = 'projectManage' 
          break;
      }
      store.dispatch('SetApplicationCode', value)
      store.dispatch('GenerateRoutes', { applicationCode: value })
      router.push({ name: routePath })

    }

    const clickLogout = ({ key }: MenuInfo) => {
      if (key == "out") {
        store.dispatch('user/Logout').then(() => {
          router.push("/user/login");
          message.success("退出登录成功");
        })
      }
    };

    

    return {
      name,
      applicationList,
      selectedKeys,
      clickLogout,
      clickMenuItem,
    };
  },
  
});
</script>
<style lang="scss" scoped>
.layout-header-box{
    padding: 0;
}
.logo {
    width: 200px;
    height: 64px;
    text-align: center;
    float: left;
    img{
      width:28px;
      height: 28px;
      position: relative;
      right:12px
    }
    .title {
        font-size: 20px;
        color: #fff;
        display: inline-block;
        font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top:2px;
    }
}
.head-user{
    position:fixed;
    right:0;
    top:0;
    .ant-dropdown-link{
        display: inline-block;
        height: 100%;
        padding: 0 12px;
        cursor: pointer;
    }
    .username{
        display: inline-block;
        margin:0 8px;
        color: rgba(225,225,225,.95);
        font-size: 14px;
    }
}
</style>
