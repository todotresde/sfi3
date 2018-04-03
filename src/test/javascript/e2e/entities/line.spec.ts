import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Line e2e test', () => {

    let navBarPage: NavBarPage;
    let lineDialogPage: LineDialogPage;
    let lineComponentsPage: LineComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Lines', () => {
        navBarPage.goToEntity('line');
        lineComponentsPage = new LineComponentsPage();
        expect(lineComponentsPage.getTitle())
            .toMatch(/mmsApp.line.home.title/);

    });

    it('should load create Line dialog', () => {
        lineComponentsPage.clickOnCreateButton();
        lineDialogPage = new LineDialogPage();
        expect(lineDialogPage.getModalTitle())
            .toMatch(/mmsApp.line.home.createOrEditLabel/);
        lineDialogPage.close();
    });

    it('should create and save Lines', () => {
        lineComponentsPage.clickOnCreateButton();
        lineDialogPage.setNameInput('name');
        expect(lineDialogPage.getNameInput()).toMatch('name');
        lineDialogPage.save();
        expect(lineDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LineComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-line div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LineDialogPage {
    modalTitle = element(by.css('h4#myLineLabel'));
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
