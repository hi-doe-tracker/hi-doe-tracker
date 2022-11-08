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
    assignedBill: {
      type: String,
        allowedValues: ['Pick a bill'],
        defaultValue: 'Pick a bill',
    },
    mainOffice: {
      type: String,
        allowedValues: ['DEPUTY', 'OCID', 'OFO', 'OFS', 'OITS', 'OSIP', 'OSSS', 'OTM'],
        defaultValue: 'DEPUTY',
    },
    deputy: {
      type: Boolean,
        optional: true,
    },
    ocid: {
      type: Boolean,
        optional: true,
    },
    ofo: {
      type: Boolean,
        optional: true,
    },
    ofs: {
      type: Boolean,
        optional: true,
    },
    oits: {
      type: Boolean,
        optional: true,
    },
    osip: {
      type: Boolean,
        optional: true,
    },
    osss: {
      type: Boolean,
        optional: true,
    },
    otm: {
      type: Boolean,
        optional: true,
    },
    action: String,
      actionNumber: String,
      legalType: String,
      committeeReferral: { type: Array, minCount: 1 },
    'committeeReferral.$': String,
      allVersions: { type: Array, minCount: 1 },
    'allVersions.$': String,
      committeeReports: { type: Array, minCount: 1 },
    'committeeReports.$': String,
      hearingNotices: { type: Array, minCount: 1 },
    'hearingNotices.$': String,
      notifiedHearing: String,
      hearingDate: { type: Date, defaultValue: new Date() },
    hearingLocation: String,
      committee: String,
      type: String,
      testifierContact: { type: Array, minCount: 1 },
    'testifierContact.$': String,
      similar: { type: Array, minCount: 1 },
    'similar.$': String,
      leadOfficePosition: String,
      testifier: String,
      approvedTestimony: { type: Array, minCount: 1 },
    'approvedTestimony.$': String,
      monitoringReports: { type: Array, minCount: 1 },
    'monitoringReports.$': String,
      hearingComments: { type: Array, minCount: 1 },
    'hearingComments.$': String,
      testimony: { type: Array, minCount: 1 },
    'testimony.$': String,
      rationale: String,
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
    const positionSelect = Selector('#position');
    const positionOption = positionSelect.find('option');
    const officeSelect = Selector('#office');
    const officeOption = officeSelect.find('option');
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
    await t.click(positionSelect);
    await t.click(positionOption.withText('Secretary'));
    await t.click(officeSelect);
    await t.click(officeOption.withText('OCID'));
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} input.btn.btn-primary`);
    await t.click(Selector('.swal-button--confirm'));
  }
}

export const assignbillsPage = new AssignBillsPage();
