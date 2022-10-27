import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

/** Create an instance of a SimplePage when all you need to do is verify that the page was displayed. */
class SimplePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.EDIT_ACCOUNT}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const viewBillsPage = new SimplePage(PAGE_IDS.VIEW_BILLS);
export const viewBillPage = new SimplePage(PAGE_IDS.VIEW_BILL);
export const sendHearingNoticePage = new SimplePage(PAGE_IDS.SEND_HEARING_NOTICE);
export const homePage = new SimplePage(PAGE_IDS.HOME);
export const viewHearingsPage = new SimplePage(PAGE_IDS.VIEW_HEARINGS);
export const simpleSubmitTestimonyPage = new SimplePage(PAGE_IDS.SUBMIT_TESTIMONY);
export const createAccountPage = new SimplePage(PAGE_IDS.ADMIN_CREATE);
export const assignBillPage = new SimplePage(PAGE_IDS.ASSIGN_BILL);
export const manageAccountsPage = new SimplePage(PAGE_IDS.MANAGE_ACCOUNTS);
export const signOutPage = new SimplePage(PAGE_IDS.SIGN_OUT);
