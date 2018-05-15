import { browser, element, by } from 'protractor';

export class WorkstationComponentsPage {

    clickOnWorkButton(workStation: string) {
        let workStationRow = element.all(by.cssContainingText('tr', workStation));
        workStationRow.all(by.cssContainingText('.btn.btn-warning.btn-sm', 'Work')).click();
    }

}

export class TracerForWorkstationComponentsPage {
    
    clickOnFirstStartButton() {
        return element(by.cssContainingText('tr .btn.btn-danger.btn-sm', 'Start')).click();
    }

}

export class TracerForWorkstationDialogPage {
    finishButton = element(by.css('.modal-footer .btn.btn-primary'));

    clickOnFinishButton() {
        this.finishButton.click();
    }
}
