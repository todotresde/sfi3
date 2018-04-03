import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ManufacturingOrder e2e test', () => {

    let navBarPage: NavBarPage;
    let manufacturingOrderDialogPage: ManufacturingOrderDialogPage;
    let manufacturingOrderComponentsPage: ManufacturingOrderComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ManufacturingOrders', () => {
        navBarPage.goToEntity('manufacturing-order');
        manufacturingOrderComponentsPage = new ManufacturingOrderComponentsPage();
        expect(manufacturingOrderComponentsPage.getTitle())
            .toMatch(/mmsApp.manufacturingOrder.home.title/);

    });

    it('should load create ManufacturingOrder dialog', () => {
        manufacturingOrderComponentsPage.clickOnCreateButton();
        manufacturingOrderDialogPage = new ManufacturingOrderDialogPage();
        expect(manufacturingOrderDialogPage.getModalTitle())
            .toMatch(/mmsApp.manufacturingOrder.home.createOrEditLabel/);
        manufacturingOrderDialogPage.close();
    });

    it('should create and save ManufacturingOrders', () => {
        manufacturingOrderComponentsPage.clickOnCreateButton();
        manufacturingOrderDialogPage.setCodeInput('code');
        expect(manufacturingOrderDialogPage.getCodeInput()).toMatch('code');
        manufacturingOrderDialogPage.setOrderDateInput(12310020012301);
        expect(manufacturingOrderDialogPage.getOrderDateInput()).toMatch('2001-12-31T02:30');
        manufacturingOrderDialogPage.setStatusInput('5');
        expect(manufacturingOrderDialogPage.getStatusInput()).toMatch('5');
        manufacturingOrderDialogPage.setNameInput('name');
        expect(manufacturingOrderDialogPage.getNameInput()).toMatch('name');
        manufacturingOrderDialogPage.save();
        expect(manufacturingOrderDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ManufacturingOrderComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-manufacturing-order div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ManufacturingOrderDialogPage {
    modalTitle = element(by.css('h4#myManufacturingOrderLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));
    orderDateInput = element(by.css('input#field_orderDate'));
    statusInput = element(by.css('input#field_status'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCodeInput = function(code) {
        this.codeInput.sendKeys(code);
    };

    getCodeInput = function() {
        return this.codeInput.getAttribute('value');
    };

    setOrderDateInput = function(orderDate) {
        this.orderDateInput.sendKeys(orderDate);
    };

    getOrderDateInput = function() {
        return this.orderDateInput.getAttribute('value');
    };

    setStatusInput = function(status) {
        this.statusInput.sendKeys(status);
    };

    getStatusInput = function() {
        return this.statusInput.getAttribute('value');
    };

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
