<template>
  <Layout style="width:100%;height:100%">
    <layoutHeader />
    <Layout>
        <Sider class="layout-sider-box">
          <layoutAsider />
        </Sider>
      
      <Layout style="padding: 0 24px 24px">
        <Breadcrumb style="margin: 16px 0">
          <Item>首页</Item>
          <Item  v-for="(item,index) in breadcrumbList" :key="index">
            {{item.meta.title}}
          </Item>
        </Breadcrumb>
        <Content class="layout-content-box">
          <router-view></router-view>
          <!-- <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view> -->
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>
<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { Layout, Breadcrumb } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import layoutAsider from "./LayoutAsider.vue";
import layoutHeader from "./LayoutHeader.vue";
import Template from "@/views/dmp/project/template.vue";

const { Header, Sider, Content} = Layout;
const { Item } = Breadcrumb
export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute()
    const breadcrumbList = ref(route.matched)
    const parentRoute = ref(route.path.substr(0, route.path.lastIndexOf("/", route.path.length-1)))
    
    const serviceRouter = computed(()=>store.state.permission.addRoute)

    watch(() => route.matched,(to) =>{
      breadcrumbList.value = route.matched
    })

    return {
      route,
      parentRoute,
      serviceRouter,
      breadcrumbList
    };
  },
  components: {
    Layout,
    Header,
    Content,
    Sider,
    Breadcrumb,
    Item,
    layoutAsider,
    layoutHeader,
    Template,
  },
});
</script>
<style lang="scss" scoped>



.layout-content-box {
  background: #f0f2f5;
  
}
.asider-null{
  margin-left: 80px;
  transition: all .3s;
}
.asider{
  margin-left: 200px;
  transition: all .3s;
}

.show-enter-active,
.show-leave-active {
  transition: all 0.3s;
}
.show-enter-from,
.show-leave-to {
  opacity: 0;
}
</style>
