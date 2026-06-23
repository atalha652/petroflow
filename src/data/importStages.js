import { buildStageToolkit } from './stageToolkit.js'

export const IMPORT_STAGES = [
  {
    id: 'procurement-planning',
    label: 'Procurement Planning',
    substages: [
      { id: 'vendor-selection', label: 'Vendor Selection' },
      { id: 'quotation', label: 'Quotation' },
      { id: 'purchase-order', label: 'Purchase Order' },
    ],
  },
  {
    id: 'tanks-storage',
    label: 'Tanks & Storage',
    substages: [
      { id: 'storage-tanks', label: 'Storage Tanks' },
      { id: 'tank-fittings', label: 'Tank Fittings' },
      { id: 'leak-sensors', label: 'Leak Sensors' },
    ],
  },
  {
    id: 'pumps-piping',
    label: 'Pumps & Piping',
    substages: [
      { id: 'dispenser-units', label: 'Dispenser Units' },
      { id: 'submersible-pumps', label: 'Submersible Pumps' },
      { id: 'pipes-fittings', label: 'Pipes & Fittings' },
      { id: 'valves', label: 'Valves' },
    ],
  },
  {
    id: 'electrical-safety',
    label: 'Electrical & Safety',
    substages: [
      { id: 'wiring-cables', label: 'Wiring & Cables' },
      { id: 'lighting', label: 'Lighting' },
      { id: 'fire-safety-gear', label: 'Fire Safety Gear' },
      { id: 'signage-materials', label: 'Signage Materials' },
    ],
  },
]

export const DEFAULT_IMPORT_SUBSTAGE = IMPORT_STAGES[0].substages[0].label

export const importStageToolkit = buildStageToolkit(IMPORT_STAGES)

export function normalizeImportProgress(source) {
  return {
    stagesComplete: source.importStagesComplete ?? source.stagesComplete ?? 0,
    stagesTotal: source.importStagesTotal ?? source.stagesTotal ?? importStageToolkit.getStagesTotal(),
    currentStage: source.currentImportStage ?? source.currentStage ?? DEFAULT_IMPORT_SUBSTAGE,
    status: source.status,
  }
}

export const formatImportStageLabel = importStageToolkit.formatStageLabel
export const getImportStageProgress = importStageToolkit.getStageProgress
export const getImportCardBadge = importStageToolkit.getMainStageLabel
export const getImportCardTimeLabel = importStageToolkit.getCardTimeLabel
export const getImportCardProgressVariant = importStageToolkit.getCardProgressVariant
