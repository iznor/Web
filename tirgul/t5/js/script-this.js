var fullname ="John Doe";

var obj ={
    fullname: "Colin Ihrig",
    foo:{
        fullname: "Aurelio De Rosa",
        getFullName: function(){
            return this.fullname;
        },
    },
}

console.log(obj.foo.getFullName());

var test = obj.foo.getFullName; //gets the code of the function, not the return value

// same like writing it this way:
// var test = function(){
//     return this.fullname;
// }

console.log(test());
