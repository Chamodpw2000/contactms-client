export default function validationEditProfile(values){


    let errors = {}
    

    
    if(values.name === ''){
        errors.name = "Name is required"
    } else if (values.name.length < 3 || values.name.length > 30){
        errors.name = "Name must be between 3 and 30 characters"
    
    }else{
        errors.name = ""
    }
    
    if(values.email === ''){
        errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Email is invalid"
    }else{
        errors.email = ""
    }
    
    return errors;
    
    }