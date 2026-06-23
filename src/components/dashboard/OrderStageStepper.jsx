import { RiCheckLine } from 'react-icons/ri'

function MainStageHeader({ index, label, status }) {
  const circleClass =
    status === 'complete'
      ? 'bg-brand text-white shadow-sm shadow-brand/20'
      : status === 'current'
        ? 'border-2 border-brand bg-brand/15 text-brand-text ring-4 ring-brand/10'
        : status === 'active'
          ? 'border-2 border-brand/40 bg-brand/10 text-brand-text'
          : 'border border-border bg-code-bg text-fg-muted'

  return (
    <div className="flex flex-col items-center gap-2 px-1 text-center">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold sm:h-10 sm:w-10 sm:text-sm ${circleClass}`}
      >
        {status === 'complete' ? (
          <RiCheckLine size={16} aria-hidden="true" />
        ) : (
          index
        )}
      </span>
      <p className="m-0 text-xs font-semibold leading-snug text-fg sm:text-sm">{label}</p>
    </div>
  )
}

function SubstageNode({ label, status }) {
  const nodeClass =
    status === 'complete'
      ? 'border-brand bg-brand text-white'
      : status === 'current'
        ? 'border-2 border-brand bg-surface text-brand-text shadow-sm shadow-brand/20'
        : 'border-2 border-border bg-surface text-fg-muted'

  return (
    <div className="relative z-10 flex min-w-[56px] flex-1 flex-col items-center px-0.5 sm:min-w-[68px]">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full ${nodeClass}`}
        title={label}
      >
        {status === 'complete' ? (
          <RiCheckLine size={13} aria-hidden="true" />
        ) : status === 'current' ? (
          <span className="h-2.5 w-2.5 rounded-full bg-brand" aria-hidden="true" />
        ) : (
          <span className="h-2 w-2 rounded-full bg-border" aria-hidden="true" />
        )}
      </span>
      <p
        className={`mt-2 m-0 max-w-[76px] text-center text-[9px] leading-tight sm:text-[10px] ${
          status === 'current'
            ? 'font-semibold text-brand-text'
            : status === 'complete'
              ? 'font-medium text-fg'
              : 'text-fg-muted'
        }`}
      >
        {label}
      </p>
    </div>
  )
}

export default function OrderStageStepper({
  toolkit,
  progress,
  heading = 'Overall progress',
  minWidth = 820,
}) {
  const { stages, getStageProgress, getSubstageIndex, getSubstageStatus, getMainStageStatus } =
    toolkit

  const percent = getStageProgress(progress)
  const currentIndex = getSubstageIndex(progress.currentStage)
  const lineFill =
    progress.stagesComplete >= progress.stagesTotal
      ? 100
      : currentIndex >= 0
        ? ((currentIndex + 0.5) / progress.stagesTotal) * 100
        : (progress.stagesComplete / progress.stagesTotal) * 100

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-canvas/50 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="m-0 text-[11px] font-medium uppercase tracking-wide text-fg-muted">
              {heading}
            </p>
            <p className="mt-1 m-0 text-2xl font-semibold text-fg">
              {percent}%
              <span className="ml-2 text-sm font-medium text-fg-muted">
                ({progress.stagesComplete}/{progress.stagesTotal} substages)
              </span>
            </p>
          </div>
          <p className="m-0 text-sm text-fg-muted">
            Current: <span className="font-medium text-fg">{progress.currentStage}</span>
          </p>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-code-bg">
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="overflow-x-auto pb-3 scrollbar-hidden">
        <div className="px-1" style={{ minWidth: `${minWidth}px` }}>
          <div className="flex lg:min-w-0">
            {stages.map((stage, index) => (
              <div
                key={stage.id}
                className={`min-w-0 ${index > 0 ? 'border-l border-dashed border-border' : ''}`}
                style={{ flex: stage.substages.length }}
              >
                <div className="px-2 pb-4 pt-1 sm:px-3">
                  <MainStageHeader
                    index={index + 1}
                    label={stage.label}
                    status={getMainStageStatus(progress, stage)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex items-start px-2 sm:px-3">
            <div
              className="absolute left-5 right-5 top-[13px] h-0.5 rounded-full bg-border"
              aria-hidden="true"
            />
            <div
              className="absolute left-5 top-[13px] h-0.5 rounded-full bg-brand transition-all duration-500"
              style={{ width: `calc((100% - 2.5rem) * ${lineFill / 100})` }}
              aria-hidden="true"
            />

            {stages.map((stage) => (
              <div
                key={stage.id}
                className="flex min-w-0"
                style={{ flex: stage.substages.length }}
              >
                {stage.substages.map((substage) => (
                  <SubstageNode
                    key={substage.id}
                    label={substage.label}
                    status={getSubstageStatus(progress, substage.label)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
