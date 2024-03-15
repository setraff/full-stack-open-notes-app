describe('Note app', () => {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
        const user = {
            username: 'test',
            name: "Test",
            password: 'testing321'
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
        cy.visit('')
    })

    it('front page can be opened', () => {
        cy.contains('Notes')
        cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
    })

    it('login form can be opened', function() {
        cy.contains('Log in').click()
    })

    it('user can log in', function() {
        cy.contains('Log in').click()
        cy.get('#username').type('test')
        cy.get('#password').type('testing321')
        cy.get('#login-button').click()

        cy.contains('Test logged in')
    })

    it('login fails with wrong password', function() {
        cy.contains('Log in').click()
        cy.get('#username').type('test')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        
        cy.get('.error').should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
        cy.contains('Test logged in').should('not.exist')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({username: 'test', password: 'testing321'})
        })

        it('a new note can be created', function () {
            cy.contains('new note').click()
            cy.get('#new-note').type('test note from cypress')
            cy.contains('save').click()
            cy.contains('test note from cypress')
        })

        describe('and a several notes exist', function() {
            beforeEach(function() {
                cy.createNote({content: 'first note', important: false})
                cy.createNote({content: 'second note', important: false})
                cy.createNote({content: 'third note', important: false})
            })

            it('one of those can be made important', function() {
                cy.contains('second note')
                    .parent()
                    .find('button')
                    .as('thebutton')

                // debugger
                
                cy.get('@thebutton').click()
                    
                cy.get('@thebutton')
                    .should('contain', 'make not important')
            })
        })
    })

    // it('then example', function() {
    //     cy.get('button')
    //         .then(buttons => {
    //             console.log(`Number of buttons: ${buttons.length}`)
    //             cy.wrap(buttons[0]).click()
    //         })
    // })
})