import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SupplyTypeAttrValue e2e test', () => {

    let navBarPage: NavBarPage;
    let supplyTypeAttrValueDialogPage: SupplyTypeAttrValueDialogPage;
    let supplyTypeAttrValueComponentsPage: SupplyTypeAttrValueComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SupplyTypeAttrValues', () => {
        navBarPage.goToEntity('supply-type-attr-value');
        supplyTypeAttrValueComponentsPage = new SupplyTypeAttrValueComponentsPage();
        expect(supplyTypeAttrValueComponentsPage.getTitle())
            .toMatch(/sfi3App.supplyTypeAttrValue.home.title/);

    });

    it('should load create SupplyTypeAttrValue dialog', () => {
        supplyTypeAttrValueComponentsPage.clickOnCreateButton();
        supplyTypeAttrValueDialogPage = new SupplyTypeAttrValueDialogPage();
        expect(supplyTypeAttrValueDialogPage.getModalTitle())
            .toMatch(/sfi3App.supplyTypeAttrValue.home.createOrEditLabel/);
        supplyTypeAttrValueDialogPage.close();
    });

   /* it('should create and save SupplyTypeAttrValues', () => {
        supplyTypeAttrValueComponentsPage.clickOnCreateButton();
        supplyTypeAttrValueDialogPage.setNameInput('name');
        expect(supplyTypeAttrValueDialogPage.getNameInput()).toMatch('name');
        supplyTypeAttrValueDialogPage.productSelectLastOption();
        supplyTypeAttrValueDialogPage.supplySelectLastOption();
        supplyTypeAttrValueDialogPage.supplyTypeSelectLastOption();
        supplyTypeAttrValueDialogPage.supplyTypeAttrSelectLastOption();
        supplyTypeAttrValueDialogPage.manufacturingOrderSelectLastOption();
        supplyTypeAttrValueDialogPage.save();
        expect(supplyTypeAttrValueDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SupplyTypeAttrValueComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-supply-type-attr-value div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SupplyTypeAttrValueDialogPage {
    modalTitle = element(by.css('h4#mySupplyTypeAttrValueLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    productSelect = element(by.css('select#field_product'));
    supplySelect = element(by.css('select#field_supply'));
    supplyTypeSelect = element(by.css('select#field_supplyType'));
    supplyTypeAttrSelect = element(by.css('select#field_supplyTypeAttr'));
    manufacturingOrderSelect = element(by.css('select#field_manufacturingOrder'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    productSelectLastOption = function() {
        this.productSelect.all(by.tagName('option')).last().click();
    };

    productSelectOption = function(option) {
        this.productSelect.sendKeys(option);
    };

    getProductSelect = function() {
        return this.productSelect;
    };

    getProductSelectedOption = function() {
        return this.productSelect.element(by.css('option:checked')).getText();
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

    supplyTypeSelectLastOption = function() {
        this.supplyTypeSelect.all(by.tagName('option')).last().click();
    };

    supplyTypeSelectOption = function(option) {
        this.supplyTypeSelect.sendKeys(option);
    };

    getSupplyTypeSelect = function() {
        return this.supplyTypeSelect;
    };

    getSupplyTypeSelectedOption = function() {
        return this.supplyTypeSelect.element(by.css('option:checked')).getText();
    };

    supplyTypeAttrSelectLastOption = function() {
        this.supplyTypeAttrSelect.all(by.tagName('option')).last().click();
    };

    supplyTypeAttrSelectOption = function(option) {
        this.supplyTypeAttrSelect.sendKeys(option);
    };

    getSupplyTypeAttrSelect = function() {
        return this.supplyTypeAttrSelect;
    };

    getSupplyTypeAttrSelectedOption = function() {
        return this.supplyTypeAttrSelect.element(by.css('option:checked')).getText();
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
