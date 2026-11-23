// All visible content lives here. Swap in new material without touching markup.
//
// Assumptions and placeholders (also listed in the hand-off message):
// - url: ezekielatevafo.com is a suggested domain, not registered yet.
// - Projects 02 (outbound caller), 05 (cinematic video) and 06 (product ads) have no media yet:
//   they render typographic covers and carry `placeholder: true` on their media.
// - Screenshots are real builds from OneDrive. Client names, emails and the client's business
//   details are blurred or cropped out.
// - The contact form opens the visitor's email app (mailto). Wire it to a form service later.

export type Shot = { src: string; alt: string; w: number; h: number; caption?: string };

export type Project = {
  slug: string;
  n: string;
  title: string;
  short: string;
  category: string;
  branch: 'Automation' | 'Creative';
  stack: string[];
  summary: string;
  chain: string[]; // the nodes of the build, in order
  context: string;
  idea: string;
  shipped: string;
  cover?: Shot;
  gallery: Shot[];
  placeholderMedia?: boolean;
};

export const site = {
  name: 'Ezekiel Efemena Atevafo',
  short: 'Ezekiel Atevafo',
  initials: 'EA',
  role: 'AI Automation & Integration Specialist, AI Creative Producer',
  roleA: 'AI Automation & Integration Specialist',
  roleB: 'AI Creative Producer',
  url: 'https://ezekielatevafo.com',
  description:
    'Ezekiel Efemena Atevafo builds AI voice agents, automated workflows and connected CRMs, and produces AI video for brands. Based in Lagos, working worldwide.',
  email: 'ezekielefemena0@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ezekiel-efemena-b3b007354',
  location: 'Lagos, Nigeria',
  since: 'January 2022',
  education: 'BSc, University of Lagos, 2023',
  headline: 'Building smarter businesses through AI, automation and creative technology.',
  intro:
    'I help businesses automate operations, connect the software they already use, and tell their story with AI-made video. From voice agents that answer the phone to cinematic product ads, I turn a business problem into a system that runs.',
  tagline: ['Automate smarter.', 'Integrate better.', 'Create without limits.'],
};

export const about = {
  title: 'Technology, automation and creativity, working together.',
  body: [
    'I’m Ezekiel, an AI automation and integration specialist and AI creative producer based in Lagos. I started freelancing in January 2022, and my work has always been about the same thing: using technology to remove friction from how a business runs.',
    'On the technical side I build automated workflows, AI voice assistants, chatbots, CRM systems and API integrations, so repetitive tasks run on their own and customers get answers faster. On the creative side I direct AI video: cinematic stories, product ads and promotional content.',
    'Every system should solve a problem, every integration should improve a process, and every creative project should say something worth hearing.',
  ],
};

export const automation = [
  {
    title: 'Workflow automation',
    text: 'Connected workflows that take repetitive operations off your team’s plate and let your apps talk to each other.',
    items: ['Business process automation', 'Multi-step workflows', 'Lead capture and management', 'Automated email notifications', 'Data synchronisation', 'Customer onboarding', 'Webhook and app integrations'],
    tools: 'n8n, Make.com, Zapier',
  },
  {
    title: 'AI voice agents and receptionists',
    text: 'Voice assistants that pick up, understand the caller, book the appointment and pass the call on when a human is needed.',
    items: ['AI phone receptionists', 'Inbound and outbound agents', 'Appointment booking', 'Lead qualification', 'Customer enquiries', 'Call routing and transfers', 'Automated follow-up calls'],
    tools: 'Vapi AI, Retell AI, OpenAI',
  },
  {
    title: 'AI chatbots and conversational systems',
    text: 'Assistants that answer questions from your own knowledge base, on your website or in WhatsApp.',
    items: ['Website chatbots', 'WhatsApp assistants', 'Customer support bots', 'Lead generation bots', 'Knowledge-base assistants', 'Booking systems'],
    tools: 'OpenAI, n8n, vector search',
  },
  {
    title: 'CRM and GoHighLevel automation',
    text: 'Pipelines that track every lead, follow up on time and remind people about their appointments.',
    items: ['CRM setup and configuration', 'Pipeline automation', 'Contact management', 'Automated follow-ups', 'Lead nurturing', 'Appointment reminders'],
    tools: 'GoHighLevel, n8n, Make.com',
  },
  {
    title: 'API integrations',
    text: 'Business apps, AI platforms and third-party services joined into one system that moves data by itself.',
    items: ['REST API integrations', 'Webhook configuration', 'Third-party connectivity', 'AI agent integrations', 'Automated data transfer', 'Cross-platform workflows'],
    tools: 'REST, webhooks, JSON',
  },
  {
    title: 'WhatsApp and messaging automation',
    text: 'Customer conversations that answer, capture leads and notify your team without anyone watching the phone.',
    items: ['WhatsApp automation', 'Automated replies', 'AI messaging assistants', 'Lead capture in chat', 'CRM and messaging sync', 'Automated notifications'],
    tools: 'Green API, ManyChat, n8n',
  },
];

