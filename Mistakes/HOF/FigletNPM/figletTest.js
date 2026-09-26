import figlet from "figlet";

async function doStuff() {
  const text = await figlet.text("Shashikant    Pandey");
  console.log(text);
}

doStuff();
