import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { usePieChartData } from "./UserDashboard-Hooks/usePieChartData";
import SpinnerMini from "../../ui/SpinnerMini";

const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const DisplayPieChart = () => {
  const { pieData, isLoadingPie } = usePieChartData();

  if (isLoadingPie) {
    return (
      <div className="flex items-center justify-center h-32">
        <SpinnerMini />
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-6 min-h-[350px] shadow-sm flex flex-col">
      <h2 className="text-lg font-bold text-[var(--color-grey-800)] mb-4">
        Prompts by Workspace
      </h2>

      {pieData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[var(--color-grey-200)] rounded-lg text-[var(--color-grey-400)]">
          No data available
        </div>
      ) : (
        <div className="flex-1 w-full min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={4}
                dataKey="value"
                nameKey="name"
                label={({ name, value }) => `${name} (${value})`}
                stroke="var(--color-grey-0)"
                strokeWidth={2}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-grey-0)",
                  borderColor: "var(--color-grey-200)",
                  borderRadius: "8px",
                  color: "var(--color-grey-800)",
                }}
                itemStyle={{ color: "var(--color-grey-800)" }}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value, entry) => (
                  <span className="text-[var(--color-grey-800)] font-medium ml-1">
                    {value} ({entry.payload.value})
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default DisplayPieChart;
