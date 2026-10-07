// By Convention constructor dont return anything and its name start with capital

function Student(roll, name) {
  ((this.name = name), (this.roll = roll));
}

//
let s1 = new Student(1, "Akash");
let s2 = new Student(2, "Rajat");
let s3 = new Student(3, "Sk");

const students = [s1, s2, s3];

students.forEach((student) => {
  console.log(student.name);
});

/* new operator use krne se new instance of that perticular object create hota hai 

agr new use kiye bina this ko print krte haito this ki value me winddow ayega aur agr new ka use kr ke object bna ke fir this ko print krege to waha this ka mtlb wahi object jo bnai hai new wahi this ki value hogi*/
