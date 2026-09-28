import { Chapter } from "@/types";

/**
 * Exam sections mapped to official H13-624 V5.5 outline.
 *
 * Top-level weights (official):
 * - Storage technologies & applications … 50%
 * - Storage product deployment …………… 15%
 * - Storage system performance tuning … 15%
 * - Storage system O&M & troubleshooting 20%
 *
 * Each chapter lists:
 * - requiredTopics: syllabus bullets that MUST be covered
 * - conceptIds: implemented concept cards learners can study
 */
export const chapters: Chapter[] = [
  {
    id: "product-overview",
    title: "Product Overview",
    order: 1,
    domain: "flash-storage",
    weight: 5,
    description:
      "OceanStor Dorado positioning, series portfolio, and target workloads for all-flash arrays.",
    conceptIds: ["dorado-portfolio", "target-workloads"],
    requiredTopics: [
      "Dorado series positioning (all-flash / mission-critical)",
      "Product portfolio and model families",
      "Target application workloads (OLTP, VDI, containers, etc.)",
      "Scale-up vs scale-out product choice (Dorado vs Pacific)",
    ],
  },
  {
    id: "product-architecture",
    title: "Product Architecture",
    order: 2,
    domain: "flash-storage",
    weight: 12,
    description:
      "SmartMatrix full-mesh hardware, multi-controller design, global cache, front-end/back-end I/O paths.",
    conceptIds: [
      "smartmatrix",
      "global-cache",
      "multi-controller",
      "front-back-end",
    ],
    requiredTopics: [
      "SmartMatrix full-mesh active-active architecture",
      "Multi-controller interconnect and failover",
      "Global cache and three-copy continuous mirroring",
      "Front-end host access path (FC / iSCSI / NVMe-oF)",
      "Back-end disk enclosure path and dual-path access",
      "No LUN ownership / true load balancing",
      "Controller failure tolerance (e.g. 7-out-of-8)",
    ],
  },
  {
    id: "key-technologies",
    title: "Key Technologies",
    order: 3,
    domain: "flash-storage",
    weight: 18,
    description:
      "RAID 2.0+, RAID-TP, dynamic reconstruction, FlashLink, ROW full-stripe write.",
    conceptIds: [
      "raid-2-0-plus",
      "ck",
      "ckg",
      "grain",
      "raid-tp",
      "dynamic-reconstruction",
      "flashlink",
      "row-full-stripe",
    ],
    requiredTopics: [
      "RAID 2.0+ hierarchy: Disk → CK → CKG → Grain → LUN",
      "Chunk (CK) and Chunk Group (CKG) definitions and sizes",
      "Grain as smallest allocation unit",
      "RAID-TP (triple parity, M=3)",
      "Dynamic / many-to-many reconstruction (~20× faster)",
      "FlashLink end-to-end NVMe / flash optimization",
      "ROW (Redirect-On-Write) full-stripe write",
      "Disk-redundancy vs enclosure-redundancy policies",
    ],
  },
  {
    id: "value-added-features",
    title: "Value-added Features",
    order: 4,
    domain: "flash-storage",
    weight: 15,
    description:
      "Hyper series data protection and Smart series efficiency/QoS features.",
    conceptIds: [
      "hypermetro",
      "hyperreplication",
      "hypersnap",
      "smartdedupe",
      "smartqos",
      "smartvirtualization",
    ],
    requiredTopics: [
      "HyperSnap / HyperClone / HyperCDP (snapshots, clones, continuous protection)",
      "HyperMetro active-active (zero RPO, FastWrite, witness)",
      "HyperReplication (sync / async remote replication)",
      "SmartDedupe & SmartCompression (inline data reduction)",
      "SmartQoS / SmartTier / SmartCache",
      "SmartVirtualization (heterogeneous virtualization / migration)",
    ],
  },
  {
    id: "application-scenarios",
    title: "Application Scenarios",
    order: 5,
    domain: "flash-storage",
    weight: 5,
    description:
      "Typical Dorado use cases: databases, VDI, containers, active-active DR, backup integration.",
    conceptIds: ["mission-critical-db", "active-active-dr"],
    requiredTopics: [
      "Mission-critical databases (OLTP / core billing)",
      "VDI and virtualization platforms",
      "Containers / cloud-native storage",
      "Active-active disaster recovery with HyperMetro",
      "Backup and recovery integration (e.g. OceanProtect)",
    ],
  },
  {
    id: "scale-out",
    title: "Scale-Out Storage (Pacific)",
    order: 6,
    domain: "scale-out",
    weight: 15,
    description:
      "OceanStor Pacific architecture, DPC, multi-protocol access, EC, and typical scale-out scenarios.",
    conceptIds: [
      "oceanstor-pacific",
      "dpc",
      "multi-protocol",
      "pacific-ec",
    ],
    requiredTopics: [
      "OceanStor Pacific product overview and positioning",
      "Scale-out architecture (add nodes for capacity/performance)",
      "Distributed Parallel Client (DPC)",
      "Multi-protocol access (NFS / SMB / HDFS / POSIX / S3)",
      "Erasure coding / data protection on Pacific",
      "Network planes and load balancing",
      "Typical scenarios: HPC, big data, AI, backup, object",
    ],
  },
  {
    id: "deployment",
    title: "Product Deployment",
    order: 7,
    domain: "deployment",
    weight: 15,
    description:
      "Flash device install & service config; Pacific hardware, network, software, and service deployment.",
    conceptIds: [
      "flash-device-install",
      "flash-service-config",
      "pacific-deploy",
      "multipathing",
    ],
    requiredTopics: [
      "Flash storage device installation (rack, power, cabling)",
      "Flash storage service configuration (pools, LUNs, hosts, mapping)",
      "Thin vs thick LUN provisioning",
      "Host multipathing (UltraPath / native MPIO)",
      "Scale-out hardware installation process",
      "Scale-out network planning (front-end / back-end planes)",
      "Scale-out software installation process",
      "Scale-out service configuration",
    ],
  },
  {
    id: "performance",
    title: "Performance Tuning",
    order: 8,
    domain: "performance",
    weight: 15,
    description:
      "Performance overview, evaluation, problem location, tuning knobs, and testing methodology.",
    conceptIds: [
      "perf-overview",
      "perf-evaluation",
      "cache-watermarks",
      "perf-tuning-test",
    ],
    requiredTopics: [
      "Storage performance overview (IOPS, latency, bandwidth)",
      "Performance evaluation against application SLAs",
      "Locating performance problems (host / network / array)",
      "Cache high/low watermarks and destage behaviour",
      "Prefetch, queue depth, and common tuning practices",
      "Performance testing with realistic I/O models",
    ],
  },
  {
    id: "om",
    title: "O&M and Troubleshooting",
    order: 9,
    domain: "om",
    weight: 20,
    description:
      "O&M tools, roles, daily management, troubleshooting process, information collection, part replacement.",
    conceptIds: [
      "dme-iq",
      "roles-permissions",
      "troubleshooting-process",
      "part-replacement",
      "daily-management",
    ],
    requiredTopics: [
      "O&M tools: DME IQ (cloud AIOps) and SmartKit (local)",
      "User roles and permissions (Administrator vs Super administrator)",
      "Daily / routine management tasks",
      "Troubleshooting basics and standard process",
      "Information collection and fault reporting",
      "Parts (FRU) replacement procedures",
      "Case-analysis style fault scenarios",
    ],
  },
];

export const getChapterById = (id: string) =>
  chapters.find((c) => c.id === id);

export function getSectionCoverage() {
  return chapters.map((ch) => ({
    id: ch.id,
    title: ch.title,
    requiredTopicCount: ch.requiredTopics.length,
    implementedConceptCount: ch.conceptIds.length,
    conceptIds: ch.conceptIds,
  }));
}
