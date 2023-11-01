module.exports = {
    before(browser) {
        browser.resizeWindow(1440, 800)
        browser
            .page.auth()
            .navigate()
        browser   
            .waitForElementVisible('#ajax-register-form')       
            .assert.titleEquals("Личный кабинет Правокард")
            .assert.textContains("h1", "Авторизация") 
    }, 

    after(browser) {  
      browser.end();  
    },
   
   'Login': function(browser) {  
        browser
            .page.auth()
            .login('testflauto@yandex.ru', '123456q!')
            .waitForElementVisible('body', 'Заголовок загружен')
            .verify.urlContains('https://partner.pravocard.ru/profile/') 
            .assert.titleContains('Тест ЮСФЛ (для автотестов)', 'title ok')
            .assert.textContains("h2", "Тест ЮСФЛ (для автотестов)")
    },

    'Переход в Помощь': function(browser) {
        browser.click('#header_comment > a:nth-child(2) > span')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/pomoshnik/')
            .assert.titleContains('Помощник', 'title ok')
            .assert.textContains("h2", "Помощник")
            .expect.element('#AJAX_MAIN > div.px-3.px-md-5.pt-3.flex-grow-1.flex-column.d-flex > div > div:nth-child(1) > div.item-block.manual_text').to.be.visible // проверка видимости текста помощника
    },
    
    'Переход к созданию Вопроса': function(browser) {
        browser.click('.btn-primary:nth-child(1) > .d-none')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/tehnicheskaja_podderzhka/add/')
            .assert.titleContains('Техническая поддержка', 'title ok')
            .assert.textContains("h2", "Задать вопрос")
            .expect.element('#form10349154').to.be.visible // видимость формы

       // проверка видимости нужных полей
       
        browser.expect.element('.container-form-fields > fieldset > legend').text.to.equal('№')
        browser.expect.element('div:nth-child(1) > fieldset:nth-child(2) > legend').text.to.equal('Тема вопроса') 
        browser.expect.element('div:nth-child(2) > fieldset > legend').text.to.equal('Какой у Вас вопрос?') 
        browser.expect.element('legend:nth-child(2)').text.to.equal('Файлы') 
        browser.expect.element('.container-form-fields > fieldset > div').not.to.be.active // проверка, что поле с номером некликабельное    
    },

    'Нельзя отправить пустой тикет': function(browser) {
        browser.click('button[type="submit"]')

        browser.expect.element('div:nth-child(1) > fieldset .field-after-error-text').to.be.visible // ошибка, т.к. не заполнено поле Тема вопроса
        browser.expect.element('div:nth-child(1) > fieldset .field-after-error-text').text.to.equal('Заполните это поле.') 
        browser.expect.element('div:nth-child(2) > fieldset .field-after-error-text').to.be.visible // ошибка, т.к. не заполнено поле Какой у Вас вопрос
        browser.expect.element('div:nth-child(2) > fieldset .field-after-error-text').text.to.equal('Заполните это поле.') 
    },

    'Нельзя отправить тикет без поля Какой у Вас вопрос': function(browser) {
        browser
            .setValue('#field_4421', 'Тест разработчиков')
            .click('button[type="submit"]')

        browser.expect.element('div:nth-child(2) > fieldset .field-after-error-text').to.be.visible // ошибка, т.к. не заполнено поле Какой у Вас вопрос
        browser.expect.element('div:nth-child(2) > fieldset .field-after-error-text').text.to.equal('Заполните это поле.')   
    },

    'Нельзя отправить тикет без поля Тема вопроса': function(browser) {
        browser
            .clearValue('#field_4421')
            .setValue('#field_4422', 'Тест разработчиков')
            .click('button[type="submit"]')

        browser.expect.element('div:nth-child(1) > fieldset .field-after-error-text').to.be.visible // ошибка, т.к. не заполнено поле Тема вопроса
        browser.expect.element('div:nth-child(1) > fieldset .field-after-error-text').text.to.equal('Заполните это поле.')    
    }
};    