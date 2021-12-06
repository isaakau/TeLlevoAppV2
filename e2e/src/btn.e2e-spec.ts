import { browser, element, by } from 'protractor';

describe('Login',()=>{
    //codigo de configuración 
    beforeEach(()=>{
        browser.get("/");
    });
    //test 1
    it("Hay un boton para recuperar contraseña",()=>{
        expect(element(by.buttonText('¿Olvidaste tu contraseña?')).getText()).toEqual;
    });
    //test 2
    it("Hay un boton para ingresar",()=>{
        expect(element(by.buttonText('Ingresar')).getText()).toEqual;
    });
    //test 3
    it("Existe el imput para ingresar Usuario",()=>{
        expect(element(by.id('us')).getText()).toContain('Usuario');
    });
})