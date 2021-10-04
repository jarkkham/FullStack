describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jarkko Hämäläinen',
      username: 'jhamala',
      password: 'testing'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('form').contains('username')
    cy.get('form').contains('password')
    cy.get('form').contains('log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jhamala')
      cy.get('#password').type('testing')
      cy.contains('log in').click()
      cy.get('#notification')
        .should('contain', 'user Jarkko Hämäläinen logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('html').should('not.contain', 'wrong username or password')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jhamala')
      cy.get('#password').type('123123')
      cy.contains('log in').click()
      cy.get('#notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jhamala', password: 'testing' })
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Canonical string reduction')
      cy.get('#author').type('Edsger W. Dijkstra')
      cy.get('#url').type('http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
      cy.get('#create').click()
      cy.get('#notification')
        .should('contain', 'a new blog Canonical string reduction by Edsger W. Dijkstra added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('#blogs')
        .should('contain', 'Canonical string reduction')
        .and('contain', 'Edsger W. Dijkstra')
        .and('contain', 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html')
    })

    it('A blog can be liked', function() {
      cy.createBlog({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      })
      cy.get('#view').click()
      cy.get('#like').click()
      cy.get('#notification')
        .should('contain', 'blog Canonical string reduction liked')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('#blogs').should('contain', 'likes 1')
    })

    it('A blog can be removed by its creator', function() {
      cy.createBlog({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      })
      cy.get('#remove').click()
      cy.get('#notification')
        .should('contain', 'blog Canonical string reduction removed')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('A blog cannot be removed by others', function() {
      cy.createBlog({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      })
      const user = {
        name: 'Arto Hellas',
        username: 'ahellas',
        password: '123123'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.login({ username: 'ahellas', password: '123123' })
      cy.get('#view').click()
      cy.get('html').should('not.contain', '#remove')
    })

    it('A blogs are arranged by likes', function() {
      cy.createBlog({
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
      })
      cy.get('#view').click()
      cy.get('#like').click()
      cy.visit('http://localhost:3000')
      cy.get('#view').click()
      cy.get('#Canonicalstringreduction').should('contain', 'likes 1')

      cy.createBlog({
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html'
      })
      cy.get('.blog').first().should('contain', 'Canonical string reduction')
      cy.get('#Typewars').find('#view').click()
      cy.get('#Typewars').find('#like').click()
      cy.get('#Typewars').find('#like').click()
      cy.get('#Typewars').find('#like').click()
      cy.visit('http://localhost:3000')
      cy.get('#Typewars').find('#view').click()
      cy.get('#Typewars').should('contain', 'likes 3')
      cy.get('.blog').first().should('contain', 'Type wars')

      cy.createBlog({
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
      })
      cy.get('#TDDharmsarchitecture').find('#view').click()
      cy.get('#TDDharmsarchitecture').find('#like').click()
      cy.get('#TDDharmsarchitecture').find('#like').click()
      cy.visit('http://localhost:3000')
      cy.get('#TDDharmsarchitecture').find('#view').click()
      cy.get('#TDDharmsarchitecture').should('contain', 'likes 2')
      cy.get('.blog:last').should('contain', 'Canonical string reduction')
    })
  })
})