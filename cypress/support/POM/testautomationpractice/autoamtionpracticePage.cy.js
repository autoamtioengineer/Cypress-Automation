class automationPractice{
    firstNameFiled(){
        return cy.get("#name")
    }
    emailFiled(){
       return  cy.get('#email')
    }
    phoneNumberFiled(){
        return  cy.get('#phone')
     }
     addressFiled(){
        return  cy.get('#textarea')
     }
     genderMaleCheckbox(){
        return cy.get('#male')
     }
     genderFemaleCheckbox(){
        return cy.get('#female')
     }

}
export default automationPractice