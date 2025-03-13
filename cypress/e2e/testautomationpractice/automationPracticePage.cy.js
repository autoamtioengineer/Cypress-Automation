/// <reference types="cypress"/>
import automationPractice from "../../support/POM/testautomationpractice/autoamtionpracticePage.cy"
describe("Autoamte all elements on test automation practice page", () => {
    beforeEach(() => {
        cy.visit("https://testautomationpractice.blogspot.com/")
    })


    // object of Class 
    const practicePage = new automationPractice()
    it("Automate All GUI Elements", () => {
        practicePage.firstNameFiled().should('be.visible').type("Automation Engineer", { delay: 0 })
        practicePage.emailFiled().type("user123@gmail.com", { delay: 0 })
        practicePage.phoneNumberFiled().should('have.attr', "placeholder", "Enter Phone").type("0345889909")
        practicePage.addressFiled().type("Punjab Pakistan", { delay: 0 })
        // Select gender (radio button)
        practicePage.genderMaleCheckbox().check()
        practicePage.daysCheckbox().check(['sunday', 'monday', 'friday']);   // Select multiple days (checkbox)
        practicePage.country().select('Japan')  // Select country (dropdown)
        // Select multiple colors (multi-select)
        practicePage.colordropdown().select(['red', 'blue', 'green']);
        // Select an item from the sorted list
        practicePage.sortedList().select(['lion', 'rabbit'])
        // Enter dates in date pickers
        practicePage.datepicker1().type("12/12/2025")
        cy.get('body').click(0, 0)
        // clcik on date picker this filed is readonly 
        practicePage.datepicker2().click()
        // make a function for selecting Day month and year
        function selectDateFromDatePicker(day, month, year) {
            // 2. Select the year
            practicePage.year().select(year)
            // 3. Select the month
            practicePage.month().select(month);
            // 4. Select the day
            practicePage.day().contains('a', day).click();
        }
        // If your datepicker input has ID #datepicker1:
        selectDateFromDatePicker("19", "Jul", "2024");
        //click on submit button when start and end filed are empty 

        practicePage.submitBtn().click()
        practicePage.errorText().should('have.text', "Please select both start and end dates.")
        // Select Date Rage  by typing
        practicePage.startDate().type('2024-12-12')
        practicePage.enddate().type('2025-12-12')
        practicePage.submitBtn().click()
        practicePage.errorText().should('have.text', "You selected a range of 365 days.")
        // verify when clcik on Home it reload the webpage and All filed data should remove
        cy.get('a').contains("Home").click()
        practicePage.firstNameFiled().should('have.attr', "placeholder", "Enter Name")
        practicePage.addressFiled().should('be.empty')
        // remove target  element 
        cy.get('a').contains('Posts (Atom)').invoke('removeAttr', "target").click()
        // check new Url link open 
        cy.url().should('include', "https://testautomationpractice.blogspot.com/feeds/posts/default")
        cy.go('back')
        cy.url().should('include', "https://testautomationpractice.blogspot.com")



    })
    it("Automate search filed and Dynamic button", () => {
        // when clcik on wikipidia icon it move to its Url 
        // practicePage.wikipediaLogo().invoke('removeAttr',"target").click()

        // cy.visit("https://testautomationpractice.blogspot.com/")
        practicePage.searchIcon().click()
        practicePage.searchResult().should("have.text", "Please enter text to search.")
        practicePage.searchFiled().type("playwrite", { delay: 0 })
        practicePage.searchIcon().click()
        cy.wait(1000)
        practicePage.searchResult().should('be.visible')
            .and('contain.text', 'Playwrite')
            .and('contain.text', 'Playwrite (software)');
        // When invalid searh no record found text show  or not 
        practicePage.searchFiled().clear().type("cypress Automation{enter}", { delay: 0 })
        practicePage.searchResult().should('contain.text', "No results found.")
        practicePage.startBtn().should('have.text', 'START').and('have.css', 'background-color', 'rgb(154, 205, 50)').click()
        practicePage.stopBtn().should('have.text', 'STOP').and('have.css', 'background-color', 'rgb(255, 0, 0)')


    })
    it("Automate Alerts & Popups", () => {
        // 1. Handle Simple Alert
        cy.on('window:alert', (text) => {
            expect(text).to.eq("I am an alert box!") // Verify alert text
        })
        // Click the button that triggers the alert
        practicePage.simpleAlertBtn().click();
        //2. handel confiramtion alerts 
        cy.on('window:confirm', (alertText) => {
            expect(alertText).to.equal("Press a button!")
            return false  // Simulates clicking "Cancel"
        })
        practicePage.confirmationAlertBtn().click()
        practicePage.alertMessage().should('have.text', "You pressed Cancel!")
        // 3. Handle JavaScript Prompt
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns("Cypress Test")// Mock user input
        })
        practicePage.promptAlertBtn().click()
        practicePage.alertMessage().should('have.text', "Hello Cypress Test! How are you today?")
        // //Handle New Tab in Cypress Remove the target attribute so the link opens in the same tab
        // cy.get('button').contains('New Tab').invoke('removeAttr', 'target').click();
        // cy.go('back')
        // handel popup window 
        cy.window().then((win) => {
            cy.stub(win, 'open').as('popupWindow')
        })
        // Click the button that triggers the popup
        practicePage.popupWindowBtn().click();
        // Verify the popup was opened with the expected URL
        cy.get('@popupWindow').should('be.calledWith', "https://www.selenium.dev/")

    })
    it("Automate Upload Files, Mouse Hover and Double Click", () => {
        // verify when file not selected  error medssgae show or not
        cy.contains('Upload Single File').click()
        practicePage.singleFileStatus().should('have.text', "No file selected.")
        cy.contains('Upload Multiple Files').click()
        practicePage.multiFileStatus().should('have.text', "No files selected.")
        const fileName = "bot.jpg"
        practicePage.singleFileBtn().attachFile(fileName)
        cy.contains('Upload Single File').click()
        practicePage.singleFileStatus().should('have.text', "Single file selected: bot.jpg, Size: 3945338 bytes, Type: image/jpeg")

        const multiFiles = ['china-pakistan.pdf', 'licensing.docx']
        practicePage.multiFileBtn().attachFile(multiFiles)
        cy.contains('Upload Multiple Files').click()
        practicePage.multiFileStatus().should('not.have.text', "No files selected.")

        // Performs Mouse Hover
        cy.get('button').contains('Point Me').trigger('mouseover')
        cy.get('.dropdown-content').should('contain', "Mobiles").and('contain', "Laptops")
        // Double Click Btn 
        practicePage.filed2().should('be.empty')
        practicePage.dubleClickBtn().dblclick()
        practicePage.filed2().should('have.value', 'Hello World!');



    })
    it("Automate  Static Web Table, Drag and Drop and slider ", () => {
        // Validates Static Web Table
        cy.get('table tbody').eq(0).find('th').then(($headers) => {
            const actualText = [...$headers].map(h => h.innerText.trim()); // Convert jQuery object to an array
            expect(actualText).to.deep.equal(["BookName", "Author", "Subject", "Price"]);
        });
        cy.get('table tbody').eq(0).find('tr').should('have.length', 7).should('be.visible')
        cy.get('table tbody').eq(0).find('td:nth-child(1)').then(($cells) => {
            const cellData = [...$cells].map(cel => cel.innerText.trim())// Convert jQuery object to array and get text
            expect(cellData).to.deep.equal(["Learn Selenium", "Learn Java", "Learn JS", "Master In Selenium", "Master In Java", "Master In JS"]);
        })

        // Drag and Drop 
        practicePage.draggable().invoke('text')
            .then((text) => {
                expect(text.trim()).to.equal('Drag me to my target');
            }) // Trim removes extra spaces/newlines
        practicePage.droppable().should('contain.text', "Drop here")
        //    practicePage.draggable()
        //    .trigger('mousedown',{which:1}) // Simulate mouse click
        //    .trigger('mousemove',{clientX:31,clientY:174}) // Move to new position
        //    .trigger('mouseup'); // Release the item

        //  practicePage.droppable().should('contain', 'Dropped!'); // Verify the drop
        //  Use @4tw/cypress-drag-drop Plugin

        cy.get('#draggable').should('be.visible').drag('#droppable', { force: true })

        // Verify the drop was successful
        cy.get('#droppable').should('contain', 'Dropped!');
        // Slider working 
        cy.get('.ui-slider-range').invoke('css', 'width').then((initialWidth) => {
            cy.get('.ui-slider-handle').eq(1) // Select the second slider handle
                .trigger('mousedown', { which: 1 }) // Click and hold
                .trigger('mousemove', { clientX: 300 }) // Move to the right
                .trigger('mouseup'); // Release the slider

            cy.get('.ui-slider-range').invoke('css', 'width').should('not.eq', initialWidth); // Check if width changed
        })
        practicePage.priceRange().should("not.have.value", "$75 - $300")
        // Check if the Circle is Red
        cy.get('circle') // Select <circle> inside SVG
            .invoke('attr', 'fill')
            .should('eq', 'red');

        // Check if the Rectangle is Green (Already Working)
        cy.get('.svg-container rect')
            .invoke('attr', 'fill')
            .should('eq', 'green');

        // Check if the Triangle is Blue
        cy.get('.svg-container svg polygon') // Select <polygon> inside SVG
            .invoke('attr', 'fill')
            .should('eq', 'blue');

        // Scroll dropdwon 
        practicePage.scrollDropdown().click()
        cy.get('#dropdown').contains("Item 98").click()


    })
    it("Autoamte labels and Links", () => {

        cy.contains('h2', 'Labels And Links').should('be.visible'); // Main section title
        cy.get('#mobiles > h4').should('be.visible').and('have.text', "Mobile Labels")
        cy.get('#laptops > h4').should('be.visible').and('have.text', "Laptop Links")
        cy.get('#broken-links > h4').should('be.visible').and('have.text', "Broken Links")
        cy.get('#mobiles').within(() => {
            cy.contains('Samsung').should('be.visible');
            cy.contains('Real Me').should('be.visible');
            cy.contains('Moto').should('be.visible');
        });

        cy.contains('a', 'Apple').then(($link) => {
            const appleUrl = $link.prop('href');
            cy.wrap($link).click();
            // Switch to Apple.com
            cy.origin(appleUrl, () => {
              cy.url().should('include', 'apple');
            });
        
            // Instead of cy.go('back'), revisit the original site
            cy.visit('https://testautomationpractice.blogspot.com/');
          });
        
          // Now, navigate to Lenovo
          cy.contains('a', 'Lenovo').then(($link) => {
            const lenovoUrl = $link.prop('href');
        
            cy.wrap($link).click();
        
            // Switch to Lenovo.com
            cy.origin(lenovoUrl, () => {
              cy.url().should('include', 'lenovo');
            });
        
            // Again, revisit the original page
            cy.visit('https://testautomationpractice.blogspot.com/');
          });

          cy.contains("a","Dell").then(($link)=>{
            const dellLink=$link.prop('href')
            cy.wrap($link).click()
            // switch to dell
            cy.origin(dellLink,()=>{
                cy.url().should('include','dell')
            })
            // Again, revisit the original page
            cy.visit('https://testautomationpractice.blogspot.com/');
          })





    })
    it("Autoamte Brokens Links", () => {
        cy.get('#broken-links').within(()=>{
            cy.get('a').each(($link)=>{
                const href= $link.prop('href')
                if(href){
                    cy.request({
                        url:href,
                        failOnStatusCode:false  // Prevent test failure due to 4xx/5xx errors
                    }).then((response)=>{
                        cy.log(`Checkig : ${href} - Status Code: ${response.status}`)

          // Validate expected status codes
          const expectedStatusCodes = [400, 401, 403, 404, 408, 500, 502, 503];
          expect(expectedStatusCodes).to.include(response.status);
                    })
                }
            })
        })
       


    })
    it("Dynamic Tabel",()=>{
        let columnIndexes = {};

        // Step 1: Get column headers and store their indexes dynamically
        cy.get("table").eq(1).find("thead tr th").each(($header, index) => {
          columnIndexes[$header.text().trim()] = index;
        });
    
        cy.then(() => {
          // Step 2: Define all validation scenarios
          const checks = [
            ["Chrome", "CPU (%)", "CPU load of Chrome process"],
            ["Firefox", "Memory (MB)", "Memory Size of Firefox process"],
            ["Chrome", "Network (Mbps)", "Network speed of Chrome process"],
            ["Firefox", "Disk (MB/s)", "Disk space of Firefox process"],
          ];
    
          // Step 3: Iterate through each scenario and validate dynamically
          checks.forEach(([rowText, columnText, summaryText]) => {
            const columnIndex = columnIndexes[columnText]; // Get the column index dynamically
    
            cy.contains("table tbody tr", rowText) // Find the correct row
              .find("td")
              .eq(columnIndex) // Get value based on column position
              .invoke("text")
              .then((value) => {
                cy.contains(summaryText).should("contain", value.trim());
              });
          });
        });
    
})
it("Pagination Web Table",()=>{
 
    function checkAllCheckboxesAndPaginate() {
        // ✅ Step 1: Check all checkboxes on the current page
        cy.get('table').eq(2).find('tr input[type="checkbox"]').check();
      
        // ✅ Step 2: Find the active page's <li> and move to the next one
        cy.get(".pagination li") // Get all <li> elements inside pagination
          .find("a.active") // Find the active page
          .parent() // Get its <li> parent
          .next("li") // Get the next <li> (next page)
          .find("a") // Find the <a> inside the next <li>
          .then(($next) => {
            if ($next.length) { 
              cy.wrap($next).click(); 
              cy.wait(1000); 
              cy.get(".pagination a.active").should("have.text", $next.text());
              checkAllCheckboxesAndPaginate();
            } else {
              cy.log("All checkboxes on all pages are checked! No more pages.");
            }
          });
      }
      
 
      checkAllCheckboxesAndPaginate();
    })
