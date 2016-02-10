//
// **** Kitchen Sink Tests ****
//
// This app was developed to demonstrate
// how to write tests in Cypress utilizing
// all of the available commands
//
// Feel free to modify this spec in your
// own application as a jumping off point


// **** Test Structure ****
//
// Cypress has adopted Mocha's bdd syntax.
// https://on.cypress.io/guides/bundled-tools#section-mocha
//

describe('Kitchen Sink [000]', function(){

  beforeEach(function(){

    // **** Resetting State Before Each Test ****
    //
    // Visiting our app before each test
    // removes any state build up from
    // previous tests. Visiting acts as if
    // we closed a tab and opened a fresh one
    //
    // By default Cypress also automatically
    // clears the Local Storage and Cookies
    // before each test.

    // http://on.cypress.io/api/visit
    // cy.visit('http://cypress-io.github.io/examples-kitchen-sink/')
    cy.visit('http://localhost:8080')

  })

  it('cy.should - assert that <title> is correct [001]', function(){

    // **** Making Assertions ****
    //
    // Here we've made our first assertion using a 'cy.should()' command.
    // An assertion is comprised of a chainer, subject, and optional value.
    // Chainers are available from Chai, Chai-jQuery, and Chai-Sinon.
    // https://on.cypress.io/guides/making-assertions
    //
    // http://on.cypress.io/api/should
    // http://on.cypress.io/api/and

    // http://on.cypress.io/api/title
    cy.title().should('include', 'Kitchen Sink')
    //   ↲               ↲            ↲
    // subject        chainer      value

  })

  context('Querying [002]', function(){

    // **** Querying DOM Elements ****
    //
    // Let's query for some DOM elements and make assertions
    // The most commonly used query is 'cy.get()', you can
    // think of this like the '$' in jQueury

    it('cy.get() - query DOM elements [007]', function(){

      // http://on.cypress.io/api/get
      // We can get DOM elements by id
      cy.get('#query-btn').should('contain', 'Button')

      // We can get DOM elements by class
      cy.get('.query-btn').should('contain', 'Button')


      cy.get('#querying .well>button:first').should('contain', 'Button')
      //              ↲
      // we can CSS selectors just like jQuery

    })

    it('cy.contains() - query DOM elements with matching content [008]', function(){

      // http://on.cypress.io/api/contains
      cy.get('.query-list').contains('bananas').should('have.class', 'third')

    })

    it('cy.within() - query DOM elements within a specific element [007]', function(){

      // http://on.cypress.io/api/within
      cy.get('.query-form').within(function(){
        cy
          .get('input:first').should('have.attr', 'placeholder', 'Email')
          .get('input:last').should('have.attr', 'placeholder', 'Password')

      })

    })

    it('cy.root() - query the root DOM element [007]', function(){

      // http://on.cypress.io/api/root

      // By default, root is the document
      cy.root().should('match', 'html')

      cy.get('.query-ul').within(function(){

        // In this within, the root is now the ul DOM element
        cy.root().should('have.class', 'query-ul')

      })

    })

  })

  context('DOM Traversal [009]', function(){

    // **** Traversing DOM Elements ****
    //
    // Let's query for some DOM elements and make assertions
    // The most commonly used query is 'cy.get()', you can
    // think of this like the '$' in jQueury

    it('cy.children() - get child DOM elements [00a]', function(){

      // http://on.cypress.io/api/children
      cy.get('.traversal-breadcrumb').children('.active').should('contain', 'Data')

    })

    it('cy.closest() - get closest ancestor DOM element [00c]', function(){

      // http://on.cypress.io/api/closest
      cy.get('.traversal-badge').closest('ul').should('have.class', 'list-group')

    })

    it('cy.eq() - get a DOM element at a specific index [00d]', function(){

      // http://on.cypress.io/api/eq
      cy.get('.traversal-list>li').eq(1).should('contain', 'siamese')

    })

    it('cy.filter() - get DOM elements that match the selector [00b]', function(){

      // http://on.cypress.io/api/filter
      cy.get('.traversal-nav>li').filter('.active').should('contain', 'About')

    })

    it('cy.find() - get descendant DOM elements of the selector [00e]', function(){

      // http://on.cypress.io/api/find
      cy.get('.traversal-pagination').find('li').find('a').should('have.length', 7)

    })

    it('cy.first() - get first DOM element [00f]', function(){

      // http://on.cypress.io/api/first
      cy.get('.traversal-table td').first().should('contain', '1')

    })

    it('cy.last() - get last DOM element [00g]', function(){

      // http://on.cypress.io/api/last
      cy.get('.traversal-buttons .btn').last().should('contain', 'Submit')

    })

    it('cy.next() - get next sibling DOM element [00g]', function(){

      // http://on.cypress.io/api/next
      cy.get('.traversal-ul').contains('apples').next().should('contain', 'oranges')

    })

    it('cy.not() - remove DOM elements from set of DOM elements [00g]', function(){

      // http://on.cypress.io/api/not
      cy.get('.traversal-disabled .btn').not('[disabled]').should('not.contain', 'Disabled')

    })

    it('cy.parents() - get parents DOM element from set of DOM elements [00g]', function(){

      // http://on.cypress.io/api/parents
      cy.get('.traversal-cite').parents().should('match', 'blockquote')

    })

    it('cy.siblings() - get all sibling DOM elements from set of DOM elements [00g]', function(){

      // http://on.cypress.io/api/siblings
      cy.get('.traversal-pills .active').siblings().should('have.length', 2)

    })


  })

  context('Actions [00h]', function(){

    // **** Actions ****
    //
    // Let's perform some actions on DOM elements
    // Move of these involve filling in form elements
    // But some actions, like click, will often be
    // used throughout an application

    it('cy.type() - type into a DOM element [00a]', function(){

      // http://on.cypress.io/api/type
      cy
        .get('.action-email')
        .type('fake@email.com').should('have.value', 'fake@email.com')

        // cy.type() may include special character sequences
        .type('{leftarrow}{leftarrow}{del}{del}{selectall}{backspace}')

        // **** Type Options ****
        //
        // cy.type() accepts options that control typing
        //
        // Delay each keypress by 0.1 sec
        // You may want to set the delay which
        // causes the keystrokes to happen much slower
        // in some situations if the application under
        // test is not able to handle rapid firing events.
        // (generally due to the app not properly throttling events)
        .type('slow.typing@email.com', {delay: 100}).should('have.value', 'slow.typing@email.com')

        .get('.action-disabled')

        // Ignore error checking prior to type
        // like whether the input is visible or disabled
        .type('disabled error checking', {force: true}).should('have.value', 'disabled error checking')

    })

    it('cy.focus() - focus on a DOM element [00a]', function(){

      // http://on.cypress.io/api/focus
      cy
        .get('.action-focus').focus()
        .should('have.class', 'focus')
          .prev().should('have.attr', 'style', 'color: orange;')

    })

    it('cy.blur() - blur off a DOM element [00a]', function(){

      // http://on.cypress.io/api/blur
      cy
        .get('.action-blur').type('I\'m about to blur').blur()
        .should('have.class', 'error')
          .prev().should('have.attr', 'style', 'color: red;')

    })


    it('cy.clear() - clears the value of an input or textarea element [00a]', function(){

      // http://on.cypress.io/api/clear
      cy
        .get('.action-clear').type('We are going to clear this text')
          .should('have.value', 'We are going to clear this text')
        .clear()
          .should('have.value', '')

    })

    it('cy.submit() - submit a form [00a]', function(){

      // http://on.cypress.io/api/submit
      cy
        .get('.action-form')
          .find('[type="text"]').type('HALFOFF')
        .get('.action-form').submit()
          .next().should('contain', 'Your form has been submitted!')

    })

    it('cy.click() - click on a DOM element [00a]', function(){

      // http://on.cypress.io/api/click
      cy.get('.action-btn').click()

      // **** Click Position ****
      //
      // cy.click() accepts a position argument
      // that controls where the click occurs
      //
      // clicking in the center of the element is the default
      cy.get('#action-canvas').click()

      // click the top left corner of the element
      cy.get('#action-canvas').click('topLeft')

      // click the top right corner of the element
      cy.get('#action-canvas').click('topRight')

      // click the bottom left corner of the element
      // cy.get('#action-canvas').click('bottomLeft')

      // click the bottom right corner of the element
      // cy.get('#action-canvas').click('bottomRight')


      // **** Click Coordinate ****
      //
      // cy.click() accepts a an x and y coordinate
      // that controls where the click occurs

      // click the top left corner of the element
      cy.get('#action-canvas').click(20, 50)

      // click the top right corner of the element
      cy.get('#action-canvas').click(160, 75)


      // **** Click Options ****
      //
      // cy.click() accepts options that control clicking
      //
      // click multiple elements by passing multiple: true
      // otherwise an error will be thrown if multiple
      // elements are the subject of cy.click
      cy.get('.action-labels>.label').click({multiple: true})

      // Ignore error checking prior to clicking
      // like whether the element is visible, clickable or disabled
      // this button below is covered by another element.
      cy.get('.action-opacity>.btn').click({force: true})

    })

    it('cy.dblclick() - double click on a DOM element', function(){

      // We have a listener on 'dblclick' event in our 'scripts.js'
      // that hides the div and shows an input on double click

      // http://on.cypress.io/api/dblclick
      cy
        .get('.action-div').dblclick().should('not.be.visible')
        .get('.action-input-hidden').should('be.visible')

    })

    it('cy.check() - check a checkbox or radio element', function(){

      // By default, cy.check() will check all
      // matching checkbox or radio elements in succession, one after another

      // http://on.cypress.io/api/check
      // cy.get('.action-checkboxes [type='checkbox']').not('[disabled]').check().should('be.checked')
      // cy.get('.action-radios [type='radio']').not('[disabled]').check().should('be.checked')

      // **** Check Value ****
      //
      // cy.check() accepts a value argument
      // that checks only checkboxes or radios
      // with matching values
      //
      // cy.get('.action-radios [type='radio']').check('radio1').should('be.checked')

      // **** Check Options ****
      //
      // cy.check() accepts options that control checking
      //
      // Ignore error checking prior to checking
      // like whether the element is visible, clickable or disabled
      // this checkbox below is disabled.
      cy.get('.action-checkboxes [disabled]').check({force: true}).should('be.checked')
      // cy.get('.action-radios [type='radio']').check('radio3', {force: true}).should('be.checked')

    })


    it('cy.uncheck() - uncheck a checkbox or radio element', function(){

      // By default, cy.uncheck() will uncheck all matching
      // checkbox elements in succession, one after another

      // http://on.cypress.io/api/uncheck
      cy.get('.action-check [type="checkbox"]').not('[disabled]').uncheck().should('not.be.checked')

      // **** Check Value ****
      //
      // cy.uncheck() accepts a value argument
      // that unchecks only checkboxes or radios
      // with matching values
      //
      // cy.get('.action-check [type='checkbox']').check('checkbox1').uncheck('checkbox1').should('not.be.checked')

      // **** Uncheck Options ****
      //
      // cy.uncheck() accepts options that control unchecking
      //
      // Ignore error checking prior to unchecking
      // like whether the element is visible, clickable or disabled
      // this checkbox below is disabled.
      cy.get('.action-check [disabled]').uncheck({force: true}).should('not.be.checked')

    })

    it('cy.select() - select an option in a <select> element', function(){

      // http://on.cypress.io/api/select

      // Select the option with matching text content
      cy.get('.action-select').select('apples')

      // Select the option with matching value
      cy.get('.action-select').select('fr-bananas')

      // **** Select Options ****
      //
      // cy.select() accepts options that control selecting
      //
      // Ignore error checking prior to select
      // like whether the select or options is disabled
      //
      // this select below is disabled.
      // cy.get('.action-select-disabled').select('option2', {force: true})

      // this option in the select below is disabled.
      // cy.get('.action-option-disabled').select('fr-oranges', {force: true})

    })


  })

  context('Window', function(){

    // **** Window ****
    //
    // Cypress has commands to help you get
    // access to window, document, and title

    it('cy.window() - get the global window object', function(){

      // http://on.cypress.io/api/window
      cy.window().should('have.property', 'top')

    })

    it('cy.document() - get the document object', function(){

      // http://on.cypress.io/api/document
      cy.document().should('have.property', 'charset').and('eq', 'UTF-8')

    })

    it('cy.title() - get the title', function(){

      // http://on.cypress.io/api/title
      cy.title().should('include', 'Kitchen Sink')

    })
  })

  context('Viewport', function(){

    // **** Viewport ****
    //
    // Let's make some assertions based on
    // the size of our screen. This command
    // is great for checking responsive logic

    it('cy.viewport() - set the viewport size and dimension', function(){

      cy
        .get('#navbar').should('be.visible')

      // http://on.cypress.io/api/viewport
      cy.viewport(320, 480)

      // the navbar should have collapse since our
      // screen is smaller
      cy
        .get('#navbar').should('not.be.visible')
        .get('.navbar-toggle').should('be.visible').click()
        .get('.nav').find('a').should('be.visible')

      // lets see what our app looks like on a super large screen
      cy.viewport(2999, 2999)

      // **** Viewport Presets ****
      //
      // cy.viewport() accepts a set of preset sizes
      // to easily set the screen to a device's width and height

      // We added a cy.wait() between each viewport change so you can see
      // the change otherwise it's a little too fast to see :)
      //
      cy
        .viewport('macbook-15')
        .wait(200)

        .viewport('macbook-13')
        .wait(200)

        .viewport('macbook-11')
        .wait(200)

        .viewport('ipad-2')
        .wait(200)

        .viewport('ipad-mini')
        .wait(200)

        .viewport('iphone-6+')
        .wait(200)

        .viewport('iphone-6')
        .wait(200)

        .viewport('iphone-5')
        .wait(200)

        .viewport('iphone-4')
        .wait(200)

        .viewport('iphone-3')
        .wait(200)

      // **** Viewport Orientation ****
      //
      // cy.viewport() accepts an orientation for all presets
      // the default orientation is 'portrait'
      //
      cy
        .viewport('ipad-2', 'portrait')
        .wait(200)

        .viewport('iphone-4', 'landscape')
        .wait(200)

      // The viewport will be reset back to the default dimensions
      // in between tests (the  default is set in cypress.json)

    })

  })

  context('Navigation', function(){

    // **** Navigation ****
    //
    // We can issue commands to navigate,
    // visit, and reload the page

    it.skip('cy.go() - go back or forward in the browser\'s history', function(){

      // cy.get('.navigation-go')

      // http://on.cypress.io/api/go

    })

    it.skip('cy.reload() - reload the page', function(){

      // cy.get('.navigation-reload')

      // http://on.cypress.io/api/reload

    })

    it.skip('cy.visit() - visit a remote url', function(){

      // cy.get('.navigation-visit')

      // http://on.cypress.io/api/visit

    })

  })

  context('Assertions', function(){

    // **** Assertions ****
    //
    describe('Implicit Assertions', function(){

      it('cy.should - make an assertion about the current subject', function(){

        // http://on.cypress.io/api/should
        cy
          .get('.assertion-table')
            .find('tbody tr:last').should('have.class', 'success')

      })

      it('cy.and - chain multiple assertions together', function(){

        // http://on.cypress.io/api/and
        cy
          .get('.assertions-link')
            .should('have.class', 'active')
            .and('have.attr', 'href')
            .and('include', 'cypress.io')

      })

    })

    describe('Explicit Assertions', function(){

      it('expect - make an assertion about a specified subject', function(){

        // We can use Chai's BDD style assertions
        expect(true).to.be.true

        // Pass a function to should that can have any number
        // of explicit assertions within it.
        cy
          .get('.assertions-p').find('p')
          .should(function($p){
            // return an array of texts from all of the p's
            var texts = $p.map(function(i, el){
              // http://on.cypress.io/api/cypress-jquery
              return Cypress.$(el).text()
            })

            // jquery map returns jquery object
            // and .get() convert this to simple array
            var texts = texts.get()

            // array should have length of 3
            expect(texts).to.have.length(3)

            // set this specific subject
            expect(texts).to.deep.eq([
              'Some text from first p',
              'More text from second p',
              'And even more text from third p'
            ])
        })

      })

      it.skip('assert - make an assertion about a specified subject', function(){

        // We can use Chai's TDD style assertions
        assert.isTrue(true, "true should be true")

      })

    })

  })

  context('Misc', function(){

    it('cy.end() - end the command chain', function(){

      // cy.end is useful when you want to end a chain of commands
      // and force Cypress to re-query from the root element
      //
      // http://on.cypress.io/api/end
      cy
        .get('.misc-table').within(function(){
          cy
            // ends the current chain and returns null
            .contains("Cheryl").click().end()

            // queries the entire table again
            .contains("Charles").click()

        })
    })

    it('cy.focused() - get the DOM element that has focus', function(){

      // http://on.cypress.io/api/focused
      cy
        .get('.misc-form').find('#name').click()
        .focused().should('have.id', 'name')

        .get('.misc-form').find('#description').click()
        .focused().should('have.id', 'description')

    })

    it('cy.wrap() - wrap an object', function(){

      // http://on.cypress.io/api/wrap
      cy
        .wrap({foo: 'bar'})
          .should('have.property', 'foo')
          .and('include', 'bar')

    })

  })

  context('Connectors', function(){

    // **** Connectors ****
    //
    // Some commands are just used to manipulate
    // properties or invoke functions on the current subject

    it('cy.its() - get properties on the current subject', function(){

      // http://on.cypress.io/api/its
      cy
        .get('.connectors-ul>li')
        // calls the 'length' property returning that value
          .its('length')
            .should('be.gt', 2)
    })

    it('cy.invoke() - invoke a function on the current subject', function(){

      // our div is hidden in our script.js
      // $('.connectors-div').hide()

      // http://on.cypress.io/api/invoke
      cy
        .get('.connectors-div').should('be.hidden')

        // call the jquery method 'show' on the 'div.container'
        .invoke('show')
          .should('be.visible')

    })

    it('cy.spread() - spread an array as individual arguments to a callback function', function(){

      // http://on.cypress.io/api/spread
      var arr = ['foo', 'bar', 'baz']

      cy.wrap(arr).spread(function(foo, bar, baz){
        expect(foo).to.eq('foo')
        expect(bar).to.eq('bar')
        expect(baz).to.eq('baz')
      })

    })

    it('cy.then() - invoke a callback function with the current subject', function(){

      // http://on.cypress.io/api/then
      cy.get('.connectors-list>li').then(function($lis){
        expect($lis).to.have.length(3)
        expect($lis.eq(0)).to.contain('Walk the dog')
        expect($lis.eq(1)).to.contain('Feed the cat')
        expect($lis.eq(2)).to.contain('Write JavaScript')
      })

    })

  })

  context('As', function(){

    // **** Aliasing ****
    //
    // We alias a DOM element for use later
    // We don't have to traverse to the element
    // later in our code, we just reference it with @

    it('cy.as() - alias a route or DOM element for later use', function(){

      // this is a good use case for an alias,
      // we don't want to write this long traversal again
      //
      // http://on.cypress.io/api/as
      cy
        .get('.as-table').find('tbody>tr')
          .first().find('td').first().find('button').as('firstBtn')

        // maybe do some more testing here...

        // when we reference the alias, we place an
        // @ in front of it's name
        .get('@firstBtn').click()

        .get('@firstBtn')
          .should('have.class', 'btn-success')
          .and('contain', 'Changed')

    })

  })

  context('Wait', function(){

    // **** Wait ****
    //
    // Wait for a specific amount of ms before
    // continuing to the next command
    //
    // BE CAREFUL of adding unnecessary wait times:
    // https://on.cypress.io/guides/anti-patterns#section-adding-unnecessary-waits
    //
    // http://on.cypress.io/api/wait
    it('cy.wait() - wait for a specific amount of time', function(){

      cy
        .get(".wait-input1").type('Wait 1000ms after typing')
        .wait(1000)
        .get(".wait-input2").type('Wait 1000ms after typing')
        .wait(1000)
        .get(".wait-input3").type('Wait 1000ms after typing')
        .wait(1000)

    })

    //
    // Waiting for a specific resource to resolve
    // is covered within the cy.route() test below
    //

  })

  context('Network Requests', function(){

    // **** Network Requests ****
    //
    // Manage AJAX / XHR requests in your app

    it('cy.server() - control the behavior of network requests and responses', function(){

      // http://on.cypress.io/api/server
      cy.server().then(function(server){
        // the default options on server
        // you can override any of these options
        expect(server.delay).to.eq(0)
        expect(server.method).to.eq('GET')
        expect(server.status).to.eq(200)
        expect(server.headers).to.be.null
        expect(server.response).to.be.null
        expect(server.onRequest).to.be.undefined
        expect(server.onResponse).to.be.undefined
        expect(server.onAbort).to.be.undefined

        // These options control the server behavior
        // affecting all requests
        expect(server.enable).to.be.true              // pass false to disable existing route stubs
        expect(server.force404).to.be.false           // forces requests that don't match your routes to 404
        expect(server.whitelist).to.be.a('function')  // whitelists requests from ever being logged or stubbed
      })

      cy
        .server({
          method: 'POST',
          delay: 1000,
          status: 422,
          response: {}
        })

        // any route commands will now inherit the above options
        // from the server. anything we pass specifically
        // to route will override the defaults though.

    })

    it('cy.request() - make an XHR request', function(){

      // http://on.cypress.io/api/request
      cy
        .request('http://jsonplaceholder.typicode.com/comments').then(function(response){
          expect(response.status).to.eq(200)
          expect(response.body).to.have.length(500)
          expect(response).to.have.property('headers')
          expect(response).to.have.property('duration')
        })
    })

    it('cy.route() - route responses to matching requests', function(){

      cy.server()

      // **** GET comments route ****
      //
      // http://on.cypress.io/api/route
      cy
        .route(/comments\/1/).as('getComment')

        // we have code that fetches a comment when
        // the button is clicked in scripts.js
        .get('.network-btn').click()

        // **** Wait ****
        //
        // Wait for a specific resource to resolve
        // continuing to the next command
        //
        // http://on.cypress.io/api/wait
        .wait('@getComment').its('status').should('eq', 200)


      // **** POST comment route ****
      //
      // Specify the route to listen to method 'POST'
      cy
        .route('POST', '/comments').as('postComment')

        // we have code that posts a comment when
        // the button is clicked in scripts.js
        .get('.network-post').click()
        .wait('@postComment')

        // get the route
        .get('@postComment').then(function(xhr){
          expect(xhr.requestBody).to.include('email')
          expect(xhr.requestHeaders).to.have.property('Content-Type')
          expect(xhr.responseBody).to.have.property('name', 'Using POST in cy.route()')
        })


      // **** Stubbed PUT comment route ****
      //
      message = 'whoa, this comment doesn\'t exist'

      cy
        .route({
            method: 'PUT',
            url: /comments\/\d+/,
            status: 404,
            response: {error: message},
            delay: 500
          }).as('putComment')

        // we have code that puts a comment when
        // the button is clicked in scripts.js
        .get('.network-put').click()

        .wait('@putComment')

        // our 404 statusCode logic in scripts.js executed
        .get('.network-put-comment').should('contain', message)

    })

  })

  context('Fixtures', function(){

    // **** Fixtures ****
    //
    // Instead of writing a response inline you can
    // connect a response with a fixture file
    // located in _fixtures folder.

    it('cy.fixture() - load a fixture', function(){

      cy.server()

      // http://on.cypress.io/api/fixture
      cy
        .fixture('example.json').as('comment')

        .route(/comments/, '@comment').as('getComment')

        // we have code that gets a comment when
        // the button is clicked in scripts.js
        .get('.fixture-btn').click()

        .wait('@getComment').its('responseBody')
          .should('have.property', 'name')
            .and('include', 'Using fixtures to represent data')


      // you can also just write the fixture in the route
      cy
        .route(/comments/, 'fixture:example.json').as('getComment')

        // we have code that gets a comment when
        // the button is clicked in scripts.js
        .get('.fixture-btn').click()

        .wait('@getComment').its('responseBody')
          .should('have.property', 'name')
            .and('include', 'Using fixtures to represent data')

      // or write fx to represent fixture
      // by default it assumes it's .json
      cy
        .route(/comments/, 'fx:example').as('getComment')

        // we have code that gets a comment when
        // the button is clicked in scripts.js
        .get('.fixture-btn').click()

        .wait('@getComment').its('responseBody')
          .should('have.property', 'name')
            .and('include', 'Using fixtures to represent data')



    })

  })

  context('Local Storage', function(){

    // **** Local Storage ****
    //
    // Although local storage is automatically cleared
    // to maintain a clean state in between tests
    // sometimes we need to clear the local storage manually

    it('cy.clearLocalStorage() - clear all data in local storage', function(){

      // **** Clear all data in Local Storage ****
      //
      // http://on.cypress.io/api/clearlocalstorage
      cy
        .get(".ls-btn").click().then(function(){
          expect(localStorage.getItem('prop1')).to.eq('red')
          expect(localStorage.getItem('prop2')).to.eq('blue')
          expect(localStorage.getItem('prop3')).to.eq('magenta')
        })

        // clearLocalStorage() returns the localStorage object
        .clearLocalStorage().then(function(ls){
          expect(ls.getItem('prop1')).to.be.null
          expect(ls.getItem('prop2')).to.be.null
          expect(ls.getItem('prop3')).to.be.null
        })

      // **** Clear key matching string in Local Storage ****
      //
      cy
        .get(".ls-btn").click().then(function(){
          expect(localStorage.getItem('prop1')).to.eq('red')
          expect(localStorage.getItem('prop2')).to.eq('blue')
          expect(localStorage.getItem('prop3')).to.eq('magenta')
        })

        .clearLocalStorage('prop1').then(function(ls){
          expect(ls.getItem('prop1')).to.be.null
          expect(ls.getItem('prop2')).to.eq('blue')
          expect(ls.getItem('prop3')).to.eq('magenta')
        })

      // **** Clear key's matching regex in Local Storage ****
      //
      cy
        .get(".ls-btn").click().then(function(){
          expect(localStorage.getItem('prop1')).to.eq('red')
          expect(localStorage.getItem('prop2')).to.eq('blue')
          expect(localStorage.getItem('prop3')).to.eq('magenta')
        })

        .clearLocalStorage(/prop1|2/).then(function(ls){
          expect(ls.getItem('prop1')).to.be.null
          expect(ls.getItem('prop2')).to.be.null
          expect(ls.getItem('prop3')).to.eq('magenta')
        })

    })

  })

  context('Cookies', function(){

    // **** Cookies ****
    //
    // Although cookies are automatically cleared
    // to maintain a clean state in between tests
    // sometimes we need to clear the cookies manually


    it('cy.clearCookies() - clear browser cookies', function(){

      // **** Clear all Cookies ****
      //
      // http://on.cypress.io/api/clearcookies
      cy
        .get(".cookies-btn").click()

        .document().its("cookie").should("include", "123ABC")

        // clearCookies() returns cookie represented as an object
        .clearCookies()
        .document().its("cookie").should("not.include", "123ABC")

    })

  })

  context('Utilities', function(){

    // **** Utilities ****
    //
    // Cypress offers some utilities commands
    // that give you access to methods from other
    // commonly used libraries

    it.skip('Cypress._.method() - call an underscore method', function(){

      cy.get('.utility-each').then(function($li){

        // use the _.each function
        // http://on.cypress.io/api/cypress-underscore

      })

    })

    it.skip('Cypress.$(selector) - call a jQuery method', function(){

      cy.get('.utility-jquery')

      // http://on.cypress.io/api/cypress-jquery

    })


    it('Cypress.moment() - format or parse dates using a moment method', function(){

      // use moment's format function
      // http://on.cypress.io/api/cypress-moment
      var time = Cypress.moment('2014-04-25T19:38:53.196Z').format('h:mm:ss A')

      cy
        .get('.utility-moment').contains(time)
          .should('have.class', 'badge')

    })

    it.skip('Cypress.Blob.method() - convert a vase64 strings to blob objects', function(){

      cy.get('.utility-blob')

      // http://on.cypress.io/api/cypress-blob

    })

    it.skip('new Cypress.Promise(function) - instantiate a bluebird promise', function(){

      cy.get('.utility-promise')

      // http://on.cypress.io/api/cypress-promise

    })

  })

  context('Cypress API', function(){

    describe.skip('Config', function(){

      // **** Config ****
      //

      it('Cypress.config() - get all configuration options', function(){

        // http://on.cypress.io/api/config

      })


    })

    describe.skip('Env', function(){

      // **** Env ****
      //

      it('Cypress.env() - get the environment variables', function(){

        // http://on.cypress.io/api/env

      })


    })

    describe.skip('Commands', function(){

      // **** Commands ****
      //
      // http://on.cypress.io/api/commands

      it('Cypress.addChildCommant() - add a child command', function(){


      })

      it('Cypress.addDualCommand() - add a dual command', function(){


      })

      it('Cypress.addParentCommand() - add a parent command', function(){


      })


    })

    describe.skip('Cookies', function(){

      // **** Cookies ****
      //
      // http://on.cypress.io/api/cookies

      it('Cypress.Cookies.get() - get a cookie by its key', function(){


      })

      it('Cypress.Cookies.set() - set a cookie by key, value', function(){


      })

      it('Cypress.Cookies.remove() - remove a cookie by its key', function(){


      })

      it('Cypress.Cookies.debug() - enable or disable debugging', function(){


      })

      it('Cypress.Cookies.preserveOnce() - preserve cookies by key', function(){


      })

      it('Cypress.Cookies.defaults() - set defaults for all cookies', function(){


      })


    })

    describe.skip('Dom', function(){

      // **** Dom ****
      //
      // http://on.cypress.io/api/dom

      it('Cypress.Dom.isHidden() - determine if a DOM element is hidden', function(){


      })

    })

    describe.skip('Server', function(){

      // **** Dom ****
      //
      // http://on.cypress.io/api/dom

      it('Cypress.Server.defaults() - change default config of server', function(){


      })

    })

  })

})