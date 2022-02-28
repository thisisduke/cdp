<template>
  <Menu
    theme="dark"
    mode="inline"
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
  >
    <template v-for="items in serviceRouter" :key="items.name">
      
      <!-- 存在children子菜单 -->
      <SubMenu
        v-if="items.children && items.children.length > 1"
        :key="items.name"
      >
        <template v-slot:title>
          <span>
            <!-- <icon-font style="font-size: 24px" :type="items.meta.icon" /> -->
            <span>{{ items.meta.title }}</span>
          </span>
        </template>
        <!-- 子菜单 -->
        <Item
          v-for="item in items.children"
          :key="item.name"
          @click="clickMenuItem(item.name)"
        >
          <!-- <icon-font style="font-size: 24px" :type="item.meta.icon" /> -->
          <span>{{ item.meta.title }}</span>
        </Item>
      </SubMenu>

      <!-- 单独菜单 -->
      <Item v-else 
      :key="items.name"
      @click="clickMenuItem(items.name)">
        <!-- <icon-font style="font-size: 24px" :type="items.meta.icon" /> -->
        <span>{{ items.meta.title }}</span>
      </Item>
    </template>
  </Menu>
</template>
<script lang="ts">
import storage from 'store'
import { UserOutlined, VideoCameraOutlined, UploadOutlined, createFromIconfontCN } from "@ant-design/icons-vue";
import { computed, defineComponent, inject, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Menu } from 'ant-design-vue';
import { useStore } from 'vuex';

const { Item, SubMenu } = Menu;

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2721951_wu6a3oemgri.js",
});

export default defineComponent({
  components: {
    Menu,
    Item,
    SubMenu,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    IconFont,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore()
    
    const selectedKeys = ref([route.name])
    const openKeys = ref([route.matched[0].name]);
    console.log('route',route.matched[0].name)
    const serviceRouter = computed(()=>store.state.permission.addRoute)

    watch(() => route.name,(to) =>{
      selectedKeys.value = [route.name]
    })

    const clickMenuItem = (key:any) =>{
      console.log('key',key)
      if(router.hasRoute(key)){
        router.push({name:key})
      } else {
        router.push({name:'error'})
      }
      
    }

    return {
      openKeys,
      selectedKeys,
      serviceRouter,
      clickMenuItem,
      route,
    };
  },
  
});
</script>
<style lang="scss" scoped>
.layout-sider-box {
  width:200px;
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
}
</style>
