// src/components/missao/PatoTooltip.tsx

interface PatoTooltipProps {
  note: string;
}

/**
 * O componente de UI para o tooltip que exibe a "Nota do Pato".
 */
export default function PatoTooltip({ note }: PatoTooltipProps) {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-white/10">
      <div className="relative bg-phato-card p-4">
        <p className="text-sm leading-6 text-phato-text">
          <strong className="font-semibold text-phato-light">Nota do Pato: </strong>
          {note}
        </p>
      </div>
    </div>
  );
}
