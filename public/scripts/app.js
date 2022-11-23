/*
 * COMP229-015    Group 7
 * Group Project  Part 3 Second Release (Authentication)
 * Project Name:  Survey Donkey
 * 
 * Members (name/student ID):
 * Akash Arora – 300849838
 * Alina Fadeeva – 301249589
 * Nadia Velikaia – 301244426
 * Nithiyavany Vijai – 301212774
 * Terence Chu – 301220117
 * Zhihao Yu – 301305633
 * 
 * File name:     app.js
 * Description:   Client-side script
*/

//Client-side script
//IIFE - Immediately Invoked Function Expression
(function(){
    function Start()
    {
        console.log("App started...");

        let deleteButtons = document.querySelectorAll('.btn-danger')

        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=> {
                if(!confirm("Are you sure you want to delete this survey?")) 
                {
                    event.preventDefault();
                    window.location.assign('/survey-list')
                }
            });
        }
    }
    window.addEventListener("load", Start);
})();