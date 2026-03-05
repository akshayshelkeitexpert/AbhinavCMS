/**
 * Shared project list for home and projects list pages.
 * Project detail pages are separate standalone components (project/1 ... project/10).
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  status: 'completed' | 'in-progress' | 'planning';
  duration: string;
  summary: string;
  specs: { icon: string; value: string }[];
  image: string;
  badgeIcon: string;
}

/** Projects in display order: 1 = High-Rise, 2 = Chakan, ... 10 = Pharma R&D */
export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Residential & Commercial High-Rise MEP Project',
    category: 'Commercial',
    location: 'Pune, Maharashtra',
    status: 'completed',
    duration: '22 Floors + Basement',
    summary: 'Complete MEP design, engineering & execution for 22-storey mixed-use tower: HVAC, electrical, plumbing, fire fighting, basement ventilation.',
    specs: [{ icon: 'bi bi-building', value: '22 Floors' }, { icon: 'bi bi-gear', value: 'Full MEP' }],
    image: 'assets/img/construction/project-7.webp',
    badgeIcon: 'bi-building'
  },
  {
    id: '2',
    title: 'Industrial & Office Integrated MEP + Solar Project',
    category: 'Industrial',
    location: 'Chakan MIDC, Pune, Maharashtra',
    status: 'completed',
    duration: '8 Months',
    summary: 'HVAC, Electrical, Fire Protection, Plumbing & Solar System. 160 HP Daikin VRV, office electrification, fire alarm & hydrant modification, solar integration.',
    specs: [{ icon: 'bi bi-gear', value: '160 HP VRV' }, { icon: 'bi bi-calendar-check', value: '8 Months' }],
    image: 'assets/img/projects_services/Industrial & Office Integrated MEP + Solar Project.JPG.jpeg',
    badgeIcon: 'bi-lightning'
  },
  {
    id: '3',
    title: 'Luxury Residential Bungalow – Premium MEP Execution',
    category: 'Residential',
    location: 'Pune, Maharashtra',
    status: 'completed',
    duration: '12 Months',
    summary: 'Complete MEP solutions: 140 HP Toshiba VRF, electrical engineering, and precision plumbing for high-end residential bungalow.',
    specs: [{ icon: 'bi bi-house', value: '140 HP VRF' }, { icon: 'bi bi-calendar-check', value: '12 Months' }],
    image: 'assets/img/construction/project-3.webp',
    badgeIcon: 'bi-house'
  },
  {
    id: '4',
    title: 'Railway HVAC Compressor Testing Facility',
    category: 'Industrial',
    location: 'Hinjewadi, Pune, Maharashtra',
    status: 'completed',
    duration: '24/7 Testing',
    summary: 'High-precision HVAC delivering 1–2 m/s air velocity at testing rigs and ≤23°C NMT for railway compressor validation.',
    specs: [{ icon: 'bi bi-wind', value: '1–2 m/s' }, { icon: 'bi bi-thermometer-half', value: '23°C NMT' }],
    image: 'assets/img/projects_services/Railway HVAC Compressor Testing Facility – Hinjewadi, Pune, Maharashtra.jpg.jpeg',
    badgeIcon: 'bi-wind'
  },
  {
    id: '5',
    title: 'Industrial Process HVAC & Utility Engineering Project',
    category: 'Industrial',
    location: 'Supa MIDC, Ahilyanagar, Maharashtra',
    status: 'completed',
    duration: 'Fertilizers Facility',
    summary: 'Process HVAC, Chilled Water System, VRF, Industrial Ventilation & Allied Electrical Works for fertilizers manufacturing facility.',
    specs: [{ icon: 'bi bi-gear', value: 'VRF + AHUs' }, { icon: 'bi bi-building', value: 'Process HVAC' }],
    image: 'assets/img/projects_services/Industrial Process HVAC & Utility Engineering Project.JPG.jpeg',
    badgeIcon: 'bi-gear'
  },
  {
    id: '6',
    title: 'Pharmaceutical Warehouse HVAC Project',
    category: 'Pharmaceutical',
    location: 'Pune, Maharashtra',
    status: 'completed',
    duration: '24/7 Operation',
    summary: 'GMP-oriented HVAC maintaining ≤23°C NMT for temperature-controlled pharmaceutical warehouse with 135,000 CFM air handling.',
    specs: [{ icon: 'bi bi-building', value: '135,000 CFM' }, { icon: 'bi bi-thermometer-half', value: '23°C NMT' }],
    image: 'assets/img/projects_services/Pharmaceutical Warehouse HVAC Project.JPG.jpeg',
    badgeIcon: 'bi-thermometer-half'
  },
  {
    id: '7',
    title: 'Pharmaceutical Warehouse HVAC Project',
    category: 'Pharmaceutical',
    location: 'Badli, Haryana',
    status: 'completed',
    duration: '24/7 Operation',
    summary: 'GMP-oriented HVAC maintaining ≤23°C NMT for temperature-controlled pharmaceutical warehouse storage with 105,000 CFM air handling.',
    specs: [{ icon: 'bi bi-building', value: '105,000 CFM' }, { icon: 'bi bi-thermometer-half', value: '23°C NMT' }],
    image: 'assets/img/projects_services/Pharmaceutical Warehouse HVAC Project Haryana.JPG.jpeg',
    badgeIcon: 'bi-thermometer-half'
  },
  {
    id: '8',
    title: 'Data Centre HVAC Project',
    category: 'Data Centre',
    location: 'Mumbai, Maharashtra',
    status: 'completed',
    duration: '8 Months',
    summary: 'Supply & Installation of high-capacity VRF System and 3,000m chilled water piping network for mission-critical data centre cooling.',
    specs: [{ icon: 'bi bi-gear', value: '620 HP VRF' }, { icon: 'bi bi-calendar-check', value: '8 Months' }],
    image: 'assets/img/projects_services/Data Centre HVAC Project.jpeg',
    badgeIcon: 'bi-gear'
  },
  {
    id: '9',
    title: 'Pharmaceutical Cleanroom HVAC Project',
    category: 'Pharmaceutical',
    location: 'Pithampur, Madhya Pradesh',
    status: 'completed',
    duration: '22 Months',
    summary: 'Design, Supply, Installation, Testing & Commissioning of Complete Cleanroom HVAC & Electrical Systems for GMP-compliant pharmaceutical manufacturing.',
    specs: [{ icon: 'bi bi-building', value: '24 AHUs' }, { icon: 'bi bi-calendar-check', value: '22 Months' }],
    image: 'assets/img/projects_services/Pharmaceutical Cleanroom HVAC Project – Pithampur, Madhya Pradesh.JPG.jpeg',
    badgeIcon: 'bi-award'
  },
  {
    id: '10',
    title: 'Pharmaceutical Research & Development Centre',
    category: 'Pharmaceutical',
    location: 'Mumbai, Maharashtra',
    status: 'completed',
    duration: '24 Months',
    summary: 'Integrated HVAC & MEP Execution. Complete SITC of HVAC, Electrical & Fire Protection Systems for state-of-the-art Pharmaceutical R&D Centre.',
    specs: [{ icon: 'bi bi-building', value: '22 AHUs' }, { icon: 'bi bi-calendar-check', value: '24 Months' }],
    image: 'assets/img/projects_services/Pharmaceutical Research & Development Centre.JPG.jpeg',
    badgeIcon: 'bi-award'
  }
];
