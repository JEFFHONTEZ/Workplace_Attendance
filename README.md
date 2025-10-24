# Workplace_Attendance

Workplace_Attendance is an attendance management system built with Laravel (backend) and React + Inertia (frontend).  
This README summarizes the project structure, key features, how to run and build the project, and where to find important code and configuration.

## Quick links (open these files)
- Project manifest: [package.json](package.json)  
- Vite / frontend build: [vite.config.ts](vite.config.ts)  
- Inertia SSR entry: [resources/js/ssr.tsx](resources/js/ssr.tsx)  
- SPA entry (client): [resources/js/app.tsx](resources/js/app.tsx)  
- Main welcome page: [resources/js/pages/welcome.tsx](resources/js/pages/welcome.tsx)  
- Two-factor helpers: [`useTwoFactorAuth`](resources/js/hooks/use-two-factor-auth.ts) — [resources/js/hooks/use-two-factor-auth.ts](resources/js/hooks/use-two-factor-auth.ts)  
- Fortify endpoints wrapper: [`qrCode`, `secretKey`, `recoveryCodes`](resources/js/lib/fortify-two-factor.ts) — [resources/js/lib/fortify-two-factor.ts](resources/js/lib/fortify-two-factor.ts)  
- Two-factor modal & recovery UI: [resources/js/components/two-factor-setup-modal.tsx](resources/js/components/two-factor-setup-modal.tsx), [resources/js/components/two-factor-recovery-codes.tsx](resources/js/components/two-factor-recovery-codes.tsx)  
- Auth provider bootstrapping: [`FortifyServiceProvider::boot`](app/Providers/FortifyServiceProvider.php) — [app/Providers/FortifyServiceProvider.php](app/Providers/FortifyServiceProvider.php)  
- Shared Inertia data: [`AppServiceProvider::boot`](app/Providers/AppServiceProvider.php) — [app/Providers/AppServiceProvider.php](app/Providers/AppServiceProvider.php)  
- Fortify configuration: [config/fortify.php](config/fortify.php)  
- Inertia configuration (SSR): [config/inertia.php](config/inertia.php)  
- Environment template: [.env.example](.env.example)  
- Migrations & seeders: [database/migrations/0001_01_01_000000_create_users_table.php](database/migrations/0001_01_01_000000_create_users_table.php), [database/migrations/2025_10_13_000002_create_attendances_table.php](database/migrations/2025_10_13_000002_create_attendances_table.php), [database/migrations/2025_10_13_000001_add_role_to_users_table.php](database/migrations/2025_10_13_000001_add_role_to_users_table.php), [database/seeders/UserSeeder.php](database/seeders/UserSeeder.php), [database/seeders/ScheduleSeeder.php](database/seeders/ScheduleSeeder.php)  
- Test configuration: [phpunit.xml](phpunit.xml)  
- Artisan CLI bootstrap: [artisan](artisan)

## High-level architecture
- Backend: Laravel app/ with providers, controllers, models and policies. See:
  - [app/Providers/AppServiceProvider.php](app/Providers/AppServiceProvider.php) — shares Inertia props (auth user, app name, quote).
  - [app/Providers/FortifyServiceProvider.php](app/Providers/FortifyServiceProvider.php) — Fortify view bindings and rate limiting.
- Frontend: React + Inertia under [resources/js](resources/js):
  - Client entry: [resources/js/app.tsx](resources/js/app.tsx)
  - SSR entry: [resources/js/ssr.tsx](resources/js/ssr.tsx)
  - Pages: [resources/js/pages](resources/js/pages)
  - Hooks and small libs: [resources/js/hooks/use-two-factor-auth.ts](resources/js/hooks/use-two-factor-auth.ts), [resources/js/lib/fortify-two-factor.ts](resources/js/lib/fortify-two-factor.ts)
