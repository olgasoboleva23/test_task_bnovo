import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

import Home from '../views/Home.vue'
import Edit from '../views/Edit.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/edit/:id', component: Edit },
    // { path: '/new', component: Edit },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;
