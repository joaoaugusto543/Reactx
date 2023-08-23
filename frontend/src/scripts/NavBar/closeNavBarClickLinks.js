import closeNavBar from "./closeNavBar"

function closeNavBarClickLinks(){

    const bind = document.querySelector.bind(document); 

    const elemento = 'body'
    const width = bind(elemento).clientWidth

    if(width<=919){

        const navLinks=document.querySelectorAll('.disabled')
        const navLinkActive=document.querySelector('.active')
        
        if(navLinks && navLinkActive){
            for(let i=0;i<navLinks.length;i++){
                navLinks[i].addEventListener('click',closeNavBar)
            }
        
            navLinkActive.addEventListener('click',closeNavBar)
        }

    }else{
        const navLinks=document.querySelectorAll('.disabled')
        const navLinkActive=document.querySelector('.active')

        if(navLinks && navLinkActive){
            for(let i=0;i<navLinks.length;i++){
                navLinks[i].removeEventListener('click',closeNavBar)
            }
        
            navLinkActive.removeEventListener('click',closeNavBar)
        }
    
    }

    window.addEventListener('resize',closeNavBarClickLinks)
}

export default closeNavBarClickLinks