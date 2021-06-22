function checkSessionAuth(req,res,next){
    if(req.session.user) next();
    else 
    return res.redirect('/users/login');
    next();
}
module.exports = checkSessionAuth;