- Build tooling: Vite and [vite.config.ts](vite.config.ts).
- Authentication: Laravel Fortify configured in [config/fortify.php](config/fortify.php).

## How the system works (overview)
- Authentication and shared state
  - Fortify handles authentication and some auth views ([config/fortify.php](config/fortify.php)). Views and two-factor challenge are routed via [`FortifyServiceProvider::boot`](app/Providers/FortifyServiceProvider.php).
  - Authenticated user data and site metadata are shared with the frontend through [`AppServiceProvider::boot`](app/Providers/AppServiceProvider.php). The frontend reads these via Inertia ([resources/js/types/index.d.ts](resources/js/types/index.d.ts)).
- Request / page rendering
  - Inertia renders pages server-side when SSR is enabled: see [config/inertia.php](config/inertia.php) and the SSR entry [resources/js/ssr.tsx](resources/js/ssr.tsx).
  - Client hydration happens via [resources/js/app.tsx](resources/js/app.tsx).
- Dashboard and role-aware UI
  - The dashboard is rendered at [resources/js/pages/dashboard.tsx](resources/js/pages/dashboard.tsx). The backend prepares role-specific data in [app/Http/Controllers/DashboardController.php](app/Http/Controllers/DashboardController.php) and returns Inertia props.
  - Based on the user's role the frontend chooses one of the panels: [AdminPanel](resources/js/pages/dashboard/AdminPanel.tsx), [HRPanel](resources/js/pages/dashboard/HRPanel.tsx), [GatepersonPanel](resources/js/pages/dashboard/GatepersonPanel.tsx), or [EmployeePanel](resources/js/pages/dashboard/EmployeePanel.tsx).
- Attendance flow
  - Attendances are stored in the [attendances] table created by [database/migrations/2025_10_13_000002_create_attendances_table.php](database/migrations/2025_10_13_000002_create_attendances_table.php) and modeled by [app/Models/Attendance.php](app/Models/Attendance.php).
  - CRUD and listing are implemented by [app/Http/Controllers/AttendanceController.php](app/Http/Controllers/AttendanceController.php) and rendered using Inertia pages under [resources/js/pages/attendances](resources/js/pages/attendances).
  - Gateperson quick actions (search + toggle sign in/out) use API endpoints in [app/Http/Controllers/DashboardController.php](app/Http/Controllers/DashboardController.php) and the frontend helper in [resources/js/pages/dashboard/GatepersonPanel.tsx](resources/js/pages/dashboard/GatepersonPanel.tsx).
- Scheduling
  - Schedules are managed through [app/Http/Controllers/ScheduleController.php](app/Http/Controllers/ScheduleController.php) and frontends under [resources/js/pages/schedules](resources/js/pages/schedules). Seeders create default schedules via [database/seeders/ScheduleSeeder.php](database/seeders/ScheduleSeeder.php).
- Reporting
  - Reports are generated server-side in [app/Http/Controllers/ReportController.php](app/Http/Controllers/ReportController.php) and the frontend displays them in [resources/js/pages/reports/Index.tsx](resources/js/pages/reports/Index.tsx). Access is gated to admin/hr users via policies and gates ([app/Providers/AuthServiceProvider.php](app/Providers/AuthServiceProvider.php), [app/Policies/ReportPolicy.php](app/Policies/ReportPolicy.php)).

## User roles and permissions
The system uses four primary roles. Authorization logic is implemented in policy classes and controller checks.

- Admin
  - Full system access: user management, schedules, reports, attendances.
  - Controllers / policies: [app/Policies/UserPolicy.php](app/Policies/UserPolicy.php), [app/Policies/SchedulePolicy.php](app/Policies/SchedulePolicy.php), [app/Policies/AttendancePolicy.php](app/Policies/AttendancePolicy.php).
  - UI: sees full navigation in [resources/js/components/app-sidebar.tsx](resources/js/components/app-sidebar.tsx).
