import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SupplyType e2e test', () => {

    let navBarPage: NavBarPage;
    let supplyTypeDialogPage: SupplyTypeDialogPage;
    let supplyTypeComponentsPage: SupplyTypeComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SupplyTypes', () => {
        navBarPage.goToEntity('supply-type');
        supplyTypeComponentsPage = new SupplyTypeComponentsPage();
        expect(supplyTypeComponentsPage.getTitle())
            .toMatch(/mmsApp.supplyType.home.title/);

    });

    it('should load create SupplyType dialog', () => {
        supplyTypeComponentsPage.clickOnCreateButton();
        supplyTypeDialogPage = new SupplyTypeDialogPage();
        expect(supplyTypeDialogPage.getModalTitle())
            .toMatch(/mmsApp.supplyType.home.createOrEditLabel/);
        supplyTypeDialogPage.close();
    });

    it('should create and save SupplyTypes', () => {
        supplyTypeComponentsPage.clickOnCreateButton();
        supplyTypeDialogPage.setNameInput('name');
        expect(supplyTypeDialogPage.getNameInput()).toMatch('name');
        // supplyTypeDialogPage.supplyTypeAttrSelectLastOption();
        supplyTypeDialogPage.save();
        expect(supplyTypeDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SupplyTypeComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-supply-type div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SupplyTypeDialogPage {
    modalTitle = element(by.css('h4#mySupplyTypeLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    supplyTypeAttrSelect = element(by.css('select#field_supplyTypeAttr'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
