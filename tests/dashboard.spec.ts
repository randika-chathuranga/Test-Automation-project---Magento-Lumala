import {test, expect, Page} from '@playwright/test';
import { DashboardPage } from '../pages/dashboardPage';
import { LoginPage } from '../pages/loginPage';
import ENV from '../utils/env';

const clientTestData = JSON.parse(JSON.stringify(require("../testData/"+ENV.ENV+".json")));

test.describe.configure({ mode: 'serial' });

test.describe('Dashboard', () => {

    let page: Page;
    let dashboardPage: DashboardPage;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        dashboardPage = new DashboardPage(page);

        const loginPage = new LoginPage(page);
        await loginPage.goToLoginPage();
        await loginPage.signIn(ENV.UN, ENV.PW);
        await expect(page).toHaveURL(new RegExp(clientTestData.urlSubstrings.loginSuccessPage), { timeout: 15000 });
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('TC-002: Verify Total Employee Card is clickable and navigate to Employee page', async () => {
        await dashboardPage.viewAndSearchEmployeeFromEmployeeCard();
        console.log('Employee found and viewed successfully.');
        await dashboardPage.goToDashboard();
    });

    test('TC-003: Verify Present Today card navigates to the Attendance page', async () => {
        await dashboardPage.clickKpiCard('Present Today');
        await expect(page).toHaveURL(new RegExp(clientTestData.urlSubstrings.attendanceViewPage));
        await dashboardPage.goToDashboard();
    });

    test('TC-004: Verify On Leave card navigates to the Leave request page', async () => {
        await dashboardPage.clickKpiCard('On Leave');
        await expect(page).toHaveURL(new RegExp(clientTestData.urlSubstrings.leaveRequestViewPage));
        await dashboardPage.goToDashboard();
    });

    test('TC-005: Verify Open Recruitments card navigates to the Recruitment page', async () => {
        await dashboardPage.clickKpiCard('Open Recruitments');
        await expect(page).toHaveURL(new RegExp(clientTestData.urlSubstrings.recruitmentViewPage));
        await dashboardPage.goToDashboard();
    });

    test('TC-006: Verify This Month/Last Month/Quarter presets update the active filter and date range', async () => {
        await expect(dashboardPage.periodPreset('this_month')).toHaveClass(/md-period-preset--active/);

        await dashboardPage.applyDatePreset('last_month');
        await expect(dashboardPage.periodPreset('last_month')).toHaveClass(/md-period-preset--active/);
        await expect(dashboardPage.periodPreset('this_month')).not.toHaveClass(/md-period-preset--active/);
        await expect(dashboardPage.fromDateInput()).not.toHaveValue('');
        await expect(dashboardPage.toDateInput()).not.toHaveValue('');

        await dashboardPage.applyDatePreset('this_quarter');
        await expect(dashboardPage.periodPreset('this_quarter')).toHaveClass(/md-period-preset--active/);
        await expect(dashboardPage.periodPreset('last_month')).not.toHaveClass(/md-period-preset--active/);

        await dashboardPage.applyDatePreset('this_month');
    });

    test('TC-007: Verify a custom From/To date range can be applied and clears the active preset', async () => {
        await dashboardPage.setCustomDateRange('2026-06-01', '2026-06-30');

        await expect(dashboardPage.fromDateInput()).toHaveValue('2026-06-01');
        await expect(dashboardPage.toDateInput()).toHaveValue('2026-06-30');
        await expect(dashboardPage.periodPreset('this_month')).not.toHaveClass(/md-period-preset--active/);
        await expect(dashboardPage.periodPreset('last_month')).not.toHaveClass(/md-period-preset--active/);
        await expect(dashboardPage.periodPreset('this_quarter')).not.toHaveClass(/md-period-preset--active/);

        await dashboardPage.applyDatePreset('this_month');
    });

    test('TC-008: Verify the Customize Dashboard panel opens and closes', async () => {
        await dashboardPage.openCustomizePanel();
        await expect(dashboardPage.customizePanel()).toHaveClass(/md-customize-panel--open/);
        await expect(dashboardPage.customizeResetButton()).toBeVisible();
        await expect(dashboardPage.customizeSaveButton()).toBeVisible();

        await dashboardPage.closeCustomizePanel();
        await expect(dashboardPage.customizePanel()).not.toHaveClass(/md-customize-panel--open/);
    });

    for (const item of [
        { label: 'Leave' as const, urlKey: 'leaveRequestViewPage' },
        { label: 'Attendance' as const, urlKey: 'attendanceRequestPendingPage' },
        { label: 'Assets' as const, urlKey: 'assetRequestPendingPage' },
        { label: 'Shift' as const, urlKey: 'shiftRequestPendingPage' },
        { label: 'Work Type' as const, urlKey: 'workTypeRequestPendingPage' },
        { label: 'Reimbursements' as const, urlKey: 'reimbursementPage' },
    ]) {
        test(`TC-009: Verify Pending Approvals "${item.label}" card navigates to the correct page`, async () => {
            await dashboardPage.clickPendingApproval(item.label);
            await expect(page).toHaveURL(new RegExp(clientTestData.urlSubstrings[item.urlKey]));
            await dashboardPage.goToDashboard();
        });
    }

    test('TC-010: Verify the Settings icon navigates to the Settings page', async () => {
        await dashboardPage.goToSettings();
        await expect(page).toHaveURL(new RegExp(clientTestData.urlSubstrings.settingsPage));
        await dashboardPage.goToDashboard();
    });

    test('TC-011: Verify "On Leave Today" View all link navigates to the Leave request page', async () => {
        await dashboardPage.viewAllOnLeaveToday();
        await expect(page).toHaveURL(new RegExp(clientTestData.urlSubstrings.leaveRequestViewPage));
        await dashboardPage.goToDashboard();
    });

    test('TC-012: Verify "Upcoming Holidays" View all link navigates to the Holidays page', async () => {
        await dashboardPage.viewAllUpcomingHolidays();
        await expect(page).toHaveURL(new RegExp(clientTestData.urlSubstrings.holidayViewPage));
        await dashboardPage.goToDashboard();
    });

    test('TC-013: Verify the notification bell opens the notifications panel', async () => {
        await dashboardPage.openNotificationPanel();
        await expect(dashboardPage.notificationDropdown()).toBeVisible();
    });

    test('TC-014: Verify the user menu shows profile options for the logged-in user', async () => {
        await dashboardPage.openUserMenu();
        await expect(dashboardPage.myProfileLink()).toBeVisible();
        await expect(dashboardPage.logoutLink()).toBeVisible();
    });

});
