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

    'Переход в контакты': function(browser) {
        browser.click('#header_comment > a.btn.btn-link.me-2 > span')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/kontakty-12027016/')
            .assert.titleContains('Контакты', 'title ok')
            .assert.textContains("h2", "Контакты")
            .expect.element('#listingForm > div > div.col-xl-6.col-xxl-5 > div').to.be.visible // видимость карточки с сертификатом

        browser.expect.element('.marker').text.to.equal('Частным лицам')
        browser.expect.element('.text-primary > a').text.to.equal('УК999990')    
    },

    'Переход в сертификат': function(browser) {
        browser.click('.text-primary > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/sertifikat-1350565557/12898957/')
            .assert.titleContains('УК999990', 'title ok')
            .assert.textContains("h2", "УК999990")
            .expect.element('.col-sm-8 > .marker').text.to.equal('Частным лицам')  // проверка, что продукт совпадает с карточкой в контактах
    }
};