export const creative = [
  { title: 'AI product advertisements', text: 'Ads that show the product at its best and say what the brand stands for.' },
  { title: 'Promotional and marketing videos', text: 'Videos for launches, campaigns and businesses that need to be seen.' },
  { title: 'Cinematic AI video', text: 'Scenes, characters and whole narratives, directed shot by shot with consistent characters.' },
  { title: 'AI UGC-style content', text: 'Creator-style videos for product promotion and social campaigns.' },
  { title: 'Book trailers and storytelling', text: 'Trailers and character introductions that bring an author’s story to the screen.' },
  { title: 'Social media video', text: 'Short-form cuts for Instagram, TikTok, Facebook and YouTube Shorts.' },
];

export const process = [
  { title: 'Understand', text: 'I learn how your business works, where the friction is, and what a good result looks like.' },
  { title: 'Strategize', text: 'I pick the tools and the approach that fit the problem, not the other way round.' },
  { title: 'Build', text: 'I build and connect the workflows, agents, integrations or creative assets.' },
  { title: 'Test and deliver', text: 'I run it, fix what breaks, and hand over a result that matches what we agreed.' },
];

export const tools = [
  { group: 'Automation and integration', items: ['n8n', 'Make.com', 'Zapier', 'REST APIs', 'Webhooks', 'JSON'] },
  { group: 'Artificial intelligence', items: ['OpenAI', 'Vapi AI', 'Retell AI', 'AI agents', 'Conversational AI', 'Prompt engineering'] },
  { group: 'CRM and communication', items: ['GoHighLevel', 'ManyChat', 'WhatsApp', 'Green API', 'Twilio'] },
  { group: 'Creative production', items: ['Google Flow', 'HeyGen', 'AI video generation', 'Cinematic storytelling', 'AI content production'] },
];

const img = (src: string, w: number, h: number, alt: string, caption?: string): Shot => ({ src: `/img/${src}.webp`, w, h, alt, caption });

export const workbench: Shot[] = [
  img('n8n-asmr-shorts', 1080, 420, 'n8n workflow that writes an idea, generates clips and sound, stitches the video and uploads it to YouTube', 'n8n: AI Shorts pipeline, idea to YouTube upload'),
  img('n8n-security-digest', 1080, 423, 'n8n workflow with three lanes that build daily security, privacy and compliance newsletters', 'n8n: three daily AI news digests'),
  img('make-social-autopost', 1080, 534, 'Make.com scenario that posts from a Google Sheet to Facebook, LinkedIn, Instagram, Google Business and YouTube', 'Make.com: one sheet row, six social channels'),
  img('make-twilio-integration', 1400, 697, 'Make.com scenario routing webhooks through a router to HTTP calls and Twilio messages', 'Make.com: Twilio messaging integration'),
];

