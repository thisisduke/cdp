import { RouteRecordRaw } from "vue-router";
import BasicLayout from '@/layouts/BasicLayout/index.vue'

export const sysRouter: Array<RouteRecordRaw> = [
    {
        path: "/sys-user",
        component: BasicLayout,
        meta: { title: "用户管理" },
        name: "sysUser",
        redirect: '/sys-user/list',
        children: [
            {
                path: "list",
                name: 'sys-user',
                component: () => import("@/views/sys/user/index.vue"),
            },
        ],
    },
    {
        path: "/sys-menu",
        component: BasicLayout,
        meta: { title: "菜单管理" },
        name: "sysMenu",
        redirect: '/sys-menu/list',
        children: [
            {
                path: "list",
                name: 'sys-menu',
                component: () => import("@/views/sys/menu/index.vue"),
            },
        ],
    },
    {
        path: "/sys-role",
        component: BasicLayout,
        name: "sysRole",
        meta: { title: "角色管理" },
        redirect: '/sys-role/list',
        children: [
            {
                path: "list",
                name: 'sys-role',
                component: () => import("@/views/sys/role/index.vue"),
            },
        ],
    },
    {
        path: "/sys-dept",
        component: BasicLayout,
        meta: { title: "部门管理" },
        name: "sysDept",
        redirect: '/sys-dept/list',
        children: [
            {
                path: "list",
                name: 'sys-dept',
                component: () => import("@/views/sys/dept/index.vue"),
            },
        ],
    },
    {
        path: "/sys-dict",
        component: BasicLayout,
        meta: { title: "字典管理" },
        name: "sysDict",
        redirect: '/sys-dict/list',
        children: [
            {
                path: "list",
                name: 'sys-dict',
                component: () => import("@/views/sys/dict/index.vue"),
            },
        ],
    },
]

export const dashboardRouter: Array<RouteRecordRaw> = [
    {
        path: "/dashboard",
        component: BasicLayout,
        name: "dashboard_analysis",
        meta: { title: "数据分析页" },
        redirect: '/dashboard/analysis',
        children: [
            {
                path: "analysis",
                name: 'dashboard_analysis',
                component: () => import("@/views/dashboard/analysis.vue"),
            },
        ],
    },
    {
        path: "/dashboard",
        component: BasicLayout,
        name: "table-list",
        meta: { title: "表格" },
        redirect: '/dashboard/table-list',
        children: [
            {
                path: "table-list",
                name: 'table-list',
                component: () => import("@/views/dashboard/table-list.vue"),
            },
        ],
    },
];

export const dmpRouter: Array<RouteRecordRaw> = [
    {
        path: "/dmp/project",
        component: BasicLayout,
        name: "projectManage",
        meta: { title: "画像应用", single:true },
        redirect: '/dmp/project/newProject',
        children: [
            {
                path: "newProject",
                name: 'dmp_newProject',
                meta: { title: "新增项目" },
                component: () => import("@/views/dmp/project/newProject.vue"),
            },
            {
                path: "listProject",
                name: 'dmp_listProject',
                meta: { title: "项目列表" },
                component: () => import("@/views/project/ListProject.vue"),
            },
            {
                path: "template",
                name: 'dmp_template',
                meta: { title: "画像模版" },
                component: () => import("@/views/dmp/userPortrait/index.vue"),
            },
        ],
    },
    {
        path: "/dmp/labelService",
        component: BasicLayout,
        name: "serviceManage",
        meta: { title: "服务管理", single:true },
        redirect: '/dmp/labelService/edit',
        children: [
            {
                path: "edit",
                name: 'dmp_service_edit',
                meta: { title: "新增服务" },
                component: () => import("@/views/dmp/labelService/edit.vue"),
            },
            {
                path: "index",
                name: 'dmp_service_index',
                meta: { title: "画像模版" },
                component: () => import("@/views/dmp/labelService/edit.vue"),
            },
        ],
    },
    {
        path: "/dmp/persona",
        component: BasicLayout,
        name: "userPortrait",
        meta: { title: "用户洞察", single:true },
        redirect: '/dmp/persona/signal-persona/search',
        children: [
            {
                path: "/dmp/persona/signal-persona/search",
                name: 'persona_search',
                meta: { title: "用户搜索" },
                component: () => import("@/views/dmp/persona/signal-persona/search.vue"),
            },
            {
                path: "/dmp/persona/group/:id",
                name: 'dmp_persona_group',
                meta: { title: "用户画像" },
                component: () => import("@/views/dmp/persona/group.vue"),
            },
        ],
    },
    {
        path: "/dmp/label",
        component: BasicLayout,
        name: "labelManage",
        meta: { title: "标签管理", single:true },
        redirect: '/dmp/label/newLabel',
        children: [
            {
                path: "newLabel",
                name: 'dmp_newLabel',
                meta: { title: "新增标签" },
                component: () => import("@/views/dmp/label/newLabel.vue"),
            },
            {
                path: "viewLabel",
                name: 'dmp_viewLabel',
                meta: { title: "标签概览" },
                component: () => import("@/views/dmp/label/viewLabel.vue"),
            },
            {
                path: "listLabel",
                name: 'dmp_listLabel',
                meta: { title: "标签列表" },
                component: () => import("@/views/dmp/label/listLabel.vue"),
            },
        ],
    },

    {
        path: "/dmp/event",
        component: BasicLayout,
        meta: { title: "事件管理", single:true },
        redirect: '/dmp/event',
        name: "EVENT_MANAGE",
        children: [
            {
                path: "index",
                name: 'EVENT_LIST',
                meta: { title: "事件列表" },
                component: () => import("@/views/dmp/event.vue"),
            },
            {
                path: "dim",
                name: 'EVENT_DIM',
                meta: { title: "维度表" },
                component: () => import("@/views/dmp/dim.vue"),
            },
            {
                path: "params",
                name: 'event_params',
                meta: { title: "事件属性" },
                component: () => import("@/views/dmp/event/params.vue"),
            },
        ],
    }
    
];

