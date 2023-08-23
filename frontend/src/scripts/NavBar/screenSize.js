function screenSize(){
    const bind = document.querySelector.bind(document); 

    const elemento = 'body'
    const width = bind(elemento).clientWidth

    const navBar=document.querySelector('nav')
    const buttonOpenNavBar=document.querySelector('.buttonOpenNavBar')
    const buttonCloseNavBar=document.querySelector('.buttonCloseNavBar')
    
    if(width>919){
        if(buttonCloseNavBar && buttonOpenNavBar && navBar){
            buttonOpenNavBar.style=''
            buttonCloseNavBar.style=''      
            navBar.style=''
        }
        
    }

    window.addEventListener('resize',screenSize)

}

export default screenSize