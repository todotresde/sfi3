import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('tracers-for-workstation', () => {
	let navBarPage: NavBarPage;
    let workstationComponentsPage: WorkstationComponentsPage;
	let tracerForWorkstationComponentsPage: TracerForWorkstationComponentsPage;
	let tracerForWorkstationDialogPage: TracerForWorkstationDialogPage;
    let workStations: string[][] = [
        ['192.168.1.1','192.168.1.2','192.168.1.3','192.168.1.4','192.168.1.5'],
        ['192.168.2.1','192.168.2.2','192.168.2.3','192.168.2.4','192.168.2.5'],
        ['192.168.3.1','192.168.3.2','192.168.3.3','192.168.3.4','192.168.3.5']
    ];
    let numberOfTracers = 5;
    
	beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });
    
    for(let numberOfLine=0; numberOfLine < workStations.length; numberOfLine++){

        for(let workStationPos=0; workStationPos < workStations[numberOfLine].length; workStationPos++){
            
            //Necessary To wait before click to advance
            let waitTime = (Math.floor(Math.random()*10) + 1) * 60000;

            for(let numberOfTracer=0; numberOfTracer < numberOfTracers; numberOfTracer++){
                
                waitTime = waitTime + ((Math.floor(Math.random()*10) + 1) * 15000) * ((Math.random()*10) > 5 ? 1 : -1);

                (function (workStation) {  
                    it('Open WorkStation' + workStation, () => {
                        //Because of problems with intervals (reload async)
                        browser.waitForAngularEnabled(false);

                        browser.sleep(2000);
                    	navBarPage.goToLineAdministration('work-station');
                        workstationComponentsPage = new WorkstationComponentsPage();
                    	workstationComponentsPage.clickOnWorkButton(workStation);

                        tracerForWorkstationComponentsPage = new TracerForWorkstationComponentsPage();
                        tracerForWorkstationComponentsPage.clickOnFirstStartButton();

                        browser.sleep(2000);

                        tracerForWorkstationDialogPage = new TracerForWorkstationDialogPage();
                        tracerForWorkstationDialogPage.clickOnFinishButton();

                        browser.waitForAngularEnabled(true);
                        browser.sleep(2000);
                    })
                })(workStations[numberOfLine][workStationPos]);
            }
        }
    }
});

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