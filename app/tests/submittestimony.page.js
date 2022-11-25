import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class SubmitTestimonyPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.SUBMIT_TESTIMONY}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least 1 card on it.  */
  async hasDefaultFields(testController) {
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).gte(1);
  }

  /** Checks that you can submit testimony  */
  async addTestimony(testController) {
    const firstName = 'David';
    const lastName = 'Ige';
    // Select position, testifying, and testifying method
    const relevantBillSelector = Selector(
      `#${COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_RELEVANT_BILL} select.form-select`,
    );
    const testifyingSelector = Selector(
      `#${COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_TESTIFYING} div.form-check input`,
    );
    const testifyingMethodSelector = Selector(
      `#${COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_TESTIFYING_METHOD} div.form-check input`,
    );
    const testimony =
      'We should increase school funding by 1 trillion dollars and eliminate all enemies of the state.';
    await this.isDisplayed(testController);
    // Define the new project
    await testController
      .click(relevantBillSelector)
      .click(relevantBillSelector.find('option').nth(1));
    await testController.typeText(
      `#${COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_FIRST_NAME}`,
      firstName,
    );
    await testController.typeText(
      `#${COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_LAST_NAME}`,
      lastName,
    );
    const positionSelector = Selector(
      `#${COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_POSITION} div.form-check input`,
    );
    await testController.click(positionSelector.nth(1));
    await testController.click(testifyingSelector.nth(1));
    await testController.click(testifyingMethodSelector.nth(1));
    await testController.typeText(
      `#${COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_TESTIMONY}`,
      testimony,
    );
    await testController.click(
      `#${COMPONENT_IDS.SUBMIT_TESTIMONY_FORM_SUBMIT} input.btn.btn-primary`,
    );
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const submitTestimonyPage = new SubmitTestimonyPage();
