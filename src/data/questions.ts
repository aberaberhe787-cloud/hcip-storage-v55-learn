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
      "With three parity columns, RAID-TP can reconstruct data after any three CK failures inside the same CKG.",
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
  {
    id: "q-deploy-install-order",
    type: "mcq",
    conceptIds: [],
    stem: "What is the typical high-level order for deploying a flash storage system?",
    options: [
      "Configure services → Install software → Rack and cable hardware",
      "Rack and power hardware → Network cabling → Software initialization → Basic service configuration",
      "Create LUNs first → Then install DeviceManager → Cable the backend",
      "Only software installation is required for Dorado",
    ],
    correctAnswer:
      "Rack and power hardware → Network cabling → Software initialization → Basic service configuration",
    explanation:
      "Hardware must be racked, powered and networked before software initialization and service configuration.",
    pdfPage: 220,
    difficulty: "medium",
    domain: "deployment",
  },
  {
    id: "q-deploy-multipath",
    type: "mcq",
    conceptIds: [],
    stem: "Why is multipathing configured on hosts connected to OceanStor Dorado?",
    options: [
      "To increase raw capacity of the storage pool",
      "To provide path redundancy and load balancing between host and storage",
      "To enable RAID-TP automatically",
      "To replace the need for front-end switches",
    ],
    correctAnswer:
      "To provide path redundancy and load balancing between host and storage",
    explanation:
      "Multipathing keeps I/O flowing if a path or HBA fails and can balance load across paths.",
    pdfPage: 225,
    difficulty: "easy",
    domain: "deployment",
  },
  {
    id: "q-deploy-devicemanager",
    type: "truefalse",
    conceptIds: [],
    stem: "DeviceManager is the primary GUI used to initialize and configure OceanStor Dorado basic services.",
    correctAnswer: true,
    explanation:
      "DeviceManager is the standard management interface for initialization, pools, LUNs, and feature configuration.",
    pdfPage: 230,
    difficulty: "easy",
    domain: "deployment",
  },
  {
    id: "q-deploy-pacific-network",
    type: "mcq",
    conceptIds: ["oceanstor-pacific"],
    stem: "When deploying OceanStor Pacific, which planning item is most critical before software installation?",
    options: [
      "Only choosing the RAID level of a single enclosure",
      "Front-end and back-end network planning (planes, IP ranges, bonding)",
      "Disabling multipathing on all clients",
      "Configuring HyperMetro before hardware arrives",
    ],
    correctAnswer:
      "Front-end and back-end network planning (planes, IP ranges, bonding)",
    explanation:
      "Scale-out deployment depends on correct network plane design for client access and inter-node traffic.",
    pdfPage: 240,
    difficulty: "medium",
    domain: "deployment",
  },
  {
    id: "q-deploy-thin-thick",
    type: "mcq",
    conceptIds: [],
    stem: "During service configuration, what is the main difference between thin and thick LUNs?",
    options: [
      "Thin LUNs cannot be snapshotted",
      "Thick LUNs allocate capacity up front; thin LUNs allocate on demand",
      "Thick LUNs only work with RAID-TP",
      "Thin LUNs require enclosure redundancy",
    ],
    correctAnswer:
      "Thick LUNs allocate capacity up front; thin LUNs allocate on demand",
    explanation:
      "Thick provisioning reserves space immediately; thin provisioning grows as data is written.",
    pdfPage: 235,
    difficulty: "easy",
    domain: "deployment",
  },
  {
    id: "q-perf-overview",
    type: "mcq",
    conceptIds: ["global-cache"],
    stem: "Which metric is most relevant when evaluating whether a storage system meets an application SLA?",
    options: [
      "Only the number of disks in the pool",
      "Latency, IOPS and bandwidth under the target I/O model",
      "Only the RAID level name",
      "Only the DeviceManager UI language",
    ],
    correctAnswer:
      "Latency, IOPS and bandwidth under the target I/O model",
    explanation:
      "Performance evaluation compares measured latency, IOPS and throughput against application requirements.",
    pdfPage: 250,
    difficulty: "easy",
    domain: "performance",
  },
  {
    id: "q-perf-bottleneck",
    type: "mcq",
    conceptIds: [],
    stem: "A host reports high latency but the storage CPU and cache are not saturated. What is a reasonable next check?",
    options: [
      "Ignore the host and only expand the storage pool",
      "Check host multipathing, queue depth, and network/FC path health",
      "Disable SmartMatrix",
      "Switch all LUNs to RAID 0",
    ],
    correctAnswer:
      "Check host multipathing, queue depth, and network/FC path health",
    explanation:
      "Performance problems are often outside the array: paths, HBA queues, or fabric congestion.",
    pdfPage: 255,
    difficulty: "medium",
    domain: "performance",
  },
  {
    id: "q-perf-prefetch",
    type: "truefalse",
    conceptIds: [],
    stem: "Prefetch and queue-depth tuning can improve sequential and concurrent I/O performance on flash storage.",
    correctAnswer: true,
    explanation:
      "Prefetch helps sequential reads; appropriate queue depth improves concurrency.",
    pdfPage: 258,
    difficulty: "easy",
    domain: "performance",
  },
  {
    id: "q-perf-test",
    type: "mcq",
    conceptIds: [],
    stem: "When running a storage performance test, which practice is most important?",
    options: [
      "Test only with zero queue depth",
      "Use a realistic I/O model matching production (block size, R/W ratio, random/sequential)",
      "Always test with a single thread only",
      "Disable multipathing permanently",
    ],
    correctAnswer:
      "Use a realistic I/O model matching production (block size, R/W ratio, random/sequential)",
    explanation:
      "Synthetic tests only predict production behaviour when the I/O pattern matches the application.",
    pdfPage: 262,
    difficulty: "medium",
    domain: "performance",
  },
  {
    id: "q-om-troubleshooting-flow",
    type: "mcq",
    conceptIds: ["dme-iq"],
    stem: "What is a sensible first step in a storage troubleshooting process?",
    options: [
      "Replace all SSDs immediately",
      "Collect alarms, health status and recent changes, then isolate the fault domain",
      "Delete the storage pool",
      "Disable SmartMatrix and reboot all controllers",
    ],
    correctAnswer:
      "Collect alarms, health status and recent changes, then isolate the fault domain",
    explanation:
      "Standard process: gather symptoms and alarms, define scope, isolate, fix, and verify.",
    pdfPage: 285,
    difficulty: "medium",
    domain: "om",
  },
  {
    id: "q-om-part-replace",
    type: "truefalse",
    conceptIds: [],
    stem: "Hot-swappable components on Dorado can often be replaced following official procedure without a full system shutdown.",
    correctAnswer: true,
    explanation:
      "FRU procedures allow controlled replacement while services continue, subject to redundancy.",
    pdfPage: 290,
    difficulty: "easy",
    domain: "om",
  },
  {
    id: "q-om-smartkit",
    type: "mcq",
    conceptIds: ["dme-iq"],
    stem: "SmartKit is primarily used for:",
    options: [
      "Replacing HyperMetro with async replication only",
      "Local maintenance tasks such as inspection, log collection and guided procedures",
      "Creating OceanStor Pacific clusters exclusively",
      "Licensing Windows hosts",
    ],
    correctAnswer:
      "Local maintenance tasks such as inspection, log collection and guided procedures",
    explanation:
      "SmartKit is the on-prem toolkit; DME IQ is the cloud AIOps platform.",
    pdfPage: 280,
    difficulty: "easy",
    domain: "om",
  },
  {
    id: "q-pacific-use-case",
    type: "mcq",
    conceptIds: ["oceanstor-pacific"],
    stem: "OceanStor Pacific is best positioned for which workload class?",
    options: [
      "Only single-controller block SAN for OLTP",
      "Scale-out file/object and data-intensive workloads (HPC, big data, AI, backup)",
      "Replacing FC switches",
      "Desktop USB drives",
    ],
    correctAnswer:
      "Scale-out file/object and data-intensive workloads (HPC, big data, AI, backup)",
    explanation:
      "Pacific is Huawei's scale-out platform for multi-protocol unstructured and high-throughput scenarios.",
    pdfPage: 200,
    difficulty: "easy",
    domain: "scale-out",
  },
  {
    id: "q-pacific-scale",
    type: "truefalse",
    conceptIds: ["oceanstor-pacific"],
    stem: "OceanStor Pacific is designed to scale out by adding nodes rather than only scaling up controllers in a single dual-controller array.",
    correctAnswer: true,
    explanation:
      "Scale-out architecture expands capacity and performance by adding nodes to the cluster.",
    pdfPage: 205,
    difficulty: "easy",
    domain: "scale-out",
  },
  {
    id: "q-dpc-role",
    type: "mcq",
    conceptIds: ["dpc"],
    stem: "What is the role of DPC (Data Processing Client) with OceanStor Pacific?",
    options: [
      "It replaces the need for any network between nodes",
      "It is a client-side component that can accelerate access to the scale-out storage",
      "It is only used for RAID-TP parity calculation on Dorado",
      "It is the cloud license server for DeviceManager",
    ],
    correctAnswer:
      "It is a client-side component that can accelerate access to the scale-out storage",
    explanation:
      "DPC runs on compute nodes and can improve access performance with appropriate memory and CPU settings.",
    pdfPage: 210,
    difficulty: "medium",
    domain: "scale-out",
  },
];

