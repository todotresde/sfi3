import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
import { WorkstationComponentsPage, TracerForWorkstationComponentsPage, TracerForWorkstationDialogPage } from './tracers-for-workstation.spec';

let workStations: string[] = ['192.168.3.1','192.168.3.2','192.168.3.3','192.168.3.4','192.168.3.5'];
let numberOfTracers = 1;

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
    
    for(let workStationPos=0; workStationPos < workStations.length; workStationPos++){
        
        //Necessary To wait before click to advance
        //let waitTime = (Math.floor(Math.random()*10) + 1) * 60000;

        for(let numberOfTracer=0; numberOfTracer < numberOfTracers; numberOfTracer++){
            
            //waitTime = waitTime + ((Math.floor(Math.random()*10) + 1) * 15000) * ((Math.random()*10) > 5 ? 1 : -1);

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
            })(workStations[workStationPos]);
        }
    }
});
