/// <reference types="cypress"/>
import automationPractice from "../../support/POM/testautomationpractice/autoamtionpracticePage.cy"
describe("Autoamte all elements on test automation practice page",()=>{
    beforeEach(()=>{
        cy.visit("https://testautomationpractice.blogspot.com/")
    })
    // object of Class 
    const practicePage= new automationPractice()
    it("Automate All GUI Elements",()=>{
        practicePage.firstNameFiled().should('be.visible').type("Automation Engineer",{delay:0})
        practicePage.emailFiled().type("user123@gmail.com",{delay:0})
        practicePage.phoneNumberFiled().should('have.attr',"placeholder","Enter Phone").type("0345889909")
        practicePage.addressFiled().type("Punjab Pakistan",{delay:0})
        practicePage.genderMaleCheckbox().check()
    })
})