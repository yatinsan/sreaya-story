/*
 * ─────────────────────────────────────────────────────────────
 *  SREAYA — THE UNOFFICIAL BIOGRAPHY
 *  Every word, name, photo and stat on the site lives here.
 *  Edit this file to customise the story. Images live in /public/images.
 * ─────────────────────────────────────────────────────────────
 */

const base = import.meta.env.BASE_URL;
const img = (name) => `${base}images/${name}.webp`;
const photo = (name) => `${base}images/photos/${name}`;

export const images = {
  heroSchoolbag: img('sreaya-hero-schoolbag'),
  schoolWalk: img('sreaya-school-walk'),
  schoolShocked: img('sreaya-school-shocked'),
  examPanic: img('sreaya-exam-panic'),
  walkAway: img('sreaya-walk-away'),
  collegeFirstDay: img('sreaya-college-firstday'),
  sleepingClass: img('sreaya-sleeping-class'),
  canteen: img('sreaya-canteen'),
  assignments: img('sreaya-assignments'),
  now: img('sreaya-now'),
  teacher: img('teacher'),
  schoolFriends: img('school-friends'),
  schoolBuilding: img('school-building'),
  classroom: img('classroom'),
  college: img('idukki-college'),
  bus: img('college-bus'),
};

export const hero = {
  name: 'SREAYA',
  tagline: 'The Unofficial Biography',
  subtitle: 'A story of school, friendship, chaos, college and somehow surviving all of it.',
  questions: ['WHO IS SHE?', 'WHERE DID IT ALL BEGIN?', 'WHY IS SHE LIKE THIS?'],
  issue: 'ISSUE #01',
  price: 'PRICELESS',
  cta: 'START STORY',
};

/* Chapters drive the PREVIOUS / NEXT navigation and the progress strip. */
export const chapters = [
  { id: 'cover', num: '00', title: 'The Story Begins' },
  { id: 'ch-1', num: '01', title: 'School Days' },
  { id: 'ch-2', num: '02', title: 'Friends & Memories' },
  { id: 'ch-3', num: '03', title: 'The Big Transition' },
  { id: 'ch-4', num: '04', title: 'Idukki College' },
  { id: 'ch-5', num: '05', title: 'College Friends' },
  { id: 'ch-6', num: '06', title: 'The Chaos' },
  { id: 'ch-7', num: '07', title: 'Who Is Sreaya Now?' },
  { id: 'the-end', num: '08', title: 'The Next Chapter' },
];

export const menu = [
  { id: 'ch-1', icon: '📖', label: 'STORY' },
  { id: 'about', icon: '👩', label: 'ABOUT' },
  { id: 'education', icon: '🎓', label: 'EDUCATION' },
  { id: 'skills', icon: '💡', label: 'SKILLS' },
  { id: 'projects', icon: '🚀', label: 'PROJECTS' },
  { id: 'memories', icon: '📸', label: 'MEMORIES' },
  { id: 'contact', icon: '💌', label: 'CONTACT' },
];

export const school = {
  name: 'G.V.H.S.S Girls Nadakkav',
  sub: 'Where the legend first packed her school bag.',
  panels: [
    {
      caption: 'Once upon a time...',
      bubble: { speaker: 'SREAYA', text: "Okay... let's see what happens." },
    },
    {
      sfx: 'RIIIIING!',
      bubble: { speaker: 'SREAYA', text: 'Already?!' },
    },
    {
      teacher: 'Good morning, students.',
      everyone: 'GOOD MORNING, TEACHER!',
      thought: 'Today is going to be a normal day.',
      narrator: 'She was completely wrong.',
    },
  ],
};

