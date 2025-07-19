// components/SortSelect.tsx – výběr řazení

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortSelect({ value, onChange }: Props) {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium">Seřadit podle:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="default">Výchozí</option>
        <option value="titulek">Titulku (A–Z)</option>
        <option value="hodnoceni">Hodnocení (nejlepší)</option>
      </select>
    </div>
  );
}
