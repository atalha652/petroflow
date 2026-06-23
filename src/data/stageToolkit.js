export function buildStageToolkit(stages) {
  const getStagesTotal = () =>
    stages.reduce((sum, stage) => sum + stage.substages.length, 0)

  const getAllSubstages = () =>
    stages.flatMap((stage) =>
      stage.substages.map((substage) => ({
        ...substage,
        mainStageId: stage.id,
        mainStageLabel: stage.label,
      })),
    )

  const getSubstageIndex = (label) =>
    getAllSubstages().findIndex((substage) => substage.label === label)

  const getMainStageForSubstage = (label) => {
    for (const stage of stages) {
      const substage = stage.substages.find((entry) => entry.label === label)
      if (substage) {
        return { mainStage: stage, substage }
      }
    }
    return null
  }

  const formatStageLabel = (label) => {
    const match = getMainStageForSubstage(label)
    if (!match) return label
    return `${match.mainStage.label} · ${match.substage.label}`
  }

  const getStageProgress = (progress) => {
    const total = progress.stagesTotal ?? getStagesTotal()
    if (!total) return 0
    return Math.round((progress.stagesComplete / total) * 100)
  }

  const getSubstageStatus = (progress, substageLabel) => {
    const index = getSubstageIndex(substageLabel)
    if (index < 0) return 'upcoming'

    if (index < progress.stagesComplete) return 'complete'
    if (substageLabel === progress.currentStage) return 'current'
    return 'upcoming'
  }

  const isFullyComplete = (progress) =>
    progress.status === 'Completed' ||
    progress.stagesComplete >= (progress.stagesTotal ?? getStagesTotal())

  const getMainStageLabel = (progress) => {
    if (isFullyComplete(progress)) {
      return stages[stages.length - 1].label
    }

    const match = getMainStageForSubstage(progress.currentStage)
    return match?.mainStage.label ?? stages[0].label
  }

  const getCardProgressVariant = (progress) => {
    if (isFullyComplete(progress)) return 'complete'
    if (progress.stagesComplete === 0) return 'pending'
    return 'active'
  }

  const getCardTimeLabel = (progress) => {
    const lastSubstage = stages[stages.length - 1].substages.at(-1)?.label
    if (isFullyComplete(progress)) return lastSubstage ?? progress.currentStage
    return progress.currentStage
  }

  const getMainStageStatus = (progress, stage) => {
    const statuses = stage.substages.map((substage) =>
      getSubstageStatus(progress, substage.label),
    )

    if (statuses.every((status) => status === 'complete')) return 'complete'
    if (statuses.some((status) => status === 'current')) return 'current'
    if (statuses.some((status) => status === 'complete')) return 'active'
    return 'upcoming'
  }

  const getMainStageCompletedCount = (progress, stage) =>
    stage.substages.filter(
      (substage) => getSubstageStatus(progress, substage.label) === 'complete',
    ).length

  return {
    stages,
    getStagesTotal,
    getAllSubstages,
    getSubstageIndex,
    getMainStageForSubstage,
    formatStageLabel,
    getStageProgress,
    getSubstageStatus,
    isFullyComplete,
    getMainStageLabel,
    getCardProgressVariant,
    getCardTimeLabel,
    getMainStageStatus,
    getMainStageCompletedCount,
  }
}
