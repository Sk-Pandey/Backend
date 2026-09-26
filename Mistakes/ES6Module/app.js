import peoples from "./data.js";
import validator from "./checkEligibility.js";

peoples.forEach((person) => {
  validator(person.name, person.age);
});
