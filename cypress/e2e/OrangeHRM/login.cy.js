

import LoginPage  from "../../support/POM/loginPage";
describe('OrangeHRM Login Tests using POM', () => {
    const validUsername = 'Admin';
    const validPassword = 'admin123';
    const invalidUsername = 'InvalidUser';
    const invalidPassword = 'InvalidPass';
// create class object
const loginPage = new LoginPage()
    beforeEach(() => { 
        // Visit URL before Each testcase
      cy.visit('/login');
    });
  
    it('Should login successfully with valid credentials', () => {
      loginPage.getUsername(validUsername);
      loginPage.getPassword(validPassword);
      loginPage.clickLoginButton();
      cy.wait(1000)
      cy.url('include',"dashboard")
  
    });
  
    it('Should show an error for invalid username and valid password', () => {
      loginPage.getUsername(invalidUsername);
      loginPage.getPassword(validPassword);
      loginPage.clickLoginButton();
  
      loginPage.validateInvalidCredentialsMessage();
    });
  
    it('Should show an error for valid username and invalid password', () => {
      loginPage.getUsername(validUsername);
      loginPage.getPassword(invalidPassword);
      loginPage.clickLoginButton();
  
      loginPage.validateInvalidCredentialsMessage();
    });
  
    it('Should show an error for invalid username and password', () => {
      loginPage.getUsername(invalidUsername);
      loginPage.getPassword(invalidPassword);
      loginPage.clickLoginButton();
  
      loginPage.validateInvalidCredentialsMessage();
    });
  
    it('Should not proceed with empty username and password fields', () => {
      loginPage.clickLoginButton();
  
      loginPage.getValidateRequiredMessage('username');
      loginPage.getValidateRequiredMessage('password');
    });
  
    it('Should not proceed with only username filled', () => {
      loginPage.getUsername(validUsername);
      loginPage.clickLoginButton();
  
      loginPage.getValidateRequiredMessage('password');
    });
  
    it('Should not proceed with only password filled', () => {
      loginPage.getPassword(validPassword);
      loginPage.clickLoginButton();
  
      loginPage.getValidateRequiredMessage('username');
    });
    it('Should check the placeholder message text', () => {
      cy.get('[name="username"]').should('have.attr', 'placeholder', 'Username');
      cy.get('[name="password"]').should('have.attr', 'placeholder', 'Password');

        
      });
      it('Should navigate to Forgot Password page successfully', () => {
      loginPage.getForgotPasswordLink();
      });
      it.only('Should display an error for an empty username field', () => {
        loginPage.getForgotPasswordLink();
       loginPage.getRestButton()
       loginPage.getValidateRequiredMessage('Required')
      });
    
    
  });