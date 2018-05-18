import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('LinearRegression e2e test', () => {

    let navBarPage: NavBarPage;
    let linearRegressionDialogPage: LinearRegressionDialogPage;
    let linearRegressionComponentsPage: LinearRegressionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load LinearRegressions', () => {
        navBarPage.goToEntity('linear-regression');
        linearRegressionComponentsPage = new LinearRegressionComponentsPage();
        expect(linearRegressionComponentsPage.getTitle())
            .toMatch(/mmsApp.linearRegression.home.title/);

    });

    it('should load create LinearRegression dialog', () => {
        linearRegressionComponentsPage.clickOnCreateButton();
        linearRegressionDialogPage = new LinearRegressionDialogPage();
        expect(linearRegressionDialogPage.getModalTitle())
            .toMatch(/mmsApp.linearRegression.home.createOrEditLabel/);
        linearRegressionDialogPage.close();
    });

   /* it('should create and save LinearRegressions', () => {
        linearRegressionComponentsPage.clickOnCreateButton();
        linearRegressionDialogPage.setDimensionInput('5');
        expect(linearRegressionDialogPage.getDimensionInput()).toMatch('5');
        linearRegressionDialogPage.setXInput('5');
        expect(linearRegressionDialogPage.getXInput()).toMatch('5');
        linearRegressionDialogPage.setBeta0Input('5');
        expect(linearRegressionDialogPage.getBeta0Input()).toMatch('5');
        linearRegressionDialogPage.setBeta1Input('5');
        expect(linearRegressionDialogPage.getBeta1Input()).toMatch('5');
        linearRegressionDialogPage.lineSelectLastOption();
        linearRegressionDialogPage.workStationConfigSelectLastOption();
        linearRegressionDialogPage.workStationSelectLastOption();
        linearRegressionDialogPage.supplySelectLastOption();
        linearRegressionDialogPage.supplyTypeSelectLastOption();
        linearRegressionDialogPage.employeeSelectLastOption();
        linearRegressionDialogPage.save();
        expect(linearRegressionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LinearRegressionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-linear-regression div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LinearRegressionDialogPage {
    modalTitle = element(by.css('h4#myLinearRegressionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    dimensionInput = element(by.css('input#field_dimension'));
    xInput = element(by.css('input#field_x'));
    beta0Input = element(by.css('input#field_beta0'));
    beta1Input = element(by.css('input#field_beta1'));
    lineSelect = element(by.css('select#field_line'));
    workStationConfigSelect = element(by.css('select#field_workStationConfig'));
    workStationSelect = element(by.css('select#field_workStation'));
    supplySelect = element(by.css('select#field_supply'));
    supplyTypeSelect = element(by.css('select#field_supplyType'));
    employeeSelect = element(by.css('select#field_employee'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDimensionInput = function(dimension) {
        this.dimensionInput.sendKeys(dimension);
    };

    getDimensionInput = function() {
        return this.dimensionInput.getAttribute('value');
    };

    setXInput = function(x) {
        this.xInput.sendKeys(x);
    };

    getXInput = function() {
        return this.xInput.getAttribute('value');
    };

    setBeta0Input = function(beta0) {
        this.beta0Input.sendKeys(beta0);
    };

    getBeta0Input = function() {
        return this.beta0Input.getAttribute('value');
    };

    setBeta1Input = function(beta1) {
        this.beta1Input.sendKeys(beta1);
    };

    getBeta1Input = function() {
        return this.beta1Input.getAttribute('value');
    };

    lineSelectLastOption = function() {
        this.lineSelect.all(by.tagName('option')).last().click();
    };

    lineSelectOption = function(option) {
        this.lineSelect.sendKeys(option);
    };

    getLineSelect = function() {
        return this.lineSelect;
    };

    getLineSelectedOption = function() {
        return this.lineSelect.element(by.css('option:checked')).getText();
    };

    workStationConfigSelectLastOption = function() {
        this.workStationConfigSelect.all(by.tagName('option')).last().click();
    };

    workStationConfigSelectOption = function(option) {
        this.workStationConfigSelect.sendKeys(option);
    };

    getWorkStationConfigSelect = function() {
        return this.workStationConfigSelect;
    };

    getWorkStationConfigSelectedOption = function() {
        return this.workStationConfigSelect.element(by.css('option:checked')).getText();
    };

    workStationSelectLastOption = function() {
        this.workStationSelect.all(by.tagName('option')).last().click();
    };

    workStationSelectOption = function(option) {
        this.workStationSelect.sendKeys(option);
    };

    getWorkStationSelect = function() {
        return this.workStationSelect;
    };

    getWorkStationSelectedOption = function() {
        return this.workStationSelect.element(by.css('option:checked')).getText();
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

    employeeSelectLastOption = function() {
        this.employeeSelect.all(by.tagName('option')).last().click();
    };

    employeeSelectOption = function(option) {
        this.employeeSelect.sendKeys(option);
    };

    getEmployeeSelect = function() {
        return this.employeeSelect;
    };

    getEmployeeSelectedOption = function() {
        return this.employeeSelect.element(by.css('option:checked')).getText();
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
