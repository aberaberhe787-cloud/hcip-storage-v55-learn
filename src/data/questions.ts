import { Question } from "@/types";

export const questions: Question[] = [
  {
    id: "q-raid20-hierarchy",
    type: "mcq",
    conceptIds: ["raid-2-0-plus"],
    stem: "What is the correct hierarchy of RAID 2.0+ data layout from physical to logical?",
    options: [
      "Disk → Grain → CK → CKG → LUN",
      "Disk → CK → CKG → Grain → LUN",
      "Disk → CKG → CK → Grain → LUN",
      "Disk → CK → Grain → CKG → LUN",
    ],
    correctAnswer: "Disk → CK → CKG → Grain → LUN",
    explanation:
      "Physical disks are first divided into fixed-size Chunks (CKs). CKs from different disks form Chunk Groups (CKGs) according to the RAID policy. Each CKG is then subdivided into Grains, which are mapped to LUNs.",
    misconceptionMap: {
      "Disk → Grain → CK → CKG → LUN":
        "You reversed Grain and CK. Grain is the smallest unit and comes after CKG.",
      "Disk → CKG → CK → Grain → LUN":
        "CKG is formed from CKs, not the other way around.",
    },
    pdfPage: 39,
    difficulty: "easy",
    domain: "flash-storage",
  },
  {
    id: "q-ck-definition",
    type: "mcq",
    conceptIds: ["ck"],
    stem: "What is a Chunk (CK) in OceanStor Dorado RAID 2.0+?",
    options: [
      "A group of disks that form a traditional RAID group",
      "A fixed-size logical unit derived from a physical disk (typically 4 MB)",
      "The smallest allocation unit mapped to a LUN (typically 8 KB)",
      "A parity calculation unit that spans multiple enclosures",
    ],
    correctAnswer:
      "A fixed-size logical unit derived from a physical disk (typically 4 MB)",
    explanation:
      "A CK is a fixed-size slice of a physical disk (normally 4 MB). Multiple CKs from different disks are later assembled into a CKG.",
    misconceptionMap: {
      "The smallest allocation unit mapped to a LUN (typically 8 KB)":
        "That describes a Grain, not a CK.",
      "A group of disks that form a traditional RAID group":
        "In RAID 2.0+ the protection unit is the CKG.",
    },
    pdfPage: 39,
    difficulty: "easy",
    domain: "flash-storage",
  },
  {
    id: "q-ckg-definition",
    type: "mcq",
    conceptIds: ["ckg"],
    stem: "How is a Chunk Group (CKG) formed?",
    options: [
      "By concatenating consecutive CKs from the same disk",
      "By selecting CKs from different disks according to the RAID policy (N data + M parity)",
      "By grouping Grains that belong to the same LUN",
      "By combining all free CKs into one large pool",
    ],
    correctAnswer:
      "By selecting CKs from different disks according to the RAID policy (N data + M parity)",
    explanation:
      "A CKG is the RAID protection unit. It consists of N data CKs and M parity CKs taken from different physical disks.",
    pdfPage: 39,
    difficulty: "easy",
    domain: "flash-storage",
  },
  {
    id: "q-raid-tp-m",
    type: "mcq",
    conceptIds: ["raid-tp"],
    stem: "How many parity columns (M) does RAID-TP use?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
    explanation:
      "RAID-TP is Huawei's triple-parity technology. M = 3, so a CKG can tolerate any three simultaneous Chunk failures.",
    pdfPage: 45,
    difficulty: "easy",
    domain: "flash-storage",
  },
  {
    id: "q-raid-tp-tolerance",
    type: "truefalse",
    conceptIds: ["raid-tp"],
    stem: "RAID-TP can tolerate the simultaneous failure of any three Chunks (CKs) within a CKG.",
    correctAnswer: true,
    explanation:
      "Correct. With three parity columns, RAID-TP can reconstruct data after any three CK failures inside the same CKG.",
    pdfPage: 45,
    difficulty: "easy",
    domain: "flash-storage",
  },
  {
    id: "q-reconstruction-speed",
    type: "mcq",
    conceptIds: ["dynamic-reconstruction", "raid-2-0-plus"],
    stem: "Compared with traditional RAID, RAID 2.0+ reconstruction is approximately how many times faster?",
    options: ["2×", "5×", "10×", "20×"],
    correctAnswer: "20×",
    explanation:
      "Because reconstruction is many-to-many and only used data is rebuilt, RAID 2.0+ reconstruction is about 20 times faster.",
    pdfPage: 50,
    difficulty: "medium",
    domain: "flash-storage",
  },
  {
    id: "q-reconstruction-participants",
    type: "mcq",
    conceptIds: ["dynamic-reconstruction"],
    stem: "When a disk fails under RAID 2.0+, which disks participate in data reconstruction?",
    options: [
      "Only the hot-spare disk",
      "Only the disks that belonged to the same traditional RAID group",
      "All healthy disks in the storage pool",
      "Only the controller that owns the LUN",
    ],
    correctAnswer: "All healthy disks in the storage pool",
    explanation:
      "RAID 2.0+ performs many-to-many reconstruction: every healthy disk in the pool contributes a small amount of work.",
    pdfPage: 50,
    difficulty: "medium",
    domain: "flash-storage",
  },
  {
    id: "q-smartmatrix-failover",
    type: "mcq",
    conceptIds: ["smartmatrix"],
    stem: "What is the typical controller failover time achieved by SmartMatrix?",
    options: ["Several minutes", "Tens of seconds", "Seconds", "Sub-millisecond"],
    correctAnswer: "Seconds",
    explanation:
      "Thanks to the full-mesh interconnect and three-copy global cache, SmartMatrix can complete controller failover in seconds.",
    pdfPage: 20,
    difficulty: "medium",
    domain: "flash-storage",
  },
  {
    id: "q-smartmatrix-tolerance",
    type: "mcq",
    conceptIds: ["smartmatrix"],
    stem: "SmartMatrix architecture can tolerate the failure of how many controllers out of eight without service interruption?",
    options: ["1 out of 8", "3 out of 8", "4 out of 8", "7 out of 8"],
    correctAnswer: "7 out of 8",
    explanation:
      "With three-copy continuous cache mirroring and full-mesh hardware, the system can continue serving I/O even if seven of the eight controllers have failed.",
    pdfPage: 20,
    difficulty: "medium",
    domain: "flash-storage",
  },
  {
    id: "q-scenario-three-disk-fail",
    type: "scenario",
    conceptIds: ["raid-tp", "raid-2-0-plus"],
    stem: "A storage pool is configured with RAID-TP and disk-redundancy policy. Three disks fail at the same time. What is the expected result?",
    options: [
      "The entire storage pool goes offline and data is lost",
      "Services continue; the three failed CKs can be reconstructed from the remaining parity",
      "Only LUNs that had data on those three disks become unavailable",
      "The system automatically degrades to RAID 6 and continues",
    ],
    correctAnswer:
      "Services continue; the three failed CKs can be reconstructed from the remaining parity",
    explanation:
      "RAID-TP provides three parity columns (M=3). Therefore any three simultaneous CK failures inside a CKG can still be reconstructed.",
    pdfPage: 45,
    difficulty: "hard",
    domain: "flash-storage",
  },
  {
    id: "q-grain-size",
    type: "fill",
    conceptIds: ["grain"],
    stem: "In RAID 2.0+, the typical size of a Grain is _____ KB.",
    correctAnswer: "8",
    explanation: "Grains are the smallest allocation units and are typically 8 KB.",
    pdfPage: 39,
    difficulty: "easy",
    domain: "flash-storage",
  },
  {
    id: "q-ck-size",
    type: "fill",
    conceptIds: ["ck"],
    stem: "In RAID 2.0+, the typical size of a Chunk (CK) is _____ MB.",
    correctAnswer: "4",
    explanation: "Each physical disk is divided into fixed-size Chunks of typically 4 MB.",
    pdfPage: 39,
    difficulty: "easy",
    domain: "flash-storage",
  },
  {
    id: "q-hypermetro-rpo",
    type: "mcq",
    conceptIds: ["hypermetro"],
    stem: "What is the RPO of a correctly configured HyperMetro active-active solution?",
    options: ["Minutes", "Seconds", "Zero", "Depends on distance"],
    correctAnswer: "Zero",
    explanation: "HyperMetro is an active-active solution with synchronous dual-write, delivering zero RPO.",
    pdfPage: 120,
    difficulty: "medium",
    domain: "flash-storage",
  },
  {
    id: "q-admin-role",
    type: "mcq",
    conceptIds: ["roles-permissions"],
    stem: "Which operation can an Administrator role NOT perform?",
    options: [
      "Create LUNs",
      "Manage user accounts",
      "Configure SmartQoS",
      "View performance statistics",
    ],
    correctAnswer: "Manage user accounts",
    explanation: "The Administrator role cannot manage users or power the device off/on. Super administrator has those rights.",
    pdfPage: 260,
    difficulty: "medium",
    domain: "om",
  },
];