export const schoolTimeline = [
  {
    id: 'new-friends',
    title: 'New Friends',
    emoji: '👋',
    color: 'var(--sky)',
    text: 'Day one: knew nobody. Day two: knew everybody’s secrets.',
    bubble: 'Wanna share my pencil box?',
    sfx: 'HI!!',
    image: images.schoolFriends,
  },
  {
    id: 'best-friends',
    title: 'Best Friends',
    emoji: '👯‍♀️',
    color: 'var(--pink)',
    text: 'Matching keychains. Shared tiffin. A secret handshake nobody else understood.',
    bubble: 'Friends forever. No refunds.',
    sfx: 'BFF!',
  },
  {
    id: 'classroom-chaos',
    title: 'Classroom Chaos',
    emoji: '📚',
    color: 'var(--yellow)',
    text: 'Paper planes, secret notes and laughing at absolutely nothing during silent reading.',
    bubble: 'Who laughed?! ...Sreaya?',
    sfx: 'HAHA!',
    bg: images.classroom,
  },
  {
    id: 'lunch-break',
    title: 'Lunch Break',
    emoji: '🍱',
    color: 'var(--orange)',
    text: 'The most important period of the day. Everyone’s tiffin was community property.',
    bubble: 'Is that pazham pori? Give.',
    sfx: 'NOM!',
  },
  {
    id: 'adventures',
    title: 'Random Adventures',
    emoji: '🗺️',
    color: 'var(--green)',
    text: 'School trips, sports day, youth festival and one very questionable shortcut home.',
    bubble: 'Trust me, I know the way!',
    sfx: 'WHOOSH!',
  },
  {
    id: 'exam-panic',
    title: 'Exam Panic',
    emoji: '😱',
    color: 'var(--red)',
    exam: [
      { clock: 'EXAM TOMORROW', line: 'I still have time.' },
      { clock: 'EXAM — 8 HOURS', line: '...' },
      { clock: '2 HOURS BEFORE EXAM', line: 'WHY DIDN’T ANYONE STOP ME?!', sfx: 'PANIC!!!' },
    ],
    image: images.examPanic,
  },
  {
    id: 'last-day',
    title: 'Last Day',
    emoji: '🥹',
    color: 'var(--lilac)',
    text: 'Signed shirts, group photos, promises to meet every weekend. (They met twice.)',
    bubble: 'I’m not crying, YOU’RE crying.',
    sfx: 'SNIFF!',
  },
];

export const transition = {
  narrator: 'After years of school, friendships, homework, exams and questionable decisions...',
  unlocked: 'NEXT LEVEL UNLOCKED',
};

export const college = {
  name: 'IDUKKI COLLEGE',
  sub: 'New hills. New people. Same Sreaya (mostly).',
  busLine: 'Bus journey: 2 hours. Window seat: non-negotiable.',
  firstDay: { label: 'FIRST DAY', line: 'New college. New life. New me.' },
  weeksLater: { label: 'A few weeks later...', narrator: 'The "new me" lasted approximately 3 weeks.' },
  canteen: {
    friend: "Let's study after this.",
    sreaya: 'Definitely.',
    caption: 'They did not study.',
  },
  assignments: { line: 'Who invented this?', count: 'ASSIGNMENTS DUE: 47' },
};

/* College friends — swap name, role, line and image (or keep the emoji avatar). */
export const friends = [
  {
    name: 'FRIEND #01',
    role: 'Professional procrastinator.',
    line: '"I’ll start tomorrow. Definitely tomorrow."',
    power: 'Can sleep through any alarm',
    color: 'var(--sky)',
    image: img('friend-1'),
  },
  {
    name: 'FRIEND #02',
    role: 'Always hungry.',
    line: '"Canteen? Canteen. CANTEEN."',
    power: 'Smells parotta from 2 km away',
    color: 'var(--orange)',
    image: img('friend-2'),
  },
  {
    name: 'FRIEND #03',
    role: 'Knows everything.',
    line: '"Actually, technically, scientifically..."',
    power: 'Has notes for subjects that don’t exist',
    color: 'var(--green)',
    image: img('friend-3'),
  },
  {
    name: 'FRIEND #04',
    role: 'Arrives 30 minutes late.',
    line: '"I’m 2 minutes away!" (still at home)',
    power: 'Bends time and space',
    color: 'var(--pink)',
    image: img('friend-4'),
  },
];

/* Memories — replace `src` with real photos (put them in /public/images/photos). */
export const memories = [
  { src: photo('sreaya-1.jpg'), caption: 'Smiling like exams don’t exist', tilt: -4 },
  { src: photo('sreaya-2.jpg'), caption: 'Saree day — nailed it', tilt: 3 },
  { emoji: '🚌', caption: 'Random trip #27', tilt: 5, color: 'var(--sky)' },
  { emoji: '🎉', caption: 'College day madness', tilt: -3, color: 'var(--pink)' },
  { emoji: '🍕', caption: 'The great food hunt', tilt: 2, color: 'var(--orange)' },
  { emoji: '🌙', caption: '2 AM conversations', tilt: -5, color: 'var(--lilac)' },
  { emoji: '📝', caption: 'Exam survivors club', tilt: 4, color: 'var(--yellow)' },
  { emoji: '🏔️', caption: 'Idukki hills & chai', tilt: -2, color: 'var(--green)' },
];

