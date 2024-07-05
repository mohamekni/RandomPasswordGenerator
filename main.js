const lengthSlide = document.querySelector('.pass_length input')
generateBtn = document.querySelector('.generate-btn')
options = document.querySelectorAll('.options input')
inputBox = document.querySelector(".input_box input")
passwordInput = document.querySelector(".input_box input")
passIndicator = document.querySelector(".pass_indicator")
copyIcon = document.querySelector(".input_box span")



const character = {
    lowercase : "abcdefjhigklmnopqrstuvwxyz",
    uppercase : "ABCDEFJHIGKLMNOPQRSTUVWXYZ",
    number : "0123456789",
    symbols : "^!%$&[]|(){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = ""
    randomPassword = ""
    passLength = lengthSlide.value
    duplicate = false
    options.forEach((option) => {
    if(option.checked){
        if(option.id !== "exc_duplicate" && option.id !== "spaces"){
                staticPassword += character[option.id]
        }else if (option.id === "spaces"){
                staticPassword += `  ${staticPassword}`
        }else {
            duplicate = true
        }
        
        }
    });

    for(let i=0 ; i<passLength ; i++){
        let randomChar =  staticPassword[Math.floor(Math.random() * staticPassword.length)]
        if(duplicate){
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--
        }else{
            randomPassword += randomChar
        }
    }
    passwordInput.value = randomPassword
}

const updateIndicator = () => {
    passIndicator.id = lengthSlide.value <= 8 ? "faible" : lengthSlide.value <= 16 ? "medium" : "Strong"
}



// pass value slide value in counter text
const updateSlide = () => {
    document.querySelector('.pass_length span').innerText = lengthSlide.value
    generatePassword()
    updateIndicator()
}
updateSlide()

const coppy = () =>{
    navigator.clipboard.writeText(passwordInput.value)
    copyIcon.innerText = "check"
    setTimeout(()=>{
        copyIcon.innerText = "copy_all" ;
    },1500)
}

lengthSlide.addEventListener('input', updateSlide);
generateBtn.addEventListener('click', generatePassword);
copyIcon.addEventListener('click', coppy);

