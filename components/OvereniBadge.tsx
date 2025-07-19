export default function OvereniBadge({ overeno }: { overeno: boolean }) {
  return (
    <div
      className={`inline-flex items-center text-sm font-medium rounded-full px-3 py-1 ${
        overeno ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-600'
      }`}
    >
      {overeno ? '✅ Ověřená firma' : '⚠️ Neověřeno'}
    </div>
  );
}
