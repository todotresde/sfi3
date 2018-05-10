import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('manufacturing-orders', () => {
	let navBarPage: NavBarPage;
	let manufacturingOrderComponentsPage: ManufacturingOrderComponentsPage;
	let manufacturingOrderDialogPage: ManufacturingOrderDialogPage;
	let numberOfManufacturinOrders = 20;

	beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

	for(let i=0; i < numberOfManufacturinOrders; i++){
		
		(function (numberOfManufacturingOrder) {  
		    it('create MO' + numberOfManufacturingOrder, () => {
		    	navBarPage.goToSales('manufacturing-order');
		    	manufacturingOrderComponentsPage = new ManufacturingOrderComponentsPage();
		    	manufacturingOrderComponentsPage.clickOnCreateButton();

		    	let code = Math.round(Math.random()*1000);
		    	let count = Math.floor(Math.random()*30) + 1;
		    	let width = Math.floor(Math.random()*10) + 1;
		    	let height = Math.floor(Math.random()*10) + 1;

		    	manufacturingOrderDialogPage = new ManufacturingOrderDialogPage();
		    	manufacturingOrderDialogPage.setCodeInput(code);
		    	manufacturingOrderDialogPage.setDescriptionInput('Descripción de Prueba' + code);
		    	manufacturingOrderDialogPage.addProduct();
		    	manufacturingOrderDialogPage.setQuantityInput(count);
		    	manufacturingOrderDialogPage.selectSupply(0, 'Tela roler Acuarela Acero',[width, height]);
		    	manufacturingOrderDialogPage.addSupply();
		    	manufacturingOrderDialogPage.selectSupply(1, 'Sistema Tecno cadena metálica c/cenefa frente curvo de 60 mm',[width]);
		    	manufacturingOrderDialogPage.addSupply();
		    	manufacturingOrderDialogPage.selectSupply(2, 'Motor RA para Multistore Prolight automatizado con emisor',[]);
		    	manufacturingOrderDialogPage.addSupply();
		    	manufacturingOrderDialogPage.selectSupply(3, 'Acces.60 mm p/sistema Tecno c/base suj. Blanco para S.214',[]);

		    	manufacturingOrderDialogPage.save();

		    	manufacturingOrderComponentsPage.sendFirst();
		    })
		})(i);
	}
});

export class ManufacturingOrderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    sendButton = element(by.css('.modal-footer .btn.btn-danger'));
    title = element.all(by.css('jhi-employee div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    clickOnFirstSendButton() {
        return element(by.cssContainingText('tr .btn.btn-primary.btn-sm', 'Send')).click();
    }

    clickOnSendButton() {
        return this.sendButton.click();
    }

    sendFirst(){
    	this.clickOnFirstSendButton();
    	this.clickOnSendButton();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ManufacturingOrderDialogPage {
    modalTitle = element(by.css('h4#myEmployeeLabel'));
    addProductButton = element(by.cssContainingText('.modal .btn.btn-info.btn-sm', 'Add Product'));
    addSupplyButton = element(by.cssContainingText('.modal .btn.btn-info.btn-sm', 'Add Supply'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));

    codeInput = element(by.css('input#field_code'));
    descriptionInput = element(by.css('input#field_description'));

    quantityInput = element(by.id('products[0].quantity'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setCodeInput = function(code) {
        this.codeInput.sendKeys(code);
    };

    getCodeInput = function() {
        return this.codeInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    setQuantityInput = function(quantity) {
        this.quantityInput.sendKeys(quantity);
    };

    getQuantityInput = function() {
        return this.quantityInput.getAttribute('value');
    };

    selectSupply(position: number, supply: string, measures: any) {
    	element(by.id('field_supply['+position+']')).element(by.cssContainingText('option', supply)).click();
    	browser.sleep(1000);
    	if(measures.length === 2){
    		element(by.id('attributeValues[0][' + position + '][\'Width\']')).sendKeys(measures[0]);
    		element(by.id('attributeValues[0][' + position + '][\'Height\']')).sendKeys(measures[1]);
    	}

    	if(measures.length === 1){
    		element(by.id('attributeValues[0][' + position + '][\'Width\']')).sendKeys(measures[0]);
    	}
    }

    addProduct() {
    	this.addProductButton.click();
    }

    addSupply() {
    	this.addSupplyButton.click();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}