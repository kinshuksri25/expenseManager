var formConstants = {};

formConstants.signup = [

    {
        id: "signUpForm",
        route: '/signUp',
        type: "form",
        method: "POST",
        enctype: "application/x-www-form-urlencoded"
    },
    {
        name: "userName",
        type: "text",
        placeholder: "UserName",
        id: "signUpUsername",
        className: "signUpAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "firstName",
        type: "text",
        placeholder: "FirstName",
        id: "firstName",
        className: "signUpAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "lastName",
        type: "text",
        placeholder: "LastName",
        id: "lastName",
        className: "signUpAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "occupation",
        type: "text",
        placeholder: "Occupation",
        id: "occupation",
        className: "signUpAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "password",
        type: "password",
        placeholder: "*********",
        id: "signUpPassword",
        className: "signUpAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "confirmPassword",
        type: "password",
        placeholder: "*********",
        id: "signUpConfirmPassword",
        className: "signUpAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "SignUp",
        type: "button",
        id: "signUpButton",
        className: "signUpAttributes col-xs-4 col-sm-4 col-md-4 col-lg-4"
    }

];

formConstants.login = [

    {
        id: "loginForm",
        route: '/login',
        type: "form",
        method: "POST",
        enctype: "application/x-www-form-urlencoded"
    },
    {
        name: "userName",
        type: "text",
        placeholder: "UserName",
        id: "signUpUsername",
        className: "loginAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "password",
        type: "password",
        placeholder: "*********",
        id: "loginPassword",
        className: "loginAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "Login",
        type: "button",
        id: "loginButton",
        className: "loginAttributes col-xs-4 col-sm-4 col-md-4 col-lg-4"
    }

];

formConstants.addExpense = [

    {
        id: "addExpenseForm",
        route: '',
        type: "form",
        method: "POST",
        enctype: "application/x-www-form-urlencoded"
    },
    {
        name: "category",
        type: "DropDown",
        placeholder: "Category",
        id: "category",
        className: "addExpenseAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "itemName",
        type: "text",
        placeholder: "Item",
        id: "itemName",
        className: "addExpenseAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "amount",
        type: "number",
        placeholder: "10000",
        id: "amount",
        className: "addExpenseAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "expenseDate",
        type: "date",
        placeholder: "1/1/1999",
        id: "expenseDate",
        className: "addExpenseAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "AddExpense",
        type: "button",
        id: "addExp",
        className: "col-xs-7 col-sm-7 col-md-7 col-lg-7"
    }

];

//export the module
export default formConstants;