import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('SupplyTypeAttr e2e test', () => {

    let navBarPage: NavBarPage;
    let supplyTypeAttrDialogPage: SupplyTypeAttrDialogPage;
    let supplyTypeAttrComponentsPage: SupplyTypeAttrComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load SupplyTypeAttrs', () => {
        navBarPage.goToEntity('supply-type-attr');
        supplyTypeAttrComponentsPage = new SupplyTypeAttrComponentsPage();
        expect(supplyTypeAttrComponentsPage.getTitle())
            .toMatch(/mmsApp.supplyTypeAttr.home.title/);

    });

    it('should load create SupplyTypeAttr dialog', () => {
        supplyTypeAttrComponentsPage.clickOnCreateButton();
        supplyTypeAttrDialogPage = new SupplyTypeAttrDialogPage();
        expect(supplyTypeAttrDialogPage.getModalTitle())
            .toMatch(/mmsApp.supplyTypeAttr.home.createOrEditLabel/);
        supplyTypeAttrDialogPage.close();
    });

    it('should create and save SupplyTypeAttrs', () => {
        supplyTypeAttrComponentsPage.clickOnCreateButton();
        supplyTypeAttrDialogPage.setNameInput('name');
        expect(supplyTypeAttrDialogPage.getNameInput()).toMatch('name');
        supplyTypeAttrDialogPage.save();
        expect(supplyTypeAttrDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class SupplyTypeAttrComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-supply-type-attr div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SupplyTypeAttrDialogPage {
    modalTitle = element(by.css('h4#mySupplyTypeAttrLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
