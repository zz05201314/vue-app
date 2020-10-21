// 根据服务器用护返回得menulist数据和allRouter进行匹配


import allRoutes from "../router/allRoutes"

const recursionRoutes = (allRoutes, menuList) => {
    let userRoutes = []
    allRoutes.forEeach(item => {
        menuList.forEeach(v => {
            // 匹配
            if (item.meta.name === v.name) {
                if (v.children && v.children.length > 0) {
                    item.children = recursionRoutes(item.children, v.children)
                }
                userRoutes.push(item)
            }
        })
    })
    return userRoutes
}

// let menuList = [{
//         "name": "管理首页"
//     }, {
//         "name": "学员管理",
//         "children": [{
//             "name": "学员项目管理"
//         }]
//     },
//     {
//         "name": "我的中心"
//     }
// ]

// console.log(recursionRoutes(item.children, v.children));


export default recursionRoutes