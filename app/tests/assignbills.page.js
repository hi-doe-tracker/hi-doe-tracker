import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class AssignBillsPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ADMIN_CREATE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Assigns a scraper bill to new bill information. */
  async signupUser() {
    const action = 'Elections';
    const actionNumber = '55';
    const legalType = 'Type 1';
    const committeeReferral = 'Committee 1';
    const committeeReports = 'Report 1';
    const allVersions = 'Version 1';
    const hearingNotices = 'Notice 1';
    const testifierContact = '(123)4567890';
    const notifiedHearing = 'Hearing';
    const hearingLocation = 'Hawaii State Capitol';
    const committee = 'Committee';
    const type = 'Type 1';
    const leadOfficePosition = 'Bill Braski';
    const testifier = 'Fredrick Jones';
    const similar = 'Similar 1';
    const approvedTestimony = 'Approved Testimony 1';
    const monitoringReports = 'Monitoring Report 1';
    const hearingComments = 'Great hearing today!';
    const testimony = 'Testimony 1';
    const rationale = 'Rationale 1';
    const assignedBillSelect = Selector('#assignedBill');
    const mainOfficeSelect = Selector('#mainOffice');
    const deputy = Selector('#deputy');
    const ocid = Selector('#ocid');
    const osss = Selector('#osss');
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}`, action);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}`, actionNumber);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_EMAIL}`, legalType);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, committeeReferral);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}`, committeeReports);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}`, allVersions);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_EMAIL}`, hearingNotices);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, testifierContact);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}`, notifiedHearing);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}`, hearingLocation);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_EMAIL}`, committee);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, type);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}`, leadOfficePosition);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}`, testifier);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_EMAIL}`, similar);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, approvedTestimony);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_EMAIL}`, monitoringReports);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, hearingComments);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}`, testimony);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}`, rationale);
    await t.click(assignedBillSelect);
    await t.click(assignedBillSelect.withText('#137: RELATING TO LIQUOR.'));
    await t.click(mainOfficeSelect);
    await t.click(mainOfficeSelect.withText('OCID'));
    await t.click(deputy);
    await t.click(ocid);
    await t.click(osss);
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} input.btn.btn-primary`);
    await t.click(Selector('.swal-button--confirm'));
  }
}

export const assignbillsPage = new AssignBillsPage();
