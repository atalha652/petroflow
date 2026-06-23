import { buildStageToolkit } from './stageToolkit.js'

export const ORDER_STAGES = [
  {
    id: 'planning',
    label: 'Planning',
    substages: [
      { id: 'site-survey', label: 'Site Survey' },
      { id: 'approvals', label: 'Approvals' },
      { id: 'soil-testing', label: 'Soil Testing' },
    ],
  },
  {
    id: 'civil-work',
    label: 'Civil Work',
    substages: [
      { id: 'site-clearing', label: 'Site Clearing' },
      { id: 'excavation', label: 'Excavation' },
      { id: 'tank-installation', label: 'Tank Installation' },
      { id: 'foundation', label: 'Foundation' },
      { id: 'canopy-construction', label: 'Canopy Construction' },
    ],
  },
  {
    id: 'installation',
    label: 'Installation',
    substages: [
      { id: 'piping', label: 'Piping' },
      { id: 'dispenser-setup', label: 'Dispenser Setup' },
      { id: 'electrical-wiring', label: 'Electrical Wiring' },
      { id: 'safety-systems', label: 'Safety Systems' },
    ],
  },
  {
    id: 'finishing',
    label: 'Finishing',
    substages: [
      { id: 'signage', label: 'Signage' },
      { id: 'testing', label: 'Testing' },
      { id: 'handover', label: 'Handover' },
    ],
  },
]

export const DEFAULT_SUBSTAGE = ORDER_STAGES[0].substages[0].label

export const productionStageToolkit = buildStageToolkit(ORDER_STAGES)

const toolkit = productionStageToolkit

export const getStagesTotal = toolkit.getStagesTotal
export const getAllSubstages = toolkit.getAllSubstages
export const getSubstageIndex = toolkit.getSubstageIndex
export const getMainStageForSubstage = toolkit.getMainStageForSubstage
export const formatStageLabel = toolkit.formatStageLabel

export function getStageProgressFromOrder(order) {
  return toolkit.getStageProgress(order)
}

export function getCompletedSubstages(order) {
  return toolkit.getAllSubstages().slice(0, order.stagesComplete)
}

export function getSubstageStatus(order, substageLabel) {
  return toolkit.getSubstageStatus(order, substageLabel)
}

export function isOrderFullyComplete(order) {
  return toolkit.isFullyComplete(order)
}

export function getMainStageLabel(order) {
  return toolkit.getMainStageLabel(order)
}

export function getOrderCardProgressVariant(order) {
  return toolkit.getCardProgressVariant(order)
}

export function getOrderCardTimeLabel(order) {
  return toolkit.getCardTimeLabel(order)
}

export function getOrderCardBadge(order) {
  return toolkit.getMainStageLabel(order)
}

export function getMainStageStatus(order, stage) {
  return toolkit.getMainStageStatus(order, stage)
}

export function getMainStageCompletedCount(order, stage) {
  return toolkit.getMainStageCompletedCount(order, stage)
}
