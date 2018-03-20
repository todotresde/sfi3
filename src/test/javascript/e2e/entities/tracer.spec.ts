import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Tracer e2e test', () => {

    let navBarPage: NavBarPage;
    let tracerDialogPage: TracerDialogPage;
    let tracerComponentsPage: TracerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Tracers', () => {
        navBarPage.goToEntity('tracer');
        tracerComponentsPage = new TracerComponentsPage();
        expect(tracerComponentsPage.getTitle())
            .toMatch(/sfi3App.tracer.home.title/);

    });

    it('should load create Tracer dialog', () => {
        tracerComponentsPage.clickOnCreateButton();
        tracerDialogPage = new TracerDialogPage();
        expect(tracerDialogPage.getModalTitle())
            .toMatch(/sfi3App.tracer.home.createOrEditLabel/);
        tracerDialogPage.close();
    });

   /* it('should create and save Tracers', () => {
        tracerComponentsPage.clickOnCreateButton();
        tracerDialogPage.setCodeInput('code');
        expect(tracerDialogPage.getCodeInput()).toMatch('code');
        tracerDialogPage.setInTimeInput(12310020012301);
        expect(tracerDialogPage.getInTimeInput()).toMatch('2001-12-31T02:30');
        tracerDialogPage.setStartTimeInput(12310020012301);
        expect(tracerDialogPage.getStartTimeInput()).toMatch('2001-12-31T02:30');
        tracerDialogPage.setEndTimeInput(12310020012301);
        expect(tracerDialogPage.getEndTimeInput()).toMatch('2001-12-31T02:30');
        tracerDialogPage.setTimeInput('5');
        expect(tracerDialogPage.getTimeInput()).toMatch('5');
        tracerDialogPage.setStatusInput('5');
        expect(tracerDialogPage.getStatusInput()).toMatch('5');
        tracerDialogPage.workStationConfigSelectLastOption();
        tracerDialogPage.manufacturingOrderSelectLastOption();
        tracerDialogPage.lineSelectLastOption();
        tracerDialogPage.workStationSelectLastOption();
        tracerDialogPage.prevWorkStationSelectLastOption();
        tracerDialogPage.nextWorkStationSelectLastOption();
        tracerDialogPage.nextTracerSelectLastOption();
        tracerDialogPage.prevTracerSelectLastOption();
        tracerDialogPage.save();
        expect(tracerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TracerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-tracer div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TracerDialogPage {
    modalTitle = element(by.css('h4#myTracerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));
    inTimeInput = element(by.css('input#field_inTime'));
    startTimeInput = element(by.css('input#field_startTime'));
    endTimeInput = element(by.css('input#field_endTime'));
    timeInput = element(by.css('input#field_time'));
    statusInput = element(by.css('input#field_status'));
    workStationConfigSelect = element(by.css('select#field_workStationConfig'));
    manufacturingOrderSelect = element(by.css('select#field_manufacturingOrder'));
    lineSelect = element(by.css('select#field_line'));
    workStationSelect = element(by.css('select#field_workStation'));
    prevWorkStationSelect = element(by.css('select#field_prevWorkStation'));
    nextWorkStationSelect = element(by.css('select#field_nextWorkStation'));
    nextTracerSelect = element(by.css('select#field_nextTracer'));
    prevTracerSelect = element(by.css('select#field_prevTracer'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCodeInput = function(code) {
        this.codeInput.sendKeys(code);
    };

    getCodeInput = function() {
        return this.codeInput.getAttribute('value');
    };

    setInTimeInput = function(inTime) {
        this.inTimeInput.sendKeys(inTime);
    };

    getInTimeInput = function() {
        return this.inTimeInput.getAttribute('value');
    };

    setStartTimeInput = function(startTime) {
        this.startTimeInput.sendKeys(startTime);
    };

    getStartTimeInput = function() {
        return this.startTimeInput.getAttribute('value');
    };

    setEndTimeInput = function(endTime) {
        this.endTimeInput.sendKeys(endTime);
    };

    getEndTimeInput = function() {
        return this.endTimeInput.getAttribute('value');
    };

    setTimeInput = function(time) {
        this.timeInput.sendKeys(time);
    };

    getTimeInput = function() {
        return this.timeInput.getAttribute('value');
    };

    setStatusInput = function(status) {
        this.statusInput.sendKeys(status);
    };

    getStatusInput = function() {
        return this.statusInput.getAttribute('value');
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

    nextTracerSelectLastOption = function() {
        this.nextTracerSelect.all(by.tagName('option')).last().click();
    };

    nextTracerSelectOption = function(option) {
        this.nextTracerSelect.sendKeys(option);
    };

    getNextTracerSelect = function() {
        return this.nextTracerSelect;
    };

    getNextTracerSelectedOption = function() {
        return this.nextTracerSelect.element(by.css('option:checked')).getText();
    };

    prevTracerSelectLastOption = function() {
        this.prevTracerSelect.all(by.tagName('option')).last().click();
    };

    prevTracerSelectOption = function(option) {
        this.prevTracerSelect.sendKeys(option);
    };

    getPrevTracerSelect = function() {
        return this.prevTracerSelect;
    };

    getPrevTracerSelectedOption = function() {
        return this.prevTracerSelect.element(by.css('option:checked')).getText();
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
