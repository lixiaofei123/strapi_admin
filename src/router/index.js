import Vue from "vue";
import Router from "vue-router";

const TheContainer = () => import("@/containers/TheContainer");
const AdminDashboard = () => import("@/views/pages/AdminDashboard");
const Content = () => import("@/views/pages/Content");
const ContentEdit = () => import("@/views/pages/ContentEdit");
const Login = () => import("@/views/pages/Login");

Vue.use(Router);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default new Router({
  mode: "hash",
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: "/",
      redirect: "/dashboard",
      name: "主页",
      component: TheContainer,
      children: [
        {
          path: "dashboard",
          name: "站点面板",
          component: AdminDashboard,
        },{
          path: "content",
          name: "内容列表",
          component: Content
        },{
          path: "contentEdit",
          name: "内容编辑",
          component: ContentEdit
        },
      ],
    },
    {
      path: "/login",
      redirect: "/login",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [,
        {
          path: "/login",
          name: "Login",
          component: Login,
        }
      ],
    },
  ];
}
