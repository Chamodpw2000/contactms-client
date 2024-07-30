export default function validationEditContact(values){


    let errors = {}

    errors.email = ""
    errors.phone = ""
    errors.name=""


    
    

    
    if(values.name === ''){
        errors.name = "Name is required"
    } else if (values.name.length < 3 || values.name.length > 30){
        errors.name = "Name must be between 3 and 30 characters"
    
    }

 
    
    
    if(values.email!==""){


    
    if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email = "Email is invalid"
    }


}



if(values.phone !==""){
    if (!/^[0-9]{10}$/.test(values.phone)){
        errors.phone = "Not a Valid Phone Number" 
    }

}

console.log(errors)
    return errors;
    
    }