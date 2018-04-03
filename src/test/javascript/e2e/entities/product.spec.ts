import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Product e2e test', () => {

    let navBarPage: NavBarPage;
    let productDialogPage: ProductDialogPage;
    let productComponentsPage: ProductComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Products', () => {
        navBarPage.goToEntity('product');
        productComponentsPage = new ProductComponentsPage();
        expect(productComponentsPage.getTitle())
            .toMatch(/mmsApp.product.home.title/);

    });

    it('should load create Product dialog', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage = new ProductDialogPage();
        expect(productDialogPage.getModalTitle())
            .toMatch(/mmsApp.product.home.createOrEditLabel/);
        productDialogPage.close();
    });

   /* it('should create and save Products', () => {
        productComponentsPage.clickOnCreateButton();
        productDialogPage.setDescriptionInput('description');
        expect(productDialogPage.getDescriptionInput()).toMatch('description');
        productDialogPage.setQuantityInput('5');
        expect(productDialogPage.getQuantityInput()).toMatch('5');
        productDialogPage.manufacturingOrderSelectLastOption();
        // productDialogPage.supplySelectLastOption();
        productDialogPage.save();
        expect(productDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ProductComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-product div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ProductDialogPage {
    modalTitle = element(by.css('h4#myProductLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descriptionInput = element(by.css('input#field_description'));
    quantityInput = element(by.css('input#field_quantity'));
    manufacturingOrderSelect = element(by.css('select#field_manufacturingOrder'));
    supplySelect = element(by.css('select#field_supply'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

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

    manufacturingOrderSelectLastOption = function() {
        this.manufacturingOrderSelect.all(by.tagName('option')).last().click();
    };

    manufacturingOrderSelectOption = function(option) {
        this.manufacturingOrderSelect.sendKeys(option);
    };

    getManufacturingOrderSelect = function() {
        return this.manufacturingOrderSelect;
    };

    getManufacturingOrderSelectedOption = function() {
        return this.manufacturingOrderSelect.element(by.css('option:checked')).getText();
    };

    supplySelectLastOption = function() {
        this.supplySelect.all(by.tagName('option')).last().click();
    };

    supplySelectOption = function(option) {
        this.supplySelect.sendKeys(option);
    };

    getSupplySelect = function() {
        return this.supplySelect;
    };

    getSupplySelectedOption = function() {
        return this.supplySelect.element(by.css('option:checked')).getText();
    };

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
