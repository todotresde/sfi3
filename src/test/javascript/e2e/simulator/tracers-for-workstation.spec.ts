import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('tracers-for-workstation', () => {
	let navBarPage: NavBarPage;
    let workstationComponentsPage: WorkstationComponentsPage;
	let tracerForWorkstationComponentsPage: TracerForWorkstationComponentsPage;
	let tracerForWorkstationDialogPage: TracerForWorkstationDialogPage;

	beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('Open WorkStation', () => {
        //Because of problems with intervals (reload async)
        browser.waitForAngularEnabled(false);

    	navBarPage.goToLineAdministration('work-station');
        workstationComponentsPage = new WorkstationComponentsPage();
    	workstationComponentsPage.clickOnWorkButton('192.168.3.1');

        tracerForWorkstationComponentsPage = new TracerForWorkstationComponentsPage();
        tracerForWorkstationComponentsPage.clickOnFirstStartButton();

        tracerForWorkstationDialogPage = new TracerForWorkstationDialogPage();
        tracerForWorkstationDialogPage.clickOnFinishButton();

        browser.waitForAngularEnabled(true);
        browser.sleep(2000);
    })
});

export class WorkstationComponentsPage {

    clickOnWorkButton(workStation: string) {
        let workStationRow = element.all(by.cssContainingText('tr', workStation));
        workStationRow.all(by.cssContainingText('.btn.btn-warning.btn-sm', 'Work')).click();
    }

}

export class TracerForWorkstationComponentsPage {
    
    clickOnFirstStartButton() {
        let tracerRow = element.all(by.cssContainingText('tr','c9fba7318708'));
        tracerRow.all(by.cssContainingText('.btn.btn-danger.btn-sm', 'Start')).click();
    }

}

export class TracerForWorkstationDialogPage {
    finishButton = element(by.css('.modal-footer .btn.btn-primary'));

    clickOnFinishButton() {
        this.finishButton.click();
    }
}