it("Checks only the required checkboxes per page", () => {
        const checkboxesToCheck = {
          1: ["Tablet"],
          2: ["Television", "Digital Camera"],
          3: ["Fitness Tracker"],
          4: ["Soundbar"],
        };
    
        function checkPageCheckboxes(pageNumber) {
          if (checkboxesToCheck[pageNumber]) {
            checkboxesToCheck[pageNumber].forEach((item) => {
              cy.get("table").eq(2).contains("td", item)
                .parent()
                .find('input[type="checkbox"]')
                .check();
            });
          }
        }
    
        function iterateThroughPages() {
          cy.get(".pagination a").each(($el, index, $list) => {
            cy.wrap($el).click();  // Click the page number
            cy.wait(1000); // Ensure page loads
            
            // Get current page number and check its checkboxes
            cy.get(".pagination a.active").invoke("text").then((pageNumber) => {
              checkPageCheckboxes(pageNumber.trim());
            });
          });
        }
    
        
        iterateThroughPages();
    });
     it.only("Interacts with elements inside Shadow DOM", () => {
       
        cy.get('#shadow_host')
        .shadow()
        .find('#shadow_content')
        .should('contain','Mobiles')
       
        cy.get('#shadow_host') // Get the shadow host element
          .shadow() // Access the shadow DOM
          .find('input[type="text"]') // Locate the text input inside the shadow root
          .type('test'); // Type 'test' into the field
          cy.get('#shadow_host') 
          .shadow()
          .find('input[type="checkbox"]') 
          .check()
          cy.get('#shadow_host') 
          .shadow()
          .find('input[type="file"]').attachFile('bot.jpg')
        cy.get('a').contains("Youtube") 
        .then((link) => {
          cy.request(link.prop('href')).its('status').should('eq', 200); // Verify the link is accessible
          expect(link.prop('href')).to.include('youtube.com');
        })

      });


   
})

// it.only('Handling new Browser Window', function () {
//     cy.visit('https://alapanme.github.io/testing-cypress.html')
//     cy.window().then((win)=>{
//         cy.stub(win ,'open').as('popup')
//     })
//     cy.get('button').contains('Try it').click()
//     cy.get('@popup').should('be.calledWith',"https://the-internet.herokuapp.com/")

// })