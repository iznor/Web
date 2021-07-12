function setAllVals(){
    // <!-- bad examples -->
		// var x;
		// console.log(x);
		// x=5;
		// console.log(x);
		// var x =1;
// <!-- good example -->
        var x =1;   
		console.log(x);
        console.log(getIt());
        function getIt(){
            return 2;
        }
}