const buttons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.page');

buttons.forEach(button => {
    button.addEventListener('click',()=>{
        const targetId = button.getAttribute('data-target');
        
        //remove ative class from all buttons
        buttons.forEach(btn => btn.classList.remove('active'));

        //add active to clicked button
        button.classList.add('active');

        //hide all secitons
        sections.forEach(secition => secition.classList.add('hidden'));

        //show target section
        const targetSection = document.getElementById(targetId);
        if(targetSection){
            targetSection.classList.remove('hidden');
        }
    });
});