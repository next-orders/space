import { TableData } from '@/types';

type Props = {
  data: TableData | null;
};

export const TableWithData = ({ data }: Props) => {
  if (!data) return null;

  const head = data.columns.map((col) => (
    <th key={col.key} className="px-2 py-2 font-normal text-sm">
      {col.label}
    </th>
  ));

  const rows = data.data?.map((row, index) => (
    <tr key={index} className="border-b">
      {data.columns.map((col, index) => {
        return (
          <td key={index} className="px-2 py-2">
            {row[col.key]}
          </td>
        );
      })}
    </tr>
  ));

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-zinc-100 text-zinc-500 text-left first:px-5 last:px-5">
          {head}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
