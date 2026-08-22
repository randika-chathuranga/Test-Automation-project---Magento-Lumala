import { Page } from "@playwright/test";

export class DashboardPage {
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    //locators are separated here for better readability and maintainability
    heading = () => this.page.getByRole('heading', { name: 'Dashboard', level: 1 });
    kpiGrid = () => this.page.locator('#md-kpi-grid');
    kpiCard = (label: 'Total Employees' | 'Present Today' | 'On Leave' | 'Open Recruitments') =>
        this.page.locator('#md-kpi-grid a.md-kpi-card', { hasText: label });

    periodPreset = (preset: 'this_month' | 'last_month' | 'this_quarter') =>
        this.page.locator(`.md-period-preset[data-preset="${preset}"]`);
    fromDateInput = () => this.page.locator('#md-from-date');
    toDateInput = () => this.page.locator('#md-to-date');

    customizeButton = () => this.page.locator('#md-open-customize');
    customizePanel = () => this.page.locator('#md-customize-panel');
    customizeCloseButton = () => this.page.locator('#md-close-customize');
    customizeResetButton = () => this.page.locator('#md-reset-customize');
    customizeSaveButton = () => this.page.locator('#md-save-customize');

    pendingApprovalLink = (label: 'Leave' | 'Attendance' | 'Assets' | 'Shift' | 'Work Type' | 'Reimbursements') =>
        this.page.locator('#md-pending-approvals a.md-pending-card', { hasText: label });

    onLeaveTodayViewAllLink = () => this.page.locator('a[href*="today_leave=true"]');
    upcomingHolidaysViewAllLink = () => this.page.locator('#md-holidays-viewall');

    settingsLink = () => this.page.locator('a[href="/settings/"]');
    themeToggleButton = () => this.page.locator('#themeToggleButton');
    notificationBellButton = () => this.page.locator('button[hx-get="/notifications/"]');
    notificationDropdown = () => this.page.locator('.dropdown-content', { hasText: 'Notifications' }).first();
    userMenuButton = () => this.page.getByRole('button', { name: /Adam Admin/ });
    myProfileLink = () => this.page.getByRole('link', { name: 'My Profile' });
    logoutLink = () => this.page.getByRole('link', { name: 'Logout' });

    //functions are added in this section.
    async goToDashboard(){
        await this.page.goto('https://hr.demo.horilla.com/dashboard/');
        await this.page.waitForLoadState('networkidle');
    }

    async isDashboardLoaded(){
        return (await this.heading().isVisible()) && (await this.kpiGrid().isVisible());
    }

    async clickKpiCard(label: 'Total Employees' | 'Present Today' | 'On Leave' | 'Open Recruitments'){
        await this.kpiCard(label).click();
        await this.page.waitForLoadState('networkidle');
        console.log(`[INFO] navigated via "${label}" KPI card...`);
    }

    async applyDatePreset(preset: 'this_month' | 'last_month' | 'this_quarter'){
        await this.periodPreset(preset).click();
        await this.page.waitForLoadState('networkidle');
    }

    async setCustomDateRange(fromDate: string, toDate: string){
        await this.fromDateInput().fill(fromDate);
        await this.toDateInput().fill(toDate);
        await this.page.waitForLoadState('networkidle');
    }

    async openCustomizePanel(){
        await this.customizeButton().click();
    }

    async closeCustomizePanel(){
        await this.customizeCloseButton().click();
    }

    async clickPendingApproval(label: 'Leave' | 'Attendance' | 'Assets' | 'Shift' | 'Work Type' | 'Reimbursements'){
        await this.pendingApprovalLink(label).click();
        await this.page.waitForLoadState('networkidle');
    }

    async viewAllOnLeaveToday(){
        await this.onLeaveTodayViewAllLink().click();
        await this.page.waitForLoadState('networkidle');
    }

    async viewAllUpcomingHolidays(){
        await this.upcomingHolidaysViewAllLink().click();
        await this.page.waitForLoadState('networkidle');
    }

    async goToSettings(){
        await this.settingsLink().click();
        await this.page.waitForLoadState('networkidle');
    }

    async openNotificationPanel(){
        await this.notificationBellButton().click();
    }

    async openUserMenu(){
        await this.userMenuButton().click();
    }

    async viewAndSearchEmployeeFromEmployeeCard(){
        await this.page.getByRole('link', { name: 'Total Employees' }).click();
        await this.page.getByRole('textbox', { name: 'Search Input' }).click();
        await this.page.getByRole('textbox', { name: 'Search Input' }).fill('Amy');

        await this.page.locator('#view-container').getByText('Amy Davis (PAG1036)').click();
        await this.page.waitForLoadState('networkidle');
    }
}
