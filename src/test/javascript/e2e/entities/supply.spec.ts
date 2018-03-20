import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Supply e2e test', () => {

    let navBarPage: NavBarPage;
    let supplyDialogPage: SupplyDialogPage;
    let supplyComponentsPage: SupplyComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Supplies', () => {
        navBarPage.goToEntity('supply');
        supplyComponentsPage = new SupplyComponentsPage();
        expect(supplyComponentsPage.getTitle())
            .toMatch(/sfi3App.supply.home.title/);

    });

    it('should load create Supply dialog', () => {
        supplyComponentsPage.clickOnCreateButton();
        supplyDialogPage = new SupplyDialogPage();
        expect(supplyDialogPage.getModalTitle())
            .toMatch(/sfi3App.supply.home.createOrEditLabel/);
        supplyDialogPage.close();
    });

   /* it('should create and save Supplies', () => {
        supplyComponentsPage.clickOnCreateButton();
        supplyDialogPage.setNameInput('name');
        expect(supplyDialogPage.getNameInput()).toMatch('name');
        supplyDialogPage.supplyTypeSelectLastOption();
        supplyDialogPage.save();
        expect(supplyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SupplyComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-supply div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SupplyDialogPage {
    modalTitle = element(by.css('h4#mySupplyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    supplyTypeSelect = element(by.css('select#field_supplyType'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
