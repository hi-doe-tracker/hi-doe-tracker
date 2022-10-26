// import { Selector, t } from 'testcafe';
// import { addStuffPage, listStuffAdminPage, listStuffPage, editStuffPage, /* manageDatabasePage, */ signOutPage } from './simple.page';
import { signOutPage, viewBillsPage, sendHearingNoticePage, homePage, viewBillPage, submitTestimonyPage } from './simple.page';
import { landingPage } from './landing.page';
import { signInPage } from './signin.page';
import { navBar } from './navbar.component';
import { profilePage } from './profile.page';
// import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };
// const adminCredentials = { username: 'admin@foo.com', password: 'changeme' };

fixture('meteor-application-template-production localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async () => {
  await landingPage.isDisplayed();
});

test('Test that signin and signout work', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that user pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoHomePage();
  await homePage.isDisplayed();
  await navBar.gotoViewBillsPage();
  await viewBillsPage.isDisplayed();
  await navBar.gotoViewBillPage();
  await viewBillPage.isDisplayed();
  await navBar.gotoSendHearingNoticePage();
  await sendHearingNoticePage.isDisplayed();
  // await navBar.gotoViewHearingsPage();
  // await viewHearingsPage.isDisplayed();
  await navBar.gotoSubmitTestimonyPage();
  await submitTestimonyPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();
});

test('Test that Profile page shows up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoProfilePage();
  await profilePage.isDisplayed();
});

test('Test that Password is changed correctly', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(credentials.username, credentials.password);
  await navBar.isLoggedIn(credentials.username);
  await navBar.gotoProfilePage();
  await profilePage.changePassword('TotallyNewPassword');
  await signInPage.signin(credentials.username, 'TotallyNewPassword');
  await navBar.isLoggedIn(credentials.username);
  // reset password
  await navBar.gotoProfilePage();
  await profilePage.changePassword(credentials.password);
});

/*
test('Test that admin pages show up', async () => {
  await navBar.gotoSignInPage();
  await signInPage.signin(adminCredentials.username, adminCredentials.password);
  await navBar.isLoggedIn(adminCredentials.username);
  await navBar.gotoCreateAccountPage();
  await createAccountPage.isDisplayed();
  await navBar.gotoAssignBillPage();
  await assignBillPage.isDisplayed();
  await navBar.gotoManageAccountsPage();
  await manageAccountsPage.isDisplayed();
  await navBar.logout();
  await signOutPage.isDisplayed();

}); */
