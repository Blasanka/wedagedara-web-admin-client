const isEmpty = string => {
  if (string.trim() === "") return true;
  else return false;
};

// const isEmail = email => {
//   const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//   if (email.match(emailRegEx)) return true;
//   else return false;
// };

exports.validateFormData = data => {
  const errors = {};
  const message = "Must not be empty!";

  if (isEmpty(data.name)) errors.name = message;
  if (isEmpty(data.description)) errors.description = message;

  if (data.image_url !== undefined && isEmpty(data.image_url))
    errors.image_url = message;

  if (data.location !== undefined && isEmpty(data.location))
    errors.location = message;

  if (data.duration !== undefined && isEmpty(data.duration))
    errors.duration = message;

  if (data.cause !== undefined && isEmpty(data.cause)) errors.cause = message;

  if (data.solution !== undefined && isEmpty(data.solution))
    errors.solution = message;

  if (data.medication_goods !== undefined && isEmpty(data.medication_goods))
    errors.medication_goods = message;

  if (data.prepare_method !== undefined && isEmpty(data.prepare_method))
    errors.prepare_method = message;

  if (data.phone_number !== undefined) {
    if (isEmpty(data.phone_number)) errors.phone_number = message;
    if (data.phone_number.length < 9)
      errors.phone_number = "Cannot be less than 9 characters";
    else if (!data.phone_number.match(/^[0-9]+$/))
      errors.phone_number = "Enter a valid telephone number";
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};
