export const resumeUrl = '/Andrew_Broshears_Resume_v2.pdf';

export const projects = [
    {
        id: 'servicehub', title: 'ServiceHub', category: 'Production', type: 'Real-time manufacturing',
        summary: 'Connecting manufacturing workflows with real-time communication and operational visibility.',
        tags: ['Blazor', 'SignalR'], visual: 'signal',
        detail: 'A Blazor and SignalR application supporting manufacturing workflow communication. Part of my internal application development and support work at Kimball International.',
    },
    {
        id: 'salem', title: 'SalemFanFold', category: 'Production', type: 'Manufacturing applications',
        summary: 'A .NET 10 MVC application supporting Fan Fold manufacturing processes.',
        tags: ['.NET 10', 'MVC'], visual: 'fold',
        detail: 'Manufacturing software built around the Fan Fold process. This work brings my operations background together with application development in the .NET ecosystem.',
    },
    {
        id: 'email', title: 'ASN / ESN', category: 'Production', type: 'Notification services',
        summary: 'A .NET service supporting order-related notifications and subscriber communications.',
        tags: ['.NET', 'Email services'], visual: 'signal',
        detail: 'An internal email service supporting communication around orders and subscriptions. Listed among the major applications and systems in my current role.',
    },
    {
        id: 'serialscan', title: 'SerialScan', category: 'Production', type: 'Equipment-aware workflows',
        summary: 'Supporting manufacturing workflows and integrations in an existing VB.NET application.',
        tags: ['VB.NET', 'Integrations'], visual: 'scan',
        detail: 'Internal manufacturing software with equipment-aware workflows and integrations. My broader role includes maintaining internal systems and supporting production issues.',
    },
    {
        id: 'timetracker', title: 'TimeTracker', category: 'Production', type: 'Business applications',
        summary: 'An internal VB.NET application supporting time-tracking business processes.',
        tags: ['VB.NET', 'Business systems'], visual: 'scan',
        detail: 'Part of the internal application portfolio I support, alongside development, maintenance, and modernization work across business and manufacturing systems.',
    },
    {
        id: 'basepay', title: 'BasePayReview', category: 'Production', type: 'Application support',
        summary: 'Support and maintenance of an Angular and .NET business application.',
        tags: ['Angular', '.NET'], visual: 'fold',
        detail: 'Support and maintenance work within an existing business application. My experience spans both current .NET development and keeping established applications working for their users.',
    },
    {
        id: 'power', title: 'Power Platform', category: 'Production', type: 'Workflow automation',
        summary: 'PowerApps and Power Automate solutions supporting business workflow automation.',
        tags: ['PowerApps', 'Power Automate'], visual: 'signal',
        detail: 'Microsoft business platform solutions supporting workflow automation, alongside custom application development and integrations.',
    },
    {
        id: 'biztalk', title: 'BizTalk / SAP', category: 'Production', type: 'Legacy integrations',
        summary: 'Supporting integration processes involving SAP IDOCs and mappings.',
        tags: ['BizTalk', 'SAP IDOCs'], visual: 'scan',
        detail: 'Support of legacy integration processes involving SAP IDOCs and mappings. My current role also includes Salesforce integrations and other internal services.',
    },
    {
        id: 'andromeda', title: 'Andromeda Wave', category: 'Public', type: 'Early portfolio work',
        summary: 'An early development project from my transition into software. Explore the original source.',
        tags: ['Source available'], image: '/img/project-andromeda.webp',
        detail: 'Preserved as a look at where my programming journey began. My current professional work is represented by the production systems above.',
        link: 'https://github.com/FabiAguilera/AndromedaWaveFinal', linkLabel: 'Explore source',
    },
    {
        id: 'playdate', title: 'PlayDate', category: 'Public', type: 'Project archive',
        summary: 'A snapshot of an early web application from my original portfolio.',
        tags: ['Archived project'], image: '/img/project-playdate.webp',
        detail: 'The original screenshot is retained here as an archive. The old hosted demo is not presented as a currently maintained application.',
    },
    {
        id: 'creature', title: 'CSS Creature', category: 'Public', type: 'Creative coding',
        summary: 'An illustration made with HTML and CSS. A small experiment in building with the browser.',
        tags: ['HTML', 'CSS'], image: '/img/project-creature.webp',
        detail: 'One of my first CSS projects. Open the CodePen to inspect the markup and styling behind the illustration.',
        link: 'https://codepen.io/andrewbroshears/pen/OJjzryr', linkLabel: 'Open CodePen',
    },
];

export const skills = [
    { title: 'Languages', items: ['C#', 'SQL', 'JavaScript', 'VB.NET'] },
    { title: 'Frameworks', items: ['.NET', 'ASP.NET Core', 'Blazor', 'Razor Pages', 'SignalR'] },
    { title: 'Data', items: ['SQL Server', 'Entity Framework', 'Dapper'] },
    { title: 'Platforms & tools', items: ['Azure', 'Azure DevOps', 'Git', 'PowerApps', 'Power Automate'] },
];

export const experience = [
    { date: '2022 — Present', title: 'Application Developer', company: 'Kimball International', text: 'Since September 2022, developing, maintaining, and modernizing internal applications and services. Working with business users on requirements, integrations, deployments, and production support.' },
    { date: '2022', title: 'Business Systems Analyst', company: 'Kimball International', text: 'Requirements gathering, issue investigation, and solution analysis in a short-term transition role.' },
    { date: '2014 — 2022', title: 'Manufacturing Leadership', company: 'MasterBrand & Kimball International', text: 'Continuous Improvement Specialist, Assistant Supervisor, and Supervisor roles focused on people, processes, and operational problem solving.' },
];
