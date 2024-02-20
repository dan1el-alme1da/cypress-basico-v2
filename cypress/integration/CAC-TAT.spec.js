// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />



describe.only('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('teste ágil em textos longos', function() {

        const longtext = 'saboroso, saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,saboroso,'
    
        cy.title().should('be.equals','Central de Atendimento ao Cliente TAT');
        cy.get('#firstName').type('Daniel');
        cy.get('#lastName').type('Almeida');
        cy.get('#email').type('laura.undc@hotmail.com');
        cy.get('#phone').type('999053389');
        cy.get('#email-checkbox').click();
        cy.get('#open-text-area').type(longtext, {delay:0});
        cy.get('.button').click();
        cy.get('.success > strong').should('be.visible','Mensagem enviada com sucesso.');
  })

    it('preenche os campos obrigatórios e envia o formulário', function() {

        cy.get('#firstName').type('Daniel').should('be.visible');
        cy.get('#lastName').type('Almeida').should('be.visible');
        cy.get('#email').type('laura.undc@hotmail,com').should('be.visible');
        cy.get('#phone').type('999053389').should('be.visible');
        cy.get('#email-checkbox').click();
        cy.get('#open-text-area').type('saboroso').should('be.visible');
        cy.get('.button').click();
        cy.get('.error').should('be.visible','preencha os campos obrigatórios!');
    })

    it('campo de telefone continua vazio se preenchido com valor nao-numérico', function() {

            cy.get('#phone').type('Abcdefghij').should('have.value','');
    })

    it('exibi menssagem de error se o formulario do email nao estiver preenchido', function() {

        cy.get('#firstName').type('Daniel');
        cy.get('#lastName').type('Almeida');
        cy.get('#email').type('laura.undc@hotmail.com');
        cy.get('#phone-checkbox').click();
        cy.get('#email-checkbox').click();
        cy.get('#open-text-area').type('saboroso');
        cy.get('.button').click();
        cy.get('.error').should('be.visible','Valide os campos obrigatórios!');

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Daniel').should('have.value','Daniel').clear().should('have.value','');
        cy.get('#lastName').type('Almeida').should('have.value','Almeida').clear().should('have.value','');
        cy.get('#email').type('laura.undc@hotmail.com').should('have.value','laura.undc@hotmail.com').clear().should('have.value','');
        cy.get('#phone').type('999053389').should('have.value','999053389').clear().should('have.value','');
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {

        cy.get('#firstName').should('have.value','');
        cy.get('#lastName').should('have.value','');
        cy.get('#email').should('have.value','');
        cy.get('#phone-checkbox').click();
        cy.get('#email-checkbox').click();
        cy.get('#open-text-area').should('have.value','');
        cy.get('.button').click();
        cy.get('.error').should('be.visible','Valide os campos obrigatórios!');

    })

    
        it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
        })

        it('seleciona um produto (YouTube) por seu texto', function() {
            cy.fillMandatoryFieldsAndSubmit();
            cy.get('#product').select('YouTube').should('have.value','youtube').should('be.visible'); // <-- tipo de seleçao com varias opcoes (produtos)
        })

        it('sseleciona um produto (Mentoria) por seu valor (value)', function() {
            cy.fillMandatoryFieldsAndSubmit();
            cy.get('#product').select('mentoria').should('have.value','mentoria').should('be.visible'); // <-- tipo de seleçao com varias opcoes pelo valor (produtos)
        })

        it('seleciona um produto (Blog) por seu índice', function() {
            cy.fillMandatoryFieldsAndSubmit();
            cy.get('#product').select(1).should('have.value','blog').should('be.visible'); // <-- tipo de seleçao com varias opcoes pelo indice (produtos)
        })

        it('marca o tipo de atendimento "Feedback', function() {
            cy.fillMandatoryFieldsAndSubmit();
            cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')// <-- input para marcaçoes unicas
        })

        it('marca cada tipo de atendimento', function() {

            cy.get('input[type="radio"]').check().should('have.length',3)
            .each(function($radio) { // <-- funçao com todas as radio para averiguar tudo de uma vez
                cy.wrap($radio).check().should('be.checked');
            });
        })

        it('marca ambos checkboxes, depois desmarca o último', function() {
            cy.fillMandatoryFieldsAndSubmit();
            cy.get('input[type="checkbox"]').check().last().uncheck().should('be.not.checked')
        })

        it('seleciona um arquivo da pasta fixtures', function() {
            cy.fillMandatoryFieldsAndSubmit();
            cy.get('input[type="file"]#file-upload').should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
                })
        })

        it('seleciona um arquivo simulando um drag-and-drop', function() {
            cy.get('input[type="file"]#file-upload').should('not.have.value')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action:'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
                })
            })

        it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
            cy.fixture('example.json').as('sampleFile')
            cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
                })
            })

        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
            cy.get('#privacy  a').should('have.attr', 'target', '_blank')
        })
})
  