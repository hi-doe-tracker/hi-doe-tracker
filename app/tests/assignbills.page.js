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
  async assignBill() {
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
    const rationale = 'Rationale';
    const assignedBillSelect = Selector('#assignedBill');
    const assignedBillOption = assignedBillSelect.find('option');
    const mainOfficeSelect = Selector('#mainOffice');
    const mainOfficeOption = mainOfficeSelect.find('option');
    const deputy = Selector('#deputy-checkbox');
    const osss = Selector('#osss-checkbox');
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_ACTION}`, action);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_ACTION_NUMBER}`, actionNumber);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_LEGAL_TYPE}`, legalType);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_COMMITTEE_REFERRAL}`, committeeReferral);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_COMMITTEE_REPORTS}`, committeeReports);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_ALL_VERSIONS}`, allVersions);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_HEARING_NOTICES}`, hearingNotices);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_TESTIFIER_CONTACT}`, testifierContact);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_NOTIFIED_HEARING}`, notifiedHearing);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_HEARING_LOCATION}`, hearingLocation);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_COMMITTEE}`, committee);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_TYPE}`, type);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_LEAD_OFFICE_POSITION}`, leadOfficePosition);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_TESTIFIER}`, testifier);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_SIMILAR}`, similar);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_APPROVED_TESTIMONY}`, approvedTestimony);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_MONITORING_REPORTS}`, monitoringReports);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_HEARING_COMMENTS}`, hearingComments);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_TESTIMONY}`, testimony);
    await t.typeText(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_RATIONALE}`, rationale);
    await t.click(assignedBillSelect);
    await t.click(assignedBillOption.withText('#137: RELATING TO LIQUOR.'));
    await t.click(mainOfficeSelect);
    await t.click(mainOfficeOption.withText('OCID'));
    await t.click(deputy);
    await t.click(osss);
    await t.click(`#${COMPONENT_IDS.ASSIGN_BILL_FORM_SUBMIT} input.btn.btn-primary`);
    await t.click(Selector('.swal-button--confirm'));
  }
}

export const assignbillsPage = new AssignBillsPage();
