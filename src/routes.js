
export const Routes = {
    // pages
    Installation:{ path: "/installation" },
    Signin: { path: "/" },
    AdminDashboardOverview: { path: "/admin/dashboard" },
    AdminDashboardEmployee: { path: "/admin/employee" },
    AdminDashboardAddEmployee: { path: "/admin/employee/new" },
    AdminDashboardViewEmployee: { path: "/admin/employee/view/:id" },
    AdminDashboardAddDepartment: { path: "/admin/department/new" },
    AdminDashboardUser: { path: "/admin/user" },
    AdminDashboardSettings: {path: "/admin/settings"},
    AdminDashboardAttendance: {path: "/admin/attendance"},
    AdminDashboardSchedule: {path: "/admin/schedule"},
    AdminDashboardLeave: {path: "/admin/leave"},
    AdminDashboardProject: {path: "/admin/project"},
    AdminDashboardProjectDetail: {path: "/admin/project/:id"},
    AdminDashboardMemo: {path: "/admin/memo"},

    //Fields
    AdminDashboardJobtitle: { path: "/admin/field/jobtitle" },
    AdminDashboardLeavetype: { path: "/admin/field/leavetype" },
    AdminDashboardLeavegroup: { path: "/admin/field/leavegroup" },
    AdminDashboardDepartment: { path: "/admin/field/department" },
    AdminDashboardCompany: { path: "/admin/field/company" },
    

    Transactions: { path: "/transactions" },
    Settings: { path: "/settings" },
    Upgrade: { path: "/upgrade" },
    BootstrapTables: { path: "/tables/bootstrap-tables" },
    Billing: { path: "/examples/billing" },
    Invoice: { path: "/examples/invoice" },
    Signup: { path: "/examples/sign-up" },
    ForgotPassword: { path: "/examples/forgot-password" },
    ResetPassword: { path: "/examples/reset-password" },
    Lock: { path: "/examples/lock" },
    NotFound: { path: "/examples/404" },
    ServerError: { path: "/examples/500" },

    // docs
    DocsOverview: { path: "/documentation/overview" },
    DocsDownload: { path: "/documentation/download" },
    DocsQuickStart: { path: "/documentation/quick-start" },
    DocsLicense: { path: "/documentation/license" },
    DocsFolderStructure: { path: "/documentation/folder-structure" },
    DocsBuild: { path: "/documentation/build-tools" },
    DocsChangelog: { path: "/documentation/changelog" },

    // components
    Accordions: { path: "/components/accordions" },
    Alerts: { path: "/components/alerts" },
    Badges: { path: "/components/badges" },
    Widgets: { path: "/widgets" },
    Breadcrumbs: { path: "/components/breadcrumbs" },
    Buttons: { path: "/components/buttons" },
    Forms: { path: "/components/forms" },
    Modals: { path: "/components/modals" },
    Navs: { path: "/components/navs" },
    Navbars: { path: "/components/navbars" },
    Pagination: { path: "/components/pagination" },
    Popovers: { path: "/components/popovers" },
    Progress: { path: "/components/progress" },
    Tables: { path: "/components/tables" },
    Tabs: { path: "/components/tabs" },
    Tooltips: { path: "/components/tooltips" },
    Toasts: { path: "/components/toasts" },
    WidgetsComponent: { path: "/components/widgets" }
};