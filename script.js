const lengthSlider = document.querySelector(".pass-length input")
generateBtn = document.querySelector(".generate-btn")
options = document.querySelectorAll(".option input")
const passwordInput = document.querySelector(".input-box input")
const passIndicator = document.querySelector(".pass-indicator")
const copyIcon = document.querySelector(".input-box span")

const characters = { // object of letters, numbers & symbols
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false;
    passLength = lengthSlider.value

    options.forEach(option => {  //looping through each option's checkbox
        if(option.checked) { //if checkbox is checked
            //if checkbox id isn't exx-duplicate && spaces
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                //adding particular key value from character object to staticPassword
                staticPassword += characters[option.id]
            } else if(option.id === "spaces") { // if checkbox id is spaces
                staticPassword += `  ${staticPassword}  `  //adding space at the beginning & end of staticPassword
            } else { // else pass true value to excludeDuplicate
                excludeDuplicate = true
            }
             
            
        }
    })

    for (let i = 0; i < passLength; i++) {
        //getting random character from static password
      let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
       if(excludeDuplicate) { // if excludeDuplicate is true
        //if randomPassword doesn't contains the current random character or randomChar is equal
        //to space " " then add random character to tandomPassword else decrement i by -1
        !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword +=randomChar : i--
       } else { //else add random character to randomPassword
        randomPassword +=randomChar
       }
    }

    console.log(randomPassword)
    passwordInput.value = randomPassword
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong"
}

function updateSlider() {
    //passing slider value as couter text
    document.querySelector(".pass-length span").innerText = lengthSlider.value
    generatePassword()
    updatePassIndicator()
}

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value)
    copyIcon.innerText = "check"

    setTimeout(() => {
        copyIcon.innerText = "copy_all"
    },1500)
}

lengthSlider.addEventListener("input", updateSlider)
generateBtn.addEventListener("click", generatePassword)
copyIcon.addEventListener("click", copyPassword)

updateSlider()


























