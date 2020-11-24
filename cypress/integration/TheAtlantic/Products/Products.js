'use strict'
///<reference types="cypress"/>
require('cypress-iframe')


describe("Products", () => {

    beforeEach(() => {
        cy.visit("https://accounts.theatlantic.com/products/")
    })

    describe.skip("Products information", () => {
        it("Products carts", () => {
            cy.get('section[class*="ProductCard_card"]')
                .should('have.length', 3)
            cy.fixture('TheAtlantic/Subscriptions/ProductCarts.json')
                .then((data) => {
                    let products = data.products
                    products.map((product) => {
                        let details = product.details
                        cy.get('h2[class*="CardTitle"]')
                            .contains(details.title)
                            .should('be.visible')
                        cy.get('span[class*="PriceDisplay_price"]')
                            .contains(details.price)
                            .should('be.visible')
                        cy.get('span[class*="PriceDisplay_term"]')
                            .eq(details.position)
                            .contains(details.timeSubs)
                            .should('be.visible')
                        if (details.title === "Print & Digital") {
                            cy.get('div[class*="ProductCard_valueText"]')
                                .contains("Best Value")
                                .should('be.visible')
                        }
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
                        })
                    })
                })
        })
        it("Secondary products", () => {
            cy.get('main[class*="ProductSecondary"] > div')
                .should('have.length', 2)
            cy.fixture('TheAtlantic/Subscriptions/SecondaryProducts.json')
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
        it("Why The Atlantic?", () => { 

        })
        it("Frequently Asked Questions", () => { 
            
        })
    })

    describe.skip("Gift",()=>{

    })

})