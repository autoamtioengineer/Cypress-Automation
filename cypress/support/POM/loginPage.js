class LoginPage{
  
    
    getUsername(username) {
        cy.get('[name="username"]').type(username);
      }
    
      getPassword(password) {
        cy.get('[name="password"]').type(password);
      }
    
      clickLoginButton() {
        cy.get('[type="submit"]').click();
      }
    
      getValidateRequiredMessage() {
        cy.contains('Required').should('be.visible');
      }
    
      validateInvalidCredentialsMessage() {
        cy.contains('Invalid credentials').should('be.visible');
      }
      getForgotPasswordLink(){
        cy.contains('Forgot your password?').click(); // Click on "Forgot your password?" link
        cy.url().should('include', '/auth/requestPasswordResetCode');
        cy.contains('Reset Password').should('be.visible'); // Validate the heading
        
      }
      getRestButton(){
        cy.get('.oxd-button--secondary').click()
      }
      validateErrorMessage(message) {
        cy.contains(message).should('be.visible'); // Validate error message
      }
    
}
export default LoginPage