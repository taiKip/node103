const verifyRoles = (...allowedRoles)=>{
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(401) //anauthorized;
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log("roles : ",req.roles);
       const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
       if (!result) return res.sendStatus(401);
        next();
}
}

module.exports = verifyRoles;