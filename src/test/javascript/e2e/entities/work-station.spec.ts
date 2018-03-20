import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('WorkStation e2e test', () => {

    let navBarPage: NavBarPage;
    let workStationDialogPage: WorkStationDialogPage;
    let workStationComponentsPage: WorkStationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load WorkStations', () => {
        navBarPage.goToEntity('work-station');
        workStationComponentsPage = new WorkStationComponentsPage();
        expect(workStationComponentsPage.getTitle())
            .toMatch(/sfi3App.workStation.home.title/);

    });

    it('should load create WorkStation dialog', () => {
        workStationComponentsPage.clickOnCreateButton();
        workStationDialogPage = new WorkStationDialogPage();
        expect(workStationDialogPage.getModalTitle())
            .toMatch(/sfi3App.workStation.home.createOrEditLabel/);
        workStationDialogPage.close();
    });

    it('should create and save WorkStations', () => {
        workStationComponentsPage.clickOnCreateButton();
        workStationDialogPage.setNameInput('name');
        expect(workStationDialogPage.getNameInput()).toMatch('name');
        workStationDialogPage.setShortNameInput('shortName');
        expect(workStationDialogPage.getShortNameInput()).toMatch('shortName');
        workStationDialogPage.setIpInput('ip');
        expect(workStationDialogPage.getIpInput()).toMatch('ip');
        workStationDialogPage.save();
        expect(workStationDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class WorkStationComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-work-station div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WorkStationDialogPage {
    modalTitle = element(by.css('h4#myWorkStationLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    shortNameInput = element(by.css('input#field_shortName'));
    ipInput = element(by.css('input#field_ip'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
    };

    setShortNameInput = function(shortName) {
        this.shortNameInput.sendKeys(shortName);
    };

    getShortNameInput = function() {
        return this.shortNameInput.getAttribute('value');
    };

    setIpInput = function(ip) {
        this.ipInput.sendKeys(ip);
    };

    getIpInput = function() {
        return this.ipInput.getAttribute('value');
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
