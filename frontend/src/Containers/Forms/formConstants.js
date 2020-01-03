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
        placeholder: "JohnDoe",
        id: "signUpUsername",
        className: "signUpAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "firstName",
        type: "text",
        placeholder: "John",
        id: "firstName",
        className: "signUpAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "lastName",
        type: "text",
        placeholder: "Doe",
        id: "lastName",
        className: "signUpAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "occupation",
        type: "text",
        placeholder: "FreeLancer",
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
        className: "signUpAttributes"
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
        placeholder: "John Doe",
        id: "signUpUsername",
        className: "signUpAttributes",
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
        className: "loginAttributes"
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
        placeholder: "Food",
        id: "category",
        className: "addExpenseAttributes",
        isHidden: false,
        isRequired: "required"
    },
    {
        name: "itemName",
        type: "text",
        placeholder: "Cakes",
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
        id: "addExpense",
        className: "addExpenseAttributes"
    }

];

//export the module
export default formConstants;