export const validateEmailField=(input)=>{
    var value = input.target._value;
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(validRegex)) {
     return true;
    } else {
      return  false;
    }
}

export const validatePhoneNumberField=(mobileNo)=>{
    const validationRegex = /^\d{10}$/;
    if (mobileNo.match(validationRegex)) {
    return true;
    } else {
      return false;
    }

}

