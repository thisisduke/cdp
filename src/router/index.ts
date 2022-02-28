
import { createRouter, createWebHashHistory, RouteRecordRaw, RouterOptions } from "vue-router";
import UserLayout from '@/layouts/UserLayout/index.vue'

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: '/user/login' },
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/login/index.vue')
      },
    ]
  },
  {
    path: "/error",
    component: () => import("@/views/error/index.vue"),
  },
];


const router = createRouter({
  history: createWebHashHistory(),
  routes,
} as RouterOptions ) ;





export default router;


