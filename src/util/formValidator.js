export default function validate(values, type) {
  let emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //var passFormat = /^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{8,15}$/;
  var passFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  if (type === "email") {
    if (!emailFormat.test(values)) {
      return true;
    } else return false;
  } else if (type === "tel") {
    if (values.length === 10 || values.length === 11) {
      return false;
    } else return true;
  } else if (type === "select-one") {
    if (values === "0") {
      return true;
    } else return false;
  } else if (type === "text") {
    if (values.length === 0) {
      return true;
    } else return false;
  } else if (type === "password") {
    if (!passFormat.test(values)) {
      return true;
    } else return false;
  } else return false;
}
