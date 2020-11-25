'use strict'
///<reference types="cypress"/>
require('cypress-iframe')


describe("Products page", () => {
    const url = "https://accounts.theatlantic.com/products/"
    describe.skip("Site header", () => {
        before(() => {
            cy.visit(url)
        })
        it("Verify elements", () => {
            cy.get('header[class*="SiteHeader"]')
                .should('be.visible')
                .and('have.css', 'background', 'rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box')
                .and('have.css', 'color', 'rgb(0, 0, 0)')
            cy.get('a[class*="HelpLink"]')
                .contains("Help")
                .should('be.visible')
                .and('have.attr', 'href', 'https://support.theatlantic.com')
            cy.get('a[aria-label="Return to The Atlantic homepage"]')
                .should('be.visible')
                .and('have.attr', 'href', 'https://www.theatlantic.com')
            cy.get('svg[id="atlantic-wordmark"]')
                .should('be.visible')
            cy.get('a[class*="SigninSignoutLink"]')
                .contains("Sign in")
                .should('be.visible')
                .and('have.attr', 'href', '/accounts/details/')
        })
        it.skip("Verify that user is redirected to Homepage", () => {
            cy.get('a[aria-label="Return to The Atlantic homepage"]').click()
            cy.title().should('contain.value', '  World Edition -  The Atlantic ')
        })
        it.skip("Verify that user is redirected to Help", () => {
            cy.get('a[class*="HelpLink"]').click()

        })
        it("Verify that user is redirected to Sign in", () => {
            cy.get('a[class*="SigninSignoutLink"]')
                .click()
            cy.title().should('contain', 'Sign in to The Atlantic')
        })
    })
    describe.skip("Sub header", () => {
        before(() => {
            cy.visit(url)
        })
        it("Verify the color section", () => {
            cy.get('[class^="Header_root"]')
                .should('have.css', 'background-color', 'rgb(224, 242, 250)')
        })
    })
    describe.skip("Products", () => {
        beforeEach(() => {
            cy.visit(url)
        })
        describe.skip("carts", () => {
            it("Validate information", () => {
                cy.get('section[class*="ProductCard_card"]')
                    .should('have.length', 3)
                cy.fixture('TheAtlantic/Products/ProductCarts.json')
                    .then((data) => {
                        let products = data.products
                        products.map((product) => {
                            let details = product.details
                            cy.get('h2[class*="CardTitle"]')
                                .contains(details.title)
                                .should('be.visible')
                                .and('have.css', 'font-size', '24px')
                            /*The price for Print & Digital is not always the same*/
                            if (details.title !== "Print & Digital") {
                                cy.get('span[class*="PriceDisplay_price"]')
                                    .contains(details.price)
                                    .should('be.visible')
                                    .and('have.css', 'font-size', '46px')
                            }
                            cy.get('span[class*="PriceDisplay_term"]')
                                .eq(details.position)
                                .contains(details.timeSubs)
                                .should('be.visible')
                            cy.get("a[href*='" + details.plan + "']")
                                .contains("Select")
                                .should('have.css', 'background-color', 'rgb(33, 39, 44)')
                                .and('have.css', 'color', 'rgb(255, 255, 255)')
                            if (details.plus === true) {
                                let divideIndex = details.title === "Print & Digital" ? 0 : 1
                                cy.get('span[class*="Divider_text"]')
                                    .eq(divideIndex)
                                    .contains("Plus")
                                    .should('be.visible')
                            }
                            let planBenefits = details.planBenefits
                            planBenefits.map((benefit) => {
                                cy.get('li[class*="PlanBenefit"]')
                                    .contains(benefit)
                                    .should('be.visible')
                            })
                        })
                    })
            })
            it("Verify that user is redirected to purchase subscription, STEP 1 OF 2", () => {
                context("Base on the subscription that the user select, a box with the subscription information should be visible with all the subscription data", () => {
                    cy.fixture('TheAtlantic/Products/ProductCarts.json')
                        .then((data) => {
                            data.products.map((product) => {
                                let details = product.details
                                cy.get("a[href*='" + details.plan + "']")
                                    .contains("Select")
                                    .click({
                                        delay: 3000
                                    })
                                cy.get('div[class*="PurchaseStep"]', {
                                        delay: 5000
                                    })
                                    .contains("Step 1 of 2")
                                    .should('be.visible')
                                    .and('have.css', 'color', 'rgb(5, 80, 200)')
                                cy.get('div[class*="Cart_root"]')
                                    .should('be.visible')
                                cy.get('h2[class*="Cart_h2"]')
                                    .contains(details.title + " Subscription")
                                    .should('be.visible')
                                cy.get('li[class*="PlanBenefit"]>div>svg[class*="Checkmark_svg"]')
                                    .should('have.length', details.planBenefits.length)
                                details.planBenefits.map(benefit => {
                                    cy.get('li[class*="PlanBenefit"]', {
                                            delay: 8000
                                        })
                                        .contains(benefit)
                                        .should('be.visible')
                                })
                                cy.get('div[class*="CardInterior"] > div >span')
                                    .contains('Due today')
                                    .should('be.visible')
                                /*The price for Print & Digital is not always the same*/
                                if (details.title !== "Print & Digital") {
                                    cy.get('button[class*="Listbox_button"]')
                                        .contains(details.title + " – $" + details.price + "/year")
                                        .should('be.visible')
                                        .and('have.css', 'background-color', 'rgb(249, 250, 252)')
                                        .and('have.css', 'border', '1px solid rgb(224, 230, 237)')
                                        .and('have.attr', 'aria-expanded', 'false')
                                    cy.get('div[class*="CardInterior"] > div >span')
                                        .contains('$' + details.price)
                                        .should('be.visible')
                                }
                                cy.visit(url)
                            })
                        })

                })
            })
        })
        describe("Secondary", () => {
            it("Validate information", () => {
                cy.get('main[class*="ProductSecondary"] > div')
                    .should('have.length', 2)
                cy.fixture('TheAtlantic/Products/SecondaryProducts.json')
                    .then((data) => {
                        let products = data.products
                        products.map((product) => {
                            cy.get('h2[class*="CardTitle"]')
                                .contains(product.title)
                                .should('be.visible')
                            cy.get('p[class*="SecondaryCard_description"]')
                                .contains(product.description)
                                .should('be.visible')
                            cy.get('a[class*="Button"]')
                                .contains(product.buttonTxt)
                                .should('have.css', 'color', 'rgb(5, 80, 200)')
                                .and('have.css', 'border', '1px solid rgb(5, 80, 200)')
                                .and('be.visible')
                        })
                    })
            })
            it("Verify that user is redirected successfuly after click the button to get a Gift Subscriptions", () => {
                cy.get('a[class*="Button_root"]')
                    .contains("Give The Atlantic")
                    .click()
                cy.get('h3[class*="Header_dek"]')
                    .contains("Send a gift subscription to The Atlantic, starting at less than $1 a week.")
                    .should('be.visible')
            })
            it("Verify that user is redirected successfuly after click the button to get an Academic Rate", () => {
                cy.get('a[class*="Button_root"]')
                    .contains("Learn More")
                    .click()
                cy.get('h3[class*="Header_dek"]')
                    .contains("Students and educators save 50% on a year of The Atlantic.")
                    .should('be.visible')
            })
        })
    })
    describe.skip("Why The Atlantic?", () => {
        before(() => {
            cy.visit(url)
        })
        it("Verify section elements", () => {
            cy.get('div[class*="WhyTheAtlantic"]')
                .should('be.visible')
                .and('have.css', 'background-color', 'rgb(224, 242, 250)')
            cy.get('section[class*="ProductWell"]>div>div[class*="FlexLayoutItem"]')
                .should('have.length', '3')
                .and('be.visible')
            cy.get('div[class*="FlexLayoutItem"]>hr')
                .should('have.length', '2')
                .and('be.visible')
        })
        it("Verify section data", () => {
            cy.fixture('TheAtlantic/Products/WhyTheAtlantica.json')
                .then((data) => {
                    data.details.map(data => {
                        cy.get('h3[class*="ReasonWhy_reasonTitle"]')
                            .contains(data.title)
                            .should('be.visible')
                        cy.get('p[class*="ReasonWhy_reasonText"]')
                            .contains(data.description)
                            .should('be.visible')
                    })
                })





        })
    })

    describe.skip("Frequently Asked Questions", () => {
        it("Verify Section elements",{

        })

        it("Verify section data",{
            
        })

        it("Verify that user is able to collapse the options",{
            
        })

        it("Verify that user is redirected to the Help Center",{
            
        })
    })

})