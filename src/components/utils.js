import bycrypt from "bcryptjs";
export const errorHelper = (formik, value) => ({
  isInvalid: formik.errors[value] && formik.touched[value] ? true : false,
  errorMessage:
    formik.errors[value] && formik.touched[value] ? formik.errors[value] : null,
});
export const passwordHash = async (password) => {
  const salt = await bycrypt.genSalt(10);
  const hash = await bycrypt.hash(password, salt);
  return hash;
};
export const passwordCheck = async (password, hashedpassword) => {
  const valid = await bycrypt.compare(password, hashedpassword);
  return valid;
};