- HR
  - Can manage users (except some admin-protected actions), manage schedules, and view reports.
  - Controlled by the same policies as admin with HR-specific checks: see [app/Policies/UserPolicy.php](app/Policies/UserPolicy.php) and [app/Policies/SchedulePolicy.php](app/Policies/SchedulePolicy.php).
- Gateperson
  - Gate-level tasks: search employees, quick sign-in / sign-out from the dashboard.
  - Relevant code: [app/Http/Controllers/DashboardController.php](app/Http/Controllers/DashboardController.php), [resources/js/pages/dashboard/GatepersonPanel.tsx](resources/js/pages/dashboard/GatepersonPanel.tsx).
- Employee
  - Can view their own attendance history and schedules.
  - Limited UI and actions; protected by policies (e.g., [app/Policies/AttendancePolicy.php](app/Policies/AttendancePolicy.php)) and controller authorization.

Quick reference: role helpers are implemented on the user model: [app/Models/User.php](app/Models/User.php).

## Data model (primary tables)
- users — [database/migrations/0001_01_01_000000_create_users_table.php](database/migrations/0001_01_01_000000_create_users_table.php); model [app/Models/User.php](app/Models/User.php). Roles added in [database/migrations/2025_10_13_000001_add_role_to_users_table.php](database/migrations/2025_10_13_000001_add_role_to_users_table.php).
- attendances — [database/migrations/2025_10_13_000002_create_attendances_table.php](database/migrations/2025_10_13_000002_create_attendances_table.php); model [app/Models/Attendance.php](app/Models/Attendance.php).
- schedules — (model: [app/Models/Schedule.php](app/Models/Schedule.php); migrations under [database/migrations](database/migrations)).
- other infra tables: jobs, cache, sessions (see [database/migrations](database/migrations)).

## Frontend structure and UI notes
- Pages live in [resources/js/pages](resources/js/pages). The dashboard and role-specific panels are in [resources/js/pages/dashboard.tsx](resources/js/pages/dashboard.tsx), [resources/js/pages/dashboard/AdminPanel.tsx](resources/js/pages/dashboard/AdminPanel.tsx), [resources/js/pages/dashboard/HRPanel.tsx](resources/js/pages/dashboard/HRPanel.tsx), [resources/js/pages/dashboard/GatepersonPanel.tsx](resources/js/pages/dashboard/GatepersonPanel.tsx), [resources/js/pages/dashboard/EmployeePanel.tsx](resources/js/pages/dashboard/EmployeePanel.tsx).
- Shared UI primitives are under [resources/js/components](resources/js/components), e.g. [resources/js/components/app-header.tsx](resources/js/components/app-header.tsx), [resources/js/components/app-sidebar.tsx](resources/js/components/app-sidebar.tsx).
- Two-factor UI: hooks [resources/js/hooks/use-two-factor-auth.ts](resources/js/hooks/use-two-factor-auth.ts) and endpoint wrappers [resources/js/lib/fortify-two-factor.ts](resources/js/lib/fortify-two-factor.ts). Fortify stores two-factor columns via migration [database/migrations/2025_08_26_100418_add_two_factor_columns_to_users_table.php](database/migrations/2025_08_26_100418_add_two_factor_columns_to_users_table.php) but Fortify features are kept minimal in [config/fortify.php](config/fortify.php).
- Client-side routes and helpers are defined in [resources/js/lib/route-globals.ts] (see [resources/js/app.tsx](resources/js/app.tsx) for entry).

## Authorization & policies
- Policies are mapped in [app/Providers/AuthServiceProvider.php](app/Providers/AuthServiceProvider.php):
  - [app/Policies/UserPolicy.php](app/Policies/UserPolicy.php)
  - [app/Policies/AttendancePolicy.php](app/Policies/AttendancePolicy.php)
  - [app/Policies/SchedulePolicy.php](app/Policies/SchedulePolicy.php)
  - [app/Policies/ReportPolicy.php](app/Policies/ReportPolicy.php)
