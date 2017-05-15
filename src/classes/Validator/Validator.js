import validator from 'validator';

// TODO(refactor): use class instead of functions

export const verifyPhone = (phone) => {
  let error = {message: ''};
  let verify = true;

  if (!validator.isMobilePhone(phone, 'zh-CN')) {
    verify = false;
    error = {message: '请输入正确的手机号码'};
  }
  return {verify, error};
};

export const verifyCaptcha = (captcha) => {
  let error = {message: ''};
  let verify = true;

  if (captcha.length !== 4 || !validator.isNumeric(captcha)) {
    verify = false;
    error = {message: '请输入正确的验证码'};
  }
  return {verify, error};
};

export const verifyProtocol = (agreeProtocol) => {
  let error = {message: ''};
  let verify = true;

  if (!agreeProtocol) {
    verify = false;
    error = {message: '须同意并遵守用户协议'};
  }
  return {verify, error};
};

export const verifyEmail = (email) => {
  let error = {message: ''};
  let verify = true;

  if (!validator.isEmail(email)) {
    verify = false;
    error = {message: '请输入正确的邮箱地址'};
  }
  return {verify, error};
};

export const verifyPassword = (password) => {
  let error = {message: ''};
  let verify = true;

  if (!(/^[0-9a-zA-Z_]{6,}$/).test(password)) {
    verify = false;
    error = {message: '密码须为6位及以上的数字、字母或下划线的组合'};
  }
  return {verify, error};
};

export const verifyRePassword = (password, rePassword) => {
  let error = {message: ''};
  let verify = true;

  if (password !== rePassword) {
    verify = false;
    error = {message: '两次输入的密码不匹配'};
  }
  return {verify, error};
};
