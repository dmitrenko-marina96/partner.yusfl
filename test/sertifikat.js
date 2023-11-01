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

    'Переход в раздел Мои сертификаты': function(browser) {
        browser.click('#menu > div > div:nth-child(4)')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/sertifikat-1350565557/')
            .assert.titleContains('Мои сертификаты', 'title ok')
            .assert.textContains("h2", "Мои сертификаты")
            .expect.element('#listingForm > div:nth-child(2)').to.be.visible // видимость сертификата            
    },

    'Переход в сертификат': function(browser) {
        browser.click('#listingForm > div > div > div:nth-child(2) > h5 > a')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/sertifikat-1350565557/12898957/')
            .assert.titleContains('УК999990', 'title ok')
            .assert.textContains("h2", "УК999990")

        browser.expect.element('.me-1 > .marker').text.to.equal('Действующий')  // проверка отображения корректного статуса
        browser.expect.element('.col-sm-8 > .marker').text.to.equal('Частным лицам') // проверка отображения корректного продукта
       // browser.expect.element('#box_content_ajax_48_13045668 > a').text.to.equal('Тест ЮСФЛ (для автотестов)') // проверка отображения корректного клиента - в этом проекте такого поля нет
       // browser.expect.element('#menu_1118947_page_boxes_1 > div > div > table').to.be.visible // проверка видимости таблицы со списанием услуг
    },

    'Возврат в раздел Мои сертификаты': function(browser) {
        browser.click('.btn-secondary > .d-none')

        browser
            .waitForElementVisible('body', 'Заголовок загружен')
            .assert.urlContains('https://partner.pravocard.ru/sertifikat-1350565557/')
            .assert.titleContains('Мои сертификаты', 'title ok')
            .assert.textContains("h2", "Мои сертификаты")
            .expect.element('#listingForm > div:nth-child(2)').to.be.visible // видимость сертификата 
    }    
};    