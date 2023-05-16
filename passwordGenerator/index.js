const readline = require('readline');
const rl = readline.createInterface(process.stdin,process.stdout);

function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}
async function generatePassword() {
  const length= await askQuestion("Enter the length of the password:- ");
  const numberCheck = await askQuestion("Do you want to include number? (y/n):- ");
  const characterCheck = await askQuestion("Do you want to include special character? (y/n):- ");
  let password ="";
  if(length !== ""){
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const number = "0123456789";
    const character = "`~!@#$%^&*()_+-={}[]|:;<>,.?/";
    while(password.length<length){
        password+=alphabet[Math.floor(Math.random() * 52)];
        if(numberCheck.toLowerCase() === 'y' && password.length<length) {
            password+=number[Math.floor(Math.random() * 10)];
        }
        if(characterCheck.toLowerCase() === 'y' && password.length<length){
             password+=character[Math.floor(Math.random() * 29)];
        }     
    }
    console.log("Your password is "+password);
  }
  else{
    console.log("Length of password cannot be null");
  }
  const additionalQuestion = await askQuestion("Not satisfied!! Do you want to generate password again? (y/n):- ");
  if (additionalQuestion.toLowerCase() === 'y') {
    await generatePassword();
  } else {
    rl.close();
  }
}
generatePassword();