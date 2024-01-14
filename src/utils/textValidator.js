const allValidator = (type, func, event) => {
  let ele = event.currentTarget;
  let regex = null;
  switch (type) {
    case "not-null":
      regex = /^(?!\s*$).+/;
      break;
    case "email":
      regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      break;
    case "password":
      regex = /^(?=.*[0-9])(?=.*[a-z]).{8,20}$/;
      break;

    default:
      regex = /^(?=.*[a-z]).{3,}$/;
      break;
  }
  if (!regex.test(ele.value)) {
    func(true);
    return;
  }
  func(false);
};

export default allValidator;
