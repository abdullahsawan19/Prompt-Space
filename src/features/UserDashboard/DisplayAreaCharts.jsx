import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAreaChartData } from "./UserDashboard-Hooks/useAreaChartData";
import SpinnerMini from "../../ui/SpinnerMini";

const DisplayAreaCharts = () => {
  const { areaData, isLoadingArea } = useAreaChartData();

  if (isLoadingArea) {
    return (
      <div className="flex items-center justify-center h-32">
        <SpinnerMini />
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-grey-0)] border border-[var(--color-grey-200)] rounded-xl p-6 min-h-[350px] shadow-sm flex flex-col">
      <h2 className="text-lg font-bold text-[var(--color-grey-800)] mb-4">
        Activity Overview
      </h2>

      {!areaData || areaData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-[var(--color-grey-200)] rounded-lg text-[var(--color-grey-400)]">
          No data available
        </div>
      ) : (
        <div className="flex-1 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={areaData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPrompts" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-brand-500)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-brand-500)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--color-grey-200)"
              />
              <XAxis
                dataKey="date"
                tick={{ fill: "var(--color-grey-500)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                tick={{ fill: "var(--color-grey-500)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-grey-0)",
                  borderColor: "var(--color-grey-200)",
                  borderRadius: "8px",
                  color: "var(--color-grey-800)",
                }}
                itemStyle={{
                  color: "var(--color-brand-600)",
                  fontWeight: "bold",
                }}
              />
              <Area
                type="monotone"
                dataKey="prompts"
                name="Prompts Created"
                stroke="var(--color-brand-600)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPrompts)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default DisplayAreaCharts;
