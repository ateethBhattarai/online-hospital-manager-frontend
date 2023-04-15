import * as Yup from 'yup';


export const patientPasswordChangeSchema = Yup.object({
    current_password: Yup.string().min(8).required("Please enter the current password."),
    new_password: Yup.string().min(8).notOneOf([Yup.ref('current_password'), null], "Password must not match with the old password.").required("Please enter the new password."),
    confirm_password: Yup.string().oneOf([Yup.ref('new_password'), null], "Password must match with the new password.").required("Please enter the confirm password field."),
})

export const patientAccountChangeSchema = Yup.object({
    name: Yup.string().min(2),
    address: Yup.string(),
    dob: Yup.date(),
    phone_number: Yup.number().positive().min(10).max(10).integer(),
    chronic_disease: Yup.string(),
})