- Controllers call `$this->authorize(...)` or `authorizeResource(...)` to enforce policy rules. Examples: [app/Http/Controllers/UserController.php](app/Http/Controllers/UserController.php), [app/Http/Controllers/AttendanceController.php](app/Http/Controllers/AttendanceController.php), [app/Http/Controllers/ScheduleController.php](app/Http/Controllers/ScheduleController.php).

## Testing
- PHP feature and unit tests use PHPUnit. See [phpunit.xml](phpunit.xml) and tests in [tests/Feature](tests/Feature) and [tests/Unit](tests/Unit).
- Example tests:
  - [tests/Feature/UserManagementTest.php](tests/Feature/UserManagementTest.php)
  - [tests/Feature/ScheduleManagementTest.php](tests/Feature/ScheduleManagementTest.php)
  - [tests/Unit/UserPolicyTest.php](tests/Unit/UserPolicyTest.php)

## Running & deployment (summary)
- Local development:
  1. cp .env.example .env
  2. composer install
  3. npm install
  4. php artisan key:generate
  5. php artisan migrate --seed
  6. php artisan serve (or use Sail/Valet) + npm run dev
- Production build:
  - Frontend: npm run build
  - Backend: set environment variables, then run php artisan config:cache, php artisan route:cache, php artisan view:cache
- SSR: ensure the SSR server configured in [config/inertia.php](config/inertia.php) is running (see [resources/js/ssr.tsx](resources/js/ssr.tsx)).

## Seed data
- [database/seeders/UserSeeder.php](database/seeders/UserSeeder.php) creates deterministic admin/hr/gateperson/employee users.
- [database/seeders/ScheduleSeeder.php](database/seeders/ScheduleSeeder.php) seeds schedules for employees.
- [database/seeders/AttendanceSeeder.php](database/seeders) (if present) seeds sample attendances.

## Troubleshooting & tips
- If Inertia SSR returns blank pages, verify the SSR URL in [config/inertia.php](config/inertia.php) and that the SSR server ([resources/js/ssr.tsx](resources/js/ssr.tsx)) is reachable.
- If auth fails, confirm Fortify config in [config/fortify.php](config/fortify.php) and bindings in [app/Providers/FortifyServiceProvider.php](app/Providers/FortifyServiceProvider.php).
- To inspect role-based navigation, open [resources/js/components/app-sidebar.tsx](resources/js/components/app-sidebar.tsx) and related panels under [resources/js/pages/dashboard](resources/js/pages/dashboard).

## Where to look for specific behaviors
- Authentication views and Fortify bindings: [app/Providers/FortifyServiceProvider.php](app/Providers/FortifyServiceProvider.php) and [config/fortify.php](config/fortify.php)
- Shared Inertia props (auth user, app name, quote): [app/Providers/AppServiceProvider.php](app/Providers/AppServiceProvider.php)
- Two-factor flow (client): [resources/js/hooks/use-two-factor-auth.ts](resources/js/hooks/use-two-factor-auth.ts) and [resources/js/lib/fortify-two-factor.ts](resources/js/lib/fortify-two-factor.ts)
- Dashboard role logic: [app/Http/Controllers/DashboardController.php](app/Http/Controllers/DashboardController.php) and [resources/js/pages/dashboard.tsx](resources/js/pages/dashboard.tsx)
- Attendances: [app/Http/Controllers/AttendanceController.php](app/Http/Controllers/AttendanceController.php), [app/Models/Attendance.php](app/Models/Attendance.php), [resources/js/pages/attendances](resources/js/pages/attendances)
- Vite + aliasing + SSR plugin configuration: [vite.config.ts](vite.config.ts)

## Contact / next steps
- If you need a specific improvement (tests, CI, Docker compose, documentation pages), open an issue or submit a PR and reference the relevant files above.

