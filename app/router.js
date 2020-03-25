module.exports = app => {
    const { router, controller } = app;
    router.resources('/user', controller.user);
    // router.post('/', controller.user.create);
    // router.put('/', controller.user.update);
    
    router.get('/info', controller.login.info);
    router.get('/login_fail', controller.login.loginFail);
    router.get('/logout', controller.login.logout);
    router.post('/login', app.passport.authenticate('local', { 
        successRedirect: '/info',
        failureRedirect: '/login_fail'
     }));
};