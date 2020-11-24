'use strict'
///<reference types="cypress"/>
require('cypress-iframe')


describe("Products", () => {

    beforeEach(() => {
        cy.visit("https://accounts.theatlantic.com/products/")
    })

    describe("Buy a subscription", () => {
        describe.skip("using sign in and credit cart", () => {
            it("Digital", () => {
                cy.get('a[href*="plan_digital_standard"]')
                    .contains("Select")
                    .click({ delay: 3000 })
                cy.get('button[class*="InlineLink_root"]')
                    .contains("Sign in")
                    .click()
                cy.get('#username')
                    .type('ricardo.esquivel@avantica.com')
                cy.get('#password')
                    .type('Ricardesq13')
                cy.get('button[type="submit"]')
                    .contains("Sign In")
                    .click()
                cy.frameLoaded('iframe[src*="https://js.stripe.com/v3/elements-inner-card-"]')
                cy.enter('iframe[src*="https://js.stripe.com/v3/elements-inner-card-"]')
                    .then(getBody => {
                        getBody().find('input[name="cardnumber"]').type("4242424242424")
                        getBody().find('input[name="exp-date"]').type("242")
                        getBody().find('input[name="cvc"]').type("424")
                    })
            })
            it("Print & Digita", () => {
                cy.get('a[href*="plan_print_standard"]')
                    .contains("Select")
                    .click({ delay: 3000 })
                cy.get('button[class*="InlineLink_root"]')
                    .contains("Sign in")
                    .click()
                cy.get('#username')
                    .type('ricardo.esquivel@avantica.com')
                cy.get('#password')
                    .type('Ricardesq13')
                cy.get('button[type="submit"]')
                    .contains("Sign In")
                    .click()
                cy.frameLoaded('iframe[src*="https://js.stripe.com/v3/elements-inner-card-"]')
                cy.enter('iframe[src*="https://js.stripe.com/v3/elements-inner-card-"]')
                    .then(getBody => {
                        getBody().find('input[name="cardnumber"]').type("4242424242424")
                        getBody().find('input[name="exp-date"]').type("242")
                        getBody().find('input[name="cvc"]').type("424")
                    })
            })
            it("Premium", () => {
                cy.get('a[href*="plan_premium_standard"]')
                    .contains("Select")
                    .click({ delay: 3000 })
                cy.get('button[class*="InlineLink_root"]')
                    .contains("Sign in")
                    .click()
                cy.get('#username')
                    .type('ricardo.esquivel@avantica.com')
                cy.get('#password')
                    .type('Ricardesq13')
                cy.get('button[type="submit"]')
                    .contains("Sign In")
                    .click()
                cy.frameLoaded('iframe[src*="https://js.stripe.com/v3/elements-inner-card-"]')
                cy.enter('iframe[src*="https://js.stripe.com/v3/elements-inner-card-"]')
                    .then(getBody => {
                        getBody().find('input[name="cardnumber"]').type("4242424242424")
                        getBody().find('input[name="exp-date"]').type("242")
                        getBody().find('input[name="cvc"]').type("424")
                    })
            })
        })

        describe("using sign in and paypal", () => {
            it("Digital", () => {
                cy.get('a[href*="plan_digital_standard"]')
                    .contains("Select")
                    .click({ delay: 3000 })
                cy.get('button[class*="InlineLink_root"]')
                    .contains("Sign in")
                    .click()
                cy.get('#username')
                    .type('ricardo.esquivel@avantica.com')
                cy.get('#password')
                    .type('Ricardesq13')
                cy.get('button[type="submit"]')
                    .contains("Sign In")
                    .click()


                cy.frameLoaded('iframe[class="component-frame visible"]')
                cy.enter('iframe[class="component-frame visible"]')
                    .then(getBody => {
                        getBody()
                            .find('div[role="button"]')
                            .click()
                        //cy.log(cy.window())
                        /*.then((ln) => {
                            const url = ln.prop('src')
                            let x = ln.get(0)
                            cy.log(ln)
                            cy.log(x)
                            cy.log(url)
                           
                        })*/




                        getBody().frameLoaded('iframe[title="PayPal Checkout Overlay"]')
                        getBody().enter('iframe[title="PayPal Checkout Overlay"]')
                            .then(getBody => {
                                //cy.log(getBody())
                                getBody()
                                    .find('a')
                                    .contains("Click to Continue")
                                    .click()

                                cy.get('h2[class*="Cart_h2"]')
                                    .click()
                            })


                    })






            })
            it.skip("Print & Digita", () => {
                cy.get('a[href*="plan_print_standard"]')
                    .contains("Select")
                    .click({ delay: 3000 })
                cy.get('button[class*="InlineLink_root"]')
                    .contains("Sign in")
                    .click()
                cy.get('#username')
                    .type('ricardo.esquivel@avantica.com')
                cy.get('#password')
                    .type('Ricardesq13')
                cy.get('button[type="submit"]')
                    .contains("Sign In")
                    .click()
                cy.frameLoaded('iframe[src*="https://js.stripe.com/v3/elements-inner-card-"]')
                cy.enter('iframe[src*="https://js.stripe.com/v3/elements-inner-card-"]')
                    .then(getBody => {
                        getBody().find('input[name="cardnumber"]').type("24244442424")
                        getBody().find('input[name="exp-date"]').type("242")
                        getBody().find('input[name="cvc"]').type("424")
                    })
            })
            it.skip("Premium", () => {
                cy.get('a[href*="plan_premium_standard"]')
                    .contains("Select")
                    .click({ delay: 3000 })
                cy.get('button[class*="InlineLink_root"]')
                    .contains("Sign in")
                    .click()
                cy.get('#username')
                    .type('ricardo.esquivel@avantica.com')
                cy.get('#password')
                    .type('Ricardesq13')
                cy.get('button[type="submit"]')
                    .contains("Sign In")
                    .click()
                cy.frameLoaded('iframe[src*="https://js.stripe.com/v3/elements-inner-card-"]')
                cy.enter('iframe[src*="https://js.stripe.com/v3/elements-inner-card-"]')
                    .then(getBody => {
                        getBody().find('input[name="cardnumber"]').type("24244442424")
                        getBody().find('input[name="exp-date"]').type("242")
                        getBody().find('input[name="cvc"]').type("424")
                    })
            })
        })



    })

    describe.skip("Gift", () => {

    })

})