import VueRouter from "vue-router";

// router setup
import routes from "./routes";


function isLoggedIn() {

    return localStorage.getItem("auth")
    
}

const router = new VueRouter({
    routes, // short for routes: routes
    linkExactActiveClass: "nav-item active",
    mode: 'hash'
});


router.beforeEach((to, from, next) => {


    if (to.path != '/login' &&!isLoggedIn() ) {
      
        next({
            path: "/login",            
        });
        
    }

    if (to.matched.some(record => record.meta.authOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({
                path: "/dashboard",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

export default router;