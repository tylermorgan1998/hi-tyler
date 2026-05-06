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
  // New flexible structure
  sections?: {
    subheading?: string;
    heading: string;
    paragraph: string | string[];
    images?: string[]; // Optional images for sections
  }[];
  breakerText?: string;
  sectionsAfterBreaker?: {
    subheading?: string;
    heading: string;
    paragraph: string | string[];
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
    id: "nexus",
    title: "Nexus",
    description: "Creating a more personal, less frustrating way to get tech support.",
    category: "Product Design",
    year: "2024",
    role: "Sole Designer",
    bgColor: "bg-[#2563eb]",
    imageQuery: "tech support",
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
    id: "tribe-so-admin",
    title: "Tribe.so Admin onboarding",
    description: "Increase user engagement",
    category: "UX/UI Design",
    year: "2024",
    role: "Lead Product Designer",
    bgColor: "bg-[#e5e7eb]",
    imageQuery: "dashboard interface",
    overview: "Tribe.so needed to improve their admin onboarding experience to reduce drop-off rates and increase user activation. The goal was to create an intuitive, step-by-step guide that helps new administrators set up their community platforms quickly and confidently.",
    challenge: "The original onboarding flow had a 45% drop-off rate during the initial setup. Users reported feeling overwhelmed by the number of configuration options and unclear about the best practices for setting up their community. The challenge was to simplify without removing essential features.",
    solution: "I designed a progressive disclosure onboarding system that breaks the setup process into manageable steps. Each step provides contextual help, best practice examples, and the ability to skip non-essential configurations. The new design includes interactive tooltips, progress indicators, and personalized recommendations based on the community type.",
    results: [
      "68% Increase in completion rate",
      "45% Reduction in time to first value",
      "92% User satisfaction score",
    ],
    images: [
      "1460925895917-afdab827c52f", // dashboard main
      "1551288049-29ac87e57e47", // interface detail 1
      "1512941937669-90a1b58e7e9c", // interface detail 2
      "1551434678-e076c223a692", // showcase
    ],
  },
  {
    id: "lendscape",
    title: "Lendscape",
    description: "Lend and Borrow Dashboard",
    category: "Fintech / Web3",
    year: "2024",
    role: "Product Designer",
    bgColor: "bg-[#4a5568]",
    imageQuery: "crypto dashboard",
    overview: "Lendscape is a DeFi lending platform that allows users to lend and borrow cryptocurrency assets. The project required designing a comprehensive dashboard that displays complex financial data in an accessible and actionable format while maintaining trust and security.",
    challenge: "Cryptocurrency lending involves complex concepts like APY, collateralization ratios, and liquidation thresholds. Users needed to make informed decisions quickly while managing multiple positions. The challenge was to present this complexity in a way that both beginners and advanced users could understand and act upon.",
    solution: "I created a modular dashboard design with customizable widgets, real-time data visualization, and clear risk indicators. The interface uses color coding and iconography to communicate status at a glance, while detailed tooltips provide deeper explanations. A prominent 'Health Factor' metric helps users understand their position safety instantly.",
    results: [
      "$12M Total value locked in first month",
      "78% Active user retention",
      "4.8★ Average rating on DApp stores",
    ],
    images: [
      "1551288049-29ac87e57e47", // crypto main
      "1460925895917-afdab827c52f", // detail 1
      "1551434678-e076c223a692", // detail 2
      "1512941937669-90a1b58e7e9c", // showcase
    ],
  },
  {
    id: "flop-app",
    title: "Flop App",
    description: "Social media for poker players",
    category: "Mobile App Design",
    year: "2023",
    role: "Lead Designer",
    bgColor: "bg-[#7c3aed]",
    imageQuery: "mobile app poker",
    overview: "Flop is a social networking app designed specifically for poker players to share hands, discuss strategy, and connect with other players. The app needed to feel authentic to poker culture while being approachable for casual players looking to improve their game.",
    challenge: "Poker hand discussions require specific formatting and context that traditional social media platforms don't support well. Users needed a way to share hand histories, add annotations, and discuss decisions in a threaded format. The design also needed to balance between serious strategy discussion and casual social interaction.",
    solution: "I designed a custom hand replay interface that lets users visualize poker hands with street-by-street progression. The app includes hand range visualizers, equity calculators, and a unique 'decision point' feature that lets users poll the community on specific hands. A dual-feed system separates casual content from serious strategy discussion.",
    results: [
      "50K Downloads in 3 months",
      "35min Average daily usage",
      "10K Hands shared per week",
    ],
    images: [
      "1512941937669-90a1b58e7e9c", // mobile main
      "1551434678-e076c223a692", // detail 1
      "1460925895917-afdab827c52f", // detail 2
      "1551288049-29ac87e57e47", // showcase
    ],
  },
  {
    id: "promot3-dashboard",
    title: "Promot3 Dashboard",
    description: "Project management app",
    category: "SaaS / Product Design",
    year: "2024",
    role: "Senior Product Designer",
    bgColor: "bg-[#3a3a3a]",
    imageQuery: "project management",
    overview: "Promot3 is a project management platform designed for creative teams and agencies. The dashboard needed to provide a comprehensive overview of multiple projects while enabling quick navigation to detailed views. The focus was on visual clarity and reducing cognitive load for users managing many projects simultaneously.",
    challenge: "Creative teams often juggle 10-20 active projects, each with multiple stakeholders, deadlines, and deliverables. Existing project management tools felt too corporate or too simplistic. The challenge was creating a system that feels powerful but not overwhelming, professional but creative.",
    solution: "I designed a kanban-style dashboard with custom views that can be tailored to different roles (designers, project managers, clients). The interface uses a card-based layout with rich previews, smart filtering, and a unique 'focus mode' that highlights urgent items. Collaborative features like inline comments and file annotations are seamlessly integrated.",
    results: [
      "200+ Teams onboarded",
      "94% Project completion rate",
      "40% Faster project delivery",
    ],
    images: [
      "1551434678-e076c223a692", // project management main
      "1512941937669-90a1b58e7e9c", // detail 1
      "1551288049-29ac87e57e47", // detail 2
      "1460925895917-afdab827c52f", // showcase
    ],
  },
];