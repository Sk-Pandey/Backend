const validator = (name, age) => {
  if (age >= 18) {
    console.log(name, "Your are Eligible to vote");
  } else {
    console.log(name, "You are not eleigible to vote");
  }
};
export default validator;
