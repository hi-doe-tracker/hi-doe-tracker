import { Selector } from 'testcafe';
import { ComponentIDs, PageIDs } from '../imports/ui/utilities/ids';

class SubmitTestimonyPage {
  constructor() {
    this.pageId = `#${PageIDs.SUBMIT_TESTIMONY}`;
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

  /** Checks this page is displayed, then adds a new project */
  async addProject(testController) {
    const firstName = 'David';
    const lastName = 'Ige';
    // Select position, testifying, and testifying method
    const positionSelector = Selector(`#${ComponentIDs.SUBMIT_TESTIMONY_FORM_POSITION} div.form-check`);
    const testifyingSelector = Selector(`#${ComponentIDs.SUBMIT_TESTIMONY_FORM_TESTIFYING} div.form-check`);
    const testifyingMethodSelector = Selector(`#${ComponentIDs.SUBMIT_TESTIMONY_FORM_TESTIFYING_METHOD} div.form-check`);
    const testimony = 'We should increase school funding by 1 trillion dollars.';

    await this.isDisplayed(testController);
    // Define the new project
    await testController.typeText(`#${ComponentIDs.SUBMIT_TESTIMONY_FORM_FIRST_NAME}`, firstName);
    await testController.typeText(`#${ComponentIDs.SUBMIT_TESTIMONY_FORM_LAST_NAME}`, lastName);
    await testController.click(positionSelector.nth(0));
    await testController.click(testifyingSelector.nth(0));
    await testController.click(testifyingMethodSelector.nth(0));
    await testController.typeText(`#${ComponentIDs.SUBMIT_TESTIMONY_FORM_TESTIMONY}`, testimony);
    await testController.click(`#${ComponentIDs.SUBMIT_TESTIMONY_FORM_SUBMIT} input.btn.btn-primary`);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const submitTestimonyPage = new SubmitTestimonyPage();
