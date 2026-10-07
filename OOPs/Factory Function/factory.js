function studentGenerator(StudentrollNo, Studentname, Studentclass) {
  const student = {
    StudentrollNo,
    Studentname,
    Studentclass,
    isPresent() {
      console.log(`${Studentname} is Present`);
    },
  };
  return student;
}

const shashikant = studentGenerator(1, "Shashikant", 12);
shashikant.isPresent(); 
