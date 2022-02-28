<template>
    <Row :gutter="24">
      <Col :md="5" :sm="24" >
        <Card :bordered="false" :loading="treeLoading">
            <div v-if="projectTree.length > 0">
              <Tree
                style="scroll:true"
                :treeData="projectTree"
                v-if="projectTree.length"
                @select="handleClick"
                :defaultExpandAll="true"
                :defaultExpandedKeys="defaultExpandedKeys"
                :replaceFields="replaceFields"
              />
            </div>
            <div v-else>
              <Empty :image="simpleImage"/>
            </div>
        </Card>
      </Col>
      
      <Col :md="19" :sm="24">
        <PortraitTable />
      </Col>
    </Row>
  
</template>

<script lang="ts">
import { defineComponent, watch, ref, onMounted } from 'vue';
import { Table, Form, Input, Button, Space, Row, Col, Tag, Divider, Empty, Card, Tree } from 'ant-design-vue';
import { treeProjectList } from '@/api/dmp/portraitTemplate'
import PortraitTable from './portraitTemplate/ListTemplate.vue'

export default defineComponent({
  components:{
    Row,
    Col,
    Card,
    Tree,
    PortraitTable
  },
  setup() {
    const projectTree = ref([])
    const treeLoading = ref(false)

    const replaceFields = {
          key: 'id',
          title: 'name',
          children:'children'
    }


    onMounted(() => {
      getData()
    })

    const getData = () =>{
        treeLoading.value = true
        treeProjectList({}).then((res:any)=>{
  
          if(res.status == 200){
            projectTree.value = res.result
          }
          
        })
    }

    const onContextMenuClick = (treeKey: string, menuKey: string) => {
      console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`);
    };
    const expandedKeys = ref<string[]>(['0-0-0', '0-0-1']);

    watch(expandedKeys, () => {
      console.log('expandedKeys', expandedKeys);
    });
    return {
      projectTree,
      replaceFields,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      
      onContextMenuClick,
      expandedKeys
    };
  },
});
</script>
<style lang="scss" scoped>
</style>