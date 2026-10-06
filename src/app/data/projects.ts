import nexusCover from "../../assets/nexus-cover.png";
import synergyCover from "../../assets/synergy-cover.png";
import synergyCard from "../../assets/synergy-card.png";
import synergyMobile from "../../assets/synergy-mobile.png";
import synergyViews from "../../assets/synergy-views.png";
import synergyConflict from "../../assets/synergy-conflict.png";
import synergyColors from "../../assets/synergy-colors.png";
import synergyComponents from "../../assets/synergy-components.png";
import synergyNotifications from "../../assets/synergy-notifications.png";
import synergyManager from "../../assets/synergy-manager.png";
import synergyAdmin from "../../assets/synergy-admin.png";

// A paragraph entry is text, or an image placed inline between paragraphs
export type ParagraphItem = string | { image: string; alt?: string };

export interface TeamMember {
  name: string;
  role: string;
  photo?: string; // Imported image; initials are shown when missing
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  role: string;
  bgColor: string;
  imageQuery: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  images: string[]; // Unsplash photo IDs
  coverImage?: string; // Local cover image; used instead of images[0] when set
  cardImage?: string; // Image on the home page card; falls back to coverImage
  tags?: string[]; // Pills on the home page card; falls back to [category]
  // New flexible structure
  sections?: {
    subheading?: string;
    heading?: string;
    paragraph: string | ParagraphItem[];
    images?: string[]; // Optional images for sections: Unsplash photo IDs or imported local images
    team?: TeamMember[]; // Optional grid of collaborators
  }[];
  breakerText?: string;
  sectionsAfterBreaker?: {
    subheading?: string;
    heading?: string;
    paragraph: string | ParagraphItem[];
    images?: string[]; // Optional images for sections
  }[];
  // Impact metrics
  metrics?: {
    label: string;
    value: string;
    description?: string;
  }[];
}

export const projectsData: ProjectData[] = [
  {
    id: "synergy",
    title: "Synergy",
    description: "Synergy allows employees to seamlessly input their time-off, allows managers to plan better, and helps everyone avoid burnout.",
    category: "Product Design",
    year: "2024",
    role: "Sole Designer",
    bgColor: "bg-[#3b6ef6]",
    imageQuery: "synergy",
    coverImage: synergyCover,
    cardImage: synergyCard,
    tags: ["Product Design", "UI / UX", "Figma"],
    images: ["1460925895917-afdab827c52f"],
    sections: [
      {
        subheading: "Summary",
        heading: "With real-time updates and an intuitive calendar interface, Synergy gives employees a seamless way to schedule time off while giving managers a clear, at-a-glance view of team availability and conflicts.",
        paragraph: "Synergy helps by:\n\n• Allowing employees to seamlessly input their time-off\n• Keeping teams aligned\n• Allowing managers plan more efficiently\n• Helping employees avoid burnout",
      },
      {
        subheading: "Project Highlights",
        paragraph: "• Helps managers visualize and prevent staffing gaps\n• Encourages employees to plan ahead and use their time off\n• Makes the process feel intuitive, personal, and empowering\n• Reflects our unique policies (like Personal Time) and internal workflows\n• Scales across roles, teams, and devices without creating complexity",
      },
      {
        subheading: "Role & Approach",
        heading: "It was my job to examine how our company works internally, which includes the existing issues with our PTO policy, and improve the overall user experience.",
        paragraph: "I was the sole designer on the project. I worked with the CEO, the founder, the CIO, the innovation manager, and the senior programmer — people who had a good understanding of the employees, the culture, and the PTO patterns and issues. I also collaborated closely with the software team lead and developers to make sure my designs were efficient to build and seamless to use.",
        team: [
          { name: "Seth Belous", role: "CEO" },
          { name: "Jeffery Cusick", role: "CIO" },
          { name: "Jonathan Hugo", role: "IT Manager" },
          { name: "Mike Accavallo", role: "Innovation Manager" },
          { name: "Christopher Polanish", role: "Programming Manager" },
        ],
      },
      {
        subheading: "Issue",
        heading: "Flexible IT didn't have a time-off platform.",
        paragraph: [
          "Employees had unlimited PTO with no tracking. This caused problems:\n\n• Managers had no reliable way to track how many days employees were taking, or which employees were off at the same time. In some cases, entire departments would be offline without notice, causing serious delays for client-facing work.\n• A lot of employees felt pressured to not use any time off, causing burnout and a bad culture.\n• Some employees were overusing their time off without any accountability.",
          "Existing time-off tools weren't the answer either. They're built for HR tracking, not the planning needs of teams and managers. They lack real-time team-wide visibility, conflict-aware calendars, flexible company-specific leave types, role-based controls, and smart defaults for \"My Team\" vs. \"Company\" views.",
          "These were the real user questions Synergy needed to answer:\n\n\"Can I see who's out?\"\n\"Will someone be available while I'm gone?\"\n\"What if we both request the same day?\"",
        ],
      },
      {
        subheading: "Overall Design",
        heading: "Designing the UI for Synergy required a careful balance of intuitive design and scalability.",
        paragraph: [
          "I intentionally designed the interface with modular, rectangular, stackable components. This ensures a responsive, scalable design across devices.",
          { image: synergyComponents, alt: "Modular Synergy components: calendar, absence request with accrued time, approved request card, and absence type dropdown" },
          "To eliminate ambiguity, I delivered high-fidelity Figma prototypes that included every screen and interaction, from creating a request to submitting it. I also built a comprehensive design system to support the developers, making navigation through my files efficient.",
        ],
      },
      {
        subheading: "Dashboard",
        heading: "The dashboard is where all the information lives.",
        paragraph: "It captures everything at a glance. The calendar is on the right, viewing options on the left, and the toggle between Company view and Team view is at the top.",
      },
      {
        subheading: "Company View / Team View",
        heading: "Users can switch between a focused \"My Team\" view and a broader \"Company\" view to monitor absences across departments.",
        paragraph: [
          "Most teams only need to coordinate within their group, but certain roles (like execs or cross-functional leads) need a company-wide pulse. The toggle makes both possible without cluttering either experience.",
          "For example, I'm on the marketing team, but for Synergy to be built, I worked with programmers and stakeholders across the company. Seeing their availability was crucial.",
        ],
        images: [synergyViews],
      },
      {
        subheading: "Absence Types",
        heading: "Leave types had to be expandable.",
        paragraph: [
          "New types are introduced as issues arise: new situations, loopholes, or misuse. The CEO was already adding types during the project, with more expected in the future, so the system needed to support new types without breaking the existing design.",
          "For example, employees didn't want to use a vacation day to pick up their kids from daycare or go to the doctor. Personal Time (PER) was introduced for these cases: 2 hours off, any day, with no explanation needed. This keeps VAC reserved for actual vacations.",
          "Current absence types:\n\n• Vacation (VAC)\n• Sick / Bereavement / Medical (SBM)\n• Personal Time (PER)\n• Work From Home (WFH)\n• Volunteer (VTO)\n• Business Travel (BUS)",
        ],
      },
      {
        subheading: "Absence Colors",
        heading: "Every leave type is color-coded.",
        paragraph: [
          "Each color was chosen for clarity, frequency, and emotional tone:",
          { image: synergyColors, alt: "Color-coded absence tags (VAC, SBM, PER, WFH, VTO, BUS) applied to employee time-off rows" },
          "**VAC — Purple**\nPurple is bold without feeling alarming, and distinct from every other type. It's also associated with reward, which fits spending accrued PTO.",
          "**SBM — Red**\nRed signals urgency and \"do not disturb.\" Employees out sick usually can't be contacted, and these absences are often unplanned, so they need to stand out immediately on the calendar.",
          "**PER — Blue**\nPersonal Time covers short, routine absences of up to 2 hours, so it shouldn't compete for attention. Blue is neutral and calm, and commonly used for informational states in UI. It signals that someone is briefly away, not unavailable.",
          "**WFH — Green**\nEmployees working from home are still active, just not in the office. Green is the common software convention for \"active\" or \"online,\" so it reads correctly without explanation.",
          "**VTO — Pink**\nVolunteer time is used rarely, but the company wants it noticed when it is. Pink stands apart from the rest of the palette, so it catches attention even in a busy week.",
          "**BUS — Orange**\nBusiness travel is planned work, not time off, so it shouldn't feel urgent. Orange is warm without being alarming, and its association with progress and movement fits travel.",
          "Together, the colors let absence types be identified at a glance, without opening a request. This matters most during high-volume periods like the holidays. Each tag also includes a text label, so meaning never depends on color alone.",
        ],
      },
      {
        subheading: "Mobile",
        heading: "Mobile is where many requests happen.",
        paragraph: "Same-day absences, like sick time, are often submitted away from a computer. The same modular component system adapts to smaller screens, keeping the request flow consistent across devices.",
        images: [synergyMobile],
      },
      {
        subheading: "Key Features",
        paragraph: [
          "**Smart Conflict Warnings**\nIf a user tries to take off on a day where multiple team members are already absent, Synergy flags it immediately. This helps managers avoid approving time off that could leave clients unsupported, especially in lean or specialized teams.",
          { image: synergyConflict, alt: "Employee conflicts list and the Add absence form showing a conflicting request" },
          "**Manager View**\nManagers can look up any employee on their team and see their information, including previous time off. Most importantly, managers can manually create conflicts. If two team members can't be out at the same time, the manager links them, and Synergy flags it when both request overlapping days.",
          { image: synergyManager, alt: "Manager view: employee profile with auto-approval limit, time off history, and conflicts, with the Conflict dialog open" },
          "**Admin View**\nAdmins can search all employees, review requests waiting for approval, see long leaves flagged by the system, and view every request across the company. Admins can also create conflicts between employees on different teams. For example, if someone in Programming and someone in HR are building an internal HR app together, an admin can link them so Synergy flags it if they both try to take time off at the same time.",
          { image: synergyAdmin, alt: "Admin view on the Flagged Long Leaves tab, listing pending long vacation requests with dates and status" },
          "**Notifications**\nManagers are alerted when an employee submits a vacation request that needs approval, and when a conflict occurs. Admins are also alerted when a long leave is requested.",
          { image: synergyNotifications, alt: "Notifications panel showing incoming VAC and WFH requests from employees" },
          "**View All / My Requests**\nUsers can toggle between their personal time-off history and the full list of requests submitted by their team (if they're a manager). It gives both employees and managers a clear sense of what's scheduled, what's pending, and what's already happened, all from one place.",
          "**Holidays Page**\nA simple tab lists all upcoming company holidays. It saves users from digging through onboarding docs or Slack messages to remember when the office is closed, and makes long-term PTO planning easier.",
        ],
      },
      {
        subheading: "Results",
        heading: "Since launching Synergy, our company has seen:",
        paragraph: [
          "• A measurable increase in vacation planning and usage\n• Fewer surprise conflicts or staffing gaps\n• More team leaders proactively adjusting around absences\n• Employees using Personal Time more thoughtfully, without sacrificing full PTO days",
          "Most importantly, Synergy normalized conversations around time off. It made PTO feel visible, manageable, and supported.",
        ],
      },
    ],
  },
  {
    id: "nexus",
    title: "Nexus",
    description: "Creating a more personal, less frustrating way to get tech support.",
    category: "Product Design",
    year: "2024",
    role: "Sole Designer",
    bgColor: "bg-[#2563eb]",
    imageQuery: "tech support",
    coverImage: nexusCover,
    images: [
      "1553877522-43269d4ea984", // tech support
      "1460925895917-afdab827c52f", // dashboard
      "1551288049-29ac87e57e47", // interface
      "1512941937669-90a1b58e7e9c", // mobile
    ],
    metrics: [
      {
        label: "Support Requests",
        value: "2,500+",
        description: "processed in first quarter"
      },
      {
        label: "Response Time",
        value: "65%",
        description: "faster initial response"
      },
      {
        label: "User Satisfaction",
        value: "4.8/5",
        description: "average client rating"
      },
      {
        label: "Active Users",
        value: "100+",
        description: "companies onboarded"
      }
    ],
    sections: [
      {
        subheading: "Summary",
        heading: "Nexus simplifies how users get IT support.",
        paragraph: "Nexus replaces clunky forms and long phone calls with a personal, streamlined experience so users get help faster, feel heard, and know exactly who's solving their problem.",
      },
      {
        subheading: "The problem",
        heading: "Traditional IT ticketing systems often prioritize internal operations and not the people using them.",
        paragraph: [
          "Previously, clients had to either call a support line or submit a vague online form with no confirmation, visibility, or follow-up. When support requests were created through a phone call, there was no tangible trace. No ticket ID, no interface, and no confidence that anything had actually been received.",
          "Requests were routed to whoever was available, often with little context. Clients had to explain themselves multiple times, attach files manually through email, and follow up via phone if they didn't hear back. The lack of transparency, personalization, continuity created confusion, and often led to frustration.",
          "A client who is experiencing IT issues represent not just one person, but entire networks of employees — often hundreds or thousands. A single \"ticket\" might impact entire departments, which made the stakes higher than many systems were designed to support.",
        ],
      },
      {
        subheading: "Design goals",
        heading: "At every step, the goal was the same: make clients feel like they were being helped, not processed.",
        paragraph: [
          "My role as the sole designer was to balance functional clarity with emotional tone: making the process feel approachable, visible, and consistent for every user. Nexus was designed from the ground up as a personalized IT support platform, not a generic ticketing form.",
          "Each goal came directly from research: stakeholder meetings, IT staff interviews, and analysis of real support cases. These became the pillars of the system:",
          "Continuity: Assign one dedicated IT specialist per client for all open tickets.\n\nVisibility: Give users a clear, always-on view of task status and progress.\n\nFlexibility: Let clients edit, cancel, or resolve their own requests.\n\nResponsiveness: Build a cross-platform experience that works seamlessly on desktop and web.\n\nPersonalization: Greet clients by name, and offer small touches of customization.\n\nEmpathy: Replace robotic forms with helpful language and conversational tone.",
        ],
      },
    ],
    breakerText: "Here's how a typical experience in Nexus unfolds — each screen and flow designed with purpose",
    sectionsAfterBreaker: [
      {
        subheading: "Home Screen",
        heading: "It's common to feel unsure how to get started.",
        paragraph: [
          "When users launch Nexus for the first time, or have no open tickets, they're welcomed with a guided home screen. Instead of a cold form, they're asked a simple question: \"What can we help you with today?\"\n\nThey can choose:\n\n• Issue (something broken)\n• Request (an add, move, or change)\n• Question (a general inquiry)",
          "These categories help clients articulate their needs more clearly from the start. They also were created based on how our internal IT team classifies support. Using plain language helps reduce hesitation and empowers non-technical users to feel confident.",
        ],
      },
      {
        subheading: "Dashboard",
        heading: "Users want visibility into what tasks they have, and who's helping them.",
        paragraph: [
          "Once a task is submitted, clients are brought into the dashboard — the core of the Nexus experience. From here, they can:\n\n• View all active tasks and their statuses\n• Add unlimited new tasks\n• Edit existing tasks\n• See upcoming support events (on-site or virtual)\n• Communicate directly with their assigned specialist",
          "Before Nexus, clients had no visibility into what was happening behind the scenes. Now they have a transparent view of everything, eliminating repeated calls or duplicate requests.",
        ],
      },
      {
        subheading: "Task Creation",
        heading: "Creating a task should feel quick, guided, and flexible.",
        paragraph: [
          "Users are then taken to a request form designed to gather just the right amount of detail without overwhelming them. They can:\n\nWrite a description\n\nSet urgency\n\nChoose the best time to be contacted\n\nUpload screenshots or files",
          "Previously, IT specialists had to chase missing context via email or phone. This step significantly reduced back-and-forth and sped up resolution times.",
        ],
        images: [
          "1454165804606-c3d57bc86b40", // form interface
          "1551434678-e076c223a692", // upload files
          "1460925895917-afdab827c52f", // dashboard view
        ],
      },
      {
        subheading: "Chat & Communication",
        heading: "Direct access to your IT specialist creates a seamless experience that reduces friction, improves response times, and makes communication feel personal and immediate.",
        paragraph: [
          "Once assigned, the IT specialist's photo, name, phone number, and email appear in the dashboard, along with a built-in chat window for direct communication.",
          "Some clients prefer messaging. Some prefer calling. Instead of forcing one channel, Nexus supports both and ensures that the relationship feels human, not automated.",
        ],
        images: ["1611606412784-7f5062e7dca8"], // chat interface
      },
      {
        subheading: "Event Scheduling",
        heading: "Users need a way to request in-person or virtual help without leaving the app.",
        paragraph: [
          "Some issues require hands-on help. Specialists can schedule an on-site visit or a virtual Teams call, and these events appear on the client's dashboard under the associated task.",
          "Previously, scheduling was handled manually through email threads. This system automates the process and keeps everyone on the same page.",
        ],
        images: ["1506784983877-45594efa4cbe"], // calendar scheduling
      },
      {
        subheading: "Personalization",
        heading: "Technical problems are stressful. These are simple yet effective features that help the interface feel more like theirs.",
        paragraph: [
          "The dashboard greets users by name, the verbiage is very friendly, the colors are very light, and the design is very soothing.",
          "Clients can also customize their profile color, giving the user a sense of control and comfort.",
          "They can update personal details like their address, preferred contact method, and best time to reach them — giving specialists helpful context and reducing miscommunication.",
        ],
        images: [
          "1557683316-973673baf926", // profile customization
          "1551288049-29ac87e57e47", // settings interface
          "1512941937669-90a1b58e7e9c", // personalization
        ],
      },
      {
        subheading: "Self-Service Tools",
        heading: "Users want the ability to update or resolve their own tickets without needing to contact IT.",
        paragraph: [
          "Previously, clients had no way to update their submissions once sent which led to confusion, duplication, and delays. Giving users this flexibility reduces friction for both sides and empowers them to stay in control of their own issues.",
          "Clients can:\n\nEdit their tasks\n\nUpload/remove files\n\nMark issues as resolved",
        ],
        images: ["1486312338219-ce68d2c6f44d"], // task management
      },
      {
        subheading: "Feedback",
        heading: "Clients needed a way to stay with the same specialist across multiple requests",
        paragraph: [
          "Clients were frustrated by having to explain their issue to a new person every time. When a task is resolved, clients are asked a simple feedback question: \"How was your experience with [specialist's name]?\"",
          "A thumbs-up response increases the likelihood of being paired with the same specialist on future tasks.",
          "This system helps preserve context, strengthens client-specialist relationships, and reduces the friction of starting from scratch with someone new. It turns each positive experience into the beginning of long-term familiarity and trust.",
        ],
        images: ["1516321318423-f06f85e504b3"], // feedback interface
      },
      {
        subheading: "Company walkthrough",
        heading: "Onboarding users with approachable, visual guidance",
        paragraph: [
          "To introduce Nexus, we hosted a live company-wide Zoom walkthrough and presented the app to over 100 employees. We shared our screen and walked through every part of the interface, from creating a task to chatting with a specialist, while explaining how the process has changed.",
          "The goal was to make sure every employee understood how Nexus works, why it exists, and how it improves the way we support clients. By showing the live product and answering questions in real time, we helped the team feel confident and ready to use it.",
        ],
        images: ["1588196749597-9ff075ee6b5b"], // video call/presentation
      },
    ],
  },
  {
    // TODO: replace placeholder description, category, year, role, and images
    id: "atlas",
    title: "Atlas",
    description: "Case study coming soon.",
    category: "Product Design",
    year: "2024",
    role: "Product Designer",
    bgColor: "bg-[#3a3a3a]",
    imageQuery: "atlas",
    images: ["1551288049-29ac87e57e47"],
  },
  {
    // TODO: replace placeholder description, category, year, role, and images
    id: "nextvisit",
    title: "Nextvisit",
    description: "Case study coming soon.",
    category: "Product Design",
    year: "2024",
    role: "Product Designer",
    bgColor: "bg-[#3a3a3a]",
    imageQuery: "nextvisit",
    images: ["1512941937669-90a1b58e7e9c"],
  },
  {
    // TODO: replace placeholder description, category, year, role, and images
    id: "flexible-it",
    title: "Flexible IT",
    description: "Case study coming soon.",
    category: "Product Design",
    year: "2024",
    role: "Product Designer",
    bgColor: "bg-[#3a3a3a]",
    imageQuery: "flexible it",
    images: ["1551434678-e076c223a692"],
  },
];