export const getQuestionsByConcept = (conceptId: string) =>
  questions.filter((q) => q.conceptIds.includes(conceptId));

export const getQuestionById = (id: string) =>
  questions.find((q) => q.id === id);

export const getQuestionsByDomain = (domain: string) =>
  questions.filter((q) => q.domain === domain);

/** Build a weighted mock exam that mirrors official domain weights */
export function buildWeightedExam(size = 60) {
  const byDomain: Record<string, typeof questions> = {
    "flash-storage": getQuestionsByDomain("flash-storage"),
    "scale-out": getQuestionsByDomain("scale-out"),
    deployment: getQuestionsByDomain("deployment"),
    performance: getQuestionsByDomain("performance"),
    om: getQuestionsByDomain("om"),
  };
  const target = {
    "flash-storage": Math.round(size * 0.35),
    "scale-out": Math.round(size * 0.15),
    deployment: Math.round(size * 0.15),
    performance: Math.round(size * 0.15),
    om: Math.round(size * 0.2),
  };
  const selected: typeof questions = [];
  for (const [dom, count] of Object.entries(target)) {
    const pool = [...(byDomain[dom] || [])].sort(() => Math.random() - 0.5);
    selected.push(...pool.slice(0, Math.min(count, pool.length)));
  }
  while (selected.length < size) {
    const all = questions.filter((q) => !selected.includes(q));
    if (all.length === 0) break;
    selected.push(all[Math.floor(Math.random() * all.length)]);
  }
  return selected.sort(() => Math.random() - 0.5).slice(0, size);
}
