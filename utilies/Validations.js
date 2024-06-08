//Validate Email
export const isValidEmail = (stringEmail) => {
    return (
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(stringEmail)
    )
}
//Validate Password
export const isValidPassword = (stringPassword) => {
    return (
          stringPassword.length >= 6
    )
}