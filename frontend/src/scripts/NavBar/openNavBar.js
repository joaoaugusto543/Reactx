function openNavBar(){
    const navBar=document.querySelector('nav')
    const buttonOpenNavBar=document.querySelector('.buttonOpenNavBar')
    const buttonCloseNavBar=document.querySelector('.buttonCloseNavBar')

    buttonOpenNavBar.style='display:none;'
    buttonCloseNavBar.style='display:block'

    navBar.style='transform: translateX(0%);'
}

export default openNavBar