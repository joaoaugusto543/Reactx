function closeNavBar(){
    const navBar=document.querySelector('nav')
    const buttonOpenNavBar=document.querySelector('.buttonOpenNavBar')
    const buttonCloseNavBar=document.querySelector('.buttonCloseNavBar')

    buttonOpenNavBar.style='display:block;'
    buttonCloseNavBar.style='display:none'

    navBar.style='transform: translateX(-110%);'

}


export default closeNavBar