import { Selector, t } from 'testcafe';
import { navBar } from './navbar.component';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class SignInPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SIGN_IN}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async signin(username, password) {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.SIGN_IN_FORM_EMAIL}`, username);
    await t.typeText(`#${COMPONENT_IDS.SIGN_IN_FORM_PASSWORD}`, password);
    await t.click(`#${COMPONENT_IDS.SIGN_IN_FORM_SUBMIT} input.btn.btn-primary`);
    await navBar.isLoggedIn(username);
  }

  /** Attempts to sign in but does not check if account is logged in, for manageaccounts test to check if deletion worked */
  async attemptsignin(username, password) {
    await this.isDisplayed();
    await t.typeText(`#${COMPONENT_IDS.SIGN_IN_FORM_EMAIL}`, username);
    await t.typeText(`#${COMPONENT_IDS.SIGN_IN_FORM_PASSWORD}`, password);
    await t.click(`#${COMPONENT_IDS.SIGN_IN_FORM_SUBMIT} input.btn.btn-primary`);
  }
}
export const signInPage = new SignInPage();
