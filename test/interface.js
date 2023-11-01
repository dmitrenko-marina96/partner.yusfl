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

     // Хедер
     
        browser.expect.element('#header_comment > a.btn.btn-link.me-2 > span').text.to.equal('Контакты')  
        browser.expect.element('#header_comment > a:nth-child(2) > span').text.to.equal('Помощь')
        browser.expect.element('.text-nowrap').text.to.equal('Тест ЮСФЛ (для автотестов)')

     // Футер
         
        browser.expect.element('#main > footer').to.be.visible
        browser.expect.element('.row.my-4.justify-content-between > div:nth-child(2)').text.to.equal('ООО «Юридические Решения»')

     //Сайдбар
     
        browser.expect.element('#sidebar').to.be.visible
        browser.expect.element('img').to.be.visible       
    }

};    