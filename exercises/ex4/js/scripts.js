function CheckPhone(inputtxt) {
    var phone = /^[0-9-+]{10,13}$/;
    if (inputtxt.value.match(phone)) {
        console.log('Success');
        return true;
    }
    else {
        alert('Wrong Phone # 13 digits maximum, only numbers[0-9], "-", "+" allowed');
        return false;
    }
}
