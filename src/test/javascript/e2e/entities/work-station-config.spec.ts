import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('WorkStationConfig e2e test', () => {

    let navBarPage: NavBarPage;
    let workStationConfigDialogPage: WorkStationConfigDialogPage;
    let workStationConfigComponentsPage: WorkStationConfigComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load WorkStationConfigs', () => {
        navBarPage.goToEntity('work-station-config');
        workStationConfigComponentsPage = new WorkStationConfigComponentsPage();
        expect(workStationConfigComponentsPage.getTitle())
            .toMatch(/sfi3App.workStationConfig.home.title/);

    });

    it('should load create WorkStationConfig dialog', () => {
        workStationConfigComponentsPage.clickOnCreateButton();
        workStationConfigDialogPage = new WorkStationConfigDialogPage();
        expect(workStationConfigDialogPage.getModalTitle())
            .toMatch(/sfi3App.workStationConfig.home.createOrEditLabel/);
        workStationConfigDialogPage.close();
    });

   /* it('should create and save WorkStationConfigs', () => {
        workStationConfigComponentsPage.clickOnCreateButton();
        workStationConfigDialogPage.getFirstInput().isSelected().then((selected) => {
            if (selected) {
                workStationConfigDialogPage.getFirstInput().click();
                expect(workStationConfigDialogPage.getFirstInput().isSelected()).toBeFalsy();
            } else {
                workStationConfigDialogPage.getFirstInput().click();
                expect(workStationConfigDialogPage.getFirstInput().isSelected()).toBeTruthy();
            }
        });
        workStationConfigDialogPage.getLastInput().isSelected().then((selected) => {
            if (selected) {
                workStationConfigDialogPage.getLastInput().click();
                expect(workStationConfigDialogPage.getLastInput().isSelected()).toBeFalsy();
            } else {
                workStationConfigDialogPage.getLastInput().click();
                expect(workStationConfigDialogPage.getLastInput().isSelected()).toBeTruthy();
            }
        });
        workStationConfigDialogPage.workStationSelectLastOption();
        // workStationConfigDialogPage.supplyTypeSelectLastOption();
        // workStationConfigDialogPage.employeeSelectLastOption();
        // workStationConfigDialogPage.prevWorkStationSelectLastOption();
        // workStationConfigDialogPage.nextWorkStationSelectLastOption();
        workStationConfigDialogPage.lineSelectLastOption();
        workStationConfigDialogPage.save();
        expect(workStationConfigDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class WorkStationConfigComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-work-station-config div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WorkStationConfigDialogPage {
    modalTitle = element(by.css('h4#myWorkStationConfigLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    firstInput = element(by.css('input#field_first'));
    lastInput = element(by.css('input#field_last'));
    workStationSelect = element(by.css('select#field_workStation'));
    supplyTypeSelect = element(by.css('select#field_supplyType'));
    employeeSelect = element(by.css('select#field_employee'));
    prevWorkStationSelect = element(by.css('select#field_prevWorkStation'));
    nextWorkStationSelect = element(by.css('select#field_nextWorkStation'));
    lineSelect = element(by.css('select#field_line'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    getFirstInput = function() {
        return this.firstInput;
    };
    getLastInput = function() {
        return this.lastInput;
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

    prevWorkStationSelectLastOption = function() {
        this.prevWorkStationSelect.all(by.tagName('option')).last().click();
    };

    prevWorkStationSelectOption = function(option) {
        this.prevWorkStationSelect.sendKeys(option);
    };

    getPrevWorkStationSelect = function() {
        return this.prevWorkStationSelect;
    };

    getPrevWorkStationSelectedOption = function() {
        return this.prevWorkStationSelect.element(by.css('option:checked')).getText();
    };

    nextWorkStationSelectLastOption = function() {
        this.nextWorkStationSelect.all(by.tagName('option')).last().click();
    };

    nextWorkStationSelectOption = function(option) {
        this.nextWorkStationSelect.sendKeys(option);
    };

    getNextWorkStationSelect = function() {
        return this.nextWorkStationSelect;
    };

    getNextWorkStationSelectedOption = function() {
        return this.nextWorkStationSelect.element(by.css('option:checked')).getText();
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
