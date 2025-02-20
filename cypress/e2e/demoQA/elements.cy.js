/// <reference types="cypress"/>
describe("Automate DemoQA all  Elements", () => {
    beforeEach(() => {
        cy.visit("https://demoqa.com/")

    })
    it("Autoamte textbox", () => {
        cy.get('.category-cards > :nth-child(1)').click()
        cy.get('.menu-list > #item-0').eq(0).click()
        cy.get('#userName').type("Ali Hassan")
        cy.get('#userEmail').type("Test@gmail.com")
        cy.get('#currentAddress').type("LAhore")
        cy.get('#permanentAddress').type("Sargodha")
        cy.get('#submit').click()
        cy.get('.border').should('exist')
    })
    it("Verify Tree Structure Expand and Collapse", () => {
        cy.get('.category-cards > :nth-child(1)').click()
        cy.get('.menu-list > #item-1').contains("Check Box").click() // clcik on Checkbox
        // Clcik on + checkbox 
        cy.get('[title="Expand all"]').click()
        // Verify Desktop, Documents, and Downloads are visible
        cy.contains('Desktop').should('be.visible');
        cy.contains('Documents').should('be.visible');
        cy.contains('Downloads').should('be.visible');
        // Clcik on -  checkbox 
        cy.get('[title="Collapse all"]').click()
        cy.wait(1000)
        // Verify Desktop, Documents, and Downloads are no longer visible
        cy.get('.rct-node-expanded > ol > :nth-child(1) > .rct-text').should('not.exist');
    })
    it("Verify Home Dropdwon icon functionality", () => {
        cy.get('.category-cards > :nth-child(1)').click()

        cy.get('.menu-list > #item-1').contains("Check Box").click() // clcik on Checkbox
        cy.get('[title="Toggle"]').click()
        // Verify Desktop, Documents, and Downloads are visible
        cy.contains('Desktop').should('be.visible');
        cy.contains('Documents').should('be.visible');
        cy.contains('Downloads').should('be.visible');

        cy.get('.rct-checkbox').eq(0).click()
        cy.get('#result').should('exist')
    })
    it("Verify Radio button functionality", () => {
        cy.get('.category-cards > :nth-child(1)').click()
        cy.get('.menu-list > #item-2').contains("Radio Button").click() // clcik on Radio button tab
        cy.get('label[for="yesRadio"]').click();
        cy.wait(500)
        cy.get('.mt-3').should('contain', "Yes")

        cy.get('label[for="impressiveRadio"]').click()
        cy.wait(500)
        cy.get('.mt-3').should('contain', "Impressive")
        cy.get('#noRadio').should('be.disabled')


    })
    it("Verify  buttons  tab functionaality", () => {
        cy.get('.category-cards > :nth-child(1)').click()
        cy.get('.menu-list > #item-4').contains("Buttons").click() // clcik on button tab
        // double clcik button 
        cy.get('#doubleClickBtn').dblclick()
        cy.get('#doubleClickMessage').should('have.text', "You have done a double click")
        // RIght  clcik button 
        cy.get('#rightClickBtn').rightclick()
        cy.get('#rightClickMessage').should('have.text', "You have done a right click")
        //  clcik button 
        cy.get('[type="button"]').eq(3).click()
        cy.get('#dynamicClickMessage').should('have.text', "You have done a dynamic click")




    })
    it("Verify Links  tab functionaality", () => {
        cy.get('.category-cards > :nth-child(1)').click()
        cy.get('.menu-list > #item-5').contains("Links").click() // clcik on Links tab
        // Verify clcik on Home open in New Tab
        cy.get('a').contains("Home").should('have.attr', 'target', "_blank")
        // Should force open the Home link in the same tab and verify navigation
        cy.get('a').contains("Home").invoke('removeAttr', 'target').click()
        cy.url('include', "https://demoqa.com/")
    })
    it("Verify links will send an api call", () => {
        cy.get('.category-cards > :nth-child(1)').click()
        cy.get('.menu-list > #item-5').contains("Links").click() // clcik on Links tab
        // Should check API response for Created link
        cy.intercept('GET', "**/created").as("createdLink")
        cy.get('a').contains("Created").click()
        cy.wait('@createdLink').its('response.statusCode').should('eq', 201)
        cy.get('#linkResponse').should('have.text', "Link has responded with staus 201 and status text Created")
        // Should check API response for No content  link
        cy.intercept("GET", "**/no-content").as("noContent")
        cy.get('a').contains("No Content").click()
        cy.wait('@noContent').its('response.statusCode').should('eq', 204)
        cy.get('#linkResponse').should('have.text', "Link has responded with staus 204 and status text No Content")
        // Should check API response for  Moved link
        cy.intercept("GET", "**/moved").as("moved")
        cy.get('a').contains("Moved").click()
        cy.wait("@moved").its('response.statusCode').should("eq", 301)
        cy.get('#linkResponse').should('have.text', "Link has responded with staus 301 and status text Moved Permanently")
        // Should check API response for Bad requestlink
        cy.intercept("GET", "**/bad-request").as("badRequest")
        cy.get('a').contains("Bad Request").click()
        cy.wait("@badRequest").its('response.statusCode').should("eq", 400)
        cy.get('#linkResponse').should('have.text', "Link has responded with staus 400 and status text Bad Request")
        // Should check API response for unauthorized link
        cy.intercept("GET", "**/unauthorized").as("unauthorized")
        cy.get('a').contains("Unauthorized").click()
        cy.wait("@unauthorized").its('response.statusCode').should("eq", 401)
        cy.get('#linkResponse').should('have.text', "Link has responded with staus 401 and status text Unauthorized")
        // Should check API response for forbidden  link
        cy.intercept("GET", "**/forbidden").as("forbidden")
        cy.get('a').contains("Forbidden").click()
        cy.wait("@forbidden").its('response.statusCode').should("eq", 403)
        cy.get('#linkResponse').should('have.text', "Link has responded with staus 403 and status text Forbidden")
        // Should check API response for invalid-url  link
        cy.intercept("GET", "**/invalid-url").as("invalidurl")
        cy.get('a').contains("Not Found").click()
        cy.wait("@invalidurl").its('response.statusCode').should("eq", 404)
        cy.get('#linkResponse').should('have.text', "Link has responded with staus 404 and status text Not Found")


    })
    it("Verify Broken Images", () => {
        cy.get('.category-cards > :nth-child(1)').click()
        cy.get('.menu-list > #item-6').contains("Broken Links - Images").click() // clcik on Broken link and Image  tab
        // Validate the valid image
        cy.contains('p', 'Valid image')
            .parent()
            .find('img')
            .should('be.visible')
            .and(($img) => {
                expect($img[0].naturalWidth).to.be.greaterThan(0); // Image should load correctly
            })
        //   Check the broken image
        cy.contains('p', "Broken image").parent()
            .find('img[src="/images/Toolsqa_1.jpg"]')
            .should('be.visible')
            .and((img) => {
                expect(img[0].naturalWidth).to.be.lessThan(20)
            })

    })
    it("Should check for broken and valid links", () => {
        cy.get('.category-cards > :nth-child(1)').click()
        cy.get('.menu-list > #item-6').contains("Broken Links - Images").click() // clcik on Broken link and Image  tab
       
         //   Validate the valid link
            cy.request('https://demoqa.com').then((response) => {
              expect(response.status).to.eq(200); // Should return 200 OK
            })
            
         cy.contains('a', 'Broken Link') // Find the link with text "Broken Link"
         .invoke('attr', 'href') // Get the 'href' attribute value
         .then((url) => {
           cy.request({
             url: url, // Use extracted URL in a request
             failOnStatusCode: false, // Prevent Cypress from failing on 404/500 responses
           }).then((response) => {
             expect(response.status).to.eq(500); // Validate response status
           });
         });
       





    })
    it("File Upload and downlaod", () => {
        cy.get('.category-cards > :nth-child(1)').click()
        cy.get('.menu-list > #item-7').contains("Upload and Download").click() // clcik on upload and Download  tab
       
        // Downlaod File
        cy.get('#downloadButton').click()
        cy.readFile('cypress\\downloads\\sampleFile.jpeg')
        // Upload the file  For this install dependence first  npm  install --save-dev cypress-file-upload 
        const fileName = 'bot.jpg';
        cy.get('#uploadFile').attachFile(fileName);  
        cy.get('#uploadedFilePath').should('contain',fileName)

    })
    it.only("Dynamic Properties Test", () => {
        cy.get('.category-cards > :nth-child(1)').click()
        cy.get('.menu-list > #item-8').contains("Dynamic Properties").click() // clcik on Dynamic Properties  tab
        cy.get('#enableAfter').should('be.disabled')
        cy.get('#colorChange').should('have.css','color',"rgb(255, 255, 255)")
        cy.get('visibleAfter').should('not.exist')

        // wait for 5 Second
        cy.wait(5000)
        cy.get('#colorChange').should('have.css','color',"rgb(220, 53, 69)")
        cy.get('#enableAfter').should('be.enabled')
        cy.get('#visibleAfter').should('exist')

       
       
    })

})
