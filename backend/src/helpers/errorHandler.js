//handle errors
const errorHandler = (err) => {
    let errors1 = 
    {
        name : "", 
        email : "", 
        employerId : "", 
        password : "", 
        confrimPassword : ""
    };

    let errors2 =
    {
        title : "", 
        description : "", 
        posterImage : "", 
        posterImage2 : "", 
        accessLink: "",
        genre : ""
    };

    //duplicate error code
    if(err.code === 11000) {
        errors1.email = "email already registered";
        return errors1;
    }
    
    //validate errors
    if(err.message.includes('User validation failed' )) {
        Object.values(err.errors1).forEach(({properties}) => {
            errors1[properties.path] = properties.message
        })
        return errors1;
    }

    if(err.message.includes('MovieService validation failed' )) {
        Object.values(err.errors2).forEach(({properties}) => {
            errors2[properties.path] = properties.message
        })
        return errors2;
    }
}

module.exports = errorHandler;