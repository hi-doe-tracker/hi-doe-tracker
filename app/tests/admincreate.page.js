import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class AdminCreatePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ADMIN_CREATE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see if it is created by logging out then into that new account. */

  async signupUser() {
    const firstName = 'Bat';
    const lastName = 'Man';
    const email = 'batman@foo.com';
    const pword = 'changeme';
    const positionSelect = Selector('#position');
    const positionOption = positionSelect.find('option');
    const officeSelect = Selector('#office');
    const officeOption = officeSelect.find('option');
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}`, firstName);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}`, lastName);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_EMAIL}`, email);
    await t.typeText(`#${COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}`, pword);
    await t.click(positionSelect);
    await t.click(positionOption.withText('Secretary'));
    await t.click(officeSelect);
    await t.click(officeOption.withText('OCID'));
    await t.click(`#${COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} input.btn.btn-primary`);
    await t.click(Selector('.swal-button--confirm'));
  }
}

export const adminCreatePage = new AdminCreatePage();
