function nameValidator(name){
    let validate=name.length>2;
    return validate;
}




function passwordValidator(password){
    var numbers = /[0-9]/g;
    var lowerCase=/[a-z]/g;
    var upperCase=/[A-Z]/g;
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(password.length>8 && password.match(numbers) && password.match(lowerCase) && password.match(upperCase) && password.match(specialChars)){
        return true;
    }
    else{
        return false;
    }
}

function emailValidator(email){
        let length=email.length;
        let countAt=0;
        let countDot=0;
        let dotIndex=email.indexOf('.');
        let atIndex=email.indexOf('@');

        for (let i = 0; i < length; i++) {
            if (email.charAt(i) == '@') {
                countAt++;
            }
            if(email.charAt(i)=='.'){
                countDot++;
            }
        }

        if(countAt>1 || countDot>1){
            return false;
        }
        else if(dotIndex==0 || dotIndex==length-1){
            return false;
        }
        else if(dotIndex<=atIndex+2){
            return false;
        }
        else{
            return true;
        }

}



module.exports={
    nameValidator,
    passwordValidator,
    emailValidator
}
