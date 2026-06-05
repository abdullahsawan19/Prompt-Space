const ReusableTable = ({
  title,
  count,
  headers,
  data,
  renderRow,
  emptyMessage,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-8 text-center shadow-sm mt-4">
        <p className="text-sm text-[var(--color-grey-500)] italic">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl overflow-hidden shadow-sm mt-4">
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-grey-100)]">
        <h3 className="font-bold text-[var(--color-grey-800)]">{title}</h3>
        {count !== undefined && (
          <span className="bg-[var(--color-grey-100)] text-[var(--color-grey-700)] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[var(--color-grey-200)]">
            {count}
          </span>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm min-w-[600px]">
          <thead>
            <tr className="bg-[var(--color-grey-50)] text-[var(--color-grey-600)] font-semibold border-b border-[var(--color-grey-100)]">
              {headers.map((header, index) => (
                <th key={index} className="p-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-grey-100)] text-[var(--color-grey-700)]">
            {data.map(renderRow)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReusableTable;
