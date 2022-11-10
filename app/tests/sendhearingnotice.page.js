import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class SendHearingNoticePage1 {

  constructor() {
    this.pageId = `#${PAGE_IDS.SEND_HEARING_NOTICE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  async errormessageIsDisplayed() {
    await t.typeText(Selector('#to'), 'test1@doe.com');
    await t.typeText(Selector('#cc'), 'test3@doe.com');
    await t.typeText(Selector('#bcc'), 'test4@doe.com');
    await t.click('#sub input.btn.btn-primary');
    await t.expect(this.pageSelector.withText('From is required').exists).ok();
  }

}

export const sendHearingNoticePage1 = new SendHearingNoticePage1();
