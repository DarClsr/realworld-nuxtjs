

// 配置文件

module.exports = {
    plugins: ['~/plugins/http.js', '~/plugins/dayjs.js'],
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
                    path: "/editor/:id?", 
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
    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'description' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } // 配置favicon.ico，需要将图片放到static目录下
        ]
    },
    server: {
        host: "0.0.0.0",
        port: 3553
    }
}