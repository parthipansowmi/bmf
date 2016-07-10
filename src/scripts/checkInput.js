export function ValidateEmail() {

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(arguments[0])) {
    console.log("valid Email");
    return (true);

  }
  else {
    console.log("Invalid Email");
    //alert("You have entered an invalid email address!");
    return (false);
  }
    
}

export function checkEmpty(data)
{
     
      if (data == '' || data == null)
         alert("Passward cann't Empty - Scripts ");
        
        return true
      
}


