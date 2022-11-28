import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class ViewHearingsPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.VIEW_HEARINGS}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  async hearingsDetailsButtonWorks() {
    await Selector(`#${COMPONENT_IDS.HEARING_CARD_DETAILS}`).visible;
    await t.click(`#${COMPONENT_IDS.HEARING_CARD_DETAILS}`);
    await t.expect(Selector(`#${COMPONENT_IDS.HEARING_CARD_ACCORDION}`).exists).ok();
  }

}

export const viewhearingsPage = new ViewHearingsPage();