export const getQuestionsByConcept = (conceptId: string) =>
  questions.filter((q) => q.conceptIds.includes(conceptId));

export const getQuestionById = (id: string) =>
  questions.find((q) => q.id === id);

export const getQuestionsByDomain = (domain: string) =>
  questions.filter((q) => q.domain === domain);

/** Build a weighted mock exam that mirrors official domain weights.
 *  When the bank is smaller than the target, questions may be reused with unique ids. */
export function buildWeightedExam(size = 60) {
  const byDomain: Record<string, Question[]> = {
    "flash-storage": getQuestionsByDomain("flash-storage"),
    "scale-out": getQuestionsByDomain("scale-out"),
    deployment: getQuestionsByDomain("deployment"),
    performance: getQuestionsByDomain("performance"),
    om: getQuestionsByDomain("om"),
  };
  const target: Record<string, number> = {
    "flash-storage": Math.round(size * 0.35),
    "scale-out": Math.round(size * 0.15),
    deployment: Math.round(size * 0.15),
    performance: Math.round(size * 0.15),
    om: Math.round(size * 0.2),
  };
  let sum = Object.values(target).reduce((a, b) => a + b, 0);
  if (sum < size) target["flash-storage"] += size - sum;
  if (sum > size) target["flash-storage"] = Math.max(0, target["flash-storage"] - (sum - size));

  const selected: Question[] = [];
  let reuse = 0;
  for (const [dom, count] of Object.entries(target)) {
    const pool = [...(byDomain[dom] || [])];
    if (pool.length === 0) continue;
    for (let i = 0; i < count; i++) {
      const base = pool[i % pool.length];
      if (i < pool.length) {
        selected.push(base);
      } else {
        reuse++;
        selected.push({ ...base, id: `${base.id}-r${reuse}` });
      }
    }
  }
  while (selected.length < size && questions.length > 0) {
    reuse++;
    const base = questions[selected.length % questions.length];
    selected.push({ ...base, id: `${base.id}-r${reuse}` });
  }
  return selected.sort(() => Math.random() - 0.5).slice(0, size);
}