export const chaos = {
  title: 'THE CHAOS',
  sub: 'A totally accurate, completely unedited montage.',
  sfx: ['BOOM!', 'HAHA!', 'WAIT... WHAT?!', 'NO WAY!', "LET'S GO!"],
  scenes: [
    { emoji: '🚗', title: 'Random Trips', line: '"5 minute drive" — 3 hours later' },
    { emoji: '😂', title: 'Laughing Fits', line: 'Nobody remembers the joke. Everybody remembers laughing.' },
    { emoji: '🎤', title: 'College Events', line: 'Volunteered for one thing. Ended up running everything.' },
    { emoji: '📸', title: 'Photos', line: '400 pictures. One usable.' },
    { emoji: '🍜', title: 'Food', line: 'Diet starts Monday. Which Monday? Unclear.' },
    { emoji: '🌌', title: 'Late Nights', line: 'Deep talks at 2 AM, regret at 8 AM.' },
    { emoji: '🤯', title: 'Unexpected Stuff', line: 'Plan A, B and C failed. Plan Z worked.' },
    { emoji: '📖', title: 'Exams', line: 'One night. Six chapters. Zero chill.' },
    { emoji: '🥳', title: 'Celebrations', line: 'Any excuse is a good excuse for cake.' },
  ],
};

export const about = {
  intro: 'Hi! I’m Sreaya.',
  body: [
    'Born in the chaos of school corridors, levelled up in the hills of Idukki, and still collecting stories.',
    'I love people, ideas, good food and turning ordinary days into memories. I’m curious, a little dramatic, and very good at making plans (following them is a separate skill).',
  ],
  facts: ['From: Kozhikode, Kerala', 'Fuel: Chai & good company', 'Weakness: “Just one more episode”'],
};

/* value is 0–100 (bar width). label is what’s shown. Make them as silly as you like. */
export const skills = [
  { name: 'COMMUNICATION', value: 10, label: '+10', note: 'Talks 10x more than everyone else', color: 'var(--sky)' },
  { name: 'CREATIVITY', value: 95, label: '+95', color: 'var(--pink)' },
  { name: 'PROBLEM SOLVING', value: 87, label: '+87', color: 'var(--green)' },
  { name: 'COFFEE DEPENDENCY', value: 100, label: '+100', color: 'var(--orange)' },
  { name: 'TEAMWORK', value: 92, label: '+92', color: 'var(--purple)' },
  { name: 'LAST-MINUTE POWER', value: 99, label: '+99', color: 'var(--red)' },
];

export const education = [
  {
    years: 'School years',
    place: 'G.V.H.S.S Girls Nadakkav',
    detail: 'Where friendships, exam panic and the legend began.',
    badge: '🏫',
  },
  {
    years: 'Higher secondary',
    place: 'G.V.H.S.S Girls Nadakkav',
    detail: 'Two years of “this is the most important exam of your life” (it was not).',
    badge: '📘',
  },
  {
    years: 'College',
    place: 'Idukki College',
    detail: 'Degree, new friends, canteen economics and 47 assignments.',
    badge: '🎓',
  },
];

export const projects = [
  {
    title: 'Project Alpha',
    tag: 'Academic',
    emoji: '💻',
    text: 'A placeholder for a project you’re proud of. Describe what you built and why it mattered.',
    stats: { POWER: 88, STYLE: 92 },
    color: 'var(--blue)',
  },
  {
    title: 'Project Beta',
    tag: 'Team',
    emoji: '👥',
    text: 'Group project where you somehow did 80% of the work. Classic.',
    stats: { POWER: 75, STYLE: 99 },
    color: 'var(--pink)',
  },
  {
    title: 'Project Gamma',
    tag: 'Personal',
    emoji: '🎨',
    text: 'Your passion project — the thing you do when nobody is assigning it.',
    stats: { POWER: 95, STYLE: 85 },
    color: 'var(--green)',
  },
];

export const achievements = [
  { icon: '🏆', title: 'Survived every exam', detail: 'Against all odds' },
  { icon: '🎭', title: 'Youth festival star', detail: 'Placeholder — add the real award' },
  { icon: '🤝', title: 'Event organiser', detail: 'Herded 200 students. Mostly successfully.' },
  { icon: '⭐', title: 'Friend of the year', detail: 'Voted by friends (biased jury)' },
];

export const hobbies = [
  { icon: '🎵', name: 'Music on loop' },
  { icon: '📚', name: 'Reading (and re-reading)' },
  { icon: '🍳', name: 'Cooking experiments' },
  { icon: '✈️', name: 'Random trips' },
  { icon: '📷', name: 'Photo-dumping' },
  { icon: '🎬', name: 'Movie marathons' },
];

export const contact = {
  heading: 'SEND A LETTER TO HQ',
  line: 'Got a story, an idea, or just want to say hi? Drop a message.',
  email: 'hello@sreaya.example',
  socials: [
    { label: 'Instagram', icon: '📸', href: 'https://instagram.com/' },
    { label: 'LinkedIn', icon: '💼', href: 'https://linkedin.com/' },
    { label: 'Email', icon: '💌', href: 'mailto:hello@sreaya.example' },
  ],
};

export const ending = {
  line1: "This isn't the end...",
  line2: "It's just the next chapter.",
  cta: 'START THE NEXT CHAPTER',
  footer: '© Sreaya — The Story Continues...',
};