export const projects: Project[] = [
  {
    slug: 'ai-voice-receptionist',
    n: '01',
    title: 'AI voice receptionist',
    short: 'Voice receptionist',
    category: 'Voice AI, conversational automation',
    branch: 'Automation',
    stack: ['Vapi AI', 'OpenAI', 'Deepgram', 'ElevenLabs', 'Make.com'],
    summary: 'A phone receptionist that answers every call, books appointments and transfers the caller when a person is needed.',
    chain: ['Incoming call', 'Vapi assistant', 'Check availability', 'Create booking', 'Send booking link', 'End-of-call summary'],
    context: 'A busy salon loses bookings whenever the phone rings during an appointment or after hours. Callers hang up, and nobody knows they called.',
    idea: 'Give the phone line its own assistant that speaks first, sounds like the front desk and works in English or Spanish, with the booking system wired straight into the call.',
    shipped: 'A published Vapi assistant with a written persona and style guide, plus four live Make.com scenarios behind it: availability check, booking, booking link by email and a summary of every call.',
    cover: img('vapi-receptionist', 1121, 897, 'Vapi assistant settings for the receptionist, with the first message and system prompt (client details blurred)'),
    gallery: [
      img('make-booking-scenarios', 1400, 452, 'Four active Make.com scenarios: CheckAvailability, Create Booking, End of call Summary, Send booking link', 'The four scenarios the assistant calls during a conversation'),
      img('make-voice-booking-flow', 1226, 273, 'Make.com scenario with branches that read a sheet, call OpenAI and send results back by webhook', 'Booking logic: sheet lookup, OpenAI parsing, branch by result'),
    ],
  },
  {
    slug: 'ai-outbound-calling-assistant',
    n: '02',
    title: 'AI outbound calling assistant',
    short: 'Outbound caller',
    category: 'Voice AI, business automation',
    branch: 'Automation',
    stack: ['Vapi AI', 'n8n', 'AI speech'],
    summary: 'An outbound agent that calls prospects, learns what they need, qualifies them and hands the good conversations to the team.',
    chain: ['Lead list', 'Schedule call', 'Voice agent', 'Qualify', 'Transfer or log', 'Update CRM'],
    context: 'Following up with every lead by phone takes hours, and most of those calls end without a fit.',
    idea: 'Let an agent make the first call, ask the qualifying questions, and pass only the right prospects to a person.',
    shipped: 'An outbound calling system that engages prospects, identifies their needs, qualifies them and transfers suitable conversations to the right team member.',
    gallery: [],
    placeholderMedia: true,
  },
  {
    slug: 'crm-lead-management',
    n: '03',
    title: 'CRM and lead management automation',
    short: 'CRM automation',
    category: 'CRM, workflow automation',
    branch: 'Automation',
    stack: ['GoHighLevel', 'n8n', 'Webhooks'],
    summary: 'A customer pipeline that captures each lead, updates the record and triggers the right follow-up on its own.',
    chain: ['Form or webhook', 'Create contact', 'Check stage', 'Branch', 'Add to workflow', 'Follow-up'],
    context: 'Leads arrive from several places and sit untouched, because updating the CRM and remembering follow-ups is manual work.',
    idea: 'Let the CRM decide: each new contact is checked for its stage, and a branch adds it to the right nurture workflow.',
    shipped: 'An automated workflow that captures information, updates contact records, manages opportunities and triggers the follow-up for each stage.',
    cover: img('ghl-workflow', 610, 385, 'CRM workflow builder: a condition checks whether a contact is in communication and branches to add them to a workflow'),
    gallery: [],
  },
  {
    slug: 'whatsapp-automation',
    n: '04',
    title: 'WhatsApp automation system',
    short: 'WhatsApp assistant',
    category: 'Conversational AI, messaging automation',
    branch: 'Automation',
    stack: ['n8n', 'WhatsApp', 'OpenAI', 'Vector search'],
    summary: 'A WhatsApp assistant that understands text, voice notes, images and PDFs, and answers from the business’s own knowledge.',
    chain: ['WhatsApp trigger', 'Route by type', 'Transcribe or read', 'Knowledge-base agent', 'Send response'],
    context: 'Customers message on WhatsApp in every format: a voice note, a photo, a PDF. A text-only bot fails most of them.',
    idea: 'Route each message by type, turn it into text with OpenAI, then let one knowledge-base agent with memory and vector search write the reply.',
    shipped: 'An n8n workflow with separate branches for text, voice, image and document messages, merging into a retrieval-augmented agent that replies in the same chat.',
    cover: img('n8n-whatsapp-rag', 1080, 407, 'n8n workflow: WhatsApp trigger routes text, voice, image and document messages into a knowledge-base agent with vector search'),
    gallery: [
      img('make-instagram', 1080, 534, 'Make.com scenario: Google Sheets to Airtable to Instagram photo post', 'Related build: scheduled Instagram posting from a sheet'),
    ],
  },
  {
    slug: 'ai-cinematic-video',
    n: '05',
    title: 'AI cinematic video production',
    short: 'Cinematic AI video',
    category: 'Creative AI, video production',
    branch: 'Creative',
    stack: ['Google Flow', 'AI creative tools'],
    summary: 'Visual stories built from generated scenes, with consistent characters, cinematic direction and a real narrative arc.',
    chain: ['Script', 'Visual flow', 'Shot prompts', 'Generate', 'Edit', 'Deliver'],
    context: 'AI video tends to look like a pile of unrelated clips. Viewers notice when characters change face from shot to shot.',
    idea: 'Direct it like film: break the script into a shot-by-shot visual flow first, keep characters locked across shots, then generate.',
    shipped: 'AI-assisted storytelling videos combining generated scenes, character consistency, cinematic direction and narrative development.',
    gallery: [],
    placeholderMedia: true,
  },
  {
    slug: 'ai-product-ads',
    n: '06',
    title: 'AI product and brand advertisements',
    short: 'Product ads',
    category: 'AI video, digital marketing',
    branch: 'Creative',
    stack: ['AI video generation', 'Creative production tools'],
    summary: 'Promotional content that shows the product, carries the brand and is cut for the platforms people actually watch.',
    chain: ['Brief', 'Concept', 'Generate', 'Cut for platform', 'Deliver'],
    context: 'Small brands need a steady stream of video ads but can’t book a studio for each one.',
    idea: 'Produce the ad with AI from a clear concept, then cut versions for each platform.',
    shipped: 'AI-made promotional content that showcases products, communicates brand identity and works on social platforms.',
    gallery: [],
    placeholderMedia: true,
  },
];
