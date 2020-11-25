module.exports = (app) => {
    let user = require('../User.js');
    //app.get("/getAUser/:emailid",user.getAUser);
    //app.post('/getCurrentUser', user.getCurrentUser);
    
    //app.post('/signUp', user.addUser);

    app.get('/login', user.login);
    app.put('/changePassword', user.changePassword);
    app.post('/register', user.register);
    app.post('/revenueDetails', user.InsertRevenueDetails);
    //app.put('/changePassword', user.changePassword);

    //app.put('/forgotPassword', user.forgotPassword);

    //app.delete('/deleteUser/:emailId', user.deleteUser);

    
}