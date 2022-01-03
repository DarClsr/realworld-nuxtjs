

// 配置文件

module.exports = {
    plugins:['~/plugins/http.js','~/plugins/dayjs.js'],
    router: {
        linkActiveClass: "active",
        // base: '/app/',
        //   添加自定义路由
        extendRoutes(routes, reslove) {
            routes.splice(0);
            routes.push(...[
                {
                    name: "home",
                    path: "",
                    component: reslove(__dirname, "pages")
                },
                {
                    name: "login",
                    path: "/login",
                    component: reslove(__dirname, "pages/login/index.vue")
                },
                {
                    name: "register",
                    path: "/register",
                    component: reslove(__dirname, "pages/login")
                },
                {
                    name: "profile",
                    path: "/profile/:username",
                    component: reslove(__dirname, "pages/profile")
                },
                {
                    name: "editor",
                    path: "/editor",
                    component: reslove(__dirname, "pages/editor")
                },
                {
                    name: "settings",
                    path: "/settings",
                    component: reslove(__dirname, "pages/settings")
                },
                {
                    name: "article",
                    path: "/article/:id",
                    component: reslove(__dirname, "pages/article")
                }
            ])

        }
    },
    server:{
        host:"0.0.0.0",
        port:3000
    }
}