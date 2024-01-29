export const createUserValidation = {
    username : {
        isLength : {
           options : {
            min : 5,
            max:32
           },
           errorMessage : "Username contains only min 5 and max 32 character"
        },
        notEmpty : {
            errorMessage : 'Username cannot be empty'
        },
        isString : {
            errorMessage : 'Username must be string '
        },


    },
    surname :{
        notEmpty : true
    }
}