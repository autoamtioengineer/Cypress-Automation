class automationPractice {
   firstNameFiled() {
      return cy.get("#name")
   }
   emailFiled() {
      return cy.get('#email')
   }
   phoneNumberFiled() {
      return cy.get('#phone')
   }
   addressFiled() {
      return cy.get('#textarea')
   }
   genderMaleCheckbox() {
      return cy.get('#male')
   }
   genderFemaleCheckbox() {
      return cy.get('#female')
   }

   daysCheckbox() {
      return cy.get('input[type="checkbox"]')
   }
   country() {
      return cy.get('select').eq(0)
   }
   colordropdown() {
      return cy.get('#colors')
   }
   sortedList() {
      return cy.get('#animals')
   }
   datepicker1() {
      return cy.get('#datepicker')
   }
   previousArrow() {
      return cy.get('[title="Prev"]')
   }
   monthYear() {
      return cy.get('.ui-datepicker-title')
   }
   datepicker2() {
      return cy.get('#txtDate')
   }
   month() {
      return cy.get('.ui-datepicker-month')
   }
   year() {
      return cy.get('.ui-datepicker-year')
   }
   day() {
      return cy.get('.ui-datepicker-calendar')
   }
   startDate() {
      return cy.get('#start-date')
   }
   enddate() {
      return cy.get('#end-date')
   }
   submitBtn() {
      return cy.get('.submit-btn')
   }
   errorText() {
      return cy.get('#result')
   }
   searchFiled() {
      return cy.get('#Wikipedia1_wikipedia-search-input')
   }
   searchIcon() {
      return cy.get('.wikipedia-search-button')
   }
   searchResult() {
      return cy.get('#Wikipedia1_wikipedia-search-results')
   }
   wikipediaLogo() {
      return cy.get('.wikipedia-icon')
   }
   startBtn() {
      return cy.get('button').contains("START")
   }
   stopBtn() {
      return cy.get('button').contains("STOP")

   }
   simpleAlertBtn() {
      return cy.get('button').contains("Simple Alert")

   }
   confirmationAlertBtn() {
      return cy.get('button').contains("Confirmation Alert")

   }
   promptAlertBtn() {
      return cy.get('button').contains("Prompt Alert")

   }
   alertMessage(){
      return cy.get('#demo')
   }
   popupWindowBtn() {
      return cy.get('button').contains("Popup Windows")

   }
   singleFileBtn(){
     return cy.get('#singleFileInput')
   }
   multiFileBtn(){
      return cy.get('#multipleFilesInput')
   }
   multiFileStatus(){
      return cy.get("#multipleFilesStatus")
   }
   singleFileStatus(){
      return cy.get("#singleFileStatus")
   }
   dubleClickBtn(){
      return  cy.get('button').contains('Copy Text')
   }
   filed2(){
      return  cy.get('#field2')
   }
   draggable(){
      return cy.get('#draggable')
   }
   droppable(){
      return cy.get('#droppable')
   }
   priceRange(){
      return cy.get('#amount')
   }
}
export default